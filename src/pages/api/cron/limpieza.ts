import type { APIRoute } from 'astro';
import { sql } from '../../../lib/db';

export const prerender = false;

// Días que se conserva un evento después de terminar antes de borrarse solo
// (con sus inscripciones, para no guardar datos personales más tiempo del necesario).
const DIAS_DE_GRACIA = 30;

// Vercel Cron llama a esta ruta cada día (vercel.json) con "Authorization: Bearer $CRON_SECRET".
export const GET: APIRoute = async ({ request }) => {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return new Response('No autorizado', { status: 401 });
  }
  const gone = await sql`
    DELETE FROM events
    WHERE COALESCE(ends_at, starts_at + interval '3 hours') < now() - make_interval(days => ${DIAS_DE_GRACIA})
    RETURNING id`;
  await sql`DELETE FROM rate_limits WHERE at < now() - interval '1 day'`;
  return new Response(JSON.stringify({ borrados: gone.length }), { headers: { 'Content-Type': 'application/json' } });
};
