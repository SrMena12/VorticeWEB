import type { APIRoute } from 'astro';
import { resolveRecipients, type Audience } from '../../../lib/audiences';

export const prerender = false;

// Cuenta cuántas personas recibirían un correo con esa selección (la sesión la comprueba el middleware).
export const GET: APIRoute = async ({ url }) => {
  const aud = url.searchParams.get('audiencia') as Audience;
  const ev = Number(url.searchParams.get('evento')) || null;
  if (!['inscritos', 'newsletter', 'asistentes'].includes(aud)) return new Response(JSON.stringify({ total: 0 }), { headers: { 'Content-Type': 'application/json' } });
  try {
    const list = await resolveRecipients(aud, ev);
    return new Response(JSON.stringify({ total: list.length }), { headers: { 'Content-Type': 'application/json' } });
  } catch {
    return new Response(JSON.stringify({ total: 0 }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
