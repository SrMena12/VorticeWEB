import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const clients = ['Ayuntamiento de Toledo','Diputación Provincial','Junta CLM','Hospital Virgen de la Salud','UCLM','Toledo CF','Cámara de Comercio','Fundación El Greco','Adventrix Toledo','Ibercaja','CLM Universidades']

export default function Clients() {
  const [ref, inView] = useInView({ threshold: 0.1 })
  return (
    <section id="clientes" className="py-14 bg-dark-800 border-y border-white/5 overflow-hidden" ref={ref}>
      <div className="container-custom mb-6 text-center">
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
          className="text-xs font-mono tracking-widest uppercase text-white/25">
          Confían en nosotros
        </motion.p>
      </div>
      <div className="relative overflow-hidden">
        <div className="flex animate-[scroll_28s_linear_infinite] gap-12 w-max">
          {[...clients, ...clients].map((c, i) => (
            <div key={i} className="flex items-center gap-3 whitespace-nowrap">
              <div className="w-1 h-1 bg-blue-500/40 rounded-full" />
              <span className="font-heading font-semibold text-base text-white/25 hover:text-white/60 transition-colors">{c}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes scroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
    </section>
  )
}
