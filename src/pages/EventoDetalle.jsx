import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { getEventBySlug, events } from '../data/events'

function ImageGallery({ images, title }) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(null)

  return (
    <div>
      {/* Main image */}
      <div
        className="relative aspect-video overflow-hidden cursor-zoom-in mb-3 bg-dark-800"
        onClick={() => setLightbox(active)}
      >
        <motion.img
          key={active}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          src={images[active]}
          alt={`${title} — imagen ${active + 1}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-dark-900/80 text-xs font-mono text-white/50">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
          {active + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-6 gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative aspect-square overflow-hidden transition-all duration-200 ${
              i === active ? 'ring-2 ring-blue-500 opacity-100' : 'opacity-50 hover:opacity-75'
            }`}
            aria-label={`Ver imagen ${i + 1}`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/60 hover:text-white p-2"
              aria-label="Cerrar"
              onClick={() => setLightbox(null)}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center gap-4 w-full max-w-5xl" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setLightbox((lightbox - 1 + images.length) % images.length)}
                className="flex-shrink-0 w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-blue-400 transition-all"
                aria-label="Anterior"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <motion.img
                key={lightbox}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={images[lightbox]}
                alt={`${title} — ${lightbox + 1}`}
                className="flex-1 max-h-[80vh] object-contain"
              />
              <button
                onClick={() => setLightbox((lightbox + 1) % images.length)}
                className="flex-shrink-0 w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-blue-400 transition-all"
                aria-label="Siguiente"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function EventoDetalle() {
  const { slug } = useParams()
  const event = getEventBySlug(slug)

  if (!event) return <Navigate to="/404" replace />

  const relatedEvents = events.filter(e => e.id !== event.id).slice(0, 3)

  return (
    <>
      <Helmet>
        <title>{event.seo.title}</title>
        <meta name="description" content={event.seo.description} />
        <link rel="canonical" href={`https://www.eventosvortice.com/eventos/${event.slug}`} />
        <meta property="og:title" content={event.seo.title} />
        <meta property="og:description" content={event.seo.description} />
        <meta property="og:image" content={event.heroImg} />
      </Helmet>

      <main id="main-content" className="bg-dark-900 pt-16 min-h-screen">
        {/* Hero banner */}
        <div className="relative h-[45vh] md:h-[55vh] overflow-hidden">
          <img
            src={event.heroImg}
            alt={event.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-dark-900/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/60 to-transparent" />

          {/* Breadcrumb */}
          <div className="absolute top-6 left-0 right-0 container-custom">
            <nav aria-label="Navegación" className="flex items-center gap-2 text-xs font-mono text-white/40">
              <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
              <span>/</span>
              <Link to="/#eventos" className="hover:text-white transition-colors">Eventos</Link>
              <span>/</span>
              <span className="text-blue-400">{event.title}</span>
            </nav>
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 container-custom pb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={`badge ${event.categoryColor === 'fire' ? 'badge-fire' : ''} text-[10px]`}>
                  {event.tag}
                </span>
                <span className="text-xs font-mono text-white/40 tracking-widest uppercase">{event.category}</span>
              </div>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-wide leading-none">
                {event.title}
              </h1>
              <p className="text-lg md:text-xl font-heading font-semibold text-blue-300 mt-2">
                {event.subtitle}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="container-custom py-14">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left: gallery + description */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-xs font-mono tracking-widest uppercase text-blue-400 mb-4">Galería</h2>
                <ImageGallery images={event.gallery} title={event.title} />
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-10"
              >
                <h2 className="font-heading font-bold text-2xl text-white mb-5">Sobre este evento</h2>
                {event.description.split('\n\n').map((para, i) => (
                  <p key={i} className="text-sm font-body text-white/60 leading-relaxed mb-4">{para}</p>
                ))}
              </motion.div>
            </div>

            {/* Right: info panel + CTA */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="sticky top-24 space-y-5"
              >
                {/* Info card */}
                <div className="bg-dark-800 border border-white/8 p-6">
                  <h2 className="font-heading font-bold text-lg text-white mb-5">Detalles del evento</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs font-mono text-white/30 mb-0.5">Duración</div>
                        <div className="font-body font-medium text-white/80">{event.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs font-mono text-white/30 mb-0.5">Grupo mínimo</div>
                        <div className="font-body font-medium text-white/80">{event.minGroup} personas</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs font-mono text-white/30 mb-0.5">Ubicación</div>
                        <div className="font-body font-medium text-white/80">Toledo, España</div>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="border-t border-white/8 pt-5 mb-6">
                    <h3 className="text-xs font-mono text-white/30 tracking-widest uppercase mb-3">Incluye</h3>
                    <ul className="space-y-2">
                      {event.features.map(f => (
                        <li key={f} className="flex items-center gap-2.5 text-sm font-body text-white/65">
                          <svg className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <Link to="/contacto" className="btn-primary w-full justify-center text-sm mb-3">
                    Solicitar presupuesto
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <a
                    href={`https://wa.me/34925000000?text=Hola,%20me%20interesa%20el%20evento:%20${encodeURIComponent(event.title)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 border border-[#25D366]/30 text-[#25D366] text-xs font-mono tracking-wider hover:bg-[#25D366]/10 transition-all"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a10.66 10.66 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Consultar por WhatsApp
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Related events */}
          <section className="mt-20" aria-labelledby="related-heading">
            <div className="flex items-center gap-3 mb-8">
              <div className="blue-line" />
              <h2 id="related-heading" className="text-xs font-mono tracking-widest uppercase text-blue-400">
                Otros eventos
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedEvents.map((rel, i) => (
                <motion.div
                  key={rel.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Link to={`/eventos/${rel.slug}`} className="card-event group block bg-dark-800">
                    <div className="relative overflow-hidden aspect-video img-hover-zoom">
                      <img src={rel.heroImg} alt={rel.title} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 to-transparent" />
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-blue-400/70">{rel.category}</span>
                      <h3 className="font-heading font-bold text-base text-white group-hover:text-blue-300 transition-colors mt-1">
                        {rel.title}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
