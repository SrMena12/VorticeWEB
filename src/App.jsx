import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import EventoDetalle from './pages/EventoDetalle'
import Contacto from './pages/Contacto'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <Router>
      <div className="grain" aria-hidden="true" />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eventos/:slug" element={<EventoDetalle />} />
        <Route path="/contacto" element={<Contacto />} />
        {/* Legacy URL redirects to new event pages */}
        <Route path="/eventos-corporativos-toledo" element={<Navigate to="/eventos/eventos-corporativos-toledo" replace />} />
        <Route path="/eventos-empresa-toledo" element={<Navigate to="/eventos/team-building-toledo" replace />} />
        <Route path="/eventos-privados-toledo" element={<Navigate to="/eventos/eventos-privados-toledo" replace />} />
        <Route path="/eventos-ayuntamientos" element={<Navigate to="/eventos/eventos-ayuntamientos-toledo" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  )
}
