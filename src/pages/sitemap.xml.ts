import type { APIRoute } from 'astro';
import { SITE, SERVICES } from '../data/site';
import { sql } from '../lib/db';

export const prerender = false;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Un único mapa del sitio, siempre al día: páginas fijas + servicios + eventos próximos + artículos publicados.
export const GET: APIRoute = async () => {
  const urls: { loc: string; lastmod?: string; priority: string; freq: string }[] = [
    { loc: '/', priority: '1.0', freq: 'weekly' },
    { loc: '/eventos', priority: '0.9', freq: 'daily' },
    { loc: '/blog', priority: '0.8', freq: 'weekly' },
    { loc: '/adventrix', priority: '0.7', freq: 'monthly' },
    { loc: '/nosotros', priority: '0.6', freq: 'monthly' },
    { loc: '/contacto', priority: '0.7', freq: 'monthly' },
    { loc: '/privacidad', priority: '0.2', freq: 'yearly' },
    ...SERVICES.map((s) => ({ loc: `/servicios/${s.slug}`, priority: '0.9', freq: 'monthly' })),
  ];
  try {
    const events = await sql`SELECT slug, updated_at FROM events WHERE published AND COALESCE(ends_at, starts_at + interval '3 hours') > now()`;
    for (const e of events) urls.push({ loc: `/eventos/${e.slug}`, lastmod: new Date(e.updated_at).toISOString(), priority: '0.8', freq: 'daily' });
    const posts = await sql`SELECT slug, updated_at FROM posts WHERE published`;
    for (const p of posts) urls.push({ loc: `/blog/${p.slug}`, lastmod: new Date(p.updated_at).toISOString(), priority: '0.7', freq: 'monthly' });
  } catch (e) { console.error('sitemap', e); }

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) =>
    `  <url><loc>${esc(SITE.url + u.loc)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}<changefreq>${u.freq}</changefreq><priority>${u.priority}</priority></url>`).join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } });
};
