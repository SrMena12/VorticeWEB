import type { APIRoute } from 'astro';
import { createHash } from 'node:crypto';
import { sql, clientIp } from '../../lib/db';
import { COOKIE, readSession } from '../../lib/auth';

export const prerender = false;

const BOT = /bot|crawl|spider|slurp|facebookexternalhit|preview|headless|lighthouse|pingdom|uptime|monitor|curl|wget|python|node-fetch|axios|go-http|java\/|vercel|pagespeed/i;
const ok = () => new Response(null, { status: 204 });

// Registro de visitas SIN cookies y sin guardar datos personales:
// la "visita" se identifica con un código que mezcla IP + navegador + la fecha de hoy, y no se puede deshacer.
// Cada día el código cambia, así que no se puede seguir a una persona de un día a otro.
export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const ua = request.headers.get('user-agent') || '';
    if (!ua || BOT.test(ua)) return ok();
    if (request.headers.get('dnt') === '1' || request.headers.get('sec-gpc') === '1') return ok();
    if (readSession(cookies.get(COOKIE)?.value)) return ok(); // no contamos al administrador

    const data = JSON.parse((await request.text()).slice(0, 2000));
    let path = String(data.p || '/').split('?')[0].split('#')[0].slice(0, 200);
    if (!path.startsWith('/') || path.startsWith('/admin') || path.startsWith('/api')) return ok();
    path = path.length > 1 ? path.replace(/\/$/, '') : path;

    // Origen: utm_source si existe; si no, el dominio desde el que llegan (sin contar nuestra propia web)
    let ref = '';
    const utm = /[?&]utm_source=([^&]+)/.exec(String(data.u || ''));
    if (utm) ref = decodeURIComponent(utm[1]).toLowerCase().slice(0, 60);
    else if (data.r) {
      try { const h = new URL(String(data.r)).hostname.replace(/^www\./, '').toLowerCase(); if (h !== new URL(request.url).hostname.replace(/^www\./, '')) ref = h.slice(0, 80); } catch { /* sin origen */ }
    }

    const device = /ipad|tablet/i.test(ua) ? 'tablet' : /mobi|android|iphone/i.test(ua) ? 'mobile' : 'desktop';
    const day = new Date().toISOString().slice(0, 10);
    const visitor = createHash('sha256').update(`${day}|${clientIp(request)}|${ua}|${process.env.SESSION_SECRET || ''}`).digest('hex').slice(0, 16);
    const country = (request.headers.get('x-vercel-ip-country') || '').slice(0, 2).toUpperCase();

    await sql`INSERT INTO pageviews (path, ref, device, country, visitor) VALUES (${path}, ${ref}, ${device}, ${country}, ${visitor})`;
  } catch { /* nunca molestamos al visitante */ }
  return ok();
};
