import type { APIRoute } from 'astro';
import { sql, tooMany, clientIp } from '../../lib/db';
import { clean, isEmail, fmtDate, fmtTime } from '../../lib/util';
import { sendEmail, confirmationHtml, esc } from '../../lib/email';
import { SITE } from '../../data/site';

export const prerender = false;

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

export const POST: APIRoute = async ({ request }) => {
  let d: Record<string, any> = {};
  try {
    const ct = request.headers.get('content-type') || '';
    d = ct.includes('application/json') ? await request.json() : Object.fromEntries(await request.formData());
  } catch {
    return json({ ok: false, error: 'Petición no válida.' }, 400);
  }

  // Anti-bots: campo oculto que una persona nunca rellena.
  if (clean(d.website)) return json({ ok: true, message: 'Inscripción recibida.' });

  const eventId = Number(d.event_id);
  const name = clean(d.name, 120);
  const email = clean(d.email, 200).toLowerCase();
  const phone = clean(d.phone, 40);
  const notes = clean(d.notes, 500);
  const attendees = Math.min(10, Math.max(1, Math.floor(Number(d.attendees) || 1)));

  if (!Number.isInteger(eventId) || eventId < 1) return json({ ok: false, error: 'Evento no válido.' }, 400);
  if (name.length < 2) return json({ ok: false, error: 'Escribe tu nombre.' }, 400);
  if (!isEmail(email)) return json({ ok: false, error: 'El email no parece válido.' }, 400);
  if (phone.replace(/\D/g, '').length < 9) return json({ ok: false, error: 'Escribe un teléfono válido.' }, 400);
  if (!(d.privacy === true || d.privacy === 'on' || d.privacy === 'true')) {
    return json({ ok: false, error: 'Debes aceptar la política de privacidad.' }, 400);
  }

  if (await tooMany(`reg:${clientIp(request)}`, 8, 60)) {
    return json({ ok: false, error: 'Demasiados intentos. Inténtalo de nuevo en un rato.' }, 429);
  }

  try {
    // Todo en una transacción con bloqueo por evento: dos personas a la vez no pueden pasarse del aforo.
    const res = await sql.transaction([
      sql`SELECT pg_advisory_xact_lock(${eventId})`,
      sql`
        INSERT INTO registrations (event_id, name, email, phone, attendees, notes)
        SELECT e.id, ${name}, ${email}, ${phone}, ${attendees}, ${notes}
        FROM events e
        WHERE e.id = ${eventId}
          AND e.published AND e.registration_open
          AND COALESCE(e.ends_at, e.starts_at + interval '3 hours') > now()
          AND (e.capacity IS NULL
               OR e.capacity - COALESCE((SELECT SUM(attendees) FROM registrations r WHERE r.event_id = e.id), 0) >= ${attendees})
        ON CONFLICT (event_id, email) DO NOTHING
        RETURNING id`,
    ]);

    const inserted = res[1] as any[];
    if (!inserted.length) {
      const [ev] = await sql`
        SELECT e.title, e.published, e.registration_open, e.capacity,
               COALESCE(e.ends_at, e.starts_at + interval '3 hours') < now() AS past,
               COALESCE((SELECT SUM(attendees) FROM registrations r WHERE r.event_id = e.id), 0)::int AS taken,
               EXISTS (SELECT 1 FROM registrations r WHERE r.event_id = e.id AND r.email = ${email}) AS already
        FROM events e WHERE e.id = ${eventId}`;
      if (!ev || !ev.published) return json({ ok: false, error: 'Este evento ya no está disponible.' }, 404);
      if (ev.already) return json({ ok: false, error: 'Ya hay una inscripción con ese email en este evento.' }, 409);
      if (ev.past) return json({ ok: false, error: 'Este evento ya ha terminado.' }, 410);
      if (!ev.registration_open) return json({ ok: false, error: 'Las inscripciones de este evento están cerradas.' }, 409);
      const left = Math.max(0, ev.capacity - ev.taken);
      return json({ ok: false, error: left === 0 ? 'Lo sentimos, el evento está completo.' : `Solo quedan ${left} plazas.` }, 409);
    }

    // Correos (opcionales): confirmación a la persona y aviso al equipo.
    const [ev] = await sql`SELECT title, slug, starts_at, location FROM events WHERE id = ${eventId}`;
    if (ev) {
      const url = `${SITE.url}/eventos/${ev.slug}`;
      const when = `${fmtDate(ev.starts_at)}, ${fmtTime(ev.starts_at)}`;
      await Promise.all([
        sendEmail({
          to: email, subject: `Inscripción confirmada: ${ev.title}`, replyTo: SITE.email,
          html: confirmationHtml({ name, event: ev.title, when, where: ev.location || 'Por confirmar', attendees, url }),
        }),
        sendEmail({
          to: SITE.email, subject: `Nueva inscripción: ${ev.title}`, replyTo: email,
          html: `<p><strong>${esc(name)}</strong> (${esc(email)}, ${esc(phone)}) se ha inscrito a <strong>${esc(ev.title)}</strong> con ${attendees} plaza(s).</p>${notes ? `<p>Notas: ${esc(notes)}</p>` : ''}`,
        }),
      ]);
    }

    return json({ ok: true, message: '¡Listo! Tu inscripción está confirmada.' });
  } catch (e) {
    console.error('inscripcion', e);
    return json({ ok: false, error: 'No hemos podido guardar tu inscripción. Inténtalo de nuevo o llámanos.' }, 500);
  }
};
