import type { APIRoute } from 'astro';
import { sql } from '../../../../lib/db';
import { csvCell, slugify, fmtDateShort, fmtTime } from '../../../../lib/util';

export const prerender = false;

// Excel en español abre mejor CSV con ";" y BOM UTF-8 (para las tildes).
export const GET: APIRoute = async ({ params }) => {
  const id = Number(params.id);
  if (!Number.isInteger(id)) return new Response('No encontrado', { status: 404 });
  const [ev] = await sql`SELECT title FROM events WHERE id = ${id}`;
  if (!ev) return new Response('No encontrado', { status: 404 });
  const rows = await sql`SELECT name, email, phone, attendees, notes, created_at FROM registrations WHERE event_id = ${id} ORDER BY created_at`;

  const head = ['Nombre', 'Email', 'Teléfono', 'Plazas', 'Notas', 'Fecha de inscripción'];
  const lines = [head.map(csvCell).join(';')];
  for (const r of rows) {
    lines.push([r.name, r.email, r.phone, r.attendees, r.notes, `${fmtDateShort(r.created_at)} ${fmtTime(r.created_at)}`].map(csvCell).join(';'));
  }
  return new Response('﻿' + lines.join('\r\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="inscritos-${slugify(ev.title) || id}.csv"`,
      'Cache-Control': 'private, no-store',
    },
  });
};
