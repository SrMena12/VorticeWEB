const TZ = 'Europe/Madrid';

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

/* ---------- Fechas (todo se guarda en UTC y se muestra/edita en hora de Madrid) ---------- */

function tzOffsetMinutes(date: Date): number {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
  const p: Record<string, string> = {};
  for (const part of dtf.formatToParts(date)) p[part.type] = part.value;
  const asUTC = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
  return Math.round((asUTC - date.getTime()) / 60000);
}

/** "2026-12-05T18:30" (hora de Madrid, como envía <input type="datetime-local">) → Date UTC */
export function madridLocalToDate(local: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(local || '');
  if (!m) return null;
  const [y, mo, d, h, mi] = m.slice(1).map(Number);
  const guess = Date.UTC(y, mo - 1, d, h, mi);
  const off = tzOffsetMinutes(new Date(guess));
  let t = guess - off * 60000;
  const off2 = tzOffsetMinutes(new Date(t));
  if (off2 !== off) t = guess - off2 * 60000;
  const out = new Date(t);
  return isNaN(out.getTime()) ? null : out;
}

/** Date/ISO → "2026-12-05T18:30" en hora de Madrid, para rellenar <input type="datetime-local"> */
export function toMadridLocal(value: Date | string | null | undefined): string {
  if (!value) return '';
  const d = new Date(value);
  const dtf = new Intl.DateTimeFormat('en-CA', {
    timeZone: TZ, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
  });
  const p: Record<string, string> = {};
  for (const part of dtf.formatToParts(d)) p[part.type] = part.value;
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
}

export const fmtDate = (v: Date | string) =>
  new Date(v).toLocaleDateString('es-ES', { timeZone: TZ, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
export const fmtDateShort = (v: Date | string) =>
  new Date(v).toLocaleDateString('es-ES', { timeZone: TZ, day: 'numeric', month: 'short', year: 'numeric' });
export const fmtTime = (v: Date | string) =>
  new Date(v).toLocaleTimeString('es-ES', { timeZone: TZ, hour: '2-digit', minute: '2-digit' });
export const fmtDay = (v: Date | string) => new Date(v).toLocaleDateString('es-ES', { timeZone: TZ, day: 'numeric' });
export const fmtMonth = (v: Date | string) =>
  new Date(v).toLocaleDateString('es-ES', { timeZone: TZ, month: 'short' }).replace('.', '');

/* ---------- Estado de un evento ---------- */

export type EventRow = {
  id: number; slug: string; title: string; summary: string; description: string; location: string;
  starts_at: string | Date; ends_at: string | Date | null; capacity: number | null;
  registration_open: boolean; published: boolean; image_url: string | null; taken?: number;
};

export type EventState = 'open' | 'full' | 'closed' | 'past';

export function eventState(e: EventRow): EventState {
  const end = e.ends_at ? new Date(e.ends_at) : new Date(new Date(e.starts_at).getTime() + 3 * 3600_000);
  if (end.getTime() < Date.now()) return 'past';
  if (!e.registration_open) return 'closed';
  if (e.capacity != null && (e.taken ?? 0) >= e.capacity) return 'full';
  return 'open';
}

export const STATE_LABEL: Record<EventState, string> = {
  open: 'Inscripciones abiertas', full: 'Completo', closed: 'Inscripciones cerradas', past: 'Finalizado',
};

export function seatsLeft(e: EventRow): number | null {
  return e.capacity == null ? null : Math.max(0, e.capacity - (e.taken ?? 0));
}

/* ---------- Contenido del blog: formato sencillo ---------- */
// "## Título" → encabezado · líneas que empiezan por "- " → lista · el resto → párrafo.
// Los bloques se separan con una línea en blanco.

export type Block = { t: 'h' | 'p'; text: string } | { t: 'ul'; items: string[] } | { t: 'img'; src: string; alt: string };

export function parseContent(content: string): Block[] {
  return (content || '')
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean)
    .map((b): Block => {
      const img = /^!\[([^\]]*)\]\(((?:https:\/\/|\/)[^)\s]+)\)$/.exec(b);
      if (img) return { t: 'img', alt: img[1], src: img[2] };
      if (b.startsWith('## ')) return { t: 'h', text: b.slice(3).trim() };
      const lines = b.split('\n');
      if (lines.every((l) => l.trim().startsWith('- '))) return { t: 'ul', items: lines.map((l) => l.trim().slice(2).trim()) };
      return { t: 'p', text: lines.join(' ') };
    });
}

/** Texto del artículo → HTML seguro: **negrita**, *cursiva* y [enlaces](https://…). Todo lo demás se escapa. */
export function inlineHtml(text: string): string {
  const esc = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  return esc
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)/g, '<a href="$2" class="underline underline-offset-4 text-[color:var(--pt)] font-semibold">$1</a>');
}

export function readingMinutes(content: string): number {
  const words = (content || '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/* ---------- Varios ---------- */

/* ---------- Imágenes optimizadas por Vercel (/_vercel/image) ---------- */

export const IMG_WIDTHS = [320, 480, 640, 960, 1280, 1600];
export function imgUrl(src: string, w: number): string {
  if ((import.meta as any).env?.DEV) return src;
  return `/_vercel/image?url=${encodeURIComponent(src)}&w=${w}&q=75`;
}
export function imgSrcset(src: string, max = 1600): string {
  return IMG_WIDTHS.filter((w) => w <= max).map((w) => `${imgUrl(src, w)} ${w}w`).join(', ');
}

export function csvCell(v: unknown): string {
  let s = v == null ? '' : String(v);
  // evita que Excel interprete el contenido como fórmula
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return '"' + s.replace(/"/g, '""') + '"';
}

export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) && s.length <= 200;

export function clean(v: FormDataEntryValue | null | undefined, max = 500): string {
  return String(v ?? '').trim().slice(0, max);
}
