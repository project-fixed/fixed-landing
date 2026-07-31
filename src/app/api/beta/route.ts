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
    let userNumber = 600;

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
          let dupUserNumber = 600;
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
                dupUserNumber = count + 600;
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
          userNumber = count + 600;
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
            userNumber: duplicateIndex + 1 + 600,
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
      userNumber = subscribers.length + 600;
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
          const siteUrl =
            process.env.NEXT_PUBLIC_SITE_URL ||
            'https://fixed-landing.vercel.app';
          const logoUrl = `${siteUrl}/images/fixed_isotype_dark_mode.jpeg`;

          const emailSubject =
            currentLang === 'es'
              ? '¡Bienvenido a la Beta Privada de Fixed!'
              : 'Welcome to the Fixed Private Beta!';

          const emailHtml =
            currentLang === 'es'
              ? `
              <div style="background-color: #000000; margin: 0; padding: 40px 20px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; min-height: 100%;">
                <div style="max-width: 560px; margin: 0 auto;">
                  <div style="text-align: center; margin-bottom: 32px;">
                    <img src="${logoUrl}" style="height: 66px; width: auto; vertical-align: middle;" alt="Fixed Logo" />
                  </div>
                  
                  <div style="background-color: #ffffff; border-radius: 12px; padding: 40px 32px; border: 1px solid #e4e4e7;">
                    <h2 style="font-family: 'Space Grotesk', -apple-system, sans-serif; font-size: 22px; font-weight: 700; line-height: 1.3; color: #09090b; margin-top: 0; margin-bottom: 24px; text-align: center;">¡Gracias por unirte a la lista de espera!</h2>
                    
                    <p style="font-size: 15px; line-height: 1.6; color: #3f3f46; margin-bottom: 24px; font-family: 'Inter', sans-serif;">Hemos recibido tu solicitud de acceso anticipado. Tu registro en nuestra base de datos de la beta privada se ha completado correctamente:</p>
                    
                    <div style="background-color: #f4f4f5; border: 1px solid #e4e4e7; border-radius: 8px; padding: 20px 16px; text-align: center; margin: 24px 0;">
                      <div style="font-family: 'Space Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #71717a; margin-bottom: 4px;">Nro. de Registro</div>
                      <div style="font-family: 'Space Mono', monospace; font-size: 28px; font-weight: 700; color: #3e5d6c; margin-bottom: 16px;">#${userNumber}</div>
                      
                      <div style="border-top: 1px solid #e4e4e7; margin: 12px 0;"></div>
                      
                      <div style="font-family: 'Space Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #71717a; margin-bottom: 4px;">Correo registrado</div>
                      <div style="font-family: 'Space Mono', monospace; font-size: 14px; font-weight: 700; color: #18181b; word-break: break-all;">${normalizedEmail}</div>
                    </div>
                    
                    <p style="font-size: 15px; line-height: 1.6; color: #3f3f46; margin-bottom: 24px; font-family: 'Inter', sans-serif;">Nuestros modelos de inteligencia predictiva están procesando datos deportivos en tiempo real. Te avisaremos por este medio tan pronto como tengamos una vacante para ti en la beta privada.</p>
                    
                    <div style="text-align: center; margin-top: 32px; margin-bottom: 16px;">
                      <a href="${siteUrl}" style="display: inline-block; background-color: #3e5d6c; color: #ffffff !important; text-decoration: none; font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; padding: 14px 28px; border-radius: 6px;" target="_blank">Ir a la Web</a>
                    </div>
                  </div>
                  
                  <div style="text-align: center; margin-top: 32px; padding: 0 20px;">
                    <p style="font-family: 'Inter', sans-serif; font-size: 12px; line-height: 1.5; color: #71717a; margin: 0;">Fixed — Inteligencia predictiva para apuestas deportivas.</p>
                    <p style="font-family: 'Inter', sans-serif; font-size: 11px; line-height: 1.5; color: #71717a; margin: 6px 0 0 0; opacity: 0.7;">Si no solicitaste este registro, puedes ignorar este correo.</p>
                  </div>
                </div>
              </div>
            `
              : `
              <div style="background-color: #000000; margin: 0; padding: 40px 20px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; min-height: 100%;">
                <div style="max-width: 560px; margin: 0 auto;">
                  <div style="text-align: center; margin-bottom: 32px;">
                    <img src="${logoUrl}" style="height: 66px; width: auto; vertical-align: middle;" alt="Fixed Logo" />
                  </div>
                  
                  <div style="background-color: #ffffff; border-radius: 12px; padding: 40px 32px; border: 1px solid #e4e4e7;">
                    <h2 style="font-family: 'Space Grotesk', -apple-system, sans-serif; font-size: 22px; font-weight: 700; line-height: 1.3; color: #09090b; margin-top: 0; margin-bottom: 24px; text-align: center;">Thanks for joining the waitlist!</h2>
                    
                    <p style="font-size: 15px; line-height: 1.6; color: #3f3f46; margin-bottom: 24px; font-family: 'Inter', sans-serif;">We've received your request for early access. Your registration in our private beta database has been successfully completed:</p>
                    
                    <div style="background-color: #f4f4f5; border: 1px solid #e4e4e7; border-radius: 8px; padding: 20px 16px; text-align: center; margin: 24px 0;">
                      <div style="font-family: 'Space Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #71717a; margin-bottom: 4px;">Registration No.</div>
                      <div style="font-family: 'Space Mono', monospace; font-size: 28px; font-weight: 700; color: #3e5d6c; margin-bottom: 16px;">#${userNumber}</div>
                      
                      <div style="border-top: 1px solid #e4e4e7; margin: 12px 0;"></div>
                      
                      <div style="font-family: 'Space Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #71717a; margin-bottom: 4px;">Registered Email</div>
                      <div style="font-family: 'Space Mono', monospace; font-size: 14px; font-weight: 700; color: #18181b; word-break: break-all;">${normalizedEmail}</div>
                    </div>
                    
                    <p style="font-size: 15px; line-height: 1.6; color: #3f3f46; margin-bottom: 24px; font-family: 'Inter', sans-serif;">Our predictive intelligence models are processing sports data in real-time. We will notify you as soon as a slot opens up in our private beta.</p>
                    
                    <div style="text-align: center; margin-top: 32px; margin-bottom: 16px;">
                      <a href="${siteUrl}" style="display: inline-block; background-color: #3e5d6c; color: #ffffff !important; text-decoration: none; font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; padding: 14px 28px; border-radius: 6px;" target="_blank">Go to Website</a>
                    </div>
                  </div>
                  
                  <div style="text-align: center; margin-top: 32px; padding: 0 20px;">
                    <p style="font-family: 'Inter', sans-serif; font-size: 12px; line-height: 1.5; color: #71717a; margin: 0;">Fixed — Predictive intelligence for sports betting.</p>
                    <p style="font-family: 'Inter', sans-serif; font-size: 11px; line-height: 1.5; color: #71717a; margin: 6px 0 0 0; opacity: 0.7;">If you did not request this registration, you can safely ignore this email.</p>
                  </div>
                </div>
              </div>
            `;

          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify({
              from: 'Fixed Beta <beta@fixed.software>', // Configura este remitente con tu dominio verificado en Resend
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
