// Avisos predefinidos. Variables disponibles: {{nombre}} {{evento}} {{fecha}} {{hora}} {{lugar}} {{plazas_libres}} {{enlace}}
export type Template = {
  id: string; name: string; description: string; audience: 'inscritos' | 'newsletter' | 'asistentes' | 'cualquiera';
  subject: string; body: string; ctaLabel?: string;
};

export const TEMPLATES: Template[] = [
  {
    id: 'recordatorio', name: 'Recordatorio: queda 1 día', audience: 'inscritos',
    description: 'Para los inscritos a un evento. Se envía solo automáticamente el día antes.',
    subject: 'Mañana es {{evento}}',
    body: `Hola {{nombre}},

Te recordamos que mañana tienes {{evento}}.

**Cuándo:** {{fecha}}, {{hora}}
**Dónde:** {{lugar}}

Si no puedes venir, avísanos cuanto antes para liberar tu plaza. ¡Te esperamos!`,
    ctaLabel: 'Ver el evento',
  },
  {
    id: 'ultimas-plazas', name: 'Quedan pocas plazas', audience: 'newsletter',
    description: 'Para animar a los indecisos cuando el evento casi se llena.',
    subject: 'Últimas plazas para {{evento}}',
    body: `Hola {{nombre}},

Quedan solo {{plazas_libres}} plazas para {{evento}} ({{fecha}}, {{hora}}).

Si te apetece venir, apúntate cuanto antes: cuando se llene, cerramos las inscripciones.`,
    ctaLabel: 'Apuntarme ahora',
  },
  {
    id: 'nuevo-evento', name: 'Nuevo evento disponible', audience: 'newsletter',
    description: 'Para anunciar un evento nuevo a tus suscriptores.',
    subject: 'Nuevo evento: {{evento}}',
    body: `Hola {{nombre}},

Hemos abierto las inscripciones para {{evento}}.

**Cuándo:** {{fecha}}, {{hora}}
**Dónde:** {{lugar}}

Las plazas son limitadas. Puedes ver el programa y apuntarte aquí:`,
    ctaLabel: 'Ver programa y apuntarme',
  },
  {
    id: 'repetir', name: '¿Repites? Invitación al siguiente evento', audience: 'asistentes',
    description: 'Para quienes ya han participado en algún evento y aceptaron recibir avisos.',
    subject: '¿Repetimos? Ya puedes apuntarte a {{evento}}',
    body: `Hola {{nombre}},

Gracias por venir a nuestros eventos. Nos encantó tenerte y queremos que repitas.

Ya está abierta la inscripción de {{evento}} ({{fecha}}, {{hora}}, en {{lugar}}). ¿Te apuntas?`,
    ctaLabel: 'Quiero apuntarme',
  },
  {
    id: 'cambio', name: 'Cambio importante en el evento', audience: 'inscritos',
    description: 'Para avisar a los inscritos de un cambio de hora, lugar o cualquier imprevisto.',
    subject: 'Importante: cambios en {{evento}}',
    body: `Hola {{nombre}},

Tenemos que comunicarte un cambio en {{evento}}:

(escribe aquí qué ha cambiado)

Disculpa las molestias. Si esto te impide venir, respóndenos a este correo y liberamos tu plaza.`,
    ctaLabel: 'Ver el evento',
  },
  {
    id: 'gracias', name: 'Gracias por venir', audience: 'inscritos',
    description: 'Para enviar después del evento a quienes se inscribieron.',
    subject: 'Gracias por venir a {{evento}}',
    body: `Hola {{nombre}},

Muchas gracias por participar en {{evento}}. Esperamos que lo pasaras genial.

Si quieres contarnos qué te pareció, solo tienes que responder a este correo. ¡Nos vemos en el próximo!`,
  },
  {
    id: 'libre', name: 'En blanco', audience: 'cualquiera',
    description: 'Escribe tu propio mensaje desde cero.',
    subject: '', body: `Hola {{nombre}},\n\n`,
  },
];

export const templateById = (id: string) => TEMPLATES.find((t) => t.id === id);
