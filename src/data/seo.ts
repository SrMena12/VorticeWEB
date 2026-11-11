// Contenido SEO ampliado por servicio: para quién es, cómo trabajamos y preguntas frecuentes.
export type Extra = { who: string[]; how: string[]; faqs: [string, string][]; };

export const EXTRA: Record<string, Extra> = {
  'team-building-toledo': {
    who: ['Equipos de trabajo que quieren conocerse mejor', 'Departamentos que acaban de incorporar gente nueva', 'Empresas que organizan una jornada de convivencia', 'Asociaciones y grupos que buscan cohesión'],
    how: ['Hablamos contigo para entender el objetivo del grupo', 'Diseñamos la dinámica y el recorrido a medida', 'Llevamos monitores y material al lugar que elijas', 'Dinamizamos la jornada y cerramos con una puesta en común'],
    faqs: [
      ['¿Qué actividades de team building hacéis en Toledo?', 'Gymkhanas, retos por equipos y dinámicas de comunicación y liderazgo, en tu empresa, al aire libre o en espacios singulares de Toledo. Siempre a medida.'],
      ['¿Para cuántas personas se puede organizar?', 'Adaptamos la actividad al tamaño del grupo. Cuéntanos cuántos sois y te proponemos el formato más adecuado.'],
      ['¿Cuánto cuesta un team building?', 'Depende del número de personas, la duración y el espacio. Preparamos un presupuesto a medida y sin compromiso.'],
    ],
  },
  'fiestas-de-empresa-toledo': {
    who: ['Empresas que quieren celebrar la Navidad o un aniversario', 'Equipos que organizan una jornada con familias', 'Departamentos de RR.HH. que buscan un evento redondo', 'Pymes de Toledo y provincia'],
    how: ['Nos cuentas fecha, número de asistentes y estilo', 'Proponemos espacio, ambientación y animación', 'Coordinamos proveedores y montaje', 'Estamos el día del evento para que todo fluya'],
    faqs: [
      ['¿Organizáis fiestas de empresa «todo incluido»?', 'Sí. Nos encargamos del espacio, la ambientación y la animación para que solo tengas que disfrutar de la fiesta.'],
      ['¿Se puede hacer en nuestras instalaciones?', 'Sí. Podemos montar la fiesta en tus instalaciones o en espacios privilegiados de Toledo.'],
      ['¿Con cuánta antelación hay que contactar?', 'Cuanto antes mejor, sobre todo en fechas de mucha demanda como la Navidad. Escríbenos y te decimos disponibilidad.'],
    ],
  },
  'formacion-empresas-toledo': {
    who: ['Equipos con estrés o sobrecarga de trabajo', 'Mandos intermedios que quieren mejorar su liderazgo', 'Empresas que buscan motivar a su plantilla', 'Departamentos de RR.HH. en Toledo y provincia'],
    how: ['Analizamos tus necesidades formativas', 'Diseñamos el programa a medida', 'Formadores con amplia experiencia lo imparten en tu empresa', 'Te damos conclusiones y recomendaciones'],
    faqs: [
      ['¿Qué formaciones ofrecéis para empresas?', 'Formación en habilidades para empleados: gestión del estrés, inteligencia emocional y motivación, entre otras.'],
      ['¿La formación es presencial?', 'Sí, nos desplazamos a tu empresa en Toledo y su provincia. Cuéntanos tus necesidades y lo planteamos.'],
      ['¿Se puede combinar con un team building?', 'Claro. Muchas empresas unen una sesión formativa con una dinámica de equipo en la misma jornada.'],
    ],
  },
  'despedidas-de-soltero-toledo': {
    who: ['Grupos de amigas que despiden a la novia', 'Grupos de amigos que despiden al novio', 'Despedidas mixtas', 'Familias y amigos que quieren sorprender'],
    how: ['Nos cuentas cuántos sois y qué ambiente buscáis', 'Os proponemos actividades, comida y bebida', 'Organizamos todo para el día elegido', 'Vosotros solo tenéis que disfrutar'],
    faqs: [
      ['¿Qué incluye una despedida de soltero/a con Vórtice?', 'Actividades divertidas para el grupo, barra libre, comida y aperitivos, con todo organizado.'],
      ['¿Se pueden hacer despedidas de soltero y de soltera?', 'Sí, de soltero, de soltera o mixtas. Adaptamos las actividades al grupo.'],
      ['¿Cómo pido presupuesto?', 'Por WhatsApp, teléfono o con el formulario. Dinos cuántos sois y la fecha aproximada.'],
    ],
  },
  'celebraciones-toledo': {
    who: ['Familias que celebran un cumpleaños o aniversario', 'Grupos de amigos', 'Reencuentros y comuniones', 'Cualquier celebración privada en Toledo'],
    how: ['Nos cuentas qué se celebra y cuántos vais', 'Elegimos espacio y estilo', 'Organizamos catering, ambientación y animación', 'Cuidamos hasta el último detalle'],
    faqs: [
      ['¿Qué tipos de celebración organizáis?', 'Cumpleaños, aniversarios, reuniones con amigos y familia, siempre en formato todo incluido.'],
      ['¿En qué espacios se pueden celebrar?', 'Trabajamos en espacios privilegiados de Toledo, como el Cigarral de la Peraleda, y en otros que nos indiques.'],
      ['¿Hay presupuesto sin compromiso?', 'Sí. Cuéntanos tu idea y te enviamos una propuesta sin compromiso.'],
    ],
  },
  'fiestas-tematicas-toledo': {
    who: ['Cumpleaños y celebraciones con un tema concreto', 'Empresas que quieren una fiesta diferente', 'Grupos de amigos con ganas de disfrazarse', 'Eventos especiales en Toledo'],
    how: ['Tú propones el tema', 'Diseñamos decoración y ambientación', 'Añadimos animación y juegos', 'Montamos y desmontamos todo'],
    faqs: [
      ['¿Qué temáticas podéis hacer?', 'Las que se te ocurran: tú lanzas la propuesta y nosotros nos encargamos del resto, con todos los detalles.'],
      ['¿Incluye decoración?', 'Sí, la fiesta temática incluye ambientación y decoración acorde al tema elegido.'],
      ['¿Podéis hacerlo en mi local o jardín?', 'Sí, nos adaptamos al espacio que tengas o te proponemos uno.'],
    ],
  },
  'escape-y-justas-medievales-ayuntamientos': {
    who: ['Ayuntamientos que quieren dinamizar fiestas y ferias', 'Concejalías de cultura, juventud y turismo', 'Bibliotecas y centros culturales', 'Municipios de la provincia de Toledo'],
    how: ['Estudiamos la historia y el espacio de tu localidad', 'Diseñamos el juego de escape o las justas', 'Aportamos equipo, material y monitores', 'Dinamizamos la jornada para todos los públicos'],
    faqs: [
      ['¿Qué es un escape urbano?', 'Una dinámica de gamificación por el municipio en la que los participantes conocen su historia de forma lúdica.'],
      ['¿En qué consisten las justas medievales?', 'Convertimos la localidad en una recreación de justas medievales con juegos de todo tipo, aptas para todos los públicos.'],
      ['¿Dinamizáis clubes de lectura?', 'Sí. Aprender jugando es nuestra máxima: dinamizamos el club de lectura para que los participantes se diviertan leyendo.'],
    ],
  },
};

export const AREAS = ['Toledo capital', 'Olías del Rey', 'Villaseca de la Sagra', 'Illescas', 'Bargas', 'Seseña', 'Torrijos', 'Sonseca', 'Talavera de la Reina', 'Consuegra'];
