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

const DISPOSABLE_DOMAINS = [
  'mailinator.com',
  'yopmail.com',
  'tempmail.com',
  'dispostable.com',
  'guerrillamail.com',
  '10minutemail.com',
  'trashmail.com',
  'maildrop.cc',
  'temp-mail.org',
];

const COMMON_TYPOS: Record<string, string> = {
  'gamil.com': 'gmail.com',
  'gmial.com': 'gmail.com',
  'gmaill.com': 'gmail.com',
  'gmal.com': 'gmail.com',
  'hotmial.com': 'hotmail.com',
  'hotmaill.com': 'hotmail.com',
  'outlok.com': 'outlook.com',
  'yaho.com': 'yahoo.com',
  'yahooo.com': 'yahoo.com',
};

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
    const { email, lang, utm_source, utm_medium, utm_campaign } = body;
    const currentLang = lang === 'es' ? 'es' : 'en';

    if (!email || typeof email !== 'string' || !validateEmail(email)) {
      return NextResponse.json(
        { message: 'Invalid email address.' },
        { status: 400 },
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const domain = normalizedEmail.split('@')[1];

    if (COMMON_TYPOS[domain]) {
      const suggestion = COMMON_TYPOS[domain];
      const errMsg =
        currentLang === 'es'
          ? `¿Quisiste decir @${suggestion}?`
          : `Did you mean @${suggestion}?`;
      return NextResponse.json({ message: errMsg }, { status: 400 });
    }

    if (DISPOSABLE_DOMAINS.includes(domain)) {
      const errMsg =
        currentLang === 'es'
          ? 'No se permiten correos electrónicos temporales o desechables.'
          : 'Disposable email addresses are not allowed.';
      return NextResponse.json({ message: errMsg }, { status: 400 });
    }

    // 3. Obtener variables de entorno
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseServiceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
    const teamsWebhookUrl = process.env.TEAMS_WEBHOOK_URL;
    const resendApiKey = process.env.RESEND_API_KEY;

    let isSaved = false;
    let isNewLead = false;
    let isLocalFallback = false;
    let userNumber = 100;

    // 4. Modo Supabase (Producción)
    if (supabaseUrl && supabaseServiceKey) {
      console.log(
        `[Beta API] Guardando lead (${normalizedEmail}) en Supabase...`,
      );
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      // Insertar lead en la tabla leads
      const { error } = await supabase.from('leads').insert([
        {
          email: normalizedEmail,
          lang: currentLang,
          status: 'pending',
          utm_source: utm_source || null,
          utm_medium: utm_medium || null,
          utm_campaign: utm_campaign || null,
        },
      ]);

      if (error) {
        // El código 23505 indica clave duplicada en PostgreSQL
        if (error.code === '23505') {
          let dupUserNumber = 100;
          try {
            const { data: existingLead, error: findError } = await supabase
              .from('leads')
              .select('created_at')
              .eq('email', normalizedEmail)
              .single();

            if (!findError && existingLead) {
              const { count, error: countError } = await supabase
                .from('leads')
                .select('*', { count: 'exact', head: true })
                .lte('created_at', existingLead.created_at);

              if (!countError && count !== null) {
                dupUserNumber = count;
              }
            }
          } catch (err) {
            console.error(
              '[Beta API] Error al obtener posición de duplicado:',
              err,
            );
          }

          return NextResponse.json(
            {
              message: 'This email is already registered.',
              userNumber: dupUserNumber,
              isDuplicate: true,
            },
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

      // Obtener el número total de leads (posición en la lista de espera)
      try {
        const { count, error: countError } = await supabase
          .from('leads')
          .select('*', { count: 'exact', head: true });

        if (!countError && count !== null) {
          userNumber = count;
        } else {
          console.error(
            '[Beta API] Error al contar registros en Supabase:',
            countError,
          );
        }
      } catch (err) {
        console.error(
          '[Beta API] Error inesperado al contar en Supabase:',
          err,
        );
      }
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
        status: string;
        utm_source: string | null;
        utm_medium: string | null;
        utm_campaign: string | null;
        created_at: string;
        updated_at: string;
      }> = [];

      try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        subscribers = JSON.parse(fileContent);
      } catch {
        // Si el archivo no existe o está corrupto, empezamos con array vacío
        subscribers = [];
      }

      // Validar duplicado
      const duplicateIndex = subscribers.findIndex(
        (sub) => sub.email === normalizedEmail,
      );
      if (duplicateIndex !== -1) {
        return NextResponse.json(
          {
            message: 'This email is already registered.',
            userNumber: duplicateIndex + 1,
            isDuplicate: true,
          },
          { status: 409 },
        );
      }

      // Guardar el registro
      const nowStr = new Date().toISOString();
      subscribers.push({
        email: normalizedEmail,
        lang: currentLang,
        status: 'pending',
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
        utm_campaign: utm_campaign || null,
        created_at: nowStr,
        updated_at: nowStr,
      });

      await fs.writeFile(
        filePath,
        JSON.stringify(subscribers, null, 2),
        'utf-8',
      );
      console.log(`[Beta API] Guardado local exitoso en ${filePath}`);
      isSaved = true;
      isNewLead = true;
      isLocalFallback = true;
      userNumber = subscribers.length;
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
                  { name: 'UTM Source', value: utm_source || 'N/A' },
                  { name: 'UTM Medium', value: utm_medium || 'N/A' },
                  { name: 'UTM Campaign', value: utm_campaign || 'N/A' },
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
      {
        message: 'Successfully subscribed to the beta!',
        isLocalFallback,
        userNumber,
      },
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
