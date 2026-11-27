# AMY — prototipo local (antes de subir)

Plataforma tipo OnlyFans + reservas de servicios profesionales, hecha para revisar el look, los flujos y el modelo de negocio **antes** de comprar dominio o desplegar en Coolify.

> Estado: **prototipo visual local**. Nada se ha subido a GitHub, Coolify ni a internet. Los datos son ficticios y los pagos no están conectados.

---

## 1. Cómo abrirlo

**Opción fácil:** doble clic en `INICIAR-DEMO.bat`.

**Opción manual:**

```powershell
cd C:\dev\plataforma-creadores-gt\web
npm install
npm run dev
```

Abre: **http://localhost:3100**

Para detenerlo, cierra la ventana negra que dice `AMY dev` o presiona `Ctrl + C`.

---

## 2. Qué puedes revisar

| Ruta | Qué muestra |
|---|---|
| `/` | Landing completa, age gate 18+, hero, creadoras, chat, servicios, comisiones, FAQ |
| `/explorar` | Catálogo con búsqueda, filtros, precios y orden |
| `/c/camila-rivas` | Perfil, galería, tienda de ofertas, PPV, llamada y compra |
| `/chat` | Chat real con mensajes, propina, media bloqueada, wallet y llamada por minuto |
| `/servicios` | Catálogo de masajes, spa, fotografía, belleza, fitness y eventos |
| `/servicios/masaje-relajante-profundo` | Detalle de servicio y reserva con anticipo 20% |
| `/creadora` | Panel: ingresos, comisión, retiros, contenido, crecimiento, campañas y referidos |
| `/creadora/subir` | Estudio de carga: galería de 4 fotos + publicación/PPV |
| `/admin` | Panel admin: GMV, comisión, KYC, moderación, reservas, retiros |
| `/entrar` y `/registro` | Login y registro con selección de rol |
| `/legal/terminos` | Términos, privacidad, contenido, derechos de autor, cookies, reembolsos y DMCA |

### Cosas que puedes hacer (demo interactiva)

- Aceptar el age gate 18+.
- Filtrar creadoras por categoría, ciudad, precio y “en línea”.
- Cambiar plan mensual / 3 meses / VIP y ver el precio correcto.
- Desbloquear un PPV y ver cómo baja el saldo.
- Enviar propina en el chat y ver el mensaje.
- Iniciar una “llamada” y ver el cobro por minuto en vivo.
- Reservar un masaje: elegir día, hora, modalidad y pagar anticipo demo.
- Aprobar o rechazar solicitudes KYC en `/admin`.
- Mover la calculadora de comisiones en la landing.
- En el perfil de Camila, deslizar la **galería de 4 fotos** (flechas, puntos y miniaturas).
- En `/creadora/subir`, arrastrar o elegir 1–4 fotos, marcar portada y publicar la galería.
- En la misma pantalla, cambiar a **Publicación / PPV**, subir archivos, poner precio y publicar.

---

## 3. Qué es real y qué es demo

| Real | Demo / pendiente |
|---|---|
| UI, navegación, responsive, marca AMY | Backend, base de datos y autenticación real |
| Cálculos de comisión, anticipo y llamadas | Pagos reales (no hay pasarela conectada) |
| Catálogo y fichas de creadoras/servicios | Fotos reales (usamos arte generativo con iniciales) |
| Flujos de KYC, moderación y retiros | KYC real (Didit/Sumsub), FEL/SAT, correos |
| Age gate y textos legales base | Revisión legal y contratos definitivos |

La estética usa arte abstracto con iniciales en lugar de fotos de personas reales: evita usar imágenes sin consentimiento y se ve intencional. Cuando tengas fotos de tus creadoras/profesionales, se reemplazan.

---

## 4. Recurrente: respuesta corta

Según la página oficial de giros prohibidos de Recurrente (actualizada en noviembre 2026):

- **Contenido para adultos:** no se puede cobrar con tarjeta. Solo permiten **transferencia bancaria o PayPal**, no pagos con tarjeta.
- También prohíben **pornografía, PPV, chat en vivo para adultos, servicios de acompañantes, prostitución y masajes sexuales**.
- Para la vertical de **masajes profesionales, spa, belleza, fotografía o eventos**, Recurrente sí podría usarse si aprueban tu cuenta y el giro, porque no es contenido adulto. Hay que declararlo bien en el onboarding.

**Conclusión:** no uses tu llave live de Recurrente para suscripciones de contenido adulto; te pueden cerrar la cuenta y congelar fondos. Para esa parte necesitas un PSP de alto riesgo (CCBill, Segpay, Verotel) o cripto. Para los servicios profesionales, Recurrente es una opción válida.

Además: tu llave `sk_live_...` está guardada en texto plano en `C:\Users\Dany\.recurrente\credentials.json`. Rótala y pásala a variables de entorno/Coolify cuando conectemos pagos.

---

## 5. Seguridad antes de subir

- No subir `.env`, llaves de Recurrente, tokens de GitHub ni contraseñas.
- Rotar el token de GitHub que está en `.git-credentials` si lo compartiste.
- Usar 2FA en GitHub y Coolify.
- El age gate actual es solo del lado del cliente; en producción la verificación real va en el backend.

---

## 6. Siguiente paso para producción

1. Definir **nombre y dominio** (AMY es provisional).
2. Entregar **token API de Coolify** o acceso al panel `https://coolify.144-202-91-4.sslip.io` para desplegar staging.
3. Elegir **PSP**: alto riesgo para adulto + Recurrente/transferencia para servicios.
4. Contratar **KYC** (Didit, Sumsub, Veriff) y **abogado/contador** en Guatemala.
5. Convertir el prototipo en producto: PostgreSQL, autenticación, wallet/ledger, storage S3/R2, HLS/CDN y LiveKit.

La arquitectura completa está en `docs/ARQUITECTURA.md`.

Documentos de apoyo:

- `docs/PRECIOS-Y-PAGOS.md` — benchmark de OnlyFans/Fansly, precios recomendados, comisiones, pasarelas, recargos y economía unitaria.
- `docs/MARCA-Y-DOMINIOS.md` — shortlist de nombres (Seda, Amy, Bruma…), disponibilidad preliminar y sistema de marca.
- `docs/AUTH-FIREBASE.md` — cómo integrar Google/Gmail con Firebase Auth, KYC y costos.
- `docs/ENLACES-PAGOS.md` — links oficiales de Recurrente, CCBill, Segpay, Verotel, Epoch, cripto, R2/Bunny.
- `docs/PAGOS-DESCRIPTOR.md` — cómo hacer que el estado de cuenta muestre la marca y no tu nombre, con correo para Recurrente.

---

## 7. Estructura

```
plataforma-creadores-gt/
├─ INICIAR-DEMO.bat
├─ LEEME.md
├─ GUIA-DEMO.md
├─ docs/ARQUITECTURA.md
├─ docs/PRECIOS-Y-PAGOS.md
├─ docs/MARCA-Y-DOMINIOS.md
├─ docs/AUTH-FIREBASE.md
├─ docs/ENLACES-PAGOS.md
├─ docs/PAGOS-DESCRIPTOR.md
└─ web/
   ├─ src/app/          # páginas (landing, explorar, perfil, chat, servicios, paneles)
   ├─ src/components/   # UI reutilizable
   ├─ src/lib/          # datos demo, servicios y textos legales
   ├─ scripts/shots.mjs # capturas automáticas
   └─ shots/            # screenshots de referencia
```

Comandos útiles:

```powershell
cd web
npm run dev      # desarrollo en localhost:3100
npm run build    # verificar que compila para producción
node scripts/shots.mjs   # regenerar capturas en shots/
```
