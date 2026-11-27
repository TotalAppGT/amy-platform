# Enlaces oficiales: pagos, almacenamiento y auth

> Verificados el 26/11/2026. Algunos sitios bloquean `curl` con 403 pero abren normal en el navegador.
> Los precios y políticas cambian: confirma siempre en la página oficial antes de firmar.

---

## 1. Pagos locales (Guatemala)

| Plataforma | Para qué | Costo / requisito | Enlace |
|---|---|---|---|
| **Recurrente** | Tarjeta GTQ, ACH, POS, suscripciones | 4.5% + Q2 comercial; 5.25% + Q2 personal. **No permite contenido adulto con tarjeta**; sí servicios profesionales si aprueban el giro | https://www.recurrente.com/precios |
| **Recurrente — giros prohibidos** | Ver qué no aceptan | Lista oficial de actividades prohibidas | https://ayuda.recurrente.com/es/p/giros-de-negocios-prohibidos |
| **Visanet Guatemala** | Adquirencia local (Visa) | Requiere comercio, contrato y aprobación; adulto normalmente rechazado | https://www.visanet.com.gt/ |
| **Neonet** | Adquirencia local (Visa/Mastercard) | Requiere comercio y aprobación; adulto normalmente rechazado | https://www.neonet.com.gt/ |

---

## 2. Pagos de alto riesgo / adulto

| Plataforma | Para qué | Costo / requisito | Enlace |
|---|---|---|---|
| **CCBill** | Tarjeta, suscripciones, contenido adulto | No publica %; registro alto riesgo: Visa USD 950 + Mastercard USD 500–1,000/año; reserva variable | https://ccbill.com/ · https://ccbill.com/pricing |
| **Segpay** | Tarjeta, suscripciones, creator platforms | Cotización; reserva 5% 6 meses; onboarding 24–72 h con KYC completo | https://segpay.com/ · https://segpay.com/csfaq/ |
| **Verotel** | Tarjeta, suscripciones adultas | Basic 15.5%; Premium 13–14% + 1.5% recurrencia; reserva 10% 6 meses; €500/año Basic | https://www.verotel.com/ · https://www.verotel.com/en/pricechart.html |
| **Epoch** | Tarjeta, suscripciones adultas | 13.25–15%; USD 1,950/año; USD 12.50 por chargeback | https://www.epoch.com/ |
| **MobiusPay** | Alto riesgo / adulto | Cotización; enfoque en merchants de alto riesgo | https://mobiuspay.com/ |
| **Vendo** | Merchant of record para contenido adulto | Cotización; maneja impuestos y chargebacks | https://www.vendoservices.com/ |
| **Corepay** | Alto riesgo / adulto | Cotización | https://corepay.net/ |
| **Netbilling** | Facturación adulta | Cotización | https://netbilling.com/ |

**Nota:** CCBill, Segpay, Verotel y Epoch son *payment facilitators*: tú eres sub-merchant. Piden empresa, KYC, sitio aprobado y, según el caso, registro 2257. No son “plug and play”.

---

## 3. Cripto

| Plataforma | Para qué | Costo | Enlace |
|---|---|---|---|
| **NOWPayments** | Cobrar en 350+ criptos, payout a tu wallet | 1% mismo coin; 1.5% conversión/fixed rate + red | https://nowpayments.io/ · https://nowpayments.io/help/about-nowpayments/about/what-are-your-fees |
| **BTCPay Server** | Pasarela autohospedada, sin custodia | 0% de servicio; tú pagas servidor y red | https://btcpayserver.org/ |
| **CoinGate** | Cripto con payout fiat/cripto | 1% Standard | https://coingate.com/ |
| **Cryptomus** | Cripto, wallets, payout | 2% nuevos; desde 0.4% por volumen | https://cryptomus.com/ |

---

## 4. Los que NO te sirven para adulto

| Plataforma | Por qué | Enlace |
|---|---|---|
| **PayPal** | Prohíbe “certain sexually oriented materials or services” y el contenido digital adulto; una cuenta personal muestra tu nombre y puede retener saldo 180 días | https://www.paypal.com/us/legalhub/paypal/acceptableuse-full |
| **Stripe** | No opera en Guatemala y prohíbe contenido adulto | https://stripe.com/legal/restricted-businesses |
| **Recurrente (tarjeta adulto)** | Su lista de giros prohibidos incluye pornografía, PPV, chat adulto y servicios para adultos | https://ayuda.recurrente.com/es/p/giros-de-negocios-prohibidos |

---

## 5. Almacenamiento y entrega

| Servicio | Para qué | Costo / nota | Enlace |
|---|---|---|---|
| **Cloudflare R2** | Guardar originales/HLS en bucket privado | Sin egress; S3-compatible; cifrado en reposo | https://developers.cloudflare.com/r2/ |
| **Bunny CDN** | Entregar video adulto con token auth | Pago por TB; permite contenido adulto legal | https://bunny.net/ |
| **Backblaze B2** | Alternativa de object storage | Barato; se combina con Bunny/Cloudflare | https://www.backblaze.com/cloud-storage |
| **Wasabi** | Object storage barato | Sin fees de egress, con políticas | https://wasabi.com/ |
| **MinIO** | S3 autohospedado | Tú controlas el servidor; más operación | https://min.io/ |
| **Terabox** | Almacenamiento de consumo | **No recomendado** para PPV: sin S3, sin URLs firmadas, sin ACL/auditoría, sin SLA adulto | https://www.terabox.com/ |

---

## 6. Auth

| Servicio | Para qué | Costo | Enlace |
|---|---|---|---|
| **Firebase Authentication** | Google/Gmail, email, 2FA | Gratis hasta 50,000 MAU; después USD 0.0055/MAU | https://firebase.google.com/docs/auth |

**No uses Firebase Storage** para contenido adulto. Solo Auth; el contenido va a R2/Bunny.

---

## 7. Orden recomendado para aplicar

1. **Recurrente** para servicios profesionales (masajes/spa), con cuenta comercial.
2. **NOWPayments** o **BTCPay** para contenido adulto.
3. **CCBill** y **Segpay** en paralelo para tarjeta adulta.
4. **Verotel** como respaldo si CCBill/Segpay tardan.
5. **Bunny + R2** para la entrega segura.

---

## 8. Checklist mínimo para aplicar a un PSP de alto riesgo

- Empresa constituida en Guatemala (S.A. o S.R.L.) con NIT.
- Sitio con dominio propio, 18+, términos, privacidad, DMCA y política de contenido.
- KYC del beneficiario y de la empresa.
- Descripción clara del modelo: suscripciones, PPV, propinas, llamadas.
- Prueba de que no hay menores, contenido no consentido ni servicios sexuales presenciales.
- Registros de consentimiento por contenido (modelo 2257-like).
- Método de payout: cuenta bancaria a nombre de la empresa.
- Plan de chargebacks y atención al cliente.

---

## 9. Advertencia

No intentes “probar” una cuenta personal de PayPal o Recurrente con contenido adulto para ver si pasa. Si lo detectan, pueden cerrar la cuenta y retener fondos. Es mejor aplicar con la empresa y el giro correcto desde el inicio.
