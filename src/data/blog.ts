export type Post = {
  slug: string; title: string; metaTitle: string; desc: string; date: string; readMin: number;
  service: string; // slug del servicio relacionado
  body: { h?: string; p: string }[];
};

export const POSTS: Post[] = [
  {
    slug: 'ideas-team-building-toledo',
    title: '10 ideas de team building en Toledo para tu empresa',
    metaTitle: '10 ideas de team building en Toledo | Vórtice Eventos',
    desc: 'Ideas de team building en Toledo: gymkhanas, retos por equipos, juegos de escape y dinámicas al aire libre para mejorar la cohesión de tu equipo.',
    date: '2026-11-10', readMin: 4, service: 'team-building-toledo',
    body: [
      { p: 'Un buen team building no consiste en «hacer algo divertido»: consiste en que el equipo se conozca, se comunique mejor y salga de la jornada con ganas de trabajar junto. Estas son diez ideas que funcionan especialmente bien en Toledo y su provincia.' },
      { h: '1. Gymkhana por el casco histórico', p: 'Equipos con pruebas, pistas y retos repartidos por el entorno. Combina movimiento, ingenio y trabajo en equipo, y aprovecha el patrimonio de la ciudad como escenario.' },
      { h: '2. Juego de escape urbano', p: 'Los participantes resuelven enigmas relacionados con la historia del lugar. Fomenta la comunicación y el reparto de roles.' },
      { h: '3. Retos por equipos al aire libre', p: 'Pruebas de coordinación, estrategia y puntería que se pueden adaptar a cualquier nivel físico.' },
      { h: '4. Dinámicas de comunicación', p: 'Ejercicios cortos en los que cada miembro tiene una información distinta y el equipo debe ponerla en común para resolver el reto.' },
      { h: '5. Competiciones por equipos', p: 'Un formato clásico: varios equipos, pruebas puntuables y una clasificación final que mantiene la motivación.' },
      { h: '6. Jornada de liderazgo', p: 'Dinámicas que rotan el papel de líder para entender cómo se toman decisiones en grupo.' },
      { h: '7. Taller creativo', p: 'Construir algo entre todos, desde un prototipo hasta una presentación, saca a la luz habilidades que no se ven en el día a día.' },
      { h: '8. Team building + formación', p: 'Combinar una sesión de habilidades (gestión del estrés, inteligencia emocional) con una dinámica práctica refuerza lo aprendido.' },
      { h: '9. Juegos tradicionales y retos divertidos', p: 'Rompen el hielo, bajan la guardia y generan complicidad en pocos minutos.' },
      { h: '10. Cierre con comida o fiesta', p: 'Terminar con una comida o una pequeña fiesta consolida el ambiente distendido de la jornada.' },
      { h: 'Cómo elegir la mejor opción', p: 'Piensa en el objetivo (integrar, motivar, comunicar), el tamaño del grupo y el espacio disponible. Si quieres ayuda, en Vórtice Eventos diseñamos el team building a medida de tu empresa en Toledo: cuéntanos qué necesitas y te preparamos una propuesta sin compromiso.' },
    ],
  },
  {
    slug: 'como-organizar-fiesta-empresa-toledo',
    title: 'Cómo organizar una fiesta de empresa en Toledo sin agobios',
    metaTitle: 'Cómo organizar una fiesta de empresa en Toledo | Vórtice',
    desc: 'Guía práctica para organizar una fiesta o cena de empresa en Toledo: fecha, espacio, presupuesto, animación y qué contratar «todo incluido».',
    date: '2026-11-10', readMin: 4, service: 'fiestas-de-empresa-toledo',
    body: [
      { p: 'Organizar la fiesta de empresa suele recaer en alguien que ya tiene demasiado trabajo. Con un poco de método, se puede hacer sin estrés y con un resultado que la plantilla recuerde.' },
      { h: '1. Define el objetivo y el tipo de evento', p: '¿Cena de Navidad, aniversario, jornada con familias? El objetivo condiciona el espacio, el horario y la animación.' },
      { h: '2. Fija fecha y presupuesto cuanto antes', p: 'En épocas de alta demanda (diciembre sobre todo) los mejores espacios se reservan con mucha antelación. Tener un presupuesto aproximado por persona acelera todo.' },
      { h: '3. Elige el espacio', p: 'Puedes hacerla en tus propias instalaciones o en un espacio singular de Toledo. Piensa en el aforo, el acceso y si habrá niños.' },
      { h: '4. Cuida la animación', p: 'Música, juegos o una dinámica de grupo marcan la diferencia entre una cena y una fiesta que la gente comenta después.' },
      { h: '5. Opta por un formato «todo incluido»', p: 'Contratar una agencia que coordine espacio, ambientación y animación evita tener que gestionar cinco proveedores distintos.' },
      { h: '6. Comunica bien con la plantilla', p: 'Avisa con tiempo, aclara si se puede asistir con familia y recoge posibles alergias o necesidades.' },
      { p: 'En Vórtice Eventos organizamos fiestas de empresa en Toledo con todo incluido, en tus instalaciones o en nuestros espacios. Cuéntanos fecha y número de asistentes y te enviamos una propuesta sin compromiso.' },
    ],
  },
  {
    slug: 'despedida-de-soltero-toledo-ideas',
    title: 'Despedida de soltero o soltera en Toledo: ideas y consejos',
    metaTitle: 'Despedida de soltero o soltera en Toledo: ideas | Vórtice',
    desc: 'Ideas para una despedida de soltero o soltera en Toledo: actividades, comida, barra libre y consejos para organizarla sin complicaciones.',
    date: '2026-11-10', readMin: 3, service: 'despedidas-de-soltero-toledo',
    body: [
      { p: 'Una despedida memorable mezcla actividades divertidas, buena comida y ambiente de fiesta, y deja la logística en manos de alguien que sepa hacerla. Estas son algunas pautas para organizarla en Toledo.' },
      { h: 'Elige un plan con actividad', p: 'Un juego por equipos o una gymkhana rompe el hielo, hace que todos participen y genera anécdotas para años.' },
      { h: 'Piensa en la comida y la bebida', p: 'Un buen aperitivo o comida antes de la fiesta, y barra libre para la parte final, hacen que el grupo esté cómodo.' },
      { h: 'Ajusta el plan al grupo', p: 'No es lo mismo un grupo de ocho amigas que uno de veinte personas de edades distintas. Cuanto antes sepas cuántos sois, mejor se diseña.' },
      { h: 'Reserva con antelación', p: 'Las fechas de primavera y verano son las más solicitadas. Si ya tienes fecha, reserva cuanto antes.' },
      { h: 'Delega la organización', p: 'La persona que organiza también quiere disfrutar. Una agencia como Vórtice Eventos puede encargarse de actividades, comida y barra libre para que vosotros solo tengáis que pasarlo bien.' },
      { p: 'Pide tu presupuesto sin compromiso: dinos cuántos sois y la fecha aproximada y te proponemos un plan a medida en Toledo.' },
    ],
  },
];
