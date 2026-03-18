# Eventos Vórtice — Web Corporativa

Sitio web moderno y optimizado para SEO de **Eventos Vórtice**, empresa de organización de eventos en Toledo.

## Stack tecnológico

- **React 18** + **Vite 5**
- **TailwindCSS 3** — estilos utility-first
- **Framer Motion** — animaciones fluidas
- **React Router v6** — enrutamiento SPA
- **React Helmet Async** — SEO dinámico

## Instalación y uso

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

## Estructura del proyecto

```
src/
├── components/
│   ├── hooks/
│   │   └── useInView.js          # Hook IntersectionObserver
│   ├── layout/
│   │   ├── Navbar.jsx             # Navegación con dropdown
│   │   └── Footer.jsx             # Pie de página completo
│   ├── sections/
│   │   ├── Hero.jsx               # Sección principal con stats
│   │   ├── Services.jsx           # Grid de 4 servicios
│   │   ├── Benefits.jsx           # 4 beneficios clave
│   │   ├── Process.jsx            # Proceso en 4 pasos
│   │   ├── Portfolio.jsx          # Galería filtrable
│   │   ├── Clients.jsx            # Ticker de clientes
│   │   ├── Testimonials.jsx       # Slider de testimonios
│   │   ├── FAQ.jsx                # Acordeón FAQ con Schema.org
│   │   ├── CTAFinal.jsx           # CTA de conversión final
│   │   └── ContactForm.jsx        # Formulario de contacto
│   └── ui/
│       ├── SEOHead.jsx            # Componente Helmet reutilizable
│       └── ServicePageTemplate.jsx # Template para páginas de servicio
├── pages/
│   ├── Home.jsx
│   ├── EventosCorporativos.jsx
│   ├── EventosEmpresa.jsx
│   ├── EventosPrivados.jsx
│   ├── EventosAyuntamientos.jsx
│   ├── Contacto.jsx
│   └── NotFound.jsx
├── App.jsx                        # Router principal
├── main.jsx                       # Entry point
└── index.css                      # Estilos globales + Tailwind
public/
├── sitemap.xml                    # Sitemap SEO
├── robots.txt                     # Directivas para crawlers
└── favicon.svg                    # Favicon vectorial
```

## SEO implementado

- ✅ Títulos y meta descriptions únicos por página
- ✅ Open Graph y Twitter Cards
- ✅ Schema.org LocalBusiness (index.html)
- ✅ Schema.org Service (páginas de servicio)
- ✅ Schema.org FAQ (sección FAQ)
- ✅ Jerarquía H1 > H2 > H3 correcta
- ✅ URLs semánticas amigables
- ✅ Canonical tags
- ✅ sitemap.xml
- ✅ robots.txt
- ✅ Lazy loading con IntersectionObserver

## Personalización

### Datos de contacto
Actualizar en `src/components/layout/Footer.jsx` y `src/pages/Contacto.jsx`:
- Teléfono: `+34925000000`
- Email: `info@eventosvortice.com`
- Dirección: Calle Alegría 48, 45008 Toledo

### Google Maps
Reemplazar el iframe embed en `src/pages/Contacto.jsx` con el embed real de Google Maps.

### Formulario
Conectar `src/components/sections/ContactForm.jsx` a tu backend o servicio de email (Formspree, EmailJS, etc.).

### Imágenes
Las imágenes del portfolio son placeholders generados con SVG. Reemplazar en `src/components/sections/Portfolio.jsx` con imágenes reales usando `<img loading="lazy" />`.
