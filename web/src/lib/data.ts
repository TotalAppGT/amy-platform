export type Creator = {
  slug: string;
  name: string;
  handle: string;
  tagline: string;
  bio: string;
  city: string;
  tags: string[];
  initials: string;
  gradient: string;
  accent: string;
  verified: boolean;
  online: boolean;
  isNew?: boolean;
  fans: number;
  posts: number;
  rating: number;
  subPrice: number;
  callPrice: number;
  msgPrice: number;
  languages: string[];
};

export type Post = {
  id: string;
  kind: "photo" | "video" | "set";
  title: string;
  price: number;
  locked: boolean;
  likes: number;
  comments: number;
  gradient: string;
  duration?: string;
};

export type Message = {
  id: string;
  from: "fan" | "creator";
  text?: string;
  time: string;
  media?: { title: string; price: number; duration?: string; gradient: string };
  tip?: number;
};

export const creators: Creator[] = [
  {
    slug: "camila-rivas",
    name: "Camila Rivas",
    handle: "@camilarivas",
    tagline: "Lifestyle, viajes y noches sin filtro.",
    bio: "De Guatemala para el mundo. Comparto mi día a día, sesiones privadas y llamadas para los que ya son de casa. Todo con respeto, todo con consentimiento.",
    city: "Ciudad de Guatemala",
    tags: ["Lifestyle", "VIP", "Viajes"],
    initials: "CR",
    gradient: "linear-gradient(145deg,#FF4D8D 0%,#B23A8F 45%,#5B2A86 100%)",
    accent: "#FF8FB6",
    verified: true,
    online: true,
    fans: 12480,
    posts: 342,
    rating: 4.9,
    subPrice: 150,
    callPrice: 14,
    msgPrice: 8,
    languages: ["Español", "Inglés"],
  },
  {
    slug: "valeria-soto",
    name: "Valeria Soto",
    handle: "@valesoto",
    tagline: "Fitness, disciplina y mucho calor.",
    bio: "Entrenadora certificada. Rutinas, progreso y contenido exclusivo para quienes quieren entrenar conmigo de cerca.",
    city: "Antigua Guatemala",
    tags: ["Fitness", "Deportes"],
    initials: "VS",
    gradient: "linear-gradient(145deg,#F2B880 0%,#D9675B 55%,#7A2E4D 100%)",
    accent: "#F2B880",
    verified: true,
    online: true,
    fans: 8930,
    posts: 218,
    rating: 4.8,
    subPrice: 120,
    callPrice: 12,
    msgPrice: 6,
    languages: ["Español"],
  },
  {
    slug: "sofia-mendez",
    name: "Sofía Méndez",
    handle: "@sofimendez",
    tagline: "Cosplay, fantasía y personajes.",
    bio: "Diseño y modelaje de cosplay. Sets temáticos, fotos de estudio y llamadas donde tú eliges el personaje.",
    city: "Quetzaltenango",
    tags: ["Cosplay", "Modelaje"],
    initials: "SM",
    gradient: "linear-gradient(145deg,#B79CFF 0%,#6D5BD0 50%,#2C2352 100%)",
    accent: "#C9B8FF",
    verified: true,
    online: false,
    fans: 15620,
    posts: 401,
    rating: 4.9,
    subPrice: 180,
    callPrice: 16,
    msgPrice: 9,
    languages: ["Español", "Inglés"],
  },
  {
    slug: "daniela-cruz",
    name: "Daniela Cruz",
    handle: "@danicruz",
    tagline: "Novia virtual y conversaciones reales.",
    bio: "Me gusta conocer gente y conversar sin prisa. Chat ilimitado, audios personalizados y llamadas nocturnas.",
    city: "Mixco",
    tags: ["Novia virtual", "Chat"],
    initials: "DC",
    gradient: "linear-gradient(145deg,#FF9DBF 0%,#C4547A 55%,#4B1F35 100%)",
    accent: "#FFC2D6",
    verified: true,
    online: true,
    fans: 6420,
    posts: 156,
    rating: 4.7,
    subPrice: 95,
    callPrice: 10,
    msgPrice: 5,
    languages: ["Español"],
  },
  {
    slug: "isabella-lima",
    name: "Isabella Lima",
    handle: "@isalima",
    tagline: "Baile, música y energía en vivo.",
    bio: "Bailarina y creadora de contenido. Lives todos los jueves, coreografías exclusivas y sets en video.",
    city: "Villa Nueva",
    tags: ["Baile", "Live"],
    initials: "IL",
    gradient: "linear-gradient(145deg,#63E6BE 0%,#1F9D8B 50%,#0B3B3C 100%)",
    accent: "#8CF0D3",
    verified: true,
    online: true,
    isNew: true,
    fans: 3120,
    posts: 88,
    rating: 4.8,
    subPrice: 110,
    callPrice: 11,
    msgPrice: 6,
    languages: ["Español", "Inglés"],
  },
  {
    slug: "renata-paz",
    name: "Renata Paz",
    handle: "@renatapaz",
    tagline: "Sesiones boudoir con luz de estudio.",
    bio: "Fotógrafa y modelo. Contenido artístico, edición premium y behind the scenes solo para suscriptores.",
    city: "Escuintla",
    tags: ["Boudoir", "Arte"],
    initials: "RP",
    gradient: "linear-gradient(145deg,#E9C46A 0%,#C08552 50%,#4D2E1E 100%)",
    accent: "#F1D69B",
    verified: true,
    online: false,
    fans: 9840,
    posts: 267,
    rating: 4.9,
    subPrice: 160,
    callPrice: 15,
    msgPrice: 8,
    languages: ["Español"],
  },
  {
    slug: "mariana-aguilar",
    name: "Mariana Aguilar",
    handle: "@maraguilar",
    tagline: "ASMR, voz suave y compañía.",
    bio: "Audios relajantes, roleplay y mensajes de voz personalizados. Ideal si buscas desconectar después del trabajo.",
    city: "Cobán",
    tags: ["ASMR", "Audios"],
    initials: "MA",
    gradient: "linear-gradient(145deg,#8ECAE6 0%,#3A7CA5 50%,#16283B 100%)",
    accent: "#A9D6EA",
    verified: true,
    online: true,
    isNew: true,
    fans: 2210,
    posts: 61,
    rating: 4.7,
    subPrice: 80,
    callPrice: 9,
    msgPrice: 4,
    languages: ["Español"],
  },
  {
    slug: "ximena-rojas",
    name: "Ximena Rojas",
    handle: "@ximejrojas",
    tagline: "Modelo plus size, actitud sin límites.",
    bio: "Represento lo real. Sets de lencería, fotos de playa y contenido para celebrar todos los cuerpos.",
    city: "Puerto Barrios",
    tags: ["Modelaje", "Playa"],
    initials: "XR",
    gradient: "linear-gradient(145deg,#FFB4A2 0%,#E07A5F 50%,#5F2A2A 100%)",
    accent: "#FFC9BB",
    verified: true,
    online: false,
    fans: 7450,
    posts: 190,
    rating: 4.8,
    subPrice: 130,
    callPrice: 13,
    msgPrice: 7,
    languages: ["Español", "Inglés"],
  },
];

export const categories = [
  "Todo",
  "En línea",
  "Nuevas",
  "VIP",
  "Llamadas",
  "Cosplay",
  "Fitness",
  "Lifestyle",
  "Boudoir",
  "ASMR",
];

export function getCreator(slug: string) {
  return creators.find((c) => c.slug === slug);
}

export function galleryFor(creator: Creator) {
  return [
    { label: "Retrato principal", gradient: creator.gradient },
    { label: "Sesión de estudio", gradient: "linear-gradient(145deg,#2B1B3D 0%,#7A2E4D 55%,#C08552 100%)" },
    { label: "Detalle y luz", gradient: "linear-gradient(145deg,#1C1430 0%,#5B2A86 55%,#FF9DBF 100%)" },
    { label: "Ambiente", gradient: "linear-gradient(145deg,#0B3B3C 0%,#1F9D8B 55%,#63E6BE 100%)" },
  ];
}

const camilaPosts: Post[] = [
  { id: "p1", kind: "set", title: "Sesión en el rooftop", price: 0, locked: false, likes: 842, comments: 63, gradient: "linear-gradient(140deg,#FF4D8D,#7B2CBF)", duration: "12 fotos" },
  { id: "p2", kind: "video", title: "Noche en la ciudad — parte 1", price: 75, locked: true, likes: 421, comments: 38, gradient: "linear-gradient(140deg,#2B1B3D,#FF4D8D)", duration: "08:24" },
  { id: "p3", kind: "photo", title: "Sin filtro, sin prisa", price: 45, locked: true, likes: 389, comments: 22, gradient: "linear-gradient(140deg,#5B2A86,#E9C46A)", duration: "6 fotos" },
  { id: "p4", kind: "video", title: "BTS del set de octubre", price: 0, locked: false, likes: 1203, comments: 104, gradient: "linear-gradient(140deg,#B23A8F,#2B1B3D)", duration: "03:12" },
  { id: "p5", kind: "set", title: "Edición privada — 24 fotos", price: 120, locked: true, likes: 267, comments: 19, gradient: "linear-gradient(140deg,#3D1F4F,#FF9DBF)", duration: "24 fotos" },
  { id: "p6", kind: "video", title: "Responde mis mensajes", price: 60, locked: true, likes: 512, comments: 47, gradient: "linear-gradient(140deg,#7A2E4D,#FFB86B)", duration: "05:40" },
];

export function postsFor(slug: string): Post[] {
  const found = creators.find((c) => c.slug === slug);
  const base = found?.gradient ?? camilaPosts[0].gradient;
  if (slug === "camila-rivas") return camilaPosts;
  return camilaPosts.map((p, i) => ({
    ...p,
    id: `${slug}-${i}`,
    gradient: i % 2 === 0 ? base : "linear-gradient(140deg,#2B1B3D,#E9C46A)",
    title: [
      "Sesión de estudio",
      "Video privado de la semana",
      "Set exclusivo",
      "Detrás de cámaras",
      "Edición limitada",
      "Mensaje personalizado",
    ][i],
  }));
}

export const plans = [
  {
    id: "mensual",
    name: "Mensual",
    price: 150,
    period: "mes",
    perks: ["Todo el contenido del muro", "Chat con respuesta en 24 h", "Descuento en PPV"],
    highlight: false,
  },
  {
    id: "trimestral",
    name: "3 meses",
    price: 390,
    period: "trimestre",
    perks: ["Todo lo del plan mensual", "1 video llamada de 10 min", "Contenido nuevo antes que nadie", "Badge de fan VIP"],
    highlight: true,
  },
  {
    id: "vip",
    name: "VIP",
    price: 650,
    period: "mes",
    perks: ["Chat ilimitado", "2 llamadas de 15 min al mes", "Contenido personalizado", "Prioridad en mensajes"],
    highlight: false,
  },
];

export const conversations = [
  { id: "c1", slug: "camila-rivas", last: "Te dejé algo nuevo en el chat 😏", time: "2 min", unread: 2, online: true },
  { id: "c2", slug: "valeria-soto", last: "¿Entrenamos mañana?", time: "18 min", unread: 0, online: true },
  { id: "c3", slug: "sofia-mendez", last: "El set de cosplay ya está listo", time: "1 h", unread: 1, online: false },
  { id: "c4", slug: "daniela-cruz", last: "Gracias por la propina ❤️", time: "3 h", unread: 0, online: true },
  { id: "c5", slug: "isabella-lima", last: "Live el jueves, no faltes", time: "Ayer", unread: 0, online: false },
];

export const initialMessages: Message[] = [
  { id: "m1", from: "creator", text: "Hola guapo, qué bueno verte por aquí otra vez.", time: "20:41" },
  { id: "m2", from: "creator", text: "Acabo de subir el set completo del rooftop. Creo que te va a gustar…", time: "20:42" },
  {
    id: "m3",
    from: "creator",
    time: "20:42",
    media: { title: "Rooftop — edición privada", price: 75, duration: "08:24", gradient: "linear-gradient(140deg,#2B1B3D,#FF4D8D)" },
  },
  { id: "m4", from: "fan", text: "Se ve increíble. ¿Cuánto por la llamada de esta noche?", time: "20:45" },
  { id: "m5", from: "creator", text: "Q14 el minuto, sin mínimo. Si quieres te reservo el horario de 9:30.", time: "20:46" },
  { id: "m6", from: "creator", text: "Y si te suscribes al plan de 3 meses, te incluyo 10 minutos gratis.", time: "20:46" },
  { id: "m7", from: "fan", text: "Perfecto, reservemos.", time: "20:47", tip: 25 },
  { id: "m8", from: "creator", text: "Gracias por la propina, mi amor. Te mando el enlace a las 9:25.", time: "20:47" },
];

export const earnings = [
  { month: "Jun", value: 4200 },
  { month: "Jul", value: 6100 },
  { month: "Ago", value: 7400 },
  { month: "Sep", value: 6900 },
  { month: "Oct", value: 9200 },
  { month: "Nov", value: 11840 },
];

export function offersFor(creator: Creator) {
  return [
    {
      id: "bienvenida",
      title: "Pack bienvenida",
      detail: "3 videos + 10 fotos",
      price: Math.round(creator.subPrice * 1.3),
      oldPrice: Math.round(creator.subPrice * 2.2),
      badge: "Ahorra 40%",
      icon: "gift",
    },
    {
      id: "llamada",
      title: "Llamada de 20 min",
      detail: "Video o audio · horario a elegir",
      price: Math.round(creator.callPrice * 18),
      oldPrice: Math.round(creator.callPrice * 20),
      badge: "Más vendido",
      icon: "phone",
    },
    {
      id: "custom",
      title: "Video personalizado",
      detail: "3–5 min · tu nombre o guion",
      price: Math.round(creator.subPrice * 3),
      oldPrice: Math.round(creator.subPrice * 3.6),
      badge: "Hecho para ti",
      icon: "sparkles",
    },
    {
      id: "gfe",
      title: "GFE · 7 días",
      detail: "Buenos días, audios y prioridad",
      price: Math.round(creator.subPrice * 5.5),
      oldPrice: Math.round(creator.subPrice * 7),
      badge: "Cupo limitado",
      icon: "heart",
    },
    {
      id: "pack5",
      title: "Pack 5 videos",
      detail: "Elige los que quieras del vault",
      price: Math.round(creator.subPrice * 2.4),
      oldPrice: Math.round(creator.subPrice * 3.2),
      badge: "Bundle",
      icon: "video",
    },
    {
      id: "fotos",
      title: "Set privado de 15 fotos",
      detail: "Edición exclusiva · sin reventa",
      price: Math.round(creator.subPrice * 0.9),
      oldPrice: Math.round(creator.subPrice * 1.2),
      badge: "Nuevo",
      icon: "image",
    },
  ];
}

export const topFans = [
  { id: "f1", name: "Fan #4821", spend: 2840, tier: "Platino", since: "8 meses", last: "Hoy" },
  { id: "f2", name: "Fan #1902", spend: 1960, tier: "Oro", since: "5 meses", last: "Hoy" },
  { id: "f3", name: "Fan #7730", spend: 1420, tier: "Oro", since: "3 meses", last: "Ayer" },
  { id: "f4", name: "Fan #2210", spend: 980, tier: "Plata", since: "2 meses", last: "Ayer" },
  { id: "f5", name: "Fan #6671", spend: 640, tier: "Plata", since: "1 mes", last: "Hace 2 días" },
];

export const creatorTransactions = [
  { id: "t1", fan: "Fan #4821", kind: "Suscripción 3 meses", amount: 390, commission: 78, net: 312, date: "Hoy, 14:20", status: "Disponible" },
  { id: "t2", fan: "Fan #1902", kind: "Video PPV — Rooftop", amount: 75, commission: 15, net: 60, date: "Hoy, 12:04", status: "Disponible" },
  { id: "t3", fan: "Fan #7730", kind: "Llamada 12 min", amount: 168, commission: 33.6, net: 134.4, date: "Hoy, 10:51", status: "Pendiente" },
  { id: "t4", fan: "Fan #2210", kind: "Propina", amount: 25, commission: 5, net: 20, date: "Ayer, 21:47", status: "Disponible" },
  { id: "t5", fan: "Fan #6671", kind: "Suscripción mensual", amount: 150, commission: 30, net: 120, date: "Ayer, 19:12", status: "Disponible" },
];

export const approvals = [
  { id: "a1", name: "Andrea López", handle: "@andreita", city: "Guatemala", docs: "INE + selfie", date: "Hace 2 h", status: "Pendiente" },
  { id: "a2", name: "Karla Méndez", handle: "@karlam", city: "Xela", docs: "Pasaporte + selfie", date: "Hace 5 h", status: "Pendiente" },
  { id: "a3", name: "Nicole Barrios", handle: "@nicoleb", city: "Escuintla", docs: "INE + contrato", date: "Ayer", status: "Pendiente" },
];

export const moderationQueue = [
  { id: "mod1", creator: "Isabella Lima", asset: "Video 04:12", reason: "Revisión automática de piel", risk: "Bajo" },
  { id: "mod2", creator: "Mariana Aguilar", asset: "Set de 9 fotos", reason: "Marca de agua duplicada", risk: "Medio" },
  { id: "mod3", creator: "Renata Paz", asset: "Video 11:38", reason: "Tercero sin consentimiento", risk: "Alto" },
];

export const platformTransactions = [
  { id: "pt1", user: "Fan #4821", creator: "Camila Rivas", kind: "Suscripción", amount: 390, fee: 78, date: "14:20" },
  { id: "pt2", user: "Fan #7730", creator: "Camila Rivas", kind: "Llamada", amount: 168, fee: 33.6, date: "10:51" },
  { id: "pt3", user: "Fan #1902", creator: "Valeria Soto", kind: "PPV", amount: 75, fee: 15, date: "09:12" },
  { id: "pt4", user: "Fan #2210", creator: "Sofía Méndez", kind: "Propina", amount: 25, fee: 5, date: "08:40" },
  { id: "pt5", user: "Fan #6671", creator: "Daniela Cruz", kind: "Suscripción", amount: 95, fee: 19, date: "Ayer" },
];
