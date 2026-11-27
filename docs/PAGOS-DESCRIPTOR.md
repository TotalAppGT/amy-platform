# Descriptor de pagos: que el cliente vea la marca, no tu nombre

## 1. Qué es el descriptor

Es el texto que aparece en el estado de cuenta o app del banco del cliente cuando paga con tarjeta. Ejemplos:

- `RECURRENTE* AMY`
- `AMY CARE`
- `CCBILL* AMY`

El cliente debe reconocer el cobro. Si no lo reconoce, aumenta el chargeback. Por eso el descriptor debe coincidir con la marca visible en la web.

---

## 2. Lo que se puede y no se puede

| Frente a… | Se puede mostrar la marca | Se puede ocultar tu identidad |
|---|---|---|
| Cliente / estado de cuenta | ✅ Sí, con descriptor comercial | ✅ El cliente no necesita ver tu nombre personal |
| Recurrente / banco / PSP | ❌ No | ❌ Exigen KYC del beneficiario final |
| SAT / legal | ❌ No | ❌ La empresa y el NIT deben estar en términos y facturas |

La marca puede ser “Amy” o “Amy Care”. La empresa sigue siendo la titular legal.

---

## 3. Por qué tu cuenta actual muestra otra cosa

Tu cuenta de Recurrente es **comercial** y la usas para tus SaaS. El descriptor probablemente está configurado a nivel de comercio y muestra el nombre de la empresa o “RECURRENTE*”. Si cambias ese descriptor, también cambias el de tus SaaS y confundes a esos clientes.

Opciones, de mejor a peor:

### Opción A — Tienda/subcomercio con descriptor propio

Pregunta a Recurrente si permite:

- una **segunda tienda** o subcomercio bajo el mismo comercio,
- un **descriptor distinto** por sitio/marca,
- un **link de pago** con nombre comercial.

Si existe, pide que la nueva tienda se llame **Amy** y que el descriptor sea `AMY` o `AMY CARE`.

### Opción B — Segunda cuenta comercial

Si no hay subcomercios, abre una cuenta comercial nueva con:

- la misma empresa, o
- una empresa nueva (“Amy Studio, S.A.”) con su propio NIT y cuenta bancaria.

Esto separa los ingresos de SaaS de los de la plataforma, protege tu operación principal y permite un descriptor propio.

### Opción C — Otro PSP para la plataforma

Si Recurrente no personaliza el descriptor, usa otro procesador para la plataforma:

- **local**: adquirente Visanet/Neonet (requiere comercio),
- **no adulto**: PayPal Business (solo si el contenido lo permite),
- **adulto**: CCBill/Segpay con descriptor neutral.

---

## 4. No mezcles adulto con tu cuenta SaaS

Si la plataforma va a tener contenido adulto, **no lo metas en tu cuenta de Recurrente**. Recurrente prohíbe ese giro con tarjeta y te puede cerrar la cuenta que usas para tus SaaS. La vertical adulta va con:

- otra empresa/entidad,
- otro dominio,
- CCBill/Segpay,
- cripto.

---

## 5. Correo para Recurrente

> **Asunto:** Solicitud de descriptor y segunda tienda — Amy
>
> Hola equipo de Recurrente:
>
> Tengo una cuenta comercial activa que uso para mis sistemas SaaS. Estoy lanzando una nueva línea de servicios de bienestar (masajes profesionales, spa, fotografía y eventos) y contenido audiovisual **no adulto** bajo la marca **Amy**.
>
> Necesito confirmar:
>
> 1. Si puedo operar una segunda tienda/sitio con el mismo comercio o si debo abrir una cuenta separada.
> 2. Si es posible configurar el descriptor del estado de cuenta como **AMY** o **AMY CARE** para esa nueva línea, sin afectar el descriptor de mis SaaS.
> 3. Confirmación por escrito de que el giro “servicios de bienestar y contenido digital no adulto” está permitido.
> 4. Requisitos para suscripciones, links de pago y pagos recurrentes.
> 5. Documentos que debo adjuntar (NIT, cámara de comercio, dominio, términos, etc.).
>
> Quedo atento. Gracias.

Guarda la respuesta por escrito. Si te dicen que no se puede cambiar el descriptor, evalúa la Opción B o C.

---

## 6. Regla de oro

El descriptor debe ser **reconocible y verdadero**. No pongas un nombre que no tenga relación con la web o que induzca a error: eso genera chargebacks y puede terminar en cierre de cuenta.
