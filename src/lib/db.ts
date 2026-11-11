import { neon } from '@neondatabase/serverless';

// Neon (Vercel Marketplace) inyecta DATABASE_URL en el proyecto.
const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || '';

export const hasDb = Boolean(url);

// `sql` se usa como plantilla etiquetada: sql`SELECT * FROM events WHERE id = ${id}`
// Si no hay base de datos configurada, las consultas fallan y cada página lo gestiona con try/catch.
export const sql = neon(url || 'postgresql://sin-configurar:x@localhost/x');

/** Limitador de peticiones por clave (IP + acción). Devuelve true si se supera el máximo. */
export async function tooMany(key: string, max: number, windowMinutes: number): Promise<boolean> {
  try {
    await sql`DELETE FROM rate_limits WHERE at < now() - interval '1 day'`;
    await sql`INSERT INTO rate_limits (key) VALUES (${key})`;
    const rows = await sql`
      SELECT count(*)::int AS n FROM rate_limits
      WHERE key = ${key} AND at > now() - make_interval(mins => ${windowMinutes})`;
    return rows[0].n > max;
  } catch {
    return false; // si falla el limitador no bloqueamos al usuario
  }
}

export function clientIp(request: Request): string {
  const h = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';
  return h.split(',')[0].trim() || 'desconocida';
}
