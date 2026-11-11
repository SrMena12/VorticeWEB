// Crea las tablas (si no existen) y carga los artículos del blog actual.
// Uso:  vercel env pull .env.local   y luego   node --env-file=.env.local scripts/migrate.mjs
import { neon } from '@neondatabase/serverless';
import { POSTS } from '../src/data/blog.ts';

const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (!url) { console.error('Falta DATABASE_URL. Ejecuta: vercel env pull .env.local'); process.exit(1); }
const sql = neon(url);

const DDL = [
  `CREATE TABLE IF NOT EXISTS admins (
     id serial PRIMARY KEY,
     email text UNIQUE NOT NULL,
     password_hash text NOT NULL,
     created_at timestamptz NOT NULL DEFAULT now())`,
  `CREATE TABLE IF NOT EXISTS events (
     id serial PRIMARY KEY,
     slug text UNIQUE NOT NULL,
     title text NOT NULL,
     summary text NOT NULL DEFAULT '',
     description text NOT NULL DEFAULT '',
     location text NOT NULL DEFAULT '',
     starts_at timestamptz NOT NULL,
     ends_at timestamptz,
     capacity integer CHECK (capacity IS NULL OR capacity >= 0),
     registration_open boolean NOT NULL DEFAULT true,
     published boolean NOT NULL DEFAULT true,
     image_url text,
     created_at timestamptz NOT NULL DEFAULT now(),
     updated_at timestamptz NOT NULL DEFAULT now())`,
  `CREATE INDEX IF NOT EXISTS events_starts_idx ON events (starts_at)`,
  `CREATE TABLE IF NOT EXISTS registrations (
     id serial PRIMARY KEY,
     event_id integer NOT NULL REFERENCES events(id) ON DELETE CASCADE,
     name text NOT NULL,
     email text NOT NULL,
     phone text NOT NULL,
     attendees integer NOT NULL DEFAULT 1 CHECK (attendees >= 1),
     notes text NOT NULL DEFAULT '',
     created_at timestamptz NOT NULL DEFAULT now(),
     UNIQUE (event_id, email))`,
  `CREATE INDEX IF NOT EXISTS registrations_event_idx ON registrations (event_id)`,
  `CREATE TABLE IF NOT EXISTS posts (
     id serial PRIMARY KEY,
     slug text UNIQUE NOT NULL,
     title text NOT NULL,
     meta_title text NOT NULL DEFAULT '',
     description text NOT NULL DEFAULT '',
     content text NOT NULL DEFAULT '',
     cover_url text,
     service text,
     published boolean NOT NULL DEFAULT false,
     published_at timestamptz,
     created_at timestamptz NOT NULL DEFAULT now(),
     updated_at timestamptz NOT NULL DEFAULT now())`,
  `CREATE TABLE IF NOT EXISTS rate_limits (
     key text NOT NULL,
     at timestamptz NOT NULL DEFAULT now())`,
  `CREATE INDEX IF NOT EXISTS rate_limits_key_idx ON rate_limits (key, at)`,

  // --- v2: correos, suscriptores y estadísticas ---
  `ALTER TABLE registrations ADD COLUMN IF NOT EXISTS marketing_opt_in boolean NOT NULL DEFAULT false`,
  `ALTER TABLE events ADD COLUMN IF NOT EXISTS reminder_sent_at timestamptz`,
  `CREATE TABLE IF NOT EXISTS subscribers (
     id serial PRIMARY KEY,
     email text UNIQUE NOT NULL,
     name text NOT NULL DEFAULT '',
     status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'unsubscribed')),
     source text NOT NULL DEFAULT 'web',
     consent_at timestamptz,
     unsubscribed_at timestamptz,
     created_at timestamptz NOT NULL DEFAULT now())`,
  `CREATE TABLE IF NOT EXISTS campaigns (
     id serial PRIMARY KEY,
     subject text NOT NULL,
     body text NOT NULL,
     audience text NOT NULL,
     audience_label text NOT NULL DEFAULT '',
     kind text NOT NULL DEFAULT 'manual',
     recipients integer NOT NULL DEFAULT 0,
     failed integer NOT NULL DEFAULT 0,
     error text,
     created_at timestamptz NOT NULL DEFAULT now())`,
  `CREATE TABLE IF NOT EXISTS pageviews (
     id bigserial PRIMARY KEY,
     at timestamptz NOT NULL DEFAULT now(),
     path text NOT NULL,
     ref text NOT NULL DEFAULT '',
     device text NOT NULL DEFAULT 'desktop',
     country text NOT NULL DEFAULT '',
     visitor text NOT NULL)`,
  `CREATE INDEX IF NOT EXISTS pageviews_at_idx ON pageviews (at)`,
  `CREATE INDEX IF NOT EXISTS pageviews_path_idx ON pageviews (path, at)`,
];

for (const q of DDL) await sql.query(q);
console.log('Tablas listas.');

const covers = {
  'ideas-team-building-toledo': '/img/blog-team-building.webp',
  'como-organizar-fiesta-empresa-toledo': '/img/blog-fiesta-empresa.webp',
  'despedida-de-soltero-toledo-ideas': '/img/serv-despedidas-de-soltero-toledo.webp',
};

const [{ n }] = await sql`SELECT count(*)::int AS n FROM posts`;
if (n === 0) {
  for (const p of POSTS) {
    const content = p.body.map((b) => (b.h ? `## ${b.h}\n\n${b.p}` : b.p)).join('\n\n');
    await sql`
      INSERT INTO posts (slug, title, meta_title, description, content, cover_url, service, published, published_at)
      VALUES (${p.slug}, ${p.title}, ${p.metaTitle}, ${p.desc}, ${content}, ${covers[p.slug] ?? null}, ${p.service}, true, ${p.date + 'T10:00:00+01:00'})
      ON CONFLICT (slug) DO NOTHING`;
  }
  console.log(`Blog: ${POSTS.length} artículos cargados.`);
} else {
  console.log(`Blog: ya había ${n} artículos, no se toca nada.`);
}
