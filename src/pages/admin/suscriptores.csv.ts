import type { APIRoute } from 'astro';
import { sql } from '../../lib/db';
import { csvCell, fmtDateShort } from '../../lib/util';

export const prerender = false;

export const GET: APIRoute = async () => {
  const rows = await sql`SELECT email, name, status, source, consent_at, created_at FROM subscribers ORDER BY created_at`;
  const estado: Record<string, string> = { active: 'Activo', pending: 'Pendiente', unsubscribed: 'De baja' };
  const lines = [['Email', 'Nombre', 'Estado', 'Origen', 'Consentimiento', 'Alta'].map(csvCell).join(';')];
  for (const r of rows) {
    lines.push([r.email, r.name, estado[r.status] ?? r.status, r.source, r.consent_at ? fmtDateShort(r.consent_at) : '', fmtDateShort(r.created_at)].map(csvCell).join(';'));
  }
  return new Response('﻿' + lines.join('\r\n'), {
    headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="suscriptores.csv"', 'Cache-Control': 'private, no-store' },
  });
};
