export type LegalDoc = {
  slug: string;
  title: string;
  updated: string;
  intro: string;
  sections: { h: string; p: string[] }[];
};

export const legalDocs: LegalDoc[] = [
  {
    slug: "terminos",
    title: "Términos y condiciones",
    updated: "26 de noviembre de 2026",
    intro:
      "Estos términos regulan el uso de AMY, una plataforma de intermediación que conecta a creadoras de contenido con pessoas mayores de edad. Al crear una cuenta confirmas que los aceptas.",
    sections: [
      {
        h: "1. Quiénes podemos usar la plataforma",
        p: [
          "Solo personas mayores de 18 años, con capacidad legal para contratar. Las creadoras deben completar un proceso de verificación de identidad y edad (KYC) antes de publicar o cobrar.",
          "AMY puede rechazar o cancelar cuentas cuando exista sospecha de fraude, suplantación, uso por menores o incumplimiento de estos términos.",
        ],
      },
      {
        h: "2. Rol de AMY",
        p: [
          "AMY actúa como intermediario tecnológico y de pagos. No es empleador de las creadoras ni produce el contenido. La relación entre creadora y fan es directa, dentro de las reglas de la plataforma.",
          "La comisión de intermediación se muestra antes de cada cobro y se descuenta automáticamente del monto de la venta.",
        ],
      },
      {
        h: "3. Cuenta y seguridad",
        p: [
          "Debes mantener la confidencialidad de tus credenciales, activar 2FA cuando esté disponible y reportar cualquier acceso no autorizado. Una cuenta es personal y no puede transferirse.",
          "El uso de bots, scrapers, automatizaciones no autorizadas o intentos de evadir controles está prohibido.",
        ],
      },
      {
        h: "4. Pagos, wallet y retiros",
        p: [
          "Los fans recargan saldo en una wallet. Los consumos (suscripciones, PPV, mensajes, propinas y llamadas) se debitan de ese saldo. Las llamadas se cobran por minuto y se cortan al agotarse el saldo.",
          "Las creadoras pueden solicitar retiros sujetos a verificación, periodo de gracia y disponibilidad del método elegido. Los tiempos y comisiones se informan en el panel.",
          "Los chargebacks y contracargos se revisan caso por caso. Si el saldo ya fue retirado, AMY puede compensar el monto contra ganancias futuras.",
        ],
      },
      {
        h: "5. Contenido y conducta",
        p: [
          "Está prohibido publicar contenido con menores, personas sin consentimiento, violencia no consentida, zoofilia, trata o cualquier actividad ilegal. También está prohibido ofrecer servicios sexuales presenciales.",
          "Las creadoras conservan los derechos sobre su contenido y otorgan a AMY una licencia limitada para alojarlo, transmitirlo y mostrarlo dentro de la plataforma.",
          "AMY puede retirar contenido, suspender pagos o cerrar cuentas ante incumplimientos, con notificación cuando sea legalmente posible.",
        ],
      },
      {
        h: "6. Reembolsos",
        p: [
          "Los consumos digitales ya entregados no son reembolsables, salvo fallas técnicas comprobadas o cobros no autorizados. Las solicitudes se evalúan en un plazo de 5 días hábiles.",
          "Las suscripciones se renuevan automáticamente hasta que el fan las cancele desde su panel.",
        ],
      },
      {
        h: "7. Ley aplicable",
        p: [
          "Estos términos se rigen por las leyes de la República de Guatemala. Cualquier controversia se someterá a los tribunales competentes de la ciudad de Guatemala, sin perjuicio de derechos del consumidor.",
          "Este documento es un modelo operativo y debe ser revisado por un abogado antes del lanzamiento comercial.",
        ],
      },
    ],
  },
  {
    slug: "privacidad",
    title: "Política de privacidad",
    updated: "26 de noviembre de 2026",
    intro:
      "Explicamos qué datos recolectamos, para qué los usamos y cómo puedes ejercer tus derechos. La privacidad es parte central del producto, no un anexo.",
    sections: [
      {
        h: "1. Datos que recolectamos",
        p: [
          "Datos de cuenta: nombre, correo, teléfono, fecha de nacimiento, país y preferencias. Datos de verificación: documento de identidad, selfie y, para creadoras, contrato y consentimiento.",
          "Datos de uso: páginas vistas, mensajes, transacciones, dispositivos, IP y registros de seguridad. Datos de pago: referencias de la pasarela; AMY no almacena el número completo de tarjeta.",
        ],
      },
      {
        h: "2. Para qué los usamos",
        p: [
          "Operar la plataforma, procesar pagos, prevenir fraude, verificar edad y consentimiento, moderar contenido, cumplir obligaciones legales y fiscales, y mejorar el producto.",
          "No vendemos datos personales. No usamos el contenido privado de mensajes para publicidad.",
        ],
      },
      {
        h: "3. Con quién los compartimos",
        p: [
          "Con proveedores de pago, verificación de identidad, alojamiento, CDN, correo y soporte, bajo contratos de confidencialidad. Con autoridades cuando exista obligación legal o investigación de delitos.",
          "Algunos proveedores pueden estar fuera de Guatemala; en esos casos se aplican salvaguardas contractuales.",
        ],
      },
      {
        h: "4. Conservación y seguridad",
        p: [
          "Conservamos los datos mientras la cuenta esté activa y por los plazos legales aplicables (fiscales, KYC y prevención de fraude). Luego se eliminan o anonimizan.",
          "Aplicamos cifrado en tránsito y en reposo, control de acceso por roles, 2FA para administradores y registro de auditoría.",
        ],
      },
      {
        h: "5. Tus derechos",
        p: [
          "Puedes solicitar acceso, rectificación, actualización o eliminación de tus datos escribiendo a amyoficialfan@gmail.com. Responderemos en un plazo máximo de 15 días hábiles.",
          "Puedes oponerte a comunicaciones de marketing sin afectar el servicio.",
        ],
      },
      {
        h: "6. Menores",
        p: [
          "La plataforma no está dirigida a menores de 18 años. Si detectamos una cuenta de menor, se suspende de inmediato y se eliminan los datos asociados, con reporte a las autoridades cuando corresponda.",
        ],
      },
    ],
  },
  {
    slug: "contenido",
    title: "Política de contenido y consentimiento",
    updated: "26 de noviembre de 2026",
    intro:
      "Toda persona que aparece en contenido debe ser mayor de edad y haber otorgado consentimiento informado, verificable y revocable.",
    sections: [
      {
        h: "1. Verificación previa",
        p: [
          "Cada creadora entrega documento de identidad, selfie y firma de consentimiento. Registramos fecha, tipo de documento y resultado del KYC.",
          "Cuando aparece una tercera persona, se requiere su propio consentimiento y verificación antes de publicar.",
        ],
      },
      {
        h: "2. Contenido prohibido",
        p: [
          "Menores o personas que aparenten ser menores; contenido no consentido o grabado sin autorización; violencia sexual; trata; zoofilia; doxxing; contenido generado sin consentimiento de la persona representada.",
          "Servicios sexuales presenciales, escolta o citas sexuales. AMY solo permite servicios digitales y, en su caso, eventos o servicios profesionales legales con contrato.",
        ],
      },
      {
        h: "3. Moderación",
        p: [
          "Combinamos revisión automatizada y humana. Los casos de riesgo alto se revisan en menos de 2 horas. El contenido sospechoso se oculta mientras se investiga.",
          "Las decisiones se documentan y la creadora puede apelar desde su panel.",
        ],
      },
      {
        h: "4. Retiro y takedown",
        p: [
          "Cualquier persona puede reportar contenido en amyoficialfan@gmail.com o mediante el botón de denuncia. Los casos de menores o falta de consentimiento se retiran de inmediato y se escalan a legal.",
          "Las creadoras pueden retirar su contenido cuando quieran; los fans que ya pagaron conservan acceso solo si la licencia lo permite.",
        ],
      },
    ],
  },
  {
    slug: "derechos-autor",
    title: "Derechos de autor",
    updated: "26 de noviembre de 2026",
    intro:
      "AMY protege la titularidad de las creadoras y profesionales sobre sus obras, y exige a fans y usuarios respetar esos derechos. Este documento explica la licencia que necesitamos para operar y cómo se reporta una infracción.",
    sections: [
      {
        h: "1. Titularidad",
        p: [
          "Cada creadora conserva los derechos patrimoniales y morales sobre sus fotos, videos, audios, textos y transmisiones. AMY no reclama propiedad sobre el contenido.",
          "Al publicar, la creadora declara que es titular del contenido o que cuenta con autorización expresa de todas las personas y titulares que aparecen en él.",
        ],
      },
      {
        h: "2. Licencia limitada a AMY",
        p: [
          "La creadora otorga a AMY una licencia mundial, no exclusiva y revocable para alojar, reproducir, transmitir, mostrar y adaptar técnicamente el contenido (miniaturas, compresión, HLS) con el único fin de operar la plataforma.",
          "La licencia termina cuando la creadora elimina el contenido, salvo copias de respaldo razonables y registros legales. AMY no vende el contenido ni lo usa para publicidad fuera de la plataforma sin permiso.",
        ],
      },
      {
        h: "3. Uso permitido del fan",
        p: [
          "El fan recibe una licencia personal, limitada, no transferible y no comercial para ver el contenido dentro de AMY. No puede descargarlo, grabarlo, redistribuirlo, revenderlo ni publicarlo en otros sitios.",
          "La marca de agua identifica al usuario que accedió. Un uso no autorizado puede derivar en suspensión, retiro del contenido y acciones civiles o penales.",
        ],
      },
      {
        h: "4. Reporte de infracción",
        p: [
          "El titular o su representante puede escribir a amyoficialfan@gmail.com con: identificación de la obra, URL del contenido infractor, prueba de titularidad, datos de contacto y declaración de buena fe.",
          "AMY oculta el contenido mientras verifica y notifica a la persona que lo publicó. El plazo ordinario es de 5 días hábiles; los casos de menores o falta de consentimiento se atienden de inmediato.",
        ],
      },
      {
        h: "5. Contra-notificación y reincidencia",
        p: [
          "Quien publicó el contenido puede responder con prueba de autorización o titularidad. Si el reporte no se sostiene, el contenido se restaura.",
          "Las cuentas con infracciones repetidas se suspenden o eliminan. AMY lleva un registro de casos para acreditar su cumplimiento.",
        ],
      },
      {
        h: "6. Contenido generado con IA",
        p: [
          "El contenido generado o alterado con IA debe identificarse como tal y no puede suplantar a una persona real sin su consentimiento. AMY puede retirarlo si genera confusión, fraude o vulnera derechos de imagen.",
        ],
      },
    ],
  },
  {
    slug: "cookies",
    title: "Política de cookies",
    updated: "26 de noviembre de 2026",
    intro:
      "Usamos cookies y tecnologías similares para que la plataforma funcione, recordar tus preferencias y entender cómo se usa. Puedes controlarlas desde tu navegador.",
    sections: [
      {
        h: "1. Qué son",
        p: [
          "Son archivos pequeños que se guardan en tu dispositivo. Permiten mantener la sesión, recordar el age gate, proteger tu cuenta y medir el rendimiento del sitio.",
        ],
      },
      {
        h: "2. Tipos que usamos",
        p: [
          "Esenciales: sesión, seguridad, prevención de fraude, carrito/wallet y preferencias de idioma. Sin ellas el servicio no funciona.",
          "Analíticas: páginas vistas y eventos agregados para mejorar el producto. No se usan para publicidad de terceros dentro del contenido privado.",
          "Preferencias: recordar el age gate, el tema y la última sección visitada.",
        ],
      },
      {
        h: "3. Terceros",
        p: [
          "Podemos usar proveedores de analítica, soporte, pagos y verificación de identidad que instalan cookies propias bajo sus políticas. No vendemos datos personales.",
        ],
      },
      {
        h: "4. Cómo controlarlas",
        p: [
          "Puedes borrar o bloquear cookies desde la configuración de tu navegador. Si bloqueas las esenciales, es posible que no puedas iniciar sesión o pagar.",
          "En dispositivos móviles también puedes limitar el seguimiento desde los ajustes de privacidad del sistema.",
        ],
      },
      {
        h: "5. Contacto",
        p: ["Para dudas sobre cookies escribe a amyoficialfan@gmail.com."],
      },
    ],
  },
  {
    slug: "reembolsos",
    title: "Política de reembolsos",
    updated: "26 de noviembre de 2026",
    intro:
      "Queremos que las reglas sean claras antes de pagar. Esta política cubre contenido digital, suscripciones, propinas, llamadas y reservas de servicios.",
    sections: [
      {
        h: "1. Contenido digital y PPV",
        p: [
          "Una vez desbloqueado y visualizado, el contenido digital no es reembolsable, salvo falla técnica comprobable, cobro duplicado o cobro no autorizado.",
          "Si el archivo no carga o está dañado, escríbenos dentro de 48 horas con captura y ID de transacción. Repondremos el contenido o devolveremos el saldo.",
        ],
      },
      {
        h: "2. Suscripciones",
        p: [
          "La suscripción se renueva automáticamente hasta que la canceles desde tu cuenta. Cancelar detiene la próxima renovación; no devuelve el periodo ya iniciado.",
          "Si cancelas dentro de las primeras 24 horas y no consumiste contenido, puedes solicitar revisión. Los reembolsos discrecionales se evalúan caso por caso.",
        ],
      },
      {
        h: "3. Propinas y llamadas",
        p: [
          "Las propinas son voluntarias y no reembolsables. Si una llamada falla por causa de la plataforma, devolvemos los minutos no consumidos.",
          "Si la otra persona no se presenta a una llamada reservada, se devuelve el saldo bloqueado.",
        ],
      },
      {
        h: "4. Reservas de servicios",
        p: [
          "El anticipo bloquea el horario. Cancelación gratis hasta 24 horas antes; después se retiene el anticipo o se aplica como crédito, según el caso.",
          "Si la profesional cancela, se devuelve el 100% del anticipo o se reprograma sin costo. El saldo restante se paga directamente en el lugar.",
        ],
      },
      {
        h: "5. Chargebacks y fraude",
        p: [
          "Si un fan inicia un contracargo sin haber contactado a soporte, la cuenta puede suspenderse mientras se investiga. Los contracargos fraudulentos se reportan a la pasarela y a las autoridades.",
          "AMY puede compensar el monto disputado contra el saldo o ganancias futuras cuando el chargeback ya fue pagado.",
        ],
      },
      {
        h: "6. Cómo solicitar",
        p: [
          "Escríbenos a amyoficialfan@gmail.com con tu correo, ID de transacción, fecha y motivo. Respondemos en un máximo de 5 días hábiles.",
        ],
      },
    ],
  },
  {
    slug: "dmca",
    title: "DMCA y retiro de contenido",
    updated: "26 de noviembre de 2026",
    intro:
      "AMY respeta los derechos de autor y la imagen de las personas. Este canal sirve para reportar contenido no autorizado.",
    sections: [
      {
        h: "1. Cómo reportar",
        p: [
          "Envía un correo a amyoficialfan@gmail.com con: identificación del contenido, URL exacta, prueba de titularidad o consentimiento, tus datos de contacto y una declaración de buena fe.",
          "Si el reporte involucra a un menor o falta de consentimiento, márcalo como URGENTE. Se atiende de inmediato, sin esperar el trámite ordinario.",
        ],
      },
      {
        h: "2. Plazos",
        p: [
          "Acusamos recibo en 24 horas hábiles. El contenido se oculta preventivamente mientras se verifica. La resolución ordinaria toma hasta 5 días hábiles.",
        ],
      },
      {
        h: "3. Contra-notificación",
        p: [
          "La persona que publicó el contenido puede responder con prueba de autorización. Si el reporte no se sostiene, el contenido se restaura y se notifica a ambas partes.",
        ],
      },
      {
        h: "4. Reincidencia",
        p: [
          "Las cuentas con reincidencia documentada se suspenden y pueden ser eliminadas. Los casos de menores se reportan a las autoridades.",
        ],
      },
    ],
  },
];

export function getLegalDoc(slug: string) {
  return legalDocs.find((d) => d.slug === slug);
}
