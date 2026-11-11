export const SITE = {
  name: 'Vórtice Eventos',
  url: 'https://www.eventosvortice.com',
  phone: '696 035 857',
  phoneHref: 'tel:+34696035857',
  whatsapp: 'https://wa.me/34696035857',
  email: 'info@eventosvortice.com',
  street: 'Calle Alegría 48',
  postal: '45008',
  city: 'Toledo',
  instagram: 'https://www.instagram.com/vortice_eventos/',
  facebook: 'https://www.facebook.com/profile.php?id=100076174573601',
  adventrix: 'https://www.adventrix.es/',
};

export type Service = {
  slug: string;
  group: 'empresas' | 'privados' | 'ayuntamientos';
  title: string;
  short: string;
  h1: string;
  metaTitle: string;
  metaDesc: string;
  color: string;
  points: string[];
  intro: string;
};

export const ACCENT: Record<string, [string, string]> = {
  'team-building-toledo': ['#0a7bb0', '#2f6fe0'],
  'fiestas-de-empresa-toledo': ['#e08a00', '#ffc933'],
  'formacion-empresas-toledo': ['#0f9f93', '#3ee0d0'],
  'despedidas-de-soltero-toledo': ['#e0523f', '#ff8a6b'],
  'celebraciones-toledo': ['#2f6fe0', '#0a7bb0'],
  'fiestas-tematicas-toledo': ['#0a7bb0', '#0f9f93'],
  'escape-y-justas-medievales-ayuntamientos': ['#0f9f93', '#0a7bb0'],
};

export const GROUPS = {
  empresas: { label: 'Para empresas', blurb: 'Equipos que se cohesionan, empleados que se divierten.' },
  privados: { label: 'Eventos privados', blurb: 'Tú lo sueñas, nosotros lo hacemos realidad.' },
  ayuntamientos: { label: 'Ayuntamientos', blurb: 'Dinamización cultural y festiva para tu municipio.' },
} as const;

export const SERVICES: Service[] = [
  {
    slug: 'team-building-toledo', group: 'empresas', title: 'Team building', color: 'bg-volt text-white',
    short: 'Equipos motivados y cohesionados. La mejor inversión: el capital humano.',
    h1: 'Team building en Toledo',
    metaTitle: 'Team building en Toledo para empresas | Vórtice Eventos',
    metaDesc: 'Team building en Toledo a medida: gymkhanas, retos y dinámicas para equipos de empresa. Pide presupuesto sin compromiso a Vórtice Eventos.',
    intro: 'Diseñamos dinámicas de cohesión de equipo en Toledo y su provincia, adaptadas al tamaño, objetivos y presupuesto de tu empresa.',
    points: ['Gymkhanas y retos por equipos', 'Dinámicas de comunicación y liderazgo', 'En tu oficina, en exterior o en espacios singulares de Toledo', 'Monitores propios y material incluido'],
  },
  {
    slug: 'fiestas-de-empresa-toledo', group: 'empresas', title: 'Fiestas de empresa', color: 'bg-pop text-white',
    short: 'Fiesta «todo incluido» para empleados y familias, en tus instalaciones o en nuestros espacios.',
    h1: 'Fiestas de empresa en Toledo',
    metaTitle: 'Fiestas de empresa en Toledo | Vórtice Eventos',
    metaDesc: 'Organizamos fiestas de empresa en Toledo: cenas de Navidad, jornadas con familias y eventos corporativos todo incluido. Presupuesto sin compromiso.',
    intro: 'Navidad, aniversarios, jornadas con familias: montamos la fiesta completa para que tú solo tengas que disfrutarla.',
    points: ['Todo incluido: espacio, catering, animación y ambientación', 'Para empleados y familiares', 'En tus instalaciones o en espacios privilegiados de Toledo', 'Presupuesto sin compromiso'],
  },
  {
    slug: 'formacion-empresas-toledo', group: 'empresas', title: 'Formación', color: 'bg-mint text-ink',
    short: 'Gestión del estrés, inteligencia emocional y motivación con formadores expertos.',
    h1: 'Formación para empresas en Toledo',
    metaTitle: 'Formación para empresas en Toledo | Vórtice Eventos',
    metaDesc: 'Formación en habilidades para empleados en Toledo: gestión del estrés, inteligencia emocional y motivación. Formadores con amplia experiencia.',
    intro: 'Formadores con amplia experiencia en habilidades de empleados. Cuéntanos tus necesidades y nos encargamos de todo.',
    points: ['Gestión del estrés', 'Inteligencia emocional', 'Motivación y trabajo en equipo', 'Formato a medida, presencial en tu empresa'],
  },
  {
    slug: 'despedidas-de-soltero-toledo', group: 'privados', title: 'Despedidas', color: 'bg-sun text-ink',
    short: 'Despedidas de soltero/a con actividades, barra libre, comida y aperitivos.',
    h1: 'Despedidas de soltero y soltera en Toledo',
    metaTitle: 'Despedidas de soltero y soltera en Toledo | Vórtice Eventos',
    metaDesc: 'Despedidas de soltero y soltera en Toledo con actividades divertidas, barra libre, comida y aperitivos. Pide tu presupuesto.',
    intro: 'Una despedida que no se olvida: actividades, juegos y fiesta con todo organizado.',
    points: ['Actividades divertidas para el grupo', 'Barra libre, comida y aperitivos', 'Organización completa', 'Para soltero, soltera o ambos'],
  },
  {
    slug: 'celebraciones-toledo', group: 'privados', title: 'Celebraciones', color: 'bg-pop text-white',
    short: 'Cumpleaños, aniversarios y reuniones con amigos y familia, todo incluido.',
    h1: 'Celebraciones y eventos privados en Toledo',
    metaTitle: 'Celebraciones y fiestas privadas en Toledo | Vórtice Eventos',
    metaDesc: 'Organizamos celebraciones privadas en Toledo para amigos y familia: cumpleaños, aniversarios y reuniones, todo incluido.',
    intro: 'Cumpleaños, aniversarios, reencuentros. Tú pones las ganas, nosotros todo lo demás.',
    points: ['Evento «todo incluido»', 'Espacios privilegiados en Toledo', 'Cuidamos hasta el último detalle', 'Presupuesto sin compromiso'],
  },
  {
    slug: 'fiestas-tematicas-toledo', group: 'privados', title: 'Fiestas temáticas', color: 'bg-volt text-white',
    short: 'Fiestas tematizadas con todos los detalles. Tú propones, nosotros lo hacemos.',
    h1: 'Fiestas temáticas en Toledo',
    metaTitle: 'Fiestas temáticas en Toledo | Vórtice Eventos',
    metaDesc: 'Fiestas temáticas en Toledo con decoración, ambientación y animación. Tú lanzas la idea y nosotros nos encargamos del resto.',
    intro: 'Medieval, años 80, casino, lo que se te ocurra: ambientamos y animamos la fiesta temática de tus sueños.',
    points: ['Decoración y ambientación completa', 'Animación y juegos', 'Tú propones el tema', 'Producción llave en mano'],
  },
  {
    slug: 'escape-y-justas-medievales-ayuntamientos', group: 'ayuntamientos', title: 'Escape y Justas Medievales', color: 'bg-mint text-ink',
    short: 'Gamificación para conocer la historia del pueblo y justas medievales para todos los públicos.',
    h1: 'Escape urbano y justas medievales para ayuntamientos',
    metaTitle: 'Eventos para ayuntamientos: escape y justas | Vórtice',
    metaDesc: 'Eventos para ayuntamientos en Toledo y Castilla-La Mancha: escape urbano, justas medievales y club de lectura. Dinamización cultural y festiva.',
    intro: 'Convertimos tu localidad en un escenario: juegos de escape que cuentan su historia y justas medievales para todos los públicos.',
    points: ['Escape urbano con la historia local', 'Justas medievales con juegos de todo tipo', 'Club de lectura dinamizado', 'Aptos para todos los públicos'],
  },
];

export const PHOTO: Record<string, { src: string; alt: string; pos?: string }> = {
  'team-building-toledo': { src: '/img/serv-team-building-toledo.webp', alt: 'Compañeros de trabajo jugando en equipo al aire libre en una actividad de team building' },
  'fiestas-de-empresa-toledo': { src: '/img/serv-fiestas-de-empresa-toledo.webp', alt: 'Empleados brindando en una fiesta de empresa', pos: 'center 30%' },
  'formacion-empresas-toledo': { src: '/img/serv-formacion-empresas-toledo.webp', alt: 'Grupo de profesionales participando en una sesión de formación' },
  'despedidas-de-soltero-toledo': { src: '/img/serv-despedidas-de-soltero-toledo.webp', alt: 'Grupo de amigas celebrando una despedida de soltera' },
  'celebraciones-toledo': { src: '/img/serv-celebraciones-toledo.webp', alt: 'Amigos celebrando un cumpleaños con gorros y globos' },
  'fiestas-tematicas-toledo': { src: '/img/serv-fiestas-tematicas-toledo.webp', alt: 'Grupo de personas con disfraces en una fiesta temática' },
  'escape-y-justas-medievales-ayuntamientos': { src: '/img/evento-calle.webp', alt: 'Dinamización con juegos en la calle de un municipio de Toledo' },
};
