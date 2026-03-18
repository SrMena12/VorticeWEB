import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const benefits = [
  { icon: '⚡', title: '+20 años de experiencia', description: 'Dos décadas creando experiencias de referencia en Toledo y Castilla-La Mancha.' },
  { icon: '🎯', title: '100% personalizados', description: 'Cada evento es único. Escuchamos, diseñamos y ejecutamos exactamente lo que necesitas.' },
  { icon: '🏰', title: 'Espacios exclusivos', description: 'Acceso a los mejores espacios de Toledo: palacios, enclaves históricos y venues únicos.' },
  { icon: '🎪', title: 'Gestión integral', description: 'Nos encargamos de todo: logística, proveedores, producción técnica y coordinación en directo.' },
]

export default function Benefits() {
  const [ref, inView] = useInView({ threshold: 0.1 })
  return (
    <section id="beneficios" className="py-16 md:py-24 bg-dark-800 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: 'radial-gradient(ellipse at 80% 50%, rgba(29,111,232,0.07) 0%, transparent 65%)' }} />
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="blue-line" />
              <span className="text-xs font-mono tracking-widest uppercase text-blue-400">¿Por qué Vórtice?</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-white leading-none mb-6 tracking-wide">
              LA DIFERENCIA<br /><span className="text-gradient-blue">QUE SE NOTA</span>
            </h2>
            <p className="text-sm font-body text-white/50 leading-relaxed max-w-sm">
              Llevamos más de dos décadas haciendo que las empresas y personas de Toledo vivan experiencias que no se olvidan.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <motion.div key={b.title}
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 bg-dark-900 border border-white/5 hover:border-blue-500/25 transition-all group"
              >
                <div className="text-3xl mb-4">{b.icon}</div>
                <h3 className="font-heading font-bold text-base text-white mb-2">{b.title}</h3>
                <p className="text-xs font-body text-white/45 leading-relaxed">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
