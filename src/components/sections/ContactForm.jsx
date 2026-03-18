import { useState } from 'react'
import { motion } from 'framer-motion'

const inputClass =
  'w-full bg-dark-800 border border-white/10 px-4 py-3.5 text-sm font-body text-white placeholder-white/30 focus:outline-none focus:border-blue-500/60 transition-colors duration-200'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate submission — replace with real endpoint
    await new Promise((r) => setTimeout(r, 1500))
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="w-16 h-16 border border-blue-500/40 flex items-center justify-center mb-6">
          <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-normal text-white mb-3">¡Mensaje enviado!</h3>
        <p className="text-sm font-body text-white/50 max-w-xs">
          Nos pondremos en contacto contigo en menos de 24 horas. ¡Gracias por confiar en Eventos Vórtice!
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Formulario de contacto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="name" className="sr-only">Nombre completo</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Nombre completo *"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email *"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
            autoComplete="email"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="phone" className="sr-only">Teléfono</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Teléfono"
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
            autoComplete="tel"
          />
        </div>
        <div>
          <label htmlFor="service" className="sr-only">Tipo de evento</label>
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={handleChange}
            className={`${inputClass} appearance-none`}
          >
            <option value="" disabled>Tipo de evento</option>
            <option value="corporativo">Evento corporativo</option>
            <option value="empresa">Evento de empresa</option>
            <option value="privado">Evento privado</option>
            <option value="ayuntamiento">Evento municipal</option>
            <option value="otro">Otro</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="sr-only">Mensaje</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Cuéntanos tu evento: fecha aproximada, número de asistentes, necesidades especiales... *"
          value={form.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-primary w-full justify-center text-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Enviando...
          </>
        ) : (
          <>
            Enviar solicitud
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </>
        )}
      </button>

      <p className="text-xs font-mono text-white/25 mt-4 text-center">
        Tus datos son confidenciales. Respondemos en menos de 24h.
      </p>
    </form>
  )
}
