import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEOHead from './SEOHead'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function ServicePageTemplate({
  seo,
  eyebrow,
  heading,
  headingHighlight,
  intro,
  features,
  included,
  relatedLinks,
  schema,
}) {
  return (
    <>
      <SEOHead
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
      />

      {/* Schema.org Service */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end bg-dark-900 overflow-hidden pt-20 pb-16 md:pb-24">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0"
            style={{ backgroundImage: 'radial-gradient(ellipse at 60% 40%, rgba(37,99,235,0.07) 0%, transparent 65%)' }}
          />
          <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="srv-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#2563eb" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#srv-grid)" />
          </svg>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-900" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="flex items-center gap-3 mb-6">
            <div className="blue-line" />
            <span className="text-xs font-mono tracking-widest uppercase text-blue-400">{eyebrow}</span>
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight max-w-3xl">
            {heading}{' '}
            <span className="text-gradient-blue font-semibold">{headingHighlight}</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="mt-5 text-base md:text-lg font-body font-light text-white/55 max-w-2xl leading-relaxed">
            {intro}
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}
            className="flex flex-col sm:flex-row gap-4 mt-9">
            <Link to="/contacto" className="btn-primary text-sm">
              Solicitar presupuesto
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a href="https://wa.me/34925000000" target="_blank" rel="noopener noreferrer" className="btn-outline text-sm">
              Contactar por WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      {features?.length > 0 && (
        <section className="section-padding bg-dark-800" aria-labelledby="features-heading">
          <div className="container-custom">
            <h2 id="features-heading" className="sr-only">Características del servicio</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="p-8 bg-dark-900 border border-white/5 hover:border-blue-500/25 transition-all"
                >
                  <div className="text-4xl mb-5">{f.icon}</div>
                  <h3 className="font-display text-xl font-medium text-white mb-3">{f.title}</h3>
                  <p className="text-sm font-body font-light text-white/50 leading-relaxed">{f.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What's included */}
      {included?.length > 0 && (
        <section className="section-padding bg-dark-900" aria-labelledby="included-heading">
          <div className="container-custom">
            <div className="flex items-center gap-3 mb-10">
              <div className="blue-line" />
              <h2 id="included-heading" className="text-xs font-mono tracking-widest uppercase text-blue-400">
                Qué incluye
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {included.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-center gap-3 p-4 border border-white/5"
                >
                  <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm font-body text-white/70">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related services */}
      {relatedLinks?.length > 0 && (
        <section className="py-16 bg-dark-800 border-t border-white/5" aria-labelledby="related-heading">
          <div className="container-custom">
            <h2 id="related-heading" className="text-xs font-mono tracking-widest uppercase text-blue-400 mb-7">
              Otros servicios
            </h2>
            <div className="flex flex-wrap gap-3">
              {relatedLinks.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="px-5 py-2.5 border border-white/10 text-sm font-body text-white/50 hover:border-blue-500/40 hover:text-blue-400 transition-all"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-dark-900 text-center">
        <div className="container-custom max-w-2xl">
          <h2 className="font-display text-3xl md:text-4xl font-light text-white mb-4">
            ¿Listo para crear un evento{' '}
            <span className="text-gradient-blue font-semibold">inolvidable?</span>
          </h2>
          <p className="text-sm font-body text-white/50 mb-8">
            Solicita tu presupuesto personalizado sin compromiso.
          </p>
          <Link to="/contacto" className="btn-primary">
            Solicitar presupuesto gratuito
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
