import type { APIRoute } from 'astro';
import { sql } from '../../../lib/db';
import { resolveRecipients, eventVars, AUDIENCE_LABEL } from '../../../lib/audiences';
import { sendMany } from '../../../lib/mail';
import { templateById } from '../../../lib/templates';

export const prerender = false;

// Días que se conserva un evento después de terminar antes de borrarse solo
// (con sus inscripciones, para no guardar datos personales más tiempo del necesario).
const DIAS_DE_GRACIA = 30;
// Las estadísticas de visitas se guardan solo este tiempo.
const DIAS_ESTADISTICAS = 400;

// Vercel Cron llama a esta ruta cada día (vercel.json) con "Authorization: Bearer $CRON_SECRET".
export const GET: APIRoute = async ({ request }) => {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return new Response('No autorizado', { status: 401 });
  }
  const out: Record<string, unknown> = {};

  // 1) Borrar eventos pasados hace más de 30 días
  const gone = await sql`
    DELETE FROM events
    WHERE COALESCE(ends_at, starts_at + interval '3 hours') < now() - make_interval(days => ${DIAS_DE_GRACIA})
    RETURNING id`;
  out.eventosBorrados = gone.length;

  // 2) Recordatorio "mañana es el evento" a los inscritos (una sola vez por evento)
  const tpl = templateById('recordatorio')!;
  const tomorrow = await sql`
    SELECT e.*, COALESCE(SUM(r.attendees), 0)::int AS taken
      FROM events e LEFT JOIN registrations r ON r.event_id = e.id
     WHERE e.published AND e.reminder_sent_at IS NULL
       AND (e.starts_at AT TIME ZONE 'Europe/Madrid')::date = ((now() AT TIME ZONE 'Europe/Madrid')::date + 1)
     GROUP BY e.id HAVING count(r.id) > 0`;
  const reminders: Array<Record<string, unknown>> = [];
  for (const ev of tomorrow as any[]) {
    const vars = eventVars(ev);
    const recipients = (await resolveRecipients('inscritos', ev.id)).map((r) => ({ ...r, vars }));
    const r = await sendMany(recipients, {
      subject: tpl.subject, body: tpl.body, ctaLabel: tpl.ctaLabel, ctaUrl: vars.enlace, marketing: false,
      reason: `Recibes este correo porque te inscribiste en ${ev.title}.`,
    });
    if (r.sent > 0) {
      await sql`UPDATE events SET reminder_sent_at = now() WHERE id = ${ev.id}`;
      await sql`
        INSERT INTO campaigns (subject, body, audience, audience_label, kind, recipients, failed, error)
        VALUES (${tpl.subject.replace('{{evento}}', ev.title)}, ${tpl.body}, 'inscritos', ${AUDIENCE_LABEL.inscritos + ' · ' + ev.title}, 'automatico', ${recipients.length}, ${r.failed}, ${r.error ?? null})`;
    }
    reminders.push({ evento: ev.id, enviados: r.sent, fallidos: r.failed });
  }
  out.recordatorios = reminders;

  // 3) Limpieza de estadísticas antiguas y de la tabla del limitador
  await sql`DELETE FROM pageviews WHERE at < now() - make_interval(days => ${DIAS_ESTADISTICAS})`;
  await sql`DELETE FROM rate_limits WHERE at < now() - interval '1 day'`;

  return new Response(JSON.stringify(out), { headers: { 'Content-Type': 'application/json' } });
};
