"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function LoginForm() {
  const [show, setShow] = useState(false);
  const [notice, setNotice] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setNotice("Demo visual: aquí se validarían las credenciales y se abriría el panel.");
      }}
      className="space-y-4"
    >
      <div>
        <label className="mb-1.5 block text-[11px] font-medium text-cream/70">Correo electrónico</label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input aria-label="Correo electrónico" type="email" required placeholder="tu@correo.com" className="field pl-10" />
        </div>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="text-[11px] font-medium text-cream/70">Contraseña</label>
          <button type="button" className="text-[10px] text-rose">¿La olvidaste?</button>
        </div>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input aria-label="Contraseña" type={show ? "text" : "password"} required placeholder="••••••••" className="field px-10" />
          <button type="button" aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"} onClick={() => setShow((v) => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted">
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <label className="flex items-center gap-2 text-[11px] text-muted">
        <input type="checkbox" className="h-3.5 w-3.5 rounded border-white/20 bg-white/5 accent-rose" />
        Mantener sesión iniciada
      </label>

      <button type="submit" className="btn-primary w-full">
        Entrar
        <ArrowRight className="h-4 w-4" />
      </button>

      {notice ? <p className="rounded-xl bg-white/[0.04] p-3 text-[10px] leading-relaxed text-cream/60">{notice}</p> : null}

      <div className="relative py-2 text-center">
        <span className="relative z-10 bg-ink px-3 text-[10px] text-muted">o continúa con</span>
        <span className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button type="button" className="btn-ghost !py-2.5 !text-xs">Google</button>
        <button type="button" className="btn-ghost !py-2.5 !text-xs">Apple</button>
      </div>

      <p className="text-center text-[11px] text-muted">
        ¿No tienes cuenta?{" "}
        <Link href="/registro" className="font-medium text-rose">Crear una</Link>
      </p>
    </form>
  );
}
