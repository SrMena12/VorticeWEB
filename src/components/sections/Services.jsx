import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { events } from '../../data/events'

export default function Services() {
  const [ref, inView] = useInView({ threshold: 0.05 })

  return (
    <section id="eventos" className="section-padding bg-dark-900" ref={ref} aria-labelledby="events-heading">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="blue-line" />
              <span className="text-xs font-mono tracking-widest uppercase text-blue-400">Nuestras experiencias</span>
            </div>
            <h2 id="events-heading" className="font-display text-5xl md:text-7xl text-white leading-none tracking-wide">
              QUÉ<br />
              <span className="text-gradient-blue">HACEMOS</span>
            </h2>
          </div>
          <p className="text-sm font-body text-white/45 max-w-xs leading-relaxed">
            Cada evento es una aventura diferente. Elige la tuya o cuéntanos qué tienes en mente.
          </p>
        </motion.div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                to={`/eventos/${event.slug}`}
                className="card-event group block bg-dark-800 h-full"
                aria-label={`Ver evento: ${event.title}`}
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[16/9] img-hover-zoom">
                  <img
                    src={event.heroImg}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
                  {/* Tag */}
                  <div className="absolute top-3 left-3">
                    <span className={`badge ${event.categoryColor === 'fire' ? 'badge-fire' : ''} text-[10px]`}>
                      {event.tag}
                    </span>
                  </div>
                  {/* Category */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase bg-dark-900/70 text-white/60 border border-white/10">
                      {event.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-heading font-bold text-lg text-white group-hover:text-blue-300 transition-colors leading-tight">
                      {event.title}
                    </h3>
                    <svg
                      className="w-4 h-4 text-white/20 group-hover:text-blue-400 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0 mt-1"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                  <p className="text-xs font-body text-white/45 leading-relaxed mb-4 line-clamp-2">
                    {event.shortDesc}
                  </p>
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-[10px] font-mono text-white/30">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {event.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Desde {event.minGroup} personas
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-white/40 mb-4 font-body">
            ¿No encuentras lo que buscas? Diseñamos eventos a medida
          </p>
          <Link to="/contacto" className="btn-primary">
            Cuéntanos tu idea
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
