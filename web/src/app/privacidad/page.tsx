import Link from "next/link";
import { ArrowRight, Lock, ShieldCheck, Sparkles, UserRound, Database, EyeOff } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrivacyCenter from "@/components/PrivacyCenter";

export const metadata = {
  title: "Centro de privacidad — AMY",
  description: "Privacidad por diseño: alias, cifrado, minimización de datos y control total de tu visibilidad en AMY.",
};

export default function PrivacyPage() {
  return (
    <main>
      <Navbar />

      <div className="container-x py-12 sm:py-16">
        <div className="max-w-3xl">
          <span className="eyebrow">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Privacidad por ley
          </span>
          <h1 className="display mt-3 text-4xl leading-[1.02] sm:text-6xl">
            Tu privacidad no es un ajuste.
            <br />
            Es la <span className="italic text-rose">regla</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
            En AMY usas un alias. Tu nombre legal, correo, teléfono y documentos de verificación no se publican. No
            vendemos datos, no usamos tus mensajes privados para publicidad y puedes exportar o eliminar tu cuenta.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/registro" className="btn-primary">Crear cuenta confidencial <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/legal/privacidad" className="btn-ghost">Política de privacidad</Link>
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[24px] border border-white/[0.08] bg-surface/60 p-5">
            <p className="flex items-center gap-2 text-sm font-semibold"><UserRound className="h-4 w-4 text-rose" /> Qué ve el público</p>
            <div className="mt-4 overflow-hidden rounded-xl border border-white/[0.07]">
              <div className="grid grid-cols-[1fr_1fr] border-b border-white/[0.07] bg-white/[0.03] px-3.5 py-2 text-[9px] uppercase tracking-[0.14em] text-muted">
                <span>Público</span>
                <span>Privado</span>
              </div>
              {[
                ["Alias y foto", "Nombre legal"],
                ["Bio y etiquetas", "Correo y teléfono"],
                ["Ciudad (si tú quieres)", "Documento de identidad"],
                ["Precios y contenido", "Datos de pago"],
                ["Reseñas", "Mensajes privados"],
                ["Estado en línea (opcional)", "IP, dispositivo y sesiones"],
              ].map(([pub, priv]) => (
                <div key={pub} className="grid grid-cols-[1fr_1fr] border-b border-white/[0.04] px-3.5 py-2.5 text-[10px] last:border-0">
                  <span className="text-cream/80">{pub}</span>
                  <span className="text-muted">{priv}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 flex items-start gap-1.5 text-[9px] leading-relaxed text-muted/70">
              <EyeOff className="mt-0.5 h-3 w-3 shrink-0" />
              El modo discreto oculta tu actividad y evita vistas previas en notificaciones.
            </p>
          </div>

          <PrivacyCenter />
        </div>

        <section className="mt-12">
          <span className="eyebrow"><Sparkles className="h-3.5 w-3.5 text-gold" /> Cómo protegemos tus datos</span>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: UserRound, title: "Alias por defecto", text: "No pedimos tu nombre real para crear la cuenta. Solo lo pedimos en KYC si vas a vender o cobrar." },
              { icon: Lock, title: "Cifrado", text: "TLS en tránsito y cifrado en reposo. Los documentos KYC viven separados del contenido." },
              { icon: Database, title: "Minimización", text: "Solo guardamos lo necesario para operar, prevenir fraude y cumplir la ley." },
              { icon: ShieldCheck, title: "Sin venta de datos", text: "No vendemos datos personales. No usamos mensajes privados para publicidad." },
              { icon: EyeOff, title: "Control de visibilidad", text: "Tú decides si apareces en línea, en búsquedas o en recomendaciones." },
              { icon: Lock, title: "Derechos ARCO", text: "Acceso, rectificación, cancelación y oposición. Exportación y eliminación desde tu cuenta." },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-white/[0.08] bg-surface/60 p-4">
                <span className="grid h-9 w-9 place-items-center rounded-xl border border-emerald-400/15 bg-emerald-400/[0.05] text-emerald-300">
                  <c.icon className="h-4 w-4" />
                </span>
                <p className="mt-3 text-[11px] font-semibold">{c.title}</p>
                <p className="mt-1 text-[10px] leading-relaxed text-muted">{c.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[24px] border border-emerald-400/15 bg-emerald-400/[0.04] p-5 sm:p-7">
          <p className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
            <ShieldCheck className="h-4 w-4" /> La privacidad es ley en AMY
          </p>
          <p className="mt-2 max-w-3xl text-[11px] leading-relaxed text-cream/65">
            La intimidad es un derecho fundamental y un compromiso contractual con cada usuario. Para
            usuarios internacionales aplicamos estándares equivalentes al GDPR. No pedimos más datos de los necesarios, no
            los vendemos y no los usamos para fines distintos a los informados. Puedes ejercer tus derechos desde este
            centro o escribiendo a <span className="text-cream">amyoficialfan@gmail.com</span>.
          </p>
          <p className="mt-3 text-[9px] text-muted/60">
            Este centro es informativo y de demostración. La política legal completa está en{" "}
            <Link href="/legal/privacidad" className="text-cream underline decoration-white/20 underline-offset-2">Privacidad</Link>.
            No sustituye asesoría legal.
          </p>
        </section>
      </div>

      <Footer />
    </main>
  );
}
