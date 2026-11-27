"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  AtSign,
  BadgeCheck,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function RegisterForm() {
  const [role, setRole] = useState<"fan" | "creator">("fan");
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const [alias, setAlias] = useState("");
  const [discreet, setDiscreet] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("rol");
    if (requested === "creadora" || requested === "servicio") setRole("creator");
  }, []);

  if (done) {
    return (
      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.05] p-6 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="mt-4 text-lg font-semibold">Cuenta creada</h3>
        <p className="mt-2 text-[12px] leading-relaxed text-muted">
          Tu alias público es <span className="font-semibold text-cream">{alias || "tu-alias"}</span>. Tu nombre real,
          correo y teléfono no se muestran en el perfil.
        </p>

        <div className="mt-4 space-y-2 rounded-xl border border-white/10 bg-black/20 p-3 text-left text-[11px]">
          <div className="flex items-center gap-2 text-emerald-300">
            <ShieldCheck className="h-3.5 w-3.5" /> Modo discreto {discreet ? "activado" : "desactivado"}
          </div>
          <p className="text-muted">
            {discreet
              ? "No aparecerás en línea, no se mostrará tu actividad y las notificaciones no mostrarán contenido."
              : "Tu estado en línea y actividad serán visibles según tu configuración."}
          </p>
          {role === "creator" ? (
            <p className="text-muted">
              El siguiente paso es KYC: documento, selfie y contrato. Esos datos se guardan cifrados y nunca se publican.
            </p>
          ) : (
            <p className="text-muted">Te enviaremos un correo para verificar tu cuenta antes de comprar o suscribirte.</p>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <Link href={role === "creator" ? "/creadora" : "/explorar"} className="btn-primary">
            {role === "creator" ? "Continuar a verificación" : "Explorar creadoras"}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/privacidad" className="text-[11px] text-muted hover:text-cream">
            Revisar mi centro de privacidad
          </Link>
          <button onClick={() => setDone(false)} className="text-[10px] text-muted hover:text-cream">Volver al formulario</button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="space-y-4"
    >
      <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.04] p-3.5">
        <p className="flex items-center gap-2 text-[11px] font-semibold text-emerald-300">
          <ShieldCheck className="h-4 w-4" /> La privacidad es ley en AMY
        </p>
        <p className="mt-1 text-[10px] leading-relaxed text-muted">
          Usas un alias, no tu nombre real. Tus datos se cifran, se minimizan y no se venden. Tú decides qué se ve y qué no.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1">
        <button
          type="button"
          onClick={() => setRole("fan")}
          className={`rounded-xl py-2.5 text-xs font-medium transition ${role === "fan" ? "bg-cream text-ink" : "text-muted hover:text-cream"}`}
        >
          Quiero ver contenido
        </button>
        <button
          type="button"
          onClick={() => setRole("creator")}
          className={`rounded-xl py-2.5 text-xs font-medium transition ${role === "creator" ? "bg-[#C2185B] text-white" : "text-muted hover:text-cream"}`}
        >
          Soy creadora
        </button>
      </div>

      {role === "creator" ? (
        <div className="flex items-center gap-2 rounded-xl border border-rose/15 bg-rose/[0.04] px-3 py-2 text-[9px] text-cream/60">
          <Sparkles className="h-3 w-3 shrink-0 text-rose" />
          <span><b className="text-cream">1. Cuenta</b> → 2. KYC privado → 3. Perfil y pagos</span>
        </div>
      ) : null}

      <div>
        <label className="mb-1.5 block text-[11px] font-medium text-cream/70">
          {role === "creator" ? "Nombre artístico (público)" : "Alias público"}
        </label>
        <div className="relative">
          <AtSign className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            aria-label="Alias público"
            required
            minLength={3}
            maxLength={24}
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            placeholder={role === "creator" ? "Ej. Amy, Luna, Camila" : "Ej. nocheazul"}
            className="field pl-10"
          />
        </div>
        <p className="mt-1 text-[9px] leading-relaxed text-muted/70">
          Así te verán. No uses tu nombre legal, dirección ni número de teléfono.
        </p>
      </div>

      <div>
        <label className="mb-1.5 block text-[11px] font-medium text-cream/70">Correo electrónico (privado)</label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input aria-label="Correo electrónico" type="email" required placeholder="tu@correo.com" className="field pl-10" />
        </div>
        <p className="mt-1 text-[9px] text-muted/70">Nunca se muestra en tu perfil. Solo para verificación y seguridad.</p>
      </div>

      <div>
        <label className="mb-1.5 block text-[11px] font-medium text-cream/70">Teléfono (privado, opcional)</label>
        <div className="relative">
          <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input aria-label="Teléfono" type="tel" placeholder="+502 5555 5555" className="field pl-10" />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-[11px] font-medium text-cream/70">Contraseña</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input aria-label="Contraseña" type={show ? "text" : "password"} required minLength={8} placeholder="Mínimo 8 caracteres" className="field px-10" />
          <button
            type="button"
            aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
            onClick={() => setShow((v) => !v)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="space-y-2 rounded-2xl border border-white/10 bg-white/[0.02] p-3.5">
        <label className="flex items-start gap-2.5 text-[10px] leading-relaxed text-cream/75">
          <input
            type="checkbox"
            checked={discreet}
            onChange={(e) => setDiscreet(e.target.checked)}
            className="mt-0.5 h-3.5 w-3.5 rounded border-white/20 bg-white/5 accent-rose"
          />
          <span>
            <b className="text-cream">Modo discreto</b> — ocultar mi estado en línea, mi actividad y las vistas previas de
            notificaciones.
          </span>
        </label>
        <label className="flex items-start gap-2.5 text-[10px] leading-relaxed text-muted">
          <input
            type="checkbox"
            checked={marketing}
            onChange={(e) => setMarketing(e.target.checked)}
            className="mt-0.5 h-3.5 w-3.5 rounded border-white/20 bg-white/5 accent-rose"
          />
          Quiero recibir novedades y recomendaciones. Puedo desactivarlo cuando quiera.
        </label>
      </div>

      <label className="flex items-start gap-2 text-[10px] leading-relaxed text-muted">
        <input type="checkbox" required className="mt-0.5 h-3.5 w-3.5 rounded border-white/20 bg-white/5 accent-rose" />
        Confirmo que soy mayor de 18 años y acepto los{" "}
        <Link href="/legal/terminos" className="text-cream underline decoration-white/20 underline-offset-2">términos</Link>, la{" "}
        <Link href="/legal/privacidad" className="text-cream underline decoration-white/20 underline-offset-2">política de privacidad</Link>{" "}
        y la política de contenido.
      </label>

      {role === "creator" ? (
        <div className="flex items-start gap-2 rounded-xl border border-rose/20 bg-rose/[0.05] p-3 text-[10px] leading-relaxed text-cream/60">
          <BadgeCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose" />
          Tu nombre legal, INE/pasaporte y selfie se piden en el KYC. Se guardan cifrados, solo los ve verificación y
          nunca se publican. Sin KYC aprobado no se puede publicar ni cobrar.
        </div>
      ) : null}

      <button type="submit" className="btn-primary w-full">
        {role === "creator" ? "Crear cuenta y verificar" : "Crear cuenta confidencial"}
        <ArrowRight className="h-4 w-4" />
      </button>

      <p className="text-center text-[11px] text-muted">
        ¿Ya tienes cuenta?{" "}
        <Link href="/entrar" className="font-medium text-rose">Entrar</Link>
      </p>
    </form>
  );
}
