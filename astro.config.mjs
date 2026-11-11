// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// Las páginas son estáticas por defecto. Las que necesitan base de datos
// (eventos, blog, panel de administración y la API) usan `prerender = false`.
export default defineConfig({
  site: 'https://www.eventosvortice.com',
  trailingSlash: 'never',
  adapter: vercel({ maxDuration: 60 }),
  // La baja con un clic de Gmail/Outlook llega sin cabecera Origin; el panel se protege en src/middleware.ts.
  security: { checkOrigin: false },
  vite: { plugins: [tailwindcss()] },
});
