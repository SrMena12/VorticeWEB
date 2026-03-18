import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import LogoVortice from '../ui/LogoVortice'
import { events } from '../../data/events'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false); setDropdownOpen(false) }, [location])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? 'bg-dark-900/96 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/50' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="Eventos Vórtice — Inicio">
            <LogoVortice size={36} className="transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col leading-none">
              <span className="font-display text-base md:text-lg text-gradient-blue tracking-wider">EVENTOS</span>
              <span className="font-display text-base md:text-lg font-light text-white tracking-widest">VÓRTICE</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Navegación principal">
            <NavLink to="/" end className={({isActive}) => `text-xs font-body font-medium tracking-widest uppercase transition-colors ${isActive ? 'text-blue-400' : 'text-white/65 hover:text-white'}`}>
              Inicio
            </NavLink>
            {/* Events dropdown */}
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1.5 text-xs font-body font-medium tracking-widest uppercase text-white/65 hover:text-blue-400 transition-colors">
                Eventos
                <svg className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-3 w-64 bg-dark-800 border border-white/10 shadow-2xl shadow-black/60 overflow-hidden"
                  >
                    {events.map(event => (
                      <Link key={event.id} to={`/eventos/${event.slug}`}
                        className="flex items-center gap-3 px-4 py-3 border-b border-white/5 last:border-0 hover:bg-blue-500/8 group transition-colors"
                      >
                        <span className={`badge ${event.categoryColor === 'fire' ? 'badge-fire' : ''} text-[9px] flex-shrink-0`}>{event.category}</span>
                        <span className="text-xs font-heading font-semibold text-white/75 group-hover:text-blue-300 transition-colors truncate">{event.title}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <a href="/#adventrix" className="text-xs font-body font-medium tracking-widest uppercase text-white/65 hover:text-blue-400 transition-colors">
              Adventrix
            </a>
            <Link to="/contacto" className="text-xs font-body font-medium tracking-widest uppercase text-white/65 hover:text-blue-400 transition-colors">
              Contacto
            </Link>
            <Link to="/contacto" className="btn-primary text-xs">
              ¡Quiero mi evento!
            </Link>
          </nav>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}>
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-dark-900/98 backdrop-blur-md border-t border-white/5"
          >
            <nav className="container-custom py-6 flex flex-col gap-1">
              <Link to="/" className="py-3 text-sm font-heading font-semibold text-white/70 border-b border-white/5">Inicio</Link>
              <div className="py-3 border-b border-white/5">
                <p className="text-xs font-mono tracking-widest uppercase text-blue-400 mb-3">Eventos</p>
                <div className="grid grid-cols-2 gap-2">
                  {events.map(event => (
                    <Link key={event.id} to={`/eventos/${event.slug}`}
                      className="py-1.5 px-3 text-xs font-body text-white/60 bg-dark-800 hover:text-blue-400 hover:bg-blue-500/5 transition-all truncate">
                      {event.title}
                    </Link>
                  ))}
                </div>
              </div>
              <a href="/#adventrix" className="py-3 text-sm font-heading font-semibold text-white/70 border-b border-white/5">Adventrix Toledo</a>
              <Link to="/contacto" className="py-3 text-sm font-heading font-semibold text-white/70 border-b border-white/5">Contacto</Link>
              <Link to="/contacto" className="btn-primary text-xs mt-5 justify-center">¡Quiero mi evento!</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
