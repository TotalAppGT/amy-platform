"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Logo from "./Logo";

export default function AgeGate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const accepted = window.localStorage.getItem("amy_age_ok");
    if (!accepted) setOpen(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-ink/92 px-4 backdrop-blur-xl">
      <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/10 bg-surface p-7 shadow-card sm:p-9">
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-rose/25 blur-3xl" />
        <Logo />

        <div className="mt-7 grid h-14 w-14 place-items-center rounded-2xl border border-rose/30 bg-rose/10 text-rose">
          <ShieldCheck className="h-7 w-7" />
        </div>

        <h2 className="mt-5 display text-3xl leading-tight">
          Este sitio es solo para <span className="italic text-rose">mayores de 18</span>.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          AMY contiene contenido para adultos producido por creadoras verificadas. Al entrar confirmas que eres mayor de
          edad y aceptas nuestros términos y política de privacidad.
        </p>

        <div className="mt-6 flex flex-col gap-2.5">
          <button
            onClick={() => {
              window.localStorage.setItem("amy_age_ok", "1");
              setOpen(false);
            }}
            className="btn-primary w-full"
          >
            Soy mayor de 18 años
            <ArrowRight className="h-4 w-4" />
          </button>
          <a href="https://www.google.com" className="btn-ghost w-full">
            Salir
          </a>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-muted/70">
          <span className="rounded border border-white/15 px-1.5 py-0.5 font-semibold">18+</span>
          Verificación de edad · Contenido con consentimiento · Pagos protegidos
        </div>
      </div>
    </div>
  );
}
