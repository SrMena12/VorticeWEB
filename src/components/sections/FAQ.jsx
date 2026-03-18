import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Link } from 'react-router-dom'

const faqs = [
  { q: '¿Cuánto cuesta organizar un evento?', a: 'Depende del tipo de evento, número de asistentes, duración y servicios. Trabajamos con presupuestos personalizados. Contáctanos y en menos de 24h te preparamos una propuesta sin compromiso.' },
  { q: '¿Qué incluye el servicio de organización?', a: 'Servicio integral: diseño conceptual, búsqueda de espacio, coordinación de proveedores, catering, decoración, producción técnica, gestión de permisos, logística y dirección el día del evento.' },
  { q: '¿Trabajáis fuera de Toledo?', a: 'Toledo es nuestra base, pero organizamos eventos en toda Castilla-La Mancha y otras provincias de España. Cuéntanos dónde y lo estudiamos.' },
  { q: '¿Con cuánta antelación hay que contactaros?', a: 'Para eventos grandes (bodas, congresos), recomendamos 3-6 meses. Para eventos más pequeños podemos trabajar en plazos más cortos. ¡Cuanto antes, mejor resultado!' },
  { q: '¿Organizáis las justas medievales con actores reales?', a: 'Sí, trabajamos con recreadores históricos profesionales certificados. Armaduras reales, combates coreografiados, arquería y todo el ambiente medieval auténtico que buscas.' },
  { q: '¿Los escape rooms son para empresas o también para grupos privados?', a: 'Para ambos. Tenemos programas específicos para teambuilding empresarial y también para grupos de amigos, cumpleaños y celebraciones privadas. Grupos desde 8 personas.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)
  const [ref, inView] = useInView({ threshold: 0.1 })
  return (
    <section id="faq" className="section-padding bg-dark-800" ref={ref}>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="blue-line" /><span className="text-xs font-mono tracking-widest uppercase text-blue-400">FAQ</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-white tracking-wide mb-6">
              TUS<br /><span className="text-gradient-blue">PREGUNTAS</span>
            </h2>
            <p className="text-sm font-body text-white/45 leading-relaxed mb-8">¿Tienes más dudas? Estamos a un mensaje de distancia.</p>
            <a href="https://wa.me/34925000000" target="_blank" rel="noopener noreferrer" className="btn-outline text-xs">
              Pregunta por WhatsApp
            </a>
          </motion.div>
          <div className="lg:col-span-3">
            {faqs.map((faq, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="border-b border-white/8"
                itemScope itemType="https://schema.org/Question"
              >
                <button onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex justify-between items-start gap-4 py-5 text-left group" aria-expanded={open === i}>
                  <h3 className="font-heading font-semibold text-sm md:text-base text-white/75 group-hover:text-white transition-colors" itemProp="name">
                    {faq.q}
                  </h3>
                  <span className={`flex-shrink-0 w-5 h-5 border flex items-center justify-center transition-all duration-200 ${open === i ? 'border-blue-500 rotate-45' : 'border-white/20'}`}>
                    <svg className={`w-3 h-3 ${open === i ? 'text-blue-400' : 'text-white/40'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                      className="overflow-hidden" itemScope itemType="https://schema.org/Answer">
                      <p className="text-sm font-body text-white/50 leading-relaxed pb-5" itemProp="text">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
