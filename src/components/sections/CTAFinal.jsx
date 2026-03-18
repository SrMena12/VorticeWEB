import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

export default function CTAFinal() {
  const [ref, inView] = useInView({ threshold: 0.2 })
  return (
    <section className="relative overflow-hidden py-24 md:py-32" ref={ref}>
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=80"
          alt="" className="w-full h-full object-cover opacity-20" loading="lazy" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/90 to-dark-900/70" />
      </div>
      <div className="container-custom relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-accent-500/30 bg-accent-500/10 text-accent-400 text-xs font-mono tracking-widest uppercase mb-8">
            <div className="w-1.5 h-1.5 bg-accent-400 rounded-full animate-pulse" />
            ¿Listo para empezar?
          </div>
          <h2 className="font-display text-6xl sm:text-7xl md:text-8xl text-white tracking-wide leading-none mb-6">
            TU PRÓXIMO<br /><span className="text-gradient-blue">EVENTO</span><br />EMPIEZA AQUÍ
          </h2>
          <p className="text-base font-body text-white/50 max-w-lg mx-auto mb-10 leading-relaxed">
            Más de 20 años creando experiencias únicas en Toledo. Tu evento merece el mejor equipo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contacto" className="btn-accent">
              ¡Quiero mi evento!
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a href="tel:+34925000000" className="btn-outline">
              Llamar ahora
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
