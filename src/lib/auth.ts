import { scryptSync, randomBytes, timingSafeEqual, createHmac } from 'node:crypto';
import type { AstroCookies } from 'astro';

export const COOKIE = 'vortice_admin';
const DAYS = 7;

const secret = () => process.env.SESSION_SECRET || '';

/* ---------- Contraseñas (scrypt, con sal aleatoria) ---------- */

export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64);
  return `s1:${salt.toString('hex')}:${hash.toString('hex')}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  try {
    const [v, saltHex, hashHex] = stored.split(':');
    if (v !== 's1') return false;
    const expected = Buffer.from(hashHex, 'hex');
    const got = scryptSync(password, Buffer.from(saltHex, 'hex'), expected.length);
    return timingSafeEqual(got, expected);
  } catch {
    return false;
  }
}

/* ---------- Sesión: cookie firmada con HMAC ---------- */

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('hex');
}

export function makeSession(adminId: number): string {
  const exp = Math.floor(Date.now() / 1000) + DAYS * 86400;
  const payload = `${adminId}.${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function readSession(token: string | undefined): number | null {
  if (!token || !secret()) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [id, exp, sig] = parts;
  const expected = sign(`${id}.${exp}`);
  try {
    if (sig.length !== expected.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  } catch {
    return null;
  }
  if (Number(exp) < Date.now() / 1000) return null;
  const n = Number(id);
  return Number.isInteger(n) ? n : null;
}

export function setSessionCookie(cookies: AstroCookies, adminId: number) {
  cookies.set(COOKIE, makeSession(adminId), {
    httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: DAYS * 86400,
  });
}

export function clearSessionCookie(cookies: AstroCookies) {
  cookies.delete(COOKIE, { path: '/' });
}
