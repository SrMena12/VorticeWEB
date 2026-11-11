import { createHmac, timingSafeEqual } from 'node:crypto';
import { SITE } from '../data/site';
import { esc } from './email';

/** URL pública de la web: el dominio de producción de Vercel (cuando se mueva eventosvortice.com, se actualiza solo). */
export function siteBase(): string {
  const v = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return v ? `https://${v}` : SITE.url;
}

/* ---------- Enlaces firmados (confirmar suscripción / darse de baja) ---------- */

export function emailToken(email: string, purpose: 'baja' | 'confirmar'): string {
  return createHmac('sha256', process.env.SESSION_SECRET || 'sin-secreto').update(`${purpose}:${email.toLowerCase()}`).digest('hex').slice(0, 32);
}
export function checkToken(email: string, purpose: 'baja' | 'confirmar', token: string): boolean {
  const a = Buffer.from(emailToken(email, purpose)), b = Buffer.from(token || '');
  return a.length === b.length && timingSafeEqual(a, b);
}
export const unsubUrl = (email: string) => `${siteBase()}/baja?e=${encodeURIComponent(email)}&t=${emailToken(email, 'baja')}`;
export const confirmUrl = (email: string) => `${siteBase()}/confirmar?e=${encodeURIComponent(email)}&t=${emailToken(email, 'confirmar')}`;

/* ---------- Texto → HTML del correo ---------- */

export function fill(text: string, vars: Record<string, string>): string {
  return text.replace(/\{\{\s*([a-z_]+)\s*\}\}/gi, (_, k) => vars[k.toLowerCase()] ?? '');
}

function inline(s: string): string {
  return esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(https?:\/\/[^\s<]+[^\s<.,;:!?)])/g, '<a href="$1" style="color:#0b7fb5">$1</a>');
}

export function textToHtml(body: string): string {
  return body.replace(/\r\n/g, '\n').split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)
    .map((p) => `<p style="margin:0 0 16px;line-height:1.6">${inline(p).replace(/\n/g, '<br>')}</p>`).join('');
}

export function renderEmail(o: { body: string; ctaLabel?: string; ctaUrl?: string; footer: string }): string {
  const base = siteBase();
  const cta = o.ctaLabel && o.ctaUrl
    ? `<p style="margin:24px 0"><a href="${esc(o.ctaUrl)}" style="background:#0a9ddb;color:#fff;text-decoration:none;font-weight:700;padding:14px 26px;border-radius:999px;display:inline-block">${esc(o.ctaLabel)}</a></p>` : '';
  return `<!doctype html><html lang="es"><body style="margin:0;background:#f1f8fd;font-family:Arial,Helvetica,sans-serif;color:#0d2f4a">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px">
 <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:24px;overflow:hidden">
  <tr><td style="background:#0d2f4a;padding:22px 28px"><img src="${base}/img/logo-vortice-blanco.png" alt="Vórtice Eventos" height="44" style="display:block;height:44px;width:auto"></td></tr>
  <tr><td style="padding:30px 28px 8px;font-size:16px">${textToHtml(o.body)}${cta}</td></tr>
  <tr><td style="padding:18px 28px 28px;font-size:12px;color:#4a6678;border-top:1px solid #e1eef7">
    Vórtice Eventos · ${esc(SITE.street)}, ${esc(SITE.postal)} ${esc(SITE.city)} · ${esc(SITE.phone)}<br>${o.footer}
  </td></tr>
 </table></td></tr></table></body></html>`;
}

/* ---------- Envío (Resend, en lotes de 100) ---------- */

export type Recipient = { email: string; name: string; vars?: Record<string, string> };
export type SendResult = { sent: number; failed: number; error?: string };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function sendMany(
  recipients: Recipient[],
  o: { subject: string; body: string; ctaLabel?: string; ctaUrl?: string; marketing: boolean; reason: string },
): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { sent: 0, failed: recipients.length, error: 'Falta configurar el servicio de correo (RESEND_API_KEY).' };
  const from = process.env.EMAIL_FROM || 'Vórtice Eventos <onboarding@resend.dev>';

  const messages = recipients.map((r) => {
    const vars = { nombre: r.name.split(' ')[0] || 'hola', ...(r.vars ?? {}) };
    const subject = fill(o.subject, vars);
    const body = fill(o.body, vars);
    const baja = unsubUrl(r.email);
    const footer = o.marketing
      ? `${esc(o.reason)} <a href="${baja}" style="color:#4a6678">Darme de baja</a>`
      : esc(o.reason);
    const msg: Record<string, unknown> = {
      from, to: [r.email], subject, reply_to: SITE.email,
      html: renderEmail({ body, ctaLabel: o.ctaLabel, ctaUrl: o.ctaUrl, footer }),
      text: `${body}${o.ctaUrl ? `\n\n${o.ctaLabel ?? 'Más información'}: ${o.ctaUrl}` : ''}\n\n--\n${SITE.name}${o.marketing ? `\nDarme de baja: ${baja}` : ''}`,
    };
    if (o.marketing) msg.headers = { 'List-Unsubscribe': `<${baja}>`, 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' };
    return msg;
  });

  let sent = 0, failed = 0, error: string | undefined;
  for (let i = 0; i < messages.length; i += 100) {
    const chunk = messages.slice(i, i + 100);
    try {
      const r = await fetch('https://api.resend.com/emails/batch', {
        method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, body: JSON.stringify(chunk),
      });
      const j: any = await r.json().catch(() => ({}));
      if (r.ok) sent += chunk.length;
      else { failed += chunk.length; error = j?.message || `Error ${r.status} del servicio de correo`; }
    } catch (e: any) {
      failed += chunk.length; error = e?.message || 'No se pudo contactar con el servicio de correo';
    }
    if (i + 100 < messages.length) await sleep(700);
  }
  return { sent, failed, error };
}
