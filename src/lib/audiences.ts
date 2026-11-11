import { sql } from './db';
import { fmtDate, fmtTime, seatsLeft, type EventRow } from './util';
import { siteBase, type Recipient } from './mail';

export type Audience = 'inscritos' | 'newsletter' | 'asistentes';

export const AUDIENCE_LABEL: Record<Audience, string> = {
  inscritos: 'Inscritos a un evento',
  newsletter: 'Todos los suscriptores',
  asistentes: 'Suscriptores que ya han participado en algún evento',
};

/** Variables que se pueden usar en el asunto y el texto ({{evento}}, {{fecha}}…). */
export function eventVars(e: (EventRow & { taken?: number }) | null): Record<string, string> {
  if (!e) return {};
  const left = seatsLeft(e as EventRow);
  return {
    evento: e.title, fecha: fmtDate(e.starts_at), hora: `${fmtTime(e.starts_at)} h`, lugar: e.location || 'por confirmar',
    plazas_libres: left == null ? 'varias' : String(left), enlace: `${siteBase()}/eventos/${e.slug}`,
  };
}

/** Destinatarios de una audiencia. Si hay evento y la audiencia es de marketing, se excluye a quien ya está inscrito. */
export async function resolveRecipients(aud: Audience, eventId: number | null): Promise<Recipient[]> {
  let rows: any[] = [];
  if (aud === 'inscritos') {
    if (!eventId) return [];
    rows = await sql`SELECT DISTINCT ON (lower(email)) lower(email) AS email, name FROM registrations WHERE event_id = ${eventId} ORDER BY lower(email), created_at`;
  } else if (aud === 'newsletter') {
    rows = await sql`SELECT lower(email) AS email, name FROM subscribers WHERE status = 'active' ORDER BY email`;
  } else {
    rows = await sql`
      SELECT lower(s.email) AS email, s.name FROM subscribers s
       WHERE s.status = 'active' AND EXISTS (
         SELECT 1 FROM registrations r JOIN events e ON e.id = r.event_id
          WHERE lower(r.email) = lower(s.email) AND COALESCE(e.ends_at, e.starts_at + interval '3 hours') < now())
       ORDER BY email`;
  }
  if (aud !== 'inscritos' && eventId) {
    const already = new Set((await sql`SELECT lower(email) AS email FROM registrations WHERE event_id = ${eventId}`).map((r: any) => r.email));
    rows = rows.filter((r) => !already.has(r.email));
  }
  return rows.map((r) => ({ email: r.email, name: r.name || '' }));
}

export async function subscriberStats() {
  const [r] = await sql`
    SELECT count(*) FILTER (WHERE status = 'active')::int AS active,
           count(*) FILTER (WHERE status = 'pending')::int AS pending,
           count(*) FILTER (WHERE status = 'unsubscribed')::int AS unsubscribed
      FROM subscribers`;
  return r as { active: number; pending: number; unsubscribed: number };
}
