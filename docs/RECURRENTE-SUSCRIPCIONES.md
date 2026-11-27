# Recurrente: segunda cuenta, suscripciones y marca

> Guía práctica para usar Recurrente en Amy **sin mezclar** tu operación SaaS y sin romper sus reglas.

---

## 1. ¿Habrá problema con “contenido + masajes”?

Depende de qué contenido sea:

| Contenido | ¿Recurrente tarjeta? |
|---|---|
| Fitness, bienestar, arte, educación, lifestyle, tutoriales | ✅ Permitido, sujeto a revisión |
| Masajes profesionales / spa / terapéutico | ✅ Permitido, si el giro se declara bien |
| Desnudo, sexo explícito, PPV adulto, chat adulto | ❌ Prohibido |
| “Masaje con final feliz”, acompañamiento íntimo, escort | ❌ Prohibido y además ilegal en Guatemala |

No importa cómo se llame la web: si el contenido es explícito, Recurrente lo va a clasificar como adulto. Si es así, usa la vertical de alto riesgo (CCBill/Segpay) + cripto, en otra cuenta/empresa.

**Para esta cuenta:** describe el giro como “plataforma de servicios de bienestar y contenido audiovisual no adulto”. Pide aprobación por escrito.

---

## 2. Crear la segunda cuenta comercial

1. Entra a Recurrente → **Nueva cuenta comercial** (o pide a soporte que la cree).
2. Usa la misma empresa o una nueva (“Amy Studio, S.A.”). Si es nueva, ten listo:
   - escritura/constitución,
   - NIT,
   - DPI del representante,
   - cuenta bancaria a nombre de la empresa.
3. Nombre comercial: **Amy**.
4. Giro: **servicios de bienestar, reservas y contenido digital no adulto**.
5. Sitio web: `amy.gt` (o el dominio que compres).
6. Logo: sube el logo de Amy en el perfil del comercio.
7. Soporte: `amyoficialfan@gmail.com` y WhatsApp.
8. Documentos legales: términos, privacidad, reembolsos y política de contenido.

No uses la cuenta de tus SaaS para esto. Así proteges tu operación principal.

---

## 3. Cómo se ve el cobro para el cliente

Hay tres cosas distintas:

| Elemento | Dónde se ve | Qué debe decir |
|---|---|---|
| **Logo y nombre comercial** | Checkout / link de pago | “Amy” + logo |
| **Descripción del cobro** | Checkout y recibo | “Suscripción mensual Amy”, “Reserva masaje 60 min”, “Pack de videos” |
| **Descriptor** | Estado de cuenta del banco | “AMY” o “AMY CARE” (si Recurrente lo permite) |

Pide a soporte:

1. Que el descriptor sea **AMY** (o el que elijas).
2. Que el checkout muestre el logo y el nombre comercial.
3. Que las suscripciones digan claramente el monto, la frecuencia y cómo cancelar.
4. Que los links de servicio digan qué se está pagando (anticipo, masaje, fecha).

Si Recurrente no permite descriptor propio, usa una cuenta separada o un PSP distinto. No cambies el descriptor de tus SaaS.

---

## 4. Productos que debes crear

| Producto | Tipo | Precio sugerido | Nota |
|---|---|---|---|
| Amy Mensual | Suscripción | Q149/mes | Renovación automática |
| Amy 3 meses | Suscripción o pago único | Q390 | 17% off |
| Amy VIP | Suscripción | Q299/mes | Incluye llamada |
| PPV / video | Pago único | Q60–350 | Se cobra al desbloquear |
| Propina | Pago único | Q20–250 | Opcional |
| Llamada 20 min | Pago único | Q200–280 | Reserva de horario |
| Masaje 60 min | Pago único o anticipo | Q280–350 | Anticipo 20% |
| Sesión boudoir | Anticipo | Q850–1,200 | 20% para bloquear |

Para PPV y propinas, lo ideal es **wallet**: el fan recarga y luego debita. Así reduces el número de transacciones pequeñas y el Q2 fijo.

---

## 5. Suscripciones: flujo recomendado

1. Fan elige plan → checkout Recurrente.
2. Recurrente cobra y envía webhook `payment.succeeded`.
3. El backend activa la suscripción en PostgreSQL y acredita el periodo.
4. En cada renovación, Recurrente cobra y manda webhook; el backend extiende el periodo.
5. Si falla el cobro, se marca `past_due`, se reintenta y se avisa al fan.
6. Si el fan cancela, se detiene la renovación y conserva acceso hasta el final del periodo.
7. El ledger registra comisión de Amy y saldo de la creadora.

No actives acceso solo con el “success” del frontend: espera el webhook firmado.

---

## 6. Impuestos y facturación

- Recurrente te da el cobro y la liquidación, **no tu factura FEL**.
- Emite FEL/SAT por la venta y por la liquidación a creadoras.
- IVA 12%: define si tus precios son “IVA incluido” o “+ IVA”.
- Guarda comprobantes de payout y contratos de intermediación.
- Valida retenciones de ISR con tu contador.

---

## 7. Errores que debes evitar

- Usar la cuenta de SaaS para la plataforma.
- Poner “Amy” en la web pero dejar el descriptor con tu nombre personal.
- Mezclar contenido adulto con la cuenta de servicios.
- No tener términos, privacidad, reembolsos y política de contenido.
- No mostrar el monto, frecuencia y cancelación antes de cobrar.
- No conciliar webhooks con el ledger.

---

## 8. Correo a soporte

> **Asunto:** Segunda cuenta comercial y descriptor — Amy
>
> Hola:
>
> Tengo una cuenta comercial para mis SaaS. Quiero abrir una segunda cuenta comercial para **Amy**, una plataforma de servicios de bienestar (masajes profesionales, spa, fotografía) y contenido audiovisual **no adulto**.
>
> Necesito:
> 1. Confirmar si puedo abrir la segunda cuenta con la misma empresa o si debe ser una empresa nueva.
> 2. Configurar el nombre comercial y el descriptor como **AMY**.
> 3. Confirmar por escrito que el giro está permitido.
> 4. Requisitos para suscripciones, links de pago y webhooks.
> 5. Documentos que debo subir (NIT, constitución, DPI, cuenta bancaria).
>
> Gracias.

---

## 9. Si el contenido es adulto

No insistas con Recurrente. Usa:

- **CCBill / Segpay** para tarjeta,
- **NOWPayments / BTCPay** para cripto,
- otra empresa/dominio/descriptor,
- KYC, 2257-like records y age gate.

Mezclarlo con la cuenta de masajes es la forma más rápida de perder ambas cuentas.
