import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const steps = [
  { step: '01', emoji: '💬', title: 'Nos cuentas tu idea', description: 'Sin compromiso. Una llamada o WhatsApp basta para empezar a imaginar tu evento.' },
  { step: '02', emoji: '✏️', title: 'Diseñamos el evento', description: 'Propuesta creativa personalizada: concepto, espacio, programa y presupuesto.' },
  { step: '03', emoji: '⚙️', title: 'Lo organizamos todo', description: 'Proveedores, permisos, logística, producción. Tú no mueves un dedo.' },
  { step: '04', emoji: '🚀', title: 'El día del evento', description: 'Nuestro equipo lo dirige en tiempo real. Tú solo disfrutas y recuerdas.' },
]

export default function Process() {
  const [ref, inView] = useInView({ threshold: 0.1 })
  return (
    <section id="proceso" className="section-padding bg-dark-900" ref={ref}>
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="blue-line" /><span className="text-xs font-mono tracking-widest uppercase text-blue-400">Cómo funciona</span><div className="blue-line rotate-180" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-white tracking-wide">
            ASÍ DE <span className="text-gradient-blue">FÁCIL</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div key={s.step}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-6 bg-dark-800 border border-white/5 hover:border-blue-500/20 transition-all"
            >
              <div className="text-4xl mb-4">{s.emoji}</div>
              <div className="font-display text-5xl text-blue-500/15 absolute top-4 right-4 leading-none">{s.step}</div>
              <h3 className="font-heading font-bold text-base text-white mb-2">{s.title}</h3>
              <p className="text-xs font-body text-white/45 leading-relaxed">{s.description}</p>
              {i < 3 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-blue-500/30 to-transparent z-10" aria-hidden="true" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
