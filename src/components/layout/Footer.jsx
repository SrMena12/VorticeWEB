import { Link } from 'react-router-dom'
import LogoVortice from '../ui/LogoVortice'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark-900 border-t border-white/5 pt-16 pb-8" role="contentinfo">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5 group w-fit">
              <LogoVortice size={36} />
              <div className="flex flex-col leading-none">
                <span className="font-display text-lg font-semibold text-gradient-blue tracking-wider">EVENTOS</span>
                <span className="font-display text-lg font-light text-white tracking-widest">VÓRTICE</span>
              </div>
            </Link>
            <p className="text-sm text-white/45 leading-relaxed mb-5 font-body">
              Creadores de experiencias únicas en Toledo. Más de 20 años transformando momentos en recuerdos.
            </p>
            {/* Adventrix badge */}
            <a
              href="https://www.adventrix.es"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 border border-blue-500/20 bg-blue-500/5 text-xs font-mono text-blue-400/70 hover:text-blue-400 hover:border-blue-500/40 transition-all mb-4"
            >
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              Partner: Adventrix Toledo
            </a>
            {/* WhatsApp */}
            <div>
              <a
                href="https://wa.me/34925000000?text=Hola,%20me%20interesa%20solicitar%20información%20sobre%20organización%20de%20eventos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-xs tracking-wider hover:bg-[#25D366]/20 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-body font-medium tracking-widest uppercase text-blue-400 mb-5">Servicios</h3>
            <ul className="space-y-3">
              {[
                { label: 'Eventos Corporativos', href: '/eventos-corporativos-toledo' },
                { label: 'Eventos de Empresa', href: '/eventos-empresa-toledo' },
                { label: 'Eventos Privados', href: '/eventos-privados-toledo' },
                { label: 'Eventos Ayuntamientos', href: '/eventos-ayuntamientos' },
              ].map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-white/45 hover:text-blue-400 transition-colors duration-200 font-body">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-body font-medium tracking-widest uppercase text-blue-400 mb-5">Empresa</h3>
            <ul className="space-y-3">
              {[
                { label: 'Inicio', href: '/' },
                { label: 'Portfolio', href: '/#portfolio' },
                { label: 'Testimonios', href: '/#testimonios' },
                { label: 'Adventrix Toledo', href: '/#adventrix' },
                { label: 'FAQ', href: '/#faq' },
                { label: 'Contacto', href: '/contacto' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-white/45 hover:text-blue-400 transition-colors duration-200 font-body">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-body font-medium tracking-widest uppercase text-blue-400 mb-5">Contacto</h3>
            <address className="not-italic space-y-3">
              <p className="flex items-start gap-2.5 text-sm text-white/45 font-body">
                <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Calle Alegría 48<br />45008 Toledo, España
              </p>
              <a href="tel:+34925000000" className="flex items-center gap-2.5 text-sm text-white/45 hover:text-blue-400 transition-colors font-body">
                <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +34 925 000 000
              </a>
              <a href="mailto:info@eventosvortice.com" className="flex items-center gap-2.5 text-sm text-white/45 hover:text-blue-400 transition-colors font-body">
                <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@eventosvortice.com
              </a>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/25 font-body">
            © {year} Eventos Vórtice. Todos los derechos reservados.
          </p>
          <p className="text-xs text-white/25 font-body">
            Organización de eventos en Toledo · Partner Adventrix Toledo
          </p>
        </div>
      </div>
    </footer>
  )
}
