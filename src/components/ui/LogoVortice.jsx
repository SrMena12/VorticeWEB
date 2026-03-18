/**
 * Logo Vórtice — SVG inline del logotipo (espiral/torno azul sobre círculo blanco)
 * Reproduces the visual style: white circle bg + blue gradient vortex shape
 */
export default function LogoVortice({ size = 40, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Logo Eventos Vórtice"
      role="img"
    >
      <defs>
        <radialGradient id="logoGrad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e40af" />
        </radialGradient>
        <clipPath id="circleClip">
          <circle cx="50" cy="50" r="46" />
        </clipPath>
      </defs>
      {/* White circle background */}
      <circle cx="50" cy="50" r="48" fill="white" />
      <circle cx="50" cy="50" r="48" fill="none" stroke="#e2e8f0" strokeWidth="1" />
      {/* Vortex / spiral shape */}
      <g clipPath="url(#circleClip)" fill="url(#logoGrad)">
        {/* Main vortex body — stylized spiral path */}
        <path d="
          M50,20
          C62,20 74,28 76,42
          C78,56 68,66 58,68
          C52,69 46,67 42,63
          L48,56
          C51,59 56,60 60,58
          C66,55 70,48 68,41
          C66,34 58,29 50,30
          C38,30 28,40 30,53
          C31,60 36,66 42,70
          L36,77
          C27,71 20,61 20,50
          C20,34 34,20 50,20Z
        " />
        {/* Inner spiral tail */}
        <path d="
          M44,63
          C40,58 38,52 40,46
          C42,40 48,36 54,38
          C59,40 62,46 60,51
          C58,55 54,57 50,56
          L48,63
          C50,64 52,64 54,63
          C62,60 67,52 65,44
          C63,36 55,30 47,32
          C39,34 33,42 34,50
          C35,57 39,63 44,69
          Z
        " opacity="0.7"/>
        {/* Checkmark / tick element at top right */}
        <path d="M58,22 L72,34 L88,16 L82,12 L72,26 L64,18 Z" opacity="0.9"/>
      </g>
    </svg>
  )
}
