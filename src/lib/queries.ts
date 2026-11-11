import { sql } from './db';
import type { EventRow } from './util';

const END = `COALESCE(e.ends_at, e.starts_at + interval '3 hours')`;

/* ---------- Eventos ---------- */

// Próximos eventos publicados (los terminados no se muestran).
export async function listUpcomingEvents(limit = 50): Promise<EventRow[]> {
  const rows = await sql.query(
    `SELECT e.*, COALESCE(SUM(r.attendees), 0)::int AS taken
       FROM events e LEFT JOIN registrations r ON r.event_id = e.id
      WHERE e.published AND ${END} > now()
      GROUP BY e.id ORDER BY e.starts_at ASC LIMIT $1`, [limit]);
  return rows as EventRow[];
}

export async function getEventBySlug(slug: string): Promise<EventRow | null> {
  const rows = await sql.query(
    `SELECT e.*, COALESCE(SUM(r.attendees), 0)::int AS taken
       FROM events e LEFT JOIN registrations r ON r.event_id = e.id
      WHERE e.slug = $1 AND e.published GROUP BY e.id`, [slug]);
  return (rows[0] as EventRow) ?? null;
}

export async function listEventsAdmin(): Promise<(EventRow & { regs: number })[]> {
  const rows = await sql.query(
    `SELECT e.*, COALESCE(SUM(r.attendees), 0)::int AS taken, COUNT(r.id)::int AS regs
       FROM events e LEFT JOIN registrations r ON r.event_id = e.id
      GROUP BY e.id ORDER BY e.starts_at ASC`);
  return rows as any;
}

export async function getEventAdmin(id: number): Promise<(EventRow & { regs: number }) | null> {
  const rows = await sql.query(
    `SELECT e.*, COALESCE(SUM(r.attendees), 0)::int AS taken, COUNT(r.id)::int AS regs
       FROM events e LEFT JOIN registrations r ON r.event_id = e.id
      WHERE e.id = $1 GROUP BY e.id`, [id]);
  return (rows[0] as any) ?? null;
}

export async function listRegistrations(eventId: number) {
  return (await sql`SELECT id, name, email, phone, attendees, notes, created_at
                      FROM registrations WHERE event_id = ${eventId} ORDER BY created_at ASC`) as any[];
}

/* ---------- Blog ---------- */

export type PostRow = {
  id: number; slug: string; title: string; meta_title: string; description: string; content: string;
  cover_url: string | null; service: string | null; published: boolean; published_at: string | Date | null;
};

export async function listPostsPublic(): Promise<PostRow[]> {
  return (await sql`SELECT * FROM posts WHERE published ORDER BY published_at DESC NULLS LAST, id DESC`) as any;
}

export async function getPostBySlug(slug: string): Promise<PostRow | null> {
  const rows = await sql`SELECT * FROM posts WHERE slug = ${slug} AND published`;
  return (rows[0] as any) ?? null;
}

export async function listPostsAdmin(): Promise<PostRow[]> {
  return (await sql`SELECT * FROM posts ORDER BY created_at DESC, id DESC`) as any;
}

export async function getPostAdmin(id: number): Promise<PostRow | null> {
  const rows = await sql`SELECT * FROM posts WHERE id = ${id}`;
  return (rows[0] as any) ?? null;
}
