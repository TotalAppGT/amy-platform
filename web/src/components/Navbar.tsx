"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import Logo from "./Logo";

const links = [
  { href: "/explorar", label: "Explorar" },
  { href: "/servicios", label: "Servicios" },
  { href: "/#como-funciona", label: "Cómo funciona" },
  { href: "/#creadoras", label: "Para creadoras" },
  { href: "/chat", label: "Chat en vivo" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] glass">
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="nav-link">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <span className="hidden items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-muted md:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            18+ VERIFICADO
          </span>
          <Link href="/entrar" className="text-sm font-medium text-cream/75 transition hover:text-cream">
            Entrar
          </Link>
          <Link href="/registro" className="btn-primary !px-4 !py-2.5">
            <Sparkles className="h-3.5 w-3.5" />
            Crear cuenta
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-cream sm:hidden"
          aria-label="Abrir menú"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-surface px-5 pb-6 pt-4 sm:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm text-cream/80 hover:bg-white/5"
              >
                {l.label}
              </Link>
            ))}
            <Link href="/entrar" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm text-cream/80 hover:bg-white/5">
              Entrar
            </Link>
            <Link href="/registro" onClick={() => setOpen(false)} className="btn-primary mt-3">
              Crear cuenta
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
