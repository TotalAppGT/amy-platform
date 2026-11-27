# Firebase Auth + Gmail en AMY

> Cómo integrar “Continuar con Google” sin sacrificar seguridad, edad ni KYC.

---

## 1. Decisión

Usa **Firebase Authentication** como proveedor de identidad, no como base de datos ni como almacenamiento de contenido.

- Proveedores: Google, email/contraseña y, opcional, Apple.
- Backend: valida el **ID token** con Firebase Admin SDK y crea la sesión propia (cookie httpOnly + refresh token).
- Roles y permisos viven en **PostgreSQL** y en **custom claims**; nunca en el cliente.
- El contenido adulto vive en **R2/Bunny + CDN**, no en Firebase Storage.

**Costo 2026:** gratis hasta **50,000 MAU**; después USD 0.0055/MAU (baja con volumen). El login con Google no cuesta extra. SMS sí se cobra por mensaje.

---

## 2. Flujo de registro

```
1. Usuario pulsa "Continuar con Google"
2. Firebase Auth abre popup/redirect y devuelve un ID token
3. Frontend manda el token a POST /auth/firebase
4. Backend verifica firma, expiración y audiencia
5. Backend busca user por firebase_uid o email
   - si no existe: crea user con rol "fan", status "active"
   - si existe: actualiza last_login
6. Backend pide fecha de nacimiento si falta
7. Backend emite cookie de sesión httpOnly + refresh
8. Si el usuario quiere ser creadora/profesional:
   - crea solicitud KYC
   - bloquea publicación/cobros hasta aprobación
```

### Datos mínimos

```
users(id, firebase_uid unique, email, email_verified, name, birthdate,
      role, status, created_at, last_login_at)
kyc_requests(id, user_id, provider, status, doc_type, reviewed_by, reviewed_at)
```

### Custom claims

```
{ role: "fan" | "creator" | "provider" | "moderator" | "admin",
  creator_status: "pending" | "approved" | "suspended",
  kyc: true | false }
```

El backend siempre vuelve a consultar el rol en PostgreSQL para operaciones sensibles (pagos, retiros, moderación). Los claims son una optimización, no la fuente de verdad.

---

## 3. Reglas de edad

Google no verifica edad. Por eso:

- Pide **fecha de nacimiento** en el primer login.
- Age gate 18+ en el sitio (ya está en el prototipo).
- Para **creadoras/profesionales**: KYC con documento + selfie + contrato antes de publicar o cobrar.
- Para fans: age gate + verificación adicional cuando el monto o el país lo amerite.
- Guarda evidencia y fecha de aceptación de términos.

---

## 4. Seguridad

- **App Check** en Firebase para reducir abuso de la API.
- **2FA** obligatorio para admin y creadoras (TOTP).
- **Verifica el ID token en el servidor** con `verifyIdToken`; nunca confíes en el `uid` que manda el cliente.
- **Cookies** `httpOnly`, `secure`, `sameSite=lax`; refresh rotation y revocación por dispositivo.
- **Rate limit** en login, registro y recuperación.
- **Account linking** para evitar cuentas duplicadas Google/email.
- **Logs de auditoría** para cambios de rol, KYC y pagos.
- **No** guardes documentos KYC en Firebase Storage; usa un proveedor KYC (Didit/Sumsub) y guarda solo la referencia.

---

## 5. Ejemplo mínimo (Next.js + Firebase Admin)

Cliente:

```ts
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
const result = await signInWithPopup(getAuth(), provider);
const idToken = await result.user.getIdToken();

await fetch("/api/auth/firebase", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ idToken }),
});
```

Servidor:

```ts
import { getAuth } from "firebase-admin/auth";

export async function POST(req: Request) {
  const { idToken } = await req.json();
  const decoded = await getAuth().verifyIdToken(idToken, true);
  // decoded.uid, decoded.email, decoded.email_verified
  // upsert en PostgreSQL, emitir cookie de sesión
}
```

---

## 6. Costos y límites

| Concepto | Costo 2026 |
|---|---|
| Email/social/anónimo | Gratis hasta 50,000 MAU |
| 50,001–100,000 MAU | USD 0.0055/MAU |
| 100,001–1,000,000 | USD 0.0046/MAU |
| SMS (si lo usas) | Por mensaje, varía por país |
| SAML/OIDC | 50 gratis, luego USD 0.015/MAU |

Para una plataforma que arranca en Guatemala, 50,000 MAU gratis es más que suficiente. El costo real estará en video (R2/Bunny), KYC y pasarela.

---

## 7. Qué NO hacer

- No uses Firebase Storage para videos adulto: costo de egress y políticas.
- No pongas el rol en localStorage ni en el JWT del cliente sin validarlo.
- No permitas publicar/cobrar solo con “Google dice que es mayor de edad”.
- No uses el mismo proyecto Firebase para producción y pruebas sin separar entornos.
- No olvides borrar/anonimizar datos cuando el usuario lo solicite.

---

## 8. Variables de entorno (Coolify)

```
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Nunca subas el service account a GitHub. Guárdalo en Coolify Secrets.
