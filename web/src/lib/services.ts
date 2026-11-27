export type Service = {
  slug: string;
  name: string;
  category: string;
  provider: string;
  providerRole: string;
  initials: string;
  gradient: string;
  city: string;
  zone: string;
  modalities: string[];
  price: number;
  duration: number;
  durationLabel: string;
  rating: number;
  reviews: number;
  description: string;
  includes: string[];
  tags: string[];
  availability: string[];
  verified: boolean;
  popular?: boolean;
};

export const serviceCategories = [
  "Todos",
  "Masajes",
  "Spa",
  "Fotografía",
  "Belleza",
  "Fitness",
  "Eventos",
];

export const services: Service[] = [
  {
    slug: "masaje-relajante-profundo",
    name: "Masaje relajante profundo",
    category: "Masajes",
    provider: "Andrea López",
    providerRole: "Terapeuta certificada · 6 años",
    initials: "AL",
    gradient: "linear-gradient(145deg,#F4B6A6 0%,#C96F5E 50%,#5C2B33 100%)",
    city: "Guatemala",
    zone: "Zona 10",
    modalities: ["En estudio", "A domicilio"],
    price: 280,
    duration: 60,
    durationLabel: "60 min",
    rating: 4.9,
    reviews: 128,
    description:
      "Masaje de cuerpo completo con presión media a profunda, aceites tibios y técnica mixta para liberar tensión acumulada. Ideal para cuello, espalda y piernas después de una semana larga.",
    includes: [
      "Evaluación breve de tensión al inicio",
      "Aceites profesionales hipoalergénicos",
      "Toallas y camilla desinfectada",
      "Música y luz regulable",
      "Recomendaciones post-masaje",
    ],
    tags: ["Relajación", "Espalda", "Presión media"],
    availability: ["Hoy 15:00", "Hoy 17:30", "Mañana 10:00", "Mañana 12:00", "Jue 16:00"],
    verified: true,
    popular: true,
  },
  {
    slug: "masaje-deportivo",
    name: "Masaje deportivo y recuperación",
    category: "Masajes",
    provider: "Karla Méndez",
    providerRole: "Fisioterapeuta · deportistas",
    initials: "KM",
    gradient: "linear-gradient(145deg,#9BE7C4 0%,#2A9D8F 50%,#123B40 100%)",
    city: "Guatemala",
    zone: "Zona 14",
    modalities: ["En estudio", "A domicilio"],
    price: 340,
    duration: 75,
    durationLabel: "75 min",
    rating: 4.8,
    reviews: 91,
    description:
      "Trabajo focalizado en grupos musculares, movilidad y recuperación post-entrenamiento. Incluye estiramientos guiados y recomendaciones para tu rutina.",
    includes: [
      "Valoración de movilidad",
      "Masaje profundo por grupos musculares",
      "Estiramientos asistidos",
      "Recomendaciones de recuperación",
    ],
    tags: ["Deportivo", "Recuperación", "Movilidad"],
    availability: ["Hoy 18:00", "Mañana 07:00", "Mañana 09:00", "Vie 17:00"],
    verified: true,
  },
  {
    slug: "ritual-facial-spa",
    name: "Ritual facial + masaje craneal",
    category: "Spa",
    provider: "Nicole Barrios",
    providerRole: "Esteticista profesional",
    initials: "NB",
    gradient: "linear-gradient(145deg,#D9C7FF 0%,#8E7AB5 50%,#3B2A52 100%)",
    city: "Antigua Guatemala",
    zone: "Centro",
    modalities: ["En estudio"],
    price: 420,
    duration: 90,
    durationLabel: "90 min",
    rating: 4.9,
    reviews: 76,
    description:
      "Limpieza facial, exfoliación suave, mascarilla personalizada y masaje craneal para cerrar. Un ritual pensado para desinflamar y descansar.",
    includes: [
      "Diagnóstico de piel",
      "Limpieza y exfoliación",
      "Mascarilla según tipo de piel",
      "Masaje craneal y de cuello",
      "Protector solar de cortesía",
    ],
    tags: ["Facial", "Relajación", "Piel"],
    availability: ["Mañana 11:00", "Mañana 15:00", "Jue 10:00", "Vie 13:00"],
    verified: true,
  },
  {
    slug: "sesion-boudoir",
    name: "Sesión fotográfica boudoir",
    category: "Fotografía",
    provider: "Renata Paz",
    providerRole: "Fotógrafa · 8 años de estudio",
    initials: "RP",
    gradient: "linear-gradient(145deg,#E9C46A 0%,#C08552 50%,#4D2E1E 100%)",
    city: "Guatemala",
    zone: "Zona 4",
    modalities: ["En estudio"],
    price: 750,
    duration: 120,
    durationLabel: "2 h",
    rating: 5.0,
    reviews: 64,
    description:
      "Sesión privada en estudio con dirección de pose, iluminación profesional y edición incluida. Recibes una galería digital seleccionada y opción de álbum impreso.",
    includes: [
      "Asesoría de vestuario y moodboard",
      "2 horas de sesión guiada",
      "15 fotos editadas en alta resolución",
      "Galería privada en línea",
      "Opción de álbum impreso",
    ],
    tags: ["Boudoir", "Estudio", "Edición"],
    availability: ["Jue 10:00", "Jue 14:00", "Vie 11:00", "Sáb 09:00"],
    verified: true,
    popular: true,
  },
  {
    slug: "maquillaje-peinado-evento",
    name: "Maquillaje y peinado para evento",
    category: "Belleza",
    provider: "Sofía Méndez",
    providerRole: "Makeup artist · novias y eventos",
    initials: "SM",
    gradient: "linear-gradient(145deg,#FFB4C8 0%,#D96C8E 50%,#6B2540 100%)",
    city: "Quetzaltenango",
    zone: "Zona 3",
    modalities: ["En estudio", "A domicilio"],
    price: 380,
    duration: 90,
    durationLabel: "90 min",
    rating: 4.8,
    reviews: 103,
    description:
      "Maquillaje de larga duración y peinado adaptado a tu evento. Incluye prueba de tono y kit de retoque para que llegues impecable.",
    includes: [
      "Asesoría de look",
      "Maquillaje de larga duración",
      "Peinado con acabado profesional",
      "Kit de retoque",
    ],
    tags: ["Eventos", "Maquillaje", "Peinado"],
    availability: ["Vie 08:00", "Sáb 07:00", "Sáb 10:00", "Dom 08:00"],
    verified: true,
  },
  {
    slug: "entrenamiento-personal",
    name: "Entrenamiento personal 1:1",
    category: "Fitness",
    provider: "Valeria Soto",
    providerRole: "Entrenadora certificada",
    initials: "VS",
    gradient: "linear-gradient(145deg,#F2B880 0%,#D9675B 55%,#7A2E4D 100%)",
    city: "Guatemala",
    zone: "Zona 15",
    modalities: ["En estudio", "A domicilio", "En línea"],
    price: 200,
    duration: 60,
    durationLabel: "60 min",
    rating: 4.9,
    reviews: 142,
    description:
      "Sesión individual con plan adaptado a tu nivel, técnica y objetivos. Incluye calentamiento, rutina guiada y estiramiento final.",
    includes: [
      "Evaluación inicial",
      "Rutina personalizada",
      "Corrección de técnica",
      "Plan de la semana",
    ],
    tags: ["Fuerza", "Cardio", "Principiantes"],
    availability: ["Hoy 06:00", "Hoy 18:00", "Mañana 07:00", "Mañana 19:00"],
    verified: true,
  },
  {
    slug: "masaje-en-pareja",
    name: "Masaje en pareja",
    category: "Masajes",
    provider: "Andrea López",
    providerRole: "Terapeuta certificada · 6 años",
    initials: "AL",
    gradient: "linear-gradient(145deg,#F7C8B8 0%,#B05A6A 55%,#3E1F2C 100%)",
    city: "Guatemala",
    zone: "Zona 10",
    modalities: ["En estudio"],
    price: 520,
    duration: 90,
    durationLabel: "90 min",
    rating: 4.9,
    reviews: 57,
    description:
      "Dos camillas, dos terapeutas y una hora y media de relajación para compartir. Incluye aperitivo ligero y música a elección.",
    includes: [
      "Dos terapeutas simultáneas",
      "Aceites y aromaterapia",
      "Aperitivo ligero",
      "Música personalizada",
    ],
    tags: ["Pareja", "Relajación", "Aromaterapia"],
    availability: ["Vie 17:00", "Sáb 11:00", "Sáb 16:00", "Dom 10:00"],
    verified: true,
  },
  {
    slug: "host-evento-privado",
    name: "Host profesional para evento",
    category: "Eventos",
    provider: "Isabella Lima",
    providerRole: "Host y coordinadora de eventos",
    initials: "IL",
    gradient: "linear-gradient(145deg,#63E6BE 0%,#1F9D8B 50%,#0B3B3C 100%)",
    city: "Guatemala",
    zone: "A coordinar",
    modalities: ["A domicilio", "En local del cliente"],
    price: 900,
    duration: 180,
    durationLabel: "3 h",
    rating: 4.7,
    reviews: 38,
    description:
      "Anfitriona profesional para eventos corporativos, cumpleaños y celebraciones privadas: recepción, dinámica y coordinación básica. Servicio de protocolo y entretenimiento, sin contenido ni contacto sexual.",
    includes: [
      "Reunión previa de briefing",
      "Recepción y acompañamiento de invitados",
      "Coordinación básica con proveedores",
      "3 horas de servicio",
    ],
    tags: ["Eventos", "Protocolo", "Corporativo"],
    availability: ["Vie 18:00", "Sáb 19:00", "Dom 12:00"],
    verified: true,
  },
];

export const serviceBookings = [
  { code: "AMY-2841", service: "Masaje relajante", provider: "Andrea López", client: "Fan #4821", date: "Hoy · 15:00", total: 280, deposit: 56, status: "Confirmada" },
  { code: "AMY-2838", service: "Sesión boudoir", provider: "Renata Paz", client: "Fan #1902", date: "Hoy · 14:00", total: 750, deposit: 150, status: "Confirmada" },
  { code: "AMY-2830", service: "Masaje deportivo", provider: "Karla Méndez", client: "Fan #7730", date: "Mañana · 07:00", total: 340, deposit: 68, status: "Pendiente" },
  { code: "AMY-2822", service: "Ritual facial", provider: "Nicole Barrios", client: "Fan #2210", date: "Jue · 11:00", total: 420, deposit: 84, status: "Confirmada" },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function depositFor(service: Service) {
  return Math.round(service.price * 0.2);
}
