import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const testimonials = [
  { id: 1, name: 'María González', role: 'Directora RRHH · Grupo Empresarial Toledo', text: 'El team building que organizó Vórtice superó todas las expectativas. Mi equipo todavía habla de ello meses después. Profesionalidad y creatividad al máximo nivel.', stars: 5 },
  { id: 2, name: 'Carlos Ramírez', role: 'Alcalde · Ayuntamiento de Toledo', text: 'Confiamos en Eventos Vórtice para nuestra festividad anual y el resultado fue espectacular. Logística impecable, creatividad desbordante y un equipo comprometidísimo.', stars: 5 },
  { id: 3, name: 'Laura Martínez', role: 'Novia · Boda en el Alcázar', text: 'Nuestro día más especial estuvo en las mejores manos. Cada detalle fue exactamente como lo soñamos. Si pudiera repetir, volvería a elegirlos sin dudarlo.', stars: 5 },
  { id: 4, name: 'Antonio Pérez', role: 'CEO · Empresa Tecnológica', text: 'La justa medieval que organizaron para nuestra convención fue un exitazo total. Los clientes aún nos preguntan cuándo repetimos. Simplemente únicos.', stars: 5 },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [ref, inView] = useInView({ threshold: 0.2 })
  const next = () => setCurrent(c => (c + 1) % testimonials.length)
  const prev = () => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length)

  return (
    <section id="testimonios" className="section-padding bg-dark-900 overflow-hidden" ref={ref}>
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="blue-line" /><span className="text-xs font-mono tracking-widest uppercase text-blue-400">Lo que dicen</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-white tracking-wide">
            OPINIONES <span className="text-gradient-blue">REALES</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.blockquote key={current}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="bg-dark-800 border border-white/8 p-8 md:p-10 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-5">
                    {[...Array(testimonials[current].stars)].map((_,i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="font-heading text-xl md:text-2xl font-medium text-white leading-relaxed mb-8">
                    "{testimonials[current].text}"
                  </p>
                </div>
                <footer className="flex items-center justify-between">
                  <cite className="not-italic">
                    <div className="font-body font-semibold text-white">{testimonials[current].name}</div>
                    <div className="text-xs font-mono text-white/35 mt-0.5">{testimonials[current].role}</div>
                  </cite>
                  <div className="flex gap-2">
                    <button onClick={prev} className="w-9 h-9 border border-white/15 flex items-center justify-center hover:border-blue-400 hover:text-blue-400 text-white/40 transition-all" aria-label="Anterior">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
                    </button>
                    <button onClick={next} className="w-9 h-9 border border-white/15 flex items-center justify-center hover:border-blue-400 hover:text-blue-400 text-white/40 transition-all" aria-label="Siguiente">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
          {/* Side list */}
          <div className="flex flex-col gap-3">
            {testimonials.map((t, i) => (
              <button key={t.id} onClick={() => setCurrent(i)}
                className={`text-left p-4 border transition-all duration-200 ${i === current ? 'border-blue-500/50 bg-blue-500/5' : 'border-white/5 hover:border-white/15 bg-dark-800'}`}
              >
                <p className="text-xs font-body text-white/55 line-clamp-2 mb-2">"{t.text.slice(0,80)}..."</p>
                <div className="text-xs font-mono text-white/30">{t.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
