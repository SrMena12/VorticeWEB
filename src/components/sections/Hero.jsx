import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const words = ['ÉPICOS', 'ÚNICOS', 'SALVAJES', 'INCREÍBLES']

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-dark-900 pt-16" aria-label="Inicio">
      {/* Full bleed background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&q=80"
          alt="Eventos espectaculares en Toledo"
          className="w-full h-full object-cover opacity-30"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-dark-900/40" />
      </div>

      {/* Animated blue lines decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-blue-600/40 via-blue-400/20 to-transparent origin-left"
        />
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-3/4 left-0 w-2/3 h-px bg-gradient-to-r from-brand-500/30 to-transparent origin-left"
        />
        {/* Corner bracket */}
        <div className="absolute bottom-12 right-8 md:right-16 w-16 h-16 border-b-2 border-r-2 border-blue-500/30" />
        <div className="absolute top-24 right-8 md:right-16 w-8 h-8 border-t-2 border-r-2 border-blue-500/20" />
      </div>

      <div className="container-custom relative z-10 py-20">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-8 flex items-center justify-center border border-blue-500/50 bg-blue-500/10">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            </div>
            <span className="text-xs font-mono tracking-widest uppercase text-blue-400">
              Toledo · +20 años creando experiencias
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-display leading-none mb-2">
              <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] text-white tracking-wide">
                EVENTOS
              </span>
              <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] text-gradient-blue tracking-wide">
                VÓRTICE
              </span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-2xl font-heading font-semibold text-white/70 mb-3 max-w-2xl"
          >
            Team buildings · Justas medievales · Escape rooms · Eventos corporativos
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-base font-body text-white/45 mb-10 max-w-xl leading-relaxed"
          >
            Organización de eventos en Toledo que la gente recuerda. Cada experiencia, diseñada para impactar.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Link to="/contacto" className="btn-accent">
              ¡Quiero mi evento!
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a href="#eventos" className="btn-outline">
              Ver todos los eventos
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap gap-x-10 gap-y-5"
          >
            {[
              { v: '+20', l: 'Años de experiencia' },
              { v: '+500', l: 'Eventos realizados' },
              { v: '+200', l: 'Empresas clientes' },
              { v: '6', l: 'Tipos de experiencia' },
            ].map(s => (
              <div key={s.l} className="flex items-end gap-2">
                <span className="font-display text-4xl md:text-5xl text-gradient-blue leading-none">{s.v}</span>
                <span className="text-xs font-mono text-white/35 tracking-wider pb-1">{s.l}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-10 bg-gradient-to-b from-blue-500/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}
