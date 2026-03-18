import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const adventrixServices = [
  { icon: '💻', title: 'Transformación Digital', description: 'Soluciones tecnológicas que modernizan procesos y optimizan la gestión.' },
  { icon: '🧭', title: 'Consultoría Organizacional', description: 'Estrategia, eficiencia y cultura para equipos y organizaciones.' },
  { icon: '💡', title: 'Innovación y Proyectos', description: 'Diseño y gestión de proyectos innovadores para entidades públicas y privadas.' },
  { icon: '🎓', title: 'Formación y Talento', description: 'Programas de liderazgo, desarrollo profesional y formación corporativa.' },
]

export default function Adventrix() {
  const [ref, inView] = useInView({ threshold: 0.1 })
  return (
    <section id="adventrix" className="section-padding relative overflow-hidden bg-dark-900" ref={ref}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: 'radial-gradient(ellipse at 15% 60%, rgba(29,111,232,0.07) 0%, transparent 60%)' }} />
      <div className="container-custom relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-blue-500/25 bg-blue-500/5 mb-6">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-xs font-mono tracking-widest uppercase text-blue-400">Partner estratégico</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <div>
              <h2 className="font-display text-5xl md:text-6xl text-white tracking-wide leading-none">
                ADVENTRIX<br /><span className="text-gradient-blue">TOLEDO</span>
              </h2>
            </div>
            <p className="text-sm font-body text-white/50 leading-relaxed">
              Eventos Vórtice colabora con <strong className="text-white/75 font-semibold">Adventrix Toledo</strong>, organización de referencia en consultoría, transformación digital e innovación en Castilla-La Mancha. Juntos ofrecemos una propuesta integral que combina eventos de impacto con soluciones estratégicas.
            </p>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {adventrixServices.map((s, i) => (
            <motion.div key={s.title}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-5 bg-dark-800 border border-white/5 hover:border-blue-500/20 transition-all group"
            >
              <div className="text-2xl mb-3">{s.icon}</div>
              <h3 className="font-heading font-bold text-sm text-white mb-1.5">{s.title}</h3>
              <p className="text-xs font-body text-white/40 leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-6 border border-blue-500/20 bg-blue-500/4"
        >
          <div>
            <p className="font-heading font-semibold text-white mb-1">¿Tu empresa necesita también apoyo estratégico?</p>
            <p className="text-xs font-mono text-white/30 tracking-wide">Descubre cómo Adventrix Toledo puede transformar tu organización</p>
          </div>
          <a href="https://www.adventrix.es" target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 border border-blue-500/40 text-blue-400 text-xs font-mono tracking-widest uppercase hover:bg-blue-500/10 hover:border-blue-400 transition-all">
            Conocer Adventrix
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
