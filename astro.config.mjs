// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// Las páginas son estáticas por defecto. Las que necesitan base de datos
// (eventos, blog, panel de administración y la API) usan `prerender = false`.
export default defineConfig({
  site: 'https://www.eventosvortice.com',
  trailingSlash: 'never',
  adapter: vercel({
    maxDuration: 60,
    // Las páginas con base de datos se sirven desde la caché de Vercel (rápidas) y se regeneran como mucho cada minuto.
    isr: { expiration: 60, exclude: [/^\/admin/, /^\/api\//, '/baja', '/confirmar'] },
    // Vercel redimensiona las fotos y las sirve en AVIF/WebP.
    imageService: true,
    imagesConfig: {
      sizes: [320, 480, 640, 960, 1280, 1600],
      remotePatterns: [{ protocol: 'https', hostname: '**.public.blob.vercel-storage.com' }],
      formats: ['image/avif', 'image/webp'],
      minimumCacheTTL: 31536000,
    },
  }),
  build: { inlineStylesheets: 'always' },
  // La baja con un clic de Gmail/Outlook llega sin cabecera Origin; el panel se protege en src/middleware.ts.
  security: { checkOrigin: false },
  vite: { plugins: [tailwindcss()] },
});
