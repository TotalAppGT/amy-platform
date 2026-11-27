import Link from "next/link";
import { Instagram, Twitter, Youtube, ShieldCheck } from "lucide-react";
import Logo from "./Logo";

const cols = [
  {
    title: "Plataforma",
    links: [
      { label: "Explorar creadoras", href: "/explorar" },
      { label: "Servicios y reservas", href: "/servicios" },
      { label: "Chat en vivo", href: "/chat" },
      { label: "Cómo funciona", href: "/#como-funciona" },
    ],
  },
  {
    title: "Para creadoras",
    links: [
      { label: "Quiero ser creadora", href: "/#creadoras" },
      { label: "Publicar servicios", href: "/servicios" },
      { label: "Comisiones y pagos", href: "/#creadoras" },
      { label: "Panel de creadora", href: "/creadora" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Centro de privacidad", href: "/privacidad" },
      { label: "Términos y condiciones", href: "/legal/terminos" },
      { label: "Política de privacidad", href: "/legal/privacidad" },
      { label: "Derechos de autor", href: "/legal/derechos-autor" },
      { label: "Contenido y consentimiento", href: "/legal/contenido" },
      { label: "Cookies", href: "/legal/cookies" },
      { label: "Reembolsos", href: "/legal/reembolsos" },
      { label: "DMCA / Takedown", href: "/legal/dmca" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/[0.07] bg-black/20">
      <div className="container-x py-14">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              La plataforma donde el talento se convierte en ingresos. Contenido, conversaciones y llamadas
              privadas con creadoras verificadas.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <span
                  key={i}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-muted transition hover:border-white/25 hover:text-cream"
                >
                  <Icon className="h-4 w-4" />
                </span>
              ))}
            </div>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-[11px] text-emerald-300/90">
              <ShieldCheck className="h-3.5 w-3.5" />
              Pagos protegidos · KYC · 18+
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/50">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-muted transition hover:text-cream">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 hairline" />

        <div className="mt-7 flex flex-col gap-5 text-xs text-muted/70 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>© 2026 AMY OFICIAL · Global</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/20 lg:block" />
            <a href="mailto:amyoficialfan@gmail.com" className="hover:text-cream">amyoficialfan@gmail.com</a>
            <span className="hidden h-1 w-1 rounded-full bg-white/20 lg:block" />
            <span>Hecho para creadoras y fans mayores de 18 años.</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {["VISA", "Mastercard", "USDT", "Transferencia"].map((p) => (
              <span key={p} className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[10px] tracking-wide text-muted">
                {p}
              </span>
            ))}
            <span className="ml-1 rounded-md border border-rose/30 bg-rose/10 px-2 py-1 text-[10px] font-bold text-rose">18+</span>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-4 text-[10px] text-muted/40">
          <Link href="/admin" className="hover:text-muted">
            Demo · Panel admin
          </Link>
          <Link href="/creadora" className="hover:text-muted">
            Demo · Panel creadora
          </Link>
          <span>Prototipo visual — datos ficticios</span>
        </div>
      </div>
    </footer>
  );
}
