# Vórtice Eventos · web y panel de administración

Web de **Vórtice Eventos** (agencia de eventos en Toledo) con panel de administración para publicar eventos, gestionar inscripciones, enviar avisos y escribir en el blog.

## Enlaces

| Qué | Enlace |
|---|---|
| Web (producción) | https://vortice-web.vercel.app |
| Próximos eventos | https://vortice-web.vercel.app/eventos |
| Blog | https://vortice-web.vercel.app/blog |
| **Panel de administración** | https://vortice-web.vercel.app/admin/login |
| Política de privacidad | https://vortice-web.vercel.app/privacidad |
| Mapa del sitio / RSS | [/sitemap.xml](https://vortice-web.vercel.app/sitemap.xml) · [/rss.xml](https://vortice-web.vercel.app/rss.xml) |
| Repositorio | https://github.com/SrMena12/VorticeWEB |
| Proyecto en Vercel | https://vercel.com/mena121997-7686s-projects/vortice-web |
| Base de datos (Neon) | https://vercel.com/d/dashboard/integrations/neon/icfg_MQY1cZxnQuCb9Zu8LVCz67NB/resources/store_PwsLnf1dmqpPCPTr |

Cada `git push` a la rama `main` se publica sola en Vercel.

---

## ⏳ Pendiente

### 1. Conectar el envío de correos (Resend)
Sin esto **no se envía ningún correo** (recordatorios, avisos, newsletter, confirmaciones). Las inscripciones funcionan igual; solo faltan los emails.

1. Crear una cuenta en https://resend.com
2. Añadir y **verificar el dominio `eventosvortice.com`** (ver punto 2).
3. Crear una clave de API y guardarla en Vercel (en el prompt de Claude Code o en una terminal con la CLI de Vercel):
   ```
   vercel env add RESEND_API_KEY production --value TU_CLAVE --sensitive --yes
   vercel env add EMAIL_FROM production --value "Vórtice Eventos <avisos@eventosvortice.com>" --yes
   ```
4. Volver a desplegar (cualquier `git push`, o `vercel deploy --prod`).
5. En el panel, **Correos → Nuevo correo → Enviar prueba** a tu email para comprobar que llega.

> Mientras el dominio no esté verificado en Resend, los correos solo llegan al email de la propia cuenta de Resend; no se entregan a los participantes.

### 2. DNS y dominio (`eventosvortice.com`, hoy en Wix)
Hace falta acceso al panel DNS del dominio. Son dos cosas distintas:

- **Para los correos (Resend):** añadir los registros que Resend indique al verificar el dominio (normalmente 1 `MX`, 1 `TXT` de SPF y 1-2 `CNAME`/`TXT` de DKIM). Se copian tal cual desde Resend.
- **Para lanzar la web nueva:** en Vercel → proyecto `vortice-web` → *Settings → Domains*, añadir `eventosvortice.com` y `www.eventosvortice.com` y crear en el DNS los registros que Vercel indique. Hasta entonces la web nueva está en `vortice-web.vercel.app` con `noindex` a propósito, para no duplicar contenido en Google.
- **Después del lanzamiento:** dar de alta `eventosvortice.com` en [Google Search Console](https://search.google.com/search-console), verificar la propiedad y enviar `https://www.eventosvortice.com/sitemap.xml`. (Si prefieres verificar con una etiqueta HTML, guarda el código en la variable `GSC_VERIFICATION` de Vercel y la web ya lo incluye.)

### 3. Borrar las visitas de prueba de las estadísticas
Durante las pruebas se colaron unas **28 visitas ficticias** (mediciones de rendimiento) en *Panel → Estadísticas*. Para dejar los contadores a cero, ejecutar una sola vez en la carpeta del proyecto:

```
node --env-file=.env.local scripts/_clearviews.mjs
```

(Si `.env.local` no existe: `vercel env pull .env.local`.) Después se puede borrar el script. Hacerlo **antes** de empezar a mirar cifras reales.

### Otros detalles por revisar
- La **política de privacidad** (`/privacidad`) es un texto orientativo: que la revise alguien antes de usarla con datos reales.
- **Vercel Hobby** no está pensado para uso comercial: una empresa debería pasar al plan Pro.
- Cuando se publiquen eventos reales, comprobar que se ve bien la ficha pública y que la inscripción llega al panel.

---

## Cómo funciona

- **Stack:** [Astro](https://astro.build) + Tailwind CSS, desplegado en Vercel. Datos en Postgres (Neon); fotos subidas desde el panel en Vercel Blob.
- **Panel (`/admin`):** eventos (crear, editar, abrir/cerrar inscripciones, borrar), inscritos con exportación a Excel, correos y avisos, suscriptores, estadísticas propias sin cookies y blog con editor.
- **Automático cada día (08:00 UTC):** envía el recordatorio «mañana es el evento» a los inscritos, borra los eventos pasados hace más de 30 días (con sus inscripciones) y limpia estadísticas antiguas.
- **Variables de entorno en Vercel:** `DATABASE_URL` y `BLOB_READ_WRITE_TOKEN` (las crean las integraciones), `SESSION_SECRET`, `CRON_SECRET` (se generaron con `scripts/setup-secrets.mjs`) y, cuando se conecten los correos, `RESEND_API_KEY` y `EMAIL_FROM`.
- **Base de datos:** las tablas se crean con `node --env-file=.env.local scripts/migrate.mjs` (se puede repetir sin riesgo).

## Notas para quien trabaje en el código

- En esta máquina Windows el binario de compilación de Astro está bloqueado por una directiva de seguridad, así que **no se puede ejecutar `npm run build` ni `npm run dev` en local**. Se prueba desplegando una versión de prueba: `vercel deploy --yes`.
- Los archivos de `scripts/` que empiezan por `_` son herramientas temporales de prueba y no se suben a git.
- Las páginas son estáticas por defecto; las que usan base de datos llevan `export const prerender = false` y se sirven con caché de 60 s.
