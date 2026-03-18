import SEOHead from '../components/ui/SEOHead'
import Hero from '../components/sections/Hero'
import Services from '../components/sections/Services'
import Benefits from '../components/sections/Benefits'
import Process from '../components/sections/Process'
import Clients from '../components/sections/Clients'
import Testimonials from '../components/sections/Testimonials'
import Adventrix from '../components/sections/Adventrix'
import FAQ from '../components/sections/FAQ'
import CTAFinal from '../components/sections/CTAFinal'

export default function Home() {
  return (
    <>
      <SEOHead
        title="Organización de Eventos en Toledo | Eventos Vórtice"
        description="Team buildings, justas medievales, escape rooms gamificados y eventos corporativos únicos en Toledo. Más de 20 años de experiencia. ¡Solicita tu presupuesto!"
        canonical="/"
      />
      <main id="main-content">
        <Hero />
        <Services />
        <Benefits />
        <Process />
        <Clients />
        <Testimonials />
        <Adventrix />
        <FAQ />
        <CTAFinal />
      </main>
    </>
  )
}
