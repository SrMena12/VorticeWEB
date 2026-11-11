import { defineMiddleware } from 'astro:middleware';
import { COOKIE, readSession } from './lib/auth';

// Rutas del panel que se pueden abrir sin sesión.
const PUBLIC_ADMIN = new Set(['/admin/login', '/admin/setup']);

export const onRequest = defineMiddleware(async (ctx, next) => {
  const path = ctx.url.pathname.replace(/\/$/, '') || '/';
  const inAdmin = path === '/admin' || path.startsWith('/admin/') || path.startsWith('/api/admin');

  if (inAdmin) {
    const adminId = readSession(ctx.cookies.get(COOKIE)?.value);
    (ctx.locals as any).adminId = adminId;
    if (!adminId && !PUBLIC_ADMIN.has(path)) {
      if (path.startsWith('/api/')) return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
      return ctx.redirect('/admin/login');
    }
  }

  const res = await next();
  if (inAdmin) {
    try {
      res.headers.set('X-Robots-Tag', 'noindex, nofollow');
      res.headers.set('Cache-Control', 'private, no-store');
    } catch { /* respuesta inmutable */ }
  }
  return res;
});
