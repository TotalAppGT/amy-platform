import Link from "next/link";
import { ArrowLeft, BadgeCheck, ShieldCheck, Sparkles } from "lucide-react";
import Logo from "./Logo";
import Avatar from "./Avatar";

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: React.ReactNode;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col px-5 py-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between">
          <Logo />
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-cream">
            <ArrowLeft className="h-3.5 w-3.5" /> Volver
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
          <h1 className="display text-4xl leading-[1.05] sm:text-5xl">{title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-6 text-center text-xs text-muted">{footer}</div>
        </div>

        <p className="flex items-center justify-center gap-1.5 text-[10px] text-muted/50">
          <ShieldCheck className="h-3 w-3" /> Sitio para mayores de 18 · Guatemala
        </p>
      </div>

      <div className="relative hidden overflow-hidden border-l border-white/[0.06] lg:block">
        <div className="absolute inset-0 bg-[linear-gradient(150deg,#2A0F22,#0B0A0F_55%,#1C1430)]" />
        <div className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-rose/20 blur-[110px]" />
        <div className="grain absolute inset-0" />

        <div className="relative flex h-full flex-col justify-between p-12">
          <span className="eyebrow">
            <Sparkles className="h-3.5 w-3.5 text-gold" /> AMY · Guatemala
          </span>

          <div className="max-w-md">
            <h2 className="display text-[52px] leading-[0.98]">
              Tu lado
              <br />
              más <span className="italic text-rose">privado</span>.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-cream/55">
              Contenido exclusivo, conversaciones reales y llamadas privadas con creadoras verificadas. Discreto por
              diseño, seguro por obligación.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Creadoras verificadas con documento y selfie.",
                "Pagos en GTQ, tarjeta o cripto según disponibilidad.",
                "Chat, propinas y llamadas con cobro por minuto.",
              ].map((t) => (
                <div key={t} className="flex items-start gap-2.5 text-[13px] text-cream/70">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-rose" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur">
            <Avatar initials="CR" gradient="linear-gradient(145deg,#FF4D8D,#5B2A86)" size="md" online />
            <div className="flex-1">
              <p className="text-xs font-semibold">Camila Rivas</p>
              <p className="text-[10px] text-muted">En línea · responde en ~5 min</p>
            </div>
            <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[9px] font-medium text-emerald-300">
              4.9 ★
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
