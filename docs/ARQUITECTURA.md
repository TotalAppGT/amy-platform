# Plataforma de creadoras — Arquitectura y plan (Guatemala)

> Documento de trabajo v0.1 — 26/11/2026
> Objetivo: plataforma tipo OnlyFans (contenido, suscripciones, chat, llamadas) operada por un intermediario en Guatemala, con comisión por venta y pagos a creadoras.

---

## 1. Resumen ejecutivo

La plataforma se compone de **4 experiencias** en un solo producto:

| Portal | Usuario | Función |
|---|---|---|
| Público | Visitante | Perfiles, catálogo, age gate, registro |
| Fan | Cliente | Suscripción, PPV, propinas, chat, llamadas, wallet |
| Creadora | Trabajadora | Onboarding/KYC, contenido, precios, mensajes, llamadas, ganancias, retiros |
| Admin | Tú / equipo | Aprobaciones, comisiones, pagos, moderación, reportes, configuración |

Modelo de negocio: **comisión por transacción** (ej. 20–30% plataforma) + suscripciones + PPV + propinas + llamadas por minuto. La plataforma **no es empleadora**: las creadoras facturan sus servicios (ver §8).

---

## 2. Realidades que definen el proyecto (leer antes de codificar)

### 2.1 Pagos: este es el verdadero cuello de botella
Ningún procesador "normal" (Stripe, PayPal, Recurrente, pasarelas de VisaNet/Neonet estándar) acepta contenido adulto. Opciones reales:

| Vía | Uso | Notas |
|---|---|---|
| PSP de alto riesgo (CCBill, Segpay, Verotel, Vendo) | Tarjeta internacional | Comisión 10–15%, requieren web aprobada, KYC de la empresa, a veces 2257 |
| Cripto (NOWPayments, BTCPay) | Suscripciones/PPV/tips | Bajo costo, sin chargebacks, pero poca conversión local |
| Transferencia/agente bancario (GTQ) | Recargas manuales de wallet | Requiere conciliación manual y control antifraude |
| Adquirente local de alto riesgo | Tarjeta GTQ | Poco probable; hay que negociar con banco/adquirente |

**Consecuencia de diseño:** el corazón del sistema es una **wallet con créditos y un ledger de doble entrada**, no una pasarela única. Cada método de pago entra como "recarga"; los consumos (PPV, tips, llamadas) se debitan de la wallet. Así puedes cambiar de PSP sin tocar el producto.

### 2.2 Verificación de edad y KYC (no negociable)
- Age gate 18+ en todo el sitio + verificación de documento para **creadoras** (KYC: identidad, edad, selfie, contrato, consentimiento grabado).
- Verificación de fans cuando el riesgo lo amerite (país, monto, chargebacks).
- Registro de consentimiento por contenido (modelo tipo 2257): quién aparece, documento, fecha, firma.
- Moderación de contenido y canal de denuncia; tolerancia cero a menores.
- Si vendes a EE. UU./UE/UK aplican sus leyes (2257, DSA, Online Safety Act) aunque la empresa esté en Guatemala.

### 2.3 Servicios presenciales
La plataforma puede vender **servicios legales presenciales** (shows, eventos, sesiones de fotos, masajes profesionales) con reserva y anticipo. **No se construirá un marketplace de servicios sexuales presenciales**: en Guatemala el proxenetismo y la trata son delitos, y además viola las políticas de todos los procesadores de pago. Si el modelo incluye "citas", debe quedar como acompañamiento legal y sin contenido sexual, con contrato y límites claros.

### 2.4 Impuestos y facturación (GT)
- IVA 12% sobre servicios digitales; ISR según régimen.
- Factura electrónica FEL (SAT) para ventas y para liquidación a creadoras.
- Retención a creadoras independientes según su régimen; validar con contador.
- La comisión de la plataforma debe quedar documentada en contrato de intermediación.

---

## 3. Alcance funcional (MVP → completo)

### Fase 1 — Núcleo
- Registro/login (email, teléfono, Google), 2FA, sesiones por dispositivo.
- Age gate, términos, privacidad, política de contenido.
- Perfiles de creadora: bio, portada, avatar, etiquetas, verificación.
- Catálogo: posts gratuitos, posts de pago (PPV), álbumes, videos.
- Suscripciones mensuales/semanales por creadora.
- Wallet del fan (recargas, saldo, historial).
- Panel admin: aprobar creadoras, configurar comisión, ver transacciones.

### Fase 2 — Monetización
- Propinas, mensajes de pago, desbloqueo de media en chat.
- Paquetes/bundles, promociones y códigos.
- Ledger de ganancias por creadora, solicitudes de retiro, comprobantes.
- Reportes: GMV, comisión, payouts, chargebacks, cohortes.
- Notificaciones email/WhatsApp/push.

### Fase 3 — Tiempo real
- Chat 1:1 con texto, imagen, audio, video; presencia y "escribiendo".
- Llamadas de video/audio 1:1 (WebRTC SFU) con cobro por minuto y corte automático por saldo.
- Live streaming con chat y propinas (opcional).
- Grabación opcional y consentimiento.

### Fase 4 — Escala y confianza
- CDN + HLS + URLs firmadas + marca de agua por usuario.
- Detección de fugas (hash matching) y DMCA/takedown.
- Moderación asistida por IA + cola humana.
- Motor de búsqueda, recomendaciones, analítica de producto.
- Multi-idioma (ES/EN), multi-moneda (GTQ/USD).

---

## 4. Arquitectura técnica

```
                    ┌─────────────────────────────┐
   Fans/Creadoras → │  Next.js 15 (web + admin)   │
                    │  Cloudflare (WAF, CDN, DNS) │
                    └──────────────┬──────────────┘
                                   │ HTTPS
                    ┌──────────────▼──────────────┐
                    │  API NestJS (Fastify)       │
                    │  REST + WebSocket gateway   │
                    └───┬───────┬───────┬─────────┘
                        │       │       │
              ┌─────────▼─┐ ┌───▼───┐ ┌─▼──────────────┐
              │ PostgreSQL│ │ Redis │ │ S3 (R2/Bunny)  │
              │ 16        │ │ 7     │ │ media + backups│
              └───────────┘ └───┬───┘ └────────────────┘
                                │ BullMQ
                    ┌───────────▼───────────┐
                    │ Workers               │
                    │ ffmpeg/HLS, emails,   │
                    │ pagos, moderación,    │
                    │ thumbnails, webhooks  │
                    └───────────┬───────────┘
                                │
              ┌─────────────────▼─────────────────┐
              │ LiveKit (SFU) + TURN  (llamadas)  │
              └───────────────────────────────────┘
```

### Stack propuesto
| Capa | Tecnología | Motivo |
|---|---|---|
| Web | Next.js 15, TypeScript, Tailwind, shadcn/ui | SSR/SEO, un solo repo para 4 portales |
| API | NestJS + Fastify, Zod, Prisma | Modular, testeable, escala horizontal |
| DB | PostgreSQL 16 | Transacciones y ledger |
| Cache/colas | Redis 7 + BullMQ | Sesiones, rate limit, jobs |
| Storage | Cloudflare R2 o Bunny Storage | Barato, sin egress caro |
| CDN video | Bunny CDN (HLS) | Permite contenido adulto legal; validar AUP |
| Video llamadas | LiveKit (self-host o cloud) | SFU open source, grabación, TURN |
| Búsqueda | Meilisearch | Simple y rápido |
| Email | Resend / Amazon SES | Transaccional |
| WhatsApp | Meta Cloud API | Recordatorios y soporte |
| Observabilidad | Sentry + Uptime Kuma + logs | Detección temprana |
| Deploy | Coolify sobre Vultr + Docker Compose | Lo que ya tienes |

> Alternativa si no quieres operar transcodificación: Bunny Stream. **Evita Mux/Cloudflare Stream** para adulto hasta confirmar su AUP por escrito.

---

## 5. Modelo de datos (núcleo)

```
users(id, email, phone, password_hash, role, status, locale, created_at)
user_profiles(user_id, display_name, birthdate, country, avatar_url)
creator_profiles(user_id, stage_name, bio, cover_url, verified_at, kyc_status,
                 commission_bps, payout_method, status)
kyc_verifications(id, creator_id, provider, doc_type, status, raw_ref, reviewed_by)
consents(id, creator_id, subject_name, doc_url, signed_at, content_ref)

media_assets(id, creator_id, type, status, storage_key, hls_key, duration,
             width, height, blurhash, moderation_status, created_at)
posts(id, creator_id, visibility, price_cents, caption, published_at)
post_assets(post_id, asset_id, position)
subscriptions(id, fan_id, creator_id, plan_id, status, current_period_end,
              price_cents, provider, provider_ref)
plans(id, creator_id, interval, price_cents, trial_days, active)

wallets(id, user_id, currency, balance_cents, version)
ledger_entries(id, wallet_id, direction, amount_cents, kind, ref_type, ref_id,
               idempotency_key, created_at)   -- doble entrada
orders(id, fan_id, creator_id, kind, amount_cents, status, provider, provider_ref)
payouts(id, creator_id, amount_cents, status, method, processed_at, evidence_url)

conversations(id, fan_id, creator_id, last_message_at, unread_fan, unread_creator)
messages(id, conversation_id, sender_id, kind, body, media_id, price_cents,
         unlocked_by, created_at)
calls(id, conversation_id, room_id, started_at, ended_at, minutes_billed,
      rate_per_min_cents, status)
tips(id, fan_id, creator_id, amount_cents, message, created_at)
moderation_cases(id, asset_id, reason, status, reviewer_id, resolution)
audit_logs(id, actor_id, action, entity, entity_id, ip, metadata, created_at)
```

Reglas de oro:
- **Dinero en centavos enteros**, nunca floats.
- **Ledger inmutable** con doble entrada; el saldo es una vista derivada.
- **Idempotency keys** en toda operación de pago/webhook.
- **Soft delete** y auditoría en todo lo sensible.
- Precios y comisión versionados para no reescribir historia.

---

## 6. Flujo de dinero (ejemplo)

1. Fan recarga Q100 → `order` pagada vía PSP/cripto → +Q100 a su wallet.
2. Compra PPV de Q50 → -Q50 wallet; se crean asientos:
   - Creadora 80% → Q40 (pendiente)
   - Plataforma 20% → Q10 (ingreso)
   - IVA 12% sobre comisión (si aplica) → se calcula y registra.
3. Propina Q20 → mismo split.
4. Llamada 10 min × Q5 = Q50 → se debita por minuto (o bloqueo de saldo al inicio).
5. Creadora solicita retiro de Q1,000 → admin aprueba → payout (transferencia/USDT/Paxum) → asiento de liquidación + FEL/recibo.
6. Chargeback → se revierte del saldo pendiente y se registra deuda si ya se pagó.

Estados: `pending → available → requested → paid / reversed`.

---

## 7. Seguridad y anti-piratería

- URLs firmadas de corta duración (5–15 min) y cookies firmadas para HLS.
- Marca de agua dinámica con ID de usuario en video/imagen (disuasión + trazabilidad).
- HLS segmentado, sin descarga directa; rate limiting por sesión.
- Cifrado en reposo (DB, storage), TLS 1.3, secretos en Coolify/Vault.
- 2FA obligatorio para admin y creadoras; RBAC granular.
- Detección de screenshots imposible al 100%: se mitiga con watermark y límites.
- Backups diarios cifrados a R2 + prueba de restauración mensual.
- WAF Cloudflare, rate limits, captcha en registro, antifraude en recargas.
- Logs de auditoría inmutables para accesos a media y cambios de comisión.

---

## 8. Contratos y cumplimiento

- **Contrato de intermediación** con cada creadora: servicios, comisión, pagos, exclusividad (opcional), uso de imagen, edad, consentimiento, terminación.
- **Declaración de mayoría de edad** + documento verificado, renovable.
- **Registro de consentimiento por contenido** (quién aparece y autorización).
- **Términos y privacidad** para fans; política de reembolsos y chargebacks.
- **Política de contenido prohibido** (menores, no consentido, violencia, zoofilia, etc.).
- **Canal de denuncias** y SLA de takedown (24–48 h).
- **Cumplimiento fiscal GT**: FEL, IVA, ISR, retenciones; contador desde el día 1.
- Si hay empleados/recepcionistas: contrato laboral GT y no exponerlos a contenido sin su consentimiento.

---

## 9. Infraestructura en Coolify

### Servicios (docker-compose)
| Servicio | Réplicas | Notas |
|---|---|---|
| `web` | 1–2 | Next.js standalone |
| `api` | 1–2 | NestJS, healthcheck `/health` |
| `worker` | 1–2 | BullMQ; ffmpeg con límite de CPU |
| `postgres` | 1 | Volumen persistente + backup |
| `redis` | 1 | Persistencia AOF |
| `livekit` | 1 | Puertos UDP/TCP + TURN |
| `meilisearch` | 1 | Opcional fase 2 |
| `minio` | solo dev | En prod usar R2/Bunny |

### Tamaño de servidor recomendado
- **App + DB**: 4 vCPU / 8 GB (mínimo), ideal 8 vCPU / 16 GB, 200 GB NVMe.
- **Media/transcode**: 8 vCPU / 16 GB si transcodificas en casa; si no, usa Bunny Stream y ahorra este nodo.
- **LiveKit**: 4 vCPU / 8 GB para ~50 llamadas concurrentes; escala horizontal.
- Tu Vultr actual (144.202.91.4) probablemente es pequeño: hay que revisar CPU/RAM/disco antes de meter todo ahí.

### Dominios sugeridos
- `tumarca.com` → web
- `api.tumarca.com` → API
- `media.tumarca.com` → CDN/storage
- `live.tumarca.com` → LiveKit (wss)
- `admin.tumarca.com` → panel (protegido)

### Pipeline
GitHub → Coolify (auto-deploy en `main`) → staging en `develop` → backups y migraciones automáticas.

---

## 10. Fases, tiempos y costo

| Fase | Entregable | Tiempo estimado* |
|---|---|---|
| 0 | Legal, PSP, dominio, marca, servidor | 1–2 semanas |
| 1 | Núcleo: auth, perfiles, catálogo, wallet, admin | 3 semanas |
| 2 | Pagos, suscripciones, PPV, ledger, payouts | 3–4 semanas |
| 3 | Chat, llamadas, cobro por minuto | 3 semanas |
| 4 | Moderación, anti-piratería, analítica, hardening | 3 semanas |
| 5 | Beta cerrada + ajustes | 2 semanas |

\* Con desarrollo asistido y revisiones tuyas; el camino crítico real son las aprobaciones de pago y KYC.

### Costos mensuales estimados
| Ítem | USD/mes |
|---|---|
| Vultr app (4–8 vCPU) | 48–160 |
| Vultr media (opcional) | 48–96 |
| Object storage + CDN | 10–60 |
| LiveKit Cloud (alternativa) | 0–100 |
| KYC (Didit/Sumsub) | 1–2 por verificación |
| Email/WhatsApp | 10–40 |
| Dominio + Cloudflare | 2–25 |
| PSP alto riesgo | 10–15% de GMV + fees |
| **Total base** | **~150–400 + % GMV** |

---

## 11. Riesgos principales

1. **Pagos**: sin PSP aprobado no hay negocio. Iniciar trámite en paralelo al desarrollo.
2. **Legal**: proxenetismo/trata si se cruza la línea de servicios sexuales presenciales. No hacerlo.
3. **Menores**: fallo aquí cierra la empresa. KYC + moderación + logs.
4. **Fugas de contenido**: watermark + URLs firmadas + DMCA; asumir que algo se filtra.
5. **Chargebacks**: wallet prepago y límites reducen el impacto.
6. **Operación 24/7**: chat/llamadas requieren cobertura y moderación; presupuestar equipo.
7. **Marca**: publicidad en Meta/Google restringida; plan de adquisición alternativo (afiliados, X, Reddit, SEO).

---

## 12. Próximos pasos concretos

1. Definir marca, dominio y comisión (ej. 20/80).
2. Crear token API de Coolify y confirmar specs del servidor.
3. Abrir conversación con 2 PSP de alto riesgo + 1 cripto.
4. Contratar contador con experiencia en FEL y servicios digitales.
5. Aprobar este documento y arrancar Fase 1 (repo + deploy staging).

---

## 13. Decisiones pendientes (para el dueño)

- [ ] Nombre/marca y dominio
- [ ] Comisión plataforma (%)
- [ ] Moneda principal (GTQ, USD o ambas)
- [ ] Métodos de pago iniciales (cripto, transferencia, PSP)
- [ ] ¿Habrá live streaming en el MVP o solo chat/llamadas?
- [ ] ¿Servicios presenciales? (solo legales, con contrato)
- [ ] Idioma inicial (ES, EN o ambos)
- [ ] Presupuesto mensual de infraestructura
- [ ] Equipo de moderación/soporte
