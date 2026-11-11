import { SITE } from '../data/site';

// Envío con Resend (https://resend.com). Si no hay RESEND_API_KEY, no se envía nada
// y la inscripción funciona igual: el correo es un extra, nunca bloquea.
export async function sendEmail(opts: { to: string | string[]; subject: string; html: string; replyTo?: string }): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const from = process.env.EMAIL_FROM || `Vórtice Eventos <onboarding@resend.dev>`;
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: opts.to, subject: opts.subject, html: opts.html, reply_to: opts.replyTo }),
    });
    return r.ok;
  } catch {
    return false;
  }
}

export const esc = (s: string) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export function confirmationHtml(p: { name: string; event: string; when: string; where: string; attendees: number; url: string }) {
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:auto;color:#0d2f4a">
  <h2 style="margin:0 0 12px">¡Inscripción confirmada!</h2>
  <p>Hola ${esc(p.name)}, ya estás apuntado/a a <strong>${esc(p.event)}</strong>.</p>
  <table style="margin:16px 0;border-collapse:collapse">
    <tr><td style="padding:4px 12px 4px 0;color:#4a6678">Cuándo</td><td><strong>${esc(p.when)}</strong></td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#4a6678">Dónde</td><td><strong>${esc(p.where)}</strong></td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#4a6678">Plazas</td><td><strong>${p.attendees}</strong></td></tr>
  </table>
  <p><a href="${esc(p.url)}" style="color:#0b7fb5">Ver el evento</a></p>
  <p style="color:#4a6678;font-size:14px">Si no puedes asistir, avísanos en ${esc(SITE.email)} o al ${esc(SITE.phone)} para liberar tu plaza.</p>
  <p style="color:#4a6678;font-size:14px">Vórtice Eventos · ${esc(SITE.street)}, ${esc(SITE.postal)} ${esc(SITE.city)}</p></div>`;
}
