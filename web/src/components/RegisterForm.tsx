"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Eye, EyeOff, Lock, Mail, Phone, User, BadgeCheck, Upload } from "lucide-react";

export default function RegisterForm() {
  const [role, setRole] = useState<"fan" | "creator">("fan");
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);

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
        <h3 className="mt-4 text-lg font-semibold">Cuenta demo creada</h3>
        <p className="mt-2 text-[12px] leading-relaxed text-muted">
          {role === "creator"
            ? "En el producto real, aquí empezaría el KYC: documento, selfie y firma de contrato. Al aprobarlo se habilita tu perfil, tus servicios y tu wallet."
            : "En el producto real, aquí se enviaría el correo de verificación y se abriría el catálogo."}
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <Link href={role === "creator" ? "/creadora" : "/explorar"} className="btn-primary">
            {role === "creator" ? "Ver panel de creadora" : "Explorar creadoras"}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button onClick={() => setDone(false)} className="btn-ghost">Volver al formulario</button>
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

      <div>
        <label className="mb-1.5 block text-[11px] font-medium text-cream/70">{role === "creator" ? "Nombre artístico" : "Nombre"}</label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input aria-label="Nombre" required placeholder={role === "creator" ? "Ej. Camila Rivas" : "Tu nombre"} className="field pl-10" />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-[11px] font-medium text-cream/70">Correo electrónico</label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input aria-label="Correo electrónico" type="email" required placeholder="tu@correo.com" className="field pl-10" />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-[11px] font-medium text-cream/70">Teléfono (Guatemala)</label>
        <div className="relative">
          <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input aria-label="Teléfono" type="tel" required placeholder="+502 5555 5555" className="field pl-10" />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-[11px] font-medium text-cream/70">Contraseña</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input aria-label="Contraseña" type={show ? "text" : "password"} required minLength={8} placeholder="Mínimo 8 caracteres" className="field px-10" />
          <button type="button" aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"} onClick={() => setShow((v) => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted">
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <label className="flex items-start gap-2 text-[10px] leading-relaxed text-muted">
        <input type="checkbox" required className="mt-0.5 h-3.5 w-3.5 rounded border-white/20 bg-white/5 accent-rose" />
        Confirmo que soy mayor de 18 años y acepto los términos, la privacidad y la política de contenido.
      </label>

      {role === "creator" ? (
        <div className="flex items-start gap-2 rounded-xl border border-rose/20 bg-rose/[0.05] p-3 text-[10px] leading-relaxed text-cream/60">
          <BadgeCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose" />
          Después de registrarte pediremos INE/pasaporte, selfie y contrato. Sin KYC aprobado no se puede publicar ni cobrar.
        </div>
      ) : null}

      <button type="submit" className="btn-primary w-full">
        {role === "creator" ? "Empezar verificación" : "Crear cuenta"}
        <ArrowRight className="h-4 w-4" />
      </button>

      {role === "creator" ? (
        <button type="button" className="flex w-full items-center justify-center gap-1.5 text-[10px] text-muted hover:text-cream">
          <Upload className="h-3 w-3" /> Subir documentos después
        </button>
      ) : null}

      <p className="text-center text-[11px] text-muted">
        ¿Ya tienes cuenta?{" "}
        <Link href="/entrar" className="font-medium text-rose">Entrar</Link>
      </p>
    </form>
  );
}
