import { Helmet } from 'react-helmet-async'

export default function SEOHead({ title, description, canonical, ogImage }) {
  const siteName = 'Eventos Vórtice'
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | Organización de Eventos en Toledo`
  const defaultDesc =
    'Empresa de organización de eventos en Toledo. Especialistas en eventos corporativos, privados y municipales. Más de 20 años de experiencia.'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      {canonical && <link rel="canonical" href={`https://www.eventosvortice.com${canonical}`} />}
      {/* OG */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:type" content="website" />
      {canonical && <meta property="og:url" content={`https://www.eventosvortice.com${canonical}`} />}
      <meta property="og:image" content={ogImage || 'https://www.eventosvortice.com/og-image.jpg'} />
      <meta property="og:site_name" content={siteName} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
    </Helmet>
  )
}
