import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';

// Rate limiter en memoria simple para mitigar spam/bots
interface RateLimitData {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitData>();

// Limpieza periódica de IPs antiguas para evitar fugas de memoria
if (typeof global !== 'undefined') {
  setInterval(
    () => {
      const now = Date.now();
      for (const [ip, data] of rateLimitMap.entries()) {
        if (now > data.resetTime) {
          rateLimitMap.delete(ip);
        }
      }
    },
    5 * 60 * 1000,
  ); // Cada 5 minutos
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limitWindow = 60 * 1000; // 1 minuto
  const maxRequests = 5; // Máximo 5 solicitudes por minuto por IP

  const limitData = rateLimitMap.get(ip);

  if (!limitData || now > limitData.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + limitWindow,
    });
    return true;
  }

  if (limitData.count >= maxRequests) {
    return false;
  }

  limitData.count += 1;
  return true;
}

// Validación de formato de email
function validateEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email.trim());
}

export async function POST(request: Request) {
  try {
    // 1. Rate Limiting basado en IP
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { message: 'Too many requests. Please try again in a minute.' },
        { status: 429 },
      );
    }

    // 2. Extraer y validar el cuerpo
    const body = await request.json();
    const { email, lang } = body;
    const currentLang = lang === 'es' ? 'es' : 'en';

    if (!email || typeof email !== 'string' || !validateEmail(email)) {
      return NextResponse.json(
        { message: 'Invalid email address.' },
        { status: 400 },
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 3. Obtener variables de entorno
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const teamsWebhookUrl = process.env.TEAMS_WEBHOOK_URL;
    const resendApiKey = process.env.RESEND_API_KEY;

    let isSaved = false;
    let isNewLead = false;

    // 4. Modo Supabase (Producción)
    if (supabaseUrl && supabaseServiceKey) {
      console.log(
        `[Beta API] Guardando lead (${normalizedEmail}) en Supabase...`,
      );
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      // Insertar lead en la tabla beta_leads
      const { error } = await supabase
        .from('beta_leads')
        .insert([{ email: normalizedEmail, lang: currentLang }]);

      if (error) {
        // El código 23505 indica clave duplicada en PostgreSQL
        if (error.code === '23505') {
          return NextResponse.json(
            { message: 'This email is already registered.' },
            { status: 409 },
          );
        }
        console.error('[Beta API] Error al insertar en Supabase:', error);
        return NextResponse.json(
          { message: 'Error saving email to database.' },
          { status: 500 },
        );
      }

      isSaved = true;
      isNewLead = true;
    } else {
      // 5. Modo Local Fallback (Desarrollo)
      console.warn(
        '[Beta API] Supabase URL o Service Role Key faltantes. Guardando localmente...',
      );
      const scratchDir = path.join(process.cwd(), 'scratch');
      const filePath = path.join(scratchDir, 'beta_subscribers.json');

      // Crear el directorio scratch si no existe
      try {
        await fs.mkdir(scratchDir, { recursive: true });
      } catch (err) {
        console.error(
          '[Beta API] No se pudo crear el directorio scratch:',
          err,
        );
      }

      let subscribers: Array<{
        email: string;
        lang: string;
        created_at: string;
      }> = [];

      try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        subscribers = JSON.parse(fileContent);
      } catch {
        // Si el archivo no existe o está corrupto, empezamos con array vacío
        subscribers = [];
      }

      // Validar duplicado
      const duplicateExists = subscribers.some(
        (sub) => sub.email === normalizedEmail,
      );
      if (duplicateExists) {
        return NextResponse.json(
          { message: 'This email is already registered.' },
          { status: 409 },
        );
      }

      // Guardar el registro
      subscribers.push({
        email: normalizedEmail,
        lang: currentLang,
        created_at: new Date().toISOString(),
      });

      await fs.writeFile(
        filePath,
        JSON.stringify(subscribers, null, 2),
        'utf-8',
      );
      console.log(`[Beta API] Guardado local exitoso en ${filePath}`);
      isSaved = true;
      isNewLead = true;
    }

    // 6. Notificaciones opcionales post-registro (Solo si se guardó con éxito)
    if (isSaved && isNewLead) {
      // A. Notificación a Microsoft Teams (Webhook)
      if (teamsWebhookUrl) {
        try {
          console.log(
            '[Beta API] Enviando notificación de Webhook a Microsoft Teams...',
          );
          const teamsPayload = {
            '@type': 'MessageCard',
            '@context': 'http://schema.org/extensions',
            themeColor: '3e5d6c', // Color Steel Blue de Fixed
            summary: 'Nuevo Lead en la Beta de Fixed',
            title: '🚀 Nuevo registro en la lista de espera de la Beta',
            sections: [
              {
                activityTitle: 'Detalles del Lead',
                activitySubtitle: `Plataforma: Landing Page`,
                facts: [
                  { name: 'Email', value: normalizedEmail },
                  {
                    name: 'Idioma',
                    value: currentLang === 'es' ? 'Español 🇪🇸' : 'Inglés 🇬🇧',
                  },
                  { name: 'Fecha', value: new Date().toLocaleString() },
                ],
                markdown: true,
              },
            ],
          };

          await fetch(teamsWebhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(teamsPayload),
          });
        } catch (webhookError) {
          console.error(
            '[Beta API] Error al enviar notificación a Teams:',
            webhookError,
          );
        }
      }

      // B. Envío de Email de Bienvenida con Resend
      if (resendApiKey) {
        try {
          console.log('[Beta API] Enviando email de bienvenida con Resend...');
          const emailSubject =
            currentLang === 'es'
              ? '¡Bienvenido a la Beta Privada de Fixed!'
              : 'Welcome to the Fixed Private Beta!';

          const emailHtml =
            currentLang === 'es'
              ? `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #111;">
                <h2 style="color: #3e5d6c;">¡Gracias por unirte a la lista de espera de Fixed!</h2>
                <p>Hemos recibido tu solicitud de acceso anticipado con el correo <strong>${normalizedEmail}</strong>.</p>
                <p>Nuestros modelos de inteligencia predictiva están procesando datos deportivos en tiempo real. Te avisaremos tan pronto como tengamos una vacante para ti en la beta privada.</p>
                <br />
                <hr style="border: 0; border-top: 1px border #eee;" />
                <p style="font-size: 12px; color: #777;">Fixed - Inteligencia predictiva para apuestas deportivas.</p>
              </div>
            `
              : `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #111;">
                <h2 style="color: #3e5d6c;">Thanks for joining the Fixed Waitlist!</h2>
                <p>We've received your request for early access using the email <strong>${normalizedEmail}</strong>.</p>
                <p>Our predictive intelligence models are processing sports data in real-time. We will notify you as soon as a slot opens up in our private beta.</p>
                <br />
                <hr style="border: 0; border-top: 1px border #eee;" />
                <p style="font-size: 12px; color: #777;">Fixed - Predictive intelligence for sports betting.</p>
              </div>
            `;

          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify({
              from: 'Fixed Beta <beta@fixed.com>', // Configura este remitente con tu dominio verificado en Resend
              to: [normalizedEmail],
              subject: emailSubject,
              html: emailHtml,
            }),
          });
        } catch (resendError) {
          console.error(
            '[Beta API] Error al enviar correo con Resend:',
            resendError,
          );
        }
      }
    }

    return NextResponse.json(
      { message: 'Successfully subscribed to the beta!' },
      { status: 200 },
    );
  } catch (error) {
    console.error('[Beta API] Error inesperado en el Route Handler:', error);
    return NextResponse.json(
      { message: 'An unexpected server error occurred.' },
      { status: 500 },
    );
  }
}
