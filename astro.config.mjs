// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// Las páginas son estáticas por defecto. Las que necesitan base de datos
// (eventos, blog, panel de administración y la API) usan `prerender = false`.
export default defineConfig({
  site: 'https://www.eventosvortice.com',
  trailingSlash: 'never',
  adapter: vercel(),
  integrations: [sitemap({ filter: (page) => !page.includes('/admin') })],
  vite: { plugins: [tailwindcss()] },
});
