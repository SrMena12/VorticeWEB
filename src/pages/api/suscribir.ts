import type { APIRoute } from 'astro';
import { sql, tooMany, clientIp } from '../../lib/db';
import { clean, isEmail } from '../../lib/util';
import { sendMany, confirmUrl } from '../../lib/mail';

export const prerender = false;

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

// Suscripción con doble confirmación: se guarda como "pendiente" y solo pasa a "activo" al pulsar el enlace del correo.
export const POST: APIRoute = async ({ request }) => {
  let d: Record<string, any> = {};
  try { d = await request.json(); } catch { return json({ ok: false, error: 'Petición no válida.' }, 400); }
  if (clean(d.website)) return json({ ok: true, message: 'Revisa tu correo para confirmar.' });

  const email = clean(d.email, 200).toLowerCase();
  const name = clean(d.name, 120);
  if (!isEmail(email)) return json({ ok: false, error: 'El email no parece válido.' }, 400);
  if (d.consent !== true) return json({ ok: false, error: 'Marca la casilla para poder suscribirte.' }, 400);
  if (!process.env.RESEND_API_KEY) return json({ ok: false, error: 'Estamos terminando de configurar los avisos. Inténtalo más adelante.' }, 503);
  if (await tooMany(`sub:${clientIp(request)}`, 6, 60)) return json({ ok: false, error: 'Demasiados intentos. Inténtalo de nuevo en un rato.' }, 429);

  try {
    const [row] = await sql`
      INSERT INTO subscribers (email, name, status, source, consent_at)
      VALUES (${email}, ${name}, 'pending', 'web', now())
      ON CONFLICT (email) DO UPDATE SET
        status = CASE WHEN subscribers.status = 'active' THEN 'active' ELSE 'pending' END,
        name = CASE WHEN subscribers.name = '' THEN EXCLUDED.name ELSE subscribers.name END
      RETURNING status`;
    if (row.status === 'active') return json({ ok: true, message: 'Ya estabas suscrito. ¡Gracias!' });

    const r = await sendMany([{ email, name }], {
      subject: 'Confirma tu suscripción a Vórtice Eventos',
      body: 'Hola {{nombre}},\n\nPara empezar a recibir avisos de nuestros próximos eventos en Toledo, confirma tu suscripción con el botón de abajo.\n\nSi no has sido tú, ignora este correo y no pasará nada.',
      ctaLabel: 'Confirmar suscripción', ctaUrl: confirmUrl(email), marketing: false,
      reason: 'Has recibido este correo porque se pidió suscribir esta dirección a los avisos de Vórtice Eventos.',
    });
    if (r.sent === 0) {
      console.error('suscribir: no se pudo enviar', r.error);
      return json({ ok: false, error: 'No hemos podido enviar el correo de confirmación. Inténtalo más tarde.' }, 502);
    }
    return json({ ok: true, message: 'Casi listo: te hemos enviado un correo para confirmar la suscripción.' });
  } catch (e) {
    console.error('suscribir', e);
    return json({ ok: false, error: 'No se pudo completar la suscripción.' }, 500);
  }
};
