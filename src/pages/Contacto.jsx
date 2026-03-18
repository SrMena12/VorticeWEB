import { motion } from 'framer-motion'
import SEOHead from '../components/ui/SEOHead'
import ContactForm from '../components/sections/ContactForm'

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Dirección',
    value: 'Calle Alegría 48, 45008 Toledo, España',
    href: 'https://maps.google.com/?q=Calle+Alegría+48+Toledo',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: 'Teléfono',
    value: '+34 925 000 000',
    href: 'tel:+34925000000',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email',
    value: 'info@eventosvortice.com',
    href: 'mailto:info@eventosvortice.com',
  },
]

export default function Contacto() {
  return (
    <>
      <SEOHead
        title="Contacto | Organización de Eventos en Toledo"
        description="Contacta con Eventos Vórtice en Toledo. Solicita tu presupuesto personalizado para eventos corporativos, privados y municipales. Calle Alegría 48, Toledo."
        canonical="/contacto"
      />

      <main id="main-content" className="pt-20 bg-dark-900 min-h-screen">
        {/* Hero */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0" aria-hidden="true"
            style={{ backgroundImage: 'radial-gradient(ellipse at 30% 50%, rgba(37,99,235,0.06) 0%, transparent 60%)' }}
          />
          <div className="container-custom relative z-10">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
              className="flex items-center gap-3 mb-5">
              <div className="blue-line" />
              <span className="text-xs font-mono tracking-widest uppercase text-blue-400">Contacto</span>
            </motion.div>
            <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-white mb-4">
              Hablemos de tu{' '}
              <span className="text-gradient-blue font-semibold">próximo evento</span>
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
              className="text-base font-body font-light text-white/50 max-w-xl leading-relaxed">
              Cuéntanos tu proyecto y te prepararemos una propuesta personalizada en menos de 24 horas.
            </motion.p>
          </div>
        </section>

        {/* Content */}
        <section className="pb-24">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="lg:col-span-3"
              >
                <div className="p-8 md:p-10 bg-dark-800 border border-white/5">
                  <h2 className="font-display text-2xl font-normal text-white mb-8">
                    Solicitar presupuesto
                  </h2>
                  <ContactForm />
                </div>
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="lg:col-span-2 flex flex-col gap-8"
              >
                {/* Contact info */}
                <div>
                  <h2 className="font-display text-xl font-normal text-white mb-6">Información de contacto</h2>
                  <address className="not-italic space-y-5">
                    {contactInfo.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-start gap-4 group"
                      >
                        <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-blue-500 flex-shrink-0 group-hover:border-blue-500/40 transition-colors">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-xs font-mono text-white/30 mb-0.5 tracking-wider">{item.label}</div>
                          <div className="text-sm font-body text-white/70 group-hover:text-blue-400 transition-colors">{item.value}</div>
                        </div>
                      </a>
                    ))}
                  </address>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/34925000000?text=Hola,%20me%20gustaría%20solicitar%20información%20sobre%20organización%20de%20eventos%20en%20Toledo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 bg-[#25D366]/8 border border-[#25D366]/25 hover:bg-[#25D366]/15 transition-all group"
                >
                  <div className="w-10 h-10 bg-[#25D366]/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-body font-medium text-white group-hover:text-[#25D366] transition-colors">
                      Escríbenos por WhatsApp
                    </div>
                    <div className="text-xs font-mono text-white/30 mt-0.5">Respuesta inmediata</div>
                  </div>
                  <svg className="w-4 h-4 text-white/20 ml-auto group-hover:text-[#25D366] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                {/* Hours */}
                <div className="p-6 border border-white/5 bg-dark-800">
                  <h3 className="text-xs font-mono tracking-widest uppercase text-blue-400 mb-4">Horario de atención</h3>
                  <div className="space-y-2">
                    {[
                      { day: 'Lunes – Viernes', hours: '09:00 – 18:00' },
                      { day: 'Sábados', hours: '10:00 – 14:00' },
                      { day: 'Domingos', hours: 'Cerrado' },
                    ].map((h) => (
                      <div key={h.day} className="flex justify-between text-sm font-body">
                        <span className="text-white/50">{h.day}</span>
                        <span className="text-white/70">{h.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Google Maps embed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-14"
            >
              <h2 className="font-display text-xl font-normal text-white mb-5">Dónde encontrarnos</h2>
              <div className="relative w-full h-72 md:h-96 border border-white/5 overflow-hidden">
                <iframe
                  title="Ubicación Eventos Vórtice en Toledo"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3107.7661898!2d-4.0273!3d39.8628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDUxJzQ2LjEiTiA0wrAwMScyMy4zIlc!5e0!3m2!1ses!2ses!4v1234567890"
                  className="w-full h-full grayscale opacity-80"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  aria-label="Mapa de ubicación de Eventos Vórtice en Calle Alegría 48, Toledo"
                />
                {/* Map overlay */}
                <div className="absolute inset-0 pointer-events-none border border-blue-500/10" />
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
