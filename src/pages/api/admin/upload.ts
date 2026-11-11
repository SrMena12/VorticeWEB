import type { APIRoute } from 'astro';
import { put } from '@vercel/blob';
import { slugify } from '../../../lib/util';

export const prerender = false;

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

// La sesión ya la comprueba el middleware (/api/admin/*).
export const POST: APIRoute = async ({ request }) => {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return json({ error: 'El almacén de fotos no está configurado todavía.' }, 503);
  }
  const form = await request.formData();
  const file = form.get('file');
  if (!(file instanceof File)) return json({ error: 'No se ha recibido ningún archivo.' }, 400);
  if (!/^image\/(jpeg|png|webp|gif|avif)$/.test(file.type)) return json({ error: 'Solo se admiten imágenes (JPG, PNG, WebP).' }, 400);
  if (file.size > 4_000_000) return json({ error: 'La imagen pesa más de 4 MB.' }, 413);

  const ext = file.type.split('/')[1];
  const base = slugify(file.name.replace(/\.[^.]+$/, '')) || 'foto';
  const blob = await put(`uploads/${base}.${ext}`, file, { access: 'public', addRandomSuffix: true });
  return json({ url: blob.url });
};
