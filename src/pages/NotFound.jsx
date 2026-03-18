import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEOHead from '../components/ui/SEOHead'

export default function NotFound() {
  return (
    <>
      <SEOHead title="Página no encontrada" />
      <main className="min-h-screen flex items-center justify-center bg-dark-900 pt-20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="font-display text-[10rem] md:text-[15rem] font-bold text-gradient-blue leading-none select-none mb-4">
              404
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-light text-white mb-4">
              Página no encontrada
            </h1>
            <p className="text-sm font-body text-white/40 mb-8 max-w-md mx-auto">
              Lo sentimos, la página que buscas no existe o ha sido movida.
            </p>
            <Link to="/" className="btn-primary">
              Volver al inicio
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  )
}
