import type { APIRoute } from 'astro';
import { SITE } from '../data/site';
import { sql } from '../lib/db';

export const prerender = false;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async () => {
  let posts: any[] = [];
  try { posts = await sql`SELECT slug, title, description, published_at FROM posts WHERE published ORDER BY published_at DESC NULLS LAST LIMIT 30`; }
  catch (e) { console.error('rss', e); }
  const items = posts.map((p) => `    <item><title>${esc(p.title)}</title><link>${SITE.url}/blog/${p.slug}</link><guid>${SITE.url}/blog/${p.slug}</guid>${p.published_at ? `<pubDate>${new Date(p.published_at).toUTCString()}</pubDate>` : ''}<description>${esc(p.description || '')}</description></item>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>Blog de Vórtice Eventos</title><link>${SITE.url}/blog</link><description>Ideas y consejos para organizar eventos en Toledo.</description><language>es-ES</language>\n${items}\n</channel></rss>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } });
};
