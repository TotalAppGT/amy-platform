import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Check,
  CreditCard,
  Globe,
  Headphones,
  Heart,
  Image as ImageIcon,
  Lock,
  MessageCircle,
  Mic,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
  Star,
  Video,
  Wallet,
  Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CreatorCard from "@/components/CreatorCard";
import ServiceCard from "@/components/ServiceCard";
import Artwork from "@/components/Artwork";
import Avatar from "@/components/Avatar";
import CommissionCalc from "@/components/CommissionCalc";
import { SectionHeading, Stat } from "@/components/Section";
import { creators, categories, getCreator } from "@/lib/data";
import { services } from "@/lib/services";
import { money } from "@/lib/utils";

function HeroVisual() {
  const main = getCreator("camila-rivas")!;
  const back = getCreator("sofia-mendez")!;
  const mini = getCreator("valeria-soto")!;

  return (
    <div className="relative mx-auto h-[480px] w-full max-w-[440px] sm:h-[540px]">
      <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose/25 blur-[90px]" />

      <div className="absolute right-0 top-0 w-[182px] rotate-6 overflow-hidden rounded-[24px] border border-white/10 bg-surface opacity-90 shadow-card">
        <Artwork initials={back.initials} gradient={back.gradient} className="aspect-[4/5] w-full" compact />
      </div>

      <div className="absolute bottom-8 left-0 w-[238px] -rotate-3 overflow-hidden rounded-[28px] border border-white/15 bg-surface shadow-card">
        <Artwork initials={main.initials} gradient={main.gradient} className="aspect-[4/5] w-full" />
        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-semibold text-emerald-300 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> En línea
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-white">
            {main.name} <BadgeCheck className="h-4 w-4 text-rose" />
          </p>
          <p className="mt-0.5 text-[11px] text-white/60">{main.city}</p>
          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="truncate rounded-full bg-white/12 px-2.5 py-1 text-[10px] text-white/85 backdrop-blur">
              Suscripción {money(main.subPrice)}/mes
            </span>
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-rose/90 text-white">
              <Video className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>

      <div className="animate-float absolute -left-2 top-8 z-20 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-[#14111b]/90 p-3 pr-4 shadow-card backdrop-blur">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
          <Wallet className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[10px] text-muted">Nueva suscripción</p>
          <p className="text-sm font-semibold">+ {money(150)}</p>
        </div>
      </div>

      <div className="absolute -right-1 bottom-0 z-20 w-[210px] rounded-2xl border border-white/10 bg-[#14111b]/95 p-3.5 shadow-card backdrop-blur">
        <div className="flex items-center gap-2.5">
          <Avatar initials={mini.initials} gradient={mini.gradient} size="sm" online />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold">{mini.name}</p>
            <p className="text-[10px] text-muted">Llamada de video · 00:42</p>
          </div>
          <span className="h-2 w-2 animate-pulse rounded-full bg-rose" />
        </div>
        <div className="mt-3 flex gap-2">
          <button className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-[#C2185B] py-2 text-[11px] font-semibold text-white">
            <Phone className="h-3 w-3" /> Contestar
          </button>
          <button aria-label="Rechazar llamada" className="grid h-8 w-8 place-items-center rounded-xl bg-white/10 text-muted">
            <Phone className="h-3 w-3 rotate-[135deg]" />
          </button>
        </div>
      </div>
    </div>
  );
}

function TrustStrip() {
  const items = [
    { icon: ShieldCheck, title: "Edad verificada", text: "KYC con documento para cada creadora" },
    { icon: Lock, title: "Pago protegido", text: "Saldo en wallet y cobros por minuto" },
    { icon: BadgeCheck, title: "Consentimiento", text: "Registro por contenido y takedown" },
    { icon: Headphones, title: "Soporte real", text: "Equipo regional, 7 días" },
  ];
  return (
    <section className="border-y border-white/[0.06] bg-white/[0.015]">
      <div className="container-x grid grid-cols-2 gap-6 py-7 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-3">
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-rose">
              <Icon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-semibold text-cream">{title}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-muted">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureCards() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="group relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-surface/80 p-6">
        <span className="grid h-11 w-11 place-items-center rounded-2xl border border-rose/25 bg-rose/10 text-rose">
          <Lock className="h-5 w-5" />
        </span>
        <h3 className="mt-5 text-lg font-semibold">Contenido privado</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Publica gratis, por suscripción o como PPV. Tú decides quién ve qué y cuánto cuesta.
        </p>
        <div className="relative mt-6 h-40 overflow-hidden rounded-2xl border border-white/10">
          <Artwork initials="CR" gradient="linear-gradient(140deg,#2B1B3D,#FF4D8D)" className="h-full w-full" locked />
          <div className="absolute inset-0 grid place-items-center bg-black/30 backdrop-blur-[2px]">
            <div className="rounded-2xl border border-white/15 bg-black/45 px-4 py-3 text-center backdrop-blur">
              <Lock className="mx-auto h-4 w-4 text-rose" />
              <p className="mt-1.5 text-[11px] font-medium">Desbloquear por {money(75)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-surface/80 p-6">
        <span className="grid h-11 w-11 place-items-center rounded-2xl border border-lilac/25 bg-lilac/10 text-lilac">
          <MessageCircle className="h-5 w-5" />
        </span>
        <h3 className="mt-5 text-lg font-semibold">Chat que conecta</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Mensajes, audios y fotos con cobro por mensaje o suscripción. Tú marcas el ritmo.
        </p>
        <div className="mt-6 space-y-2 rounded-2xl border border-white/10 bg-black/20 p-3.5">
          <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-white/10 px-3 py-2 text-[11px] text-cream/85">
            ¿Qué haces más tarde?
          </div>
          <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-[#C2185B] px-3 py-2 text-[11px] text-white">
            Pensaba en ti… te mandé algo al privado.
          </div>
          <div className="ml-auto flex items-center gap-1.5 text-[10px] text-rose/80">
            <ImageIcon className="h-3 w-3" /> Foto bloqueada · {money(35)}
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-surface/80 p-6">
        <span className="grid h-11 w-11 place-items-center rounded-2xl border border-gold/25 bg-gold/10 text-gold">
          <Video className="h-5 w-5" />
        </span>
        <h3 className="mt-5 text-lg font-semibold">Llamadas por minuto</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Video o audio 1:1 con cobro automático por minuto. Se corta cuando se acaba el saldo.
        </p>
        <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4">
          <div className="flex items-center gap-2.5">
            <Avatar initials="CR" gradient="linear-gradient(145deg,#FF4D8D,#5B2A86)" size="sm" online />
            <div className="flex-1">
              <p className="text-[11px] font-semibold">Camila Rivas</p>
              <p className="text-[10px] text-emerald-300">En llamada · 12:08</p>
            </div>
            <span className="rounded-full bg-white/10 px-2 py-1 text-[10px]">{money(14)}/min</span>
          </div>
          <div className="mt-4 flex h-10 items-end justify-center gap-1">
            {[6, 14, 22, 10, 26, 34, 18, 28, 12, 20, 8, 16, 30, 22, 10, 18, 26, 14].map((h, i) => (
              <span
                key={i}
                className="w-1.5 rounded-full bg-rose/80"
                style={{ height: `${h}px`, opacity: 0.4 + (h / 40) * 0.6 }}
              />
            ))}
          </div>
          <div className="mt-3 flex justify-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-cream/80"><Mic className="h-3.5 w-3.5" /></span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#C2185B] text-white"><Phone className="h-3.5 w-3.5 rotate-[135deg]" /></span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatPreview() {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-surface/70">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-lilac/15 blur-3xl" />
      <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:p-14">
        <div>
          <span className="eyebrow">
            <span className="h-1 w-1 rounded-full bg-rose" /> Chat + llamadas
          </span>
          <h2 className="display mt-3 text-3xl leading-tight sm:text-[40px]">
            La conversación también <span className="italic text-rose">se cobra</span>.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Los fans recargan su wallet y gastan en mensajes, fotos, propinas y minutos de llamada. Todo queda registrado
            en tu panel, con comisión calculada al instante.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Cobro por minuto con corte automático por saldo.",
              "Media bloqueada que se desbloquea con un toque.",
              "Propinas y regalos sin salir del chat.",
              "Historial y comprobantes listos para facturar.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-sm text-cream/80">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                {t}
              </li>
            ))}
          </ul>
          <Link href="/chat" className="btn-ghost mt-7">
            Probar el chat
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="overflow-hidden rounded-[30px] border border-white/12 bg-[#0c0a11] shadow-card">
            <div className="flex items-center gap-3 border-b border-white/10 p-4">
              <Avatar initials="CR" gradient="linear-gradient(145deg,#FF4D8D,#5B2A86)" size="sm" online />
              <div className="flex-1">
                <p className="flex items-center gap-1 text-sm font-semibold">Camila Rivas <BadgeCheck className="h-3.5 w-3.5 text-rose" /></p>
                <p className="text-[10px] text-emerald-300">En línea ahora</p>
              </div>
              <button aria-label="Llamar a Camila" className="grid h-9 w-9 place-items-center rounded-full bg-rose/15 text-rose"><Phone className="h-4 w-4" /></button>
            </div>

            <div className="space-y-3 p-4">
              <div className="mx-auto w-fit rounded-full bg-white/5 px-3 py-1 text-[9px] text-muted">Hoy, 20:41</div>
              <div className="max-w-[82%] rounded-2xl rounded-bl-md bg-white/[0.07] px-3.5 py-2.5 text-[12px] text-cream/85">
                Hola guapo, qué bueno verte por aquí otra vez.
              </div>
              <div className="ml-auto max-w-[82%] rounded-2xl rounded-br-md bg-[#C2185B] px-3.5 py-2.5 text-[12px] text-white">
                Acabo de subir el set del rooftop. Creo que te va a gustar…
              </div>
              <div className="ml-auto w-[82%] overflow-hidden rounded-2xl rounded-br-md border border-white/10 bg-[#17131f]">
                <Artwork initials="CR" gradient="linear-gradient(140deg,#2B1B3D,#FF4D8D)" className="h-28 w-full" compact locked />
                <div className="flex items-center justify-between p-3">
                  <div>
                    <p className="text-[11px] font-medium">Rooftop — edición privada</p>
                    <p className="text-[9px] text-muted">08:24 · 24 fotos</p>
                  </div>
                  <span className="rounded-full bg-[#C2185B] px-3 py-1.5 text-[10px] font-semibold text-white">{money(75)}</span>
                </div>
              </div>
              <div className="max-w-[82%] rounded-2xl rounded-bl-md bg-white/[0.07] px-3.5 py-2.5 text-[12px] text-cream/85">
                Se ve increíble. ¿Cuánto por la llamada de esta noche?
              </div>
            </div>

            <div className="flex items-center gap-2 border-t border-white/10 p-3">
              <div className="flex flex-1 items-center gap-2 rounded-full bg-white/[0.05] px-3 py-2">
                <Plus className="h-4 w-4 text-muted" />
                <span className="text-[11px] text-muted">Escribe un mensaje…</span>
              </div>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#C2185B] text-white"><ArrowRight className="h-4 w-4" /></span>
            </div>
          </div>

          <div className="absolute -left-14 bottom-24 hidden items-center gap-2 rounded-2xl border border-white/10 bg-[#14111b]/95 px-3 py-2 shadow-card backdrop-blur sm:flex">
            <Heart className="h-4 w-4 fill-rose text-rose" />
            <div>
              <p className="text-[9px] text-muted">Propina enviada</p>
              <p className="text-xs font-semibold">{money(25)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const featured = creators.slice(0, 4);

  return (
    <main className="overflow-x-clip">
      <Navbar />

      <section className="relative overflow-hidden pb-20 pt-12 sm:pt-16 lg:pb-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,77,141,0.14),transparent_60%)]" />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
          <div className="relative z-10">
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              Sin fronteras · Solo +18
            </span>

            <h1 className="display mt-4 text-[46px] leading-[0.98] sm:text-[72px] lg:text-[80px]">
              Tu lado
              <br />
              más <span className="italic text-rose">privado</span>.
            </h1>

            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-cream/65">
              Contenido exclusivo, conversaciones reales y llamadas privadas con creadoras verificadas de Latinoamérica
              y el mundo. Tú decides cuánto compartir. Nosotros ponemos la tecnología, los pagos y la discreción.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/explorar" className="btn-primary">
                Explorar creadoras
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/#creadoras" className="btn-ghost">
                Quiero ser creadora
              </Link>
            </div>
            <Link href="/servicios" className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-muted transition hover:text-cream">
              <CalendarCheck className="h-3.5 w-3.5 text-gold" />
              También puedes reservar masajes, spa y sesiones →
            </Link>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Stat value="120+" label="Creadoras" />
              <span className="hidden h-8 w-px bg-white/10 sm:block" />
              <Stat value="Q2.4M" label="Pagados" />
              <span className="hidden h-8 w-px bg-white/10 sm:block" />
              <Stat value="4.9/5" label="Satisfacción" />
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
                <div className="flex -space-x-2">
                  {creators.slice(0, 3).map((c) => (
                    <Avatar key={c.slug} initials={c.initials} gradient={c.gradient} size="xs" className="ring-2 ring-ink" />
                  ))}
                </div>
                <span className="text-[10px] text-muted">En línea ahora</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <HeroVisual />
          </div>
        </div>
      </section>

      <TrustStrip />

      <section className="container-x pt-20 sm:pt-24">
        <SectionHeading
          eyebrow="Destacadas de la semana"
          title={<>Creadoras que están <span className="italic text-rose">encendidas</span>.</>}
          description="Perfiles verificados, tarifas claras y contenido con consentimiento. Elige a quién quieres conocer."
          href="/explorar"
          hrefLabel="Ver todas"
        />

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((c, i) => (
            <Link
              key={c}
              href="/explorar"
              className={
                i === 0
                  ? "shrink-0 rounded-full bg-cream px-4 py-2 text-xs font-semibold text-ink"
                  : "shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-cream/70 transition hover:border-white/25 hover:text-cream"
              }
            >
              {c}
            </Link>
          ))}
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((creator, i) => (
            <CreatorCard key={creator.slug} creator={creator} index={i} />
          ))}
        </div>
      </section>

      <section id="como-funciona" className="container-x pt-24">
        <SectionHeading
          eyebrow="Cómo funciona"
          title={<>Todo lo que pasa <span className="italic text-rose">detrás</span> del feed.</>}
          description="Una experiencia completa para fans y creadoras, con reglas claras y dinero trazable."
        />
        <div className="mt-8">
          <FeatureCards />
        </div>
      </section>

      <section className="container-x pt-20">
        <ChatPreview />
      </section>

      <section className="container-x pt-24">
        <SectionHeading
          eyebrow="Servicios profesionales"
          title={<>También puedes reservar <span className="italic text-rose">en persona</span>.</>}
          description="Masajes, spa, fotografía, belleza y eventos con profesionales verificados. Anticipo protegido y agenda clara."
          href="/servicios"
          hrefLabel="Ver todos los servicios"
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[services[0], services[2], services[3]].map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-[10px] leading-relaxed text-muted">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
          Solo servicios profesionales legales. No se permiten servicios sexuales, citas tipo escort ni acompañamiento
          íntimo. Cada profesional pasa verificación de identidad.
        </div>
      </section>

      <section id="creadoras" className="container-x pt-24">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(120deg,rgba(255,77,141,0.10),rgba(16,14,21,0.9)_45%,rgba(183,156,255,0.10))] p-6 sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-rose/20 blur-3xl" />
          <div className="relative grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div>
              <span className="eyebrow">
                <Sparkles className="h-3.5 w-3.5 text-gold" /> Para creadoras
              </span>
              <h2 className="display mt-3 text-3xl leading-[1.05] sm:text-[46px]">
                Tu talento, tus reglas,
                <br />
                <span className="italic text-rose">tu dinero</span>.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-cream/65">
                Nosotros te damos la plataforma, la pasarela de pagos, el KYC y la moderación. Tú te quedas con la mayor
                parte de cada venta y decides qué publicar, cuándo y a quién.
              </p>

              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "Comisión clara, sin letras pequeñas",
                  "Retiros semanales en GTQ o USDT",
                  "KYC, contrato y consentimiento incluidos",
                  "Panel de ingresos en tiempo real",
                  "Moderación y takedown 24/7",
                  "Soporte humano en tu idioma",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-[13px] text-cream/80">
                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/registro?rol=creadora" className="btn-primary">
                  Aplicar como creadora
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/creadora" className="btn-ghost">
                  Ver panel de ejemplo
                </Link>
              </div>

              <p className="mt-5 flex items-center gap-2 text-[11px] text-muted/70">
                <ShieldCheck className="h-3.5 w-3.5" />
                Solo mayores de 18 años. Proceso de verificación obligatorio.
              </p>
            </div>

            <CommissionCalc />
          </div>
        </div>
      </section>

      <section className="container-x pt-24">
        <SectionHeading
          eyebrow="Confianza"
          title={<>Lo que dicen quienes ya <span className="italic text-rose">están dentro</span>.</>}
          description="Testimonios del programa piloto. Nombres parciales por privacidad."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              quote:
                "Antes cobraba por transferencia y perdía la mitad de los clientes. Con la wallet y las llamadas por minuto mis ingresos se volvieron predecibles.",
              name: "Camila R.",
              role: "Creadora · 2 años",
              initials: "CR",
              gradient: "linear-gradient(145deg,#FF4D8D,#5B2A86)",
            },
            {
              quote:
                "El panel me dice exactamente cuánto entra, cuánto se queda la plataforma y cuándo me pagan. Nunca había tenido esa claridad.",
              name: "Valeria S.",
              role: "Creadora · Fitness",
              initials: "VS",
              gradient: "linear-gradient(145deg,#F2B880,#7A2E4D)",
            },
            {
              quote:
                "Como fan, lo que me convenció fue la discreción y que la llamada se corta sola cuando se acaba mi saldo. Sin sorpresas.",
              name: "Jorge M.",
              role: "Fan verificado",
              initials: "JM",
              gradient: "linear-gradient(145deg,#8ECAE6,#16283B)",
            },
          ].map((t) => (
            <figure key={t.name} className="rounded-[26px] border border-white/[0.08] bg-surface/70 p-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-cream/80">“{t.quote}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <Avatar initials={t.initials} gradient={t.gradient} size="sm" />
                <div>
                  <p className="text-xs font-semibold">{t.name}</p>
                  <p className="text-[10px] text-muted">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="faq" className="container-x pt-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="eyebrow">
              <span className="h-1 w-1 rounded-full bg-rose" /> Preguntas frecuentes
            </span>
            <h2 className="display mt-3 text-3xl leading-tight sm:text-[40px]">
              Antes de entrar,
              <br />
              <span className="italic text-rose">esto importa</span>.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Si tu pregunta no está aquí, escríbenos a amyoficialfan@gmail.com. Respondemos todos los días de 8:00 a 22:00.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "¿Cómo se cobra y cuándo recibo?",
                a: "Los fans recargan su wallet con tarjeta, transferencia o cripto según disponibilidad. Cada venta se registra con su comisión. Las creadoras pueden solicitar retiro desde Q200; se procesa los viernes por transferencia bancaria o USDT.",
              },
              {
                q: "¿Qué porcentaje se queda la plataforma?",
                a: "La comisión estándar es 20% por venta. Puede bajar según volumen y se muestra siempre antes de confirmar. No hay cargos ocultos ni cuotas mensuales para la creadora.",
              },
              {
                q: "¿Cómo verifican la edad y el consentimiento?",
                a: "Cada creadora pasa KYC con documento de identidad, selfie y firma de contrato. Por cada contenido se registra quién aparece y su autorización. Los fans confirman mayoría de edad al entrar y en pagos sensibles.",
              },
              {
                q: "¿Es discreto?",
                a: "Sí. Los cobros aparecen con un nombre comercial neutro, no mostramos tu actividad en redes y puedes usar un alias. La privacidad de los datos se trata según la ley aplicable y estándares internacionales.",
              },
              {
                q: "¿Puedo vender servicios presenciales?",
                a: "Solo servicios legales y verificables, como shows, eventos o sesiones profesionales, con contrato y anticipo. No se permiten servicios sexuales presenciales ni citas tipo escort.",
              },
              {
                q: "¿Qué pasa si alguien filtra mi contenido?",
                a: "Usamos URLs firmadas, marca de agua por usuario y un canal de takedown con SLA de 24–48 horas. Ningún sistema es infalible, por eso también trabajamos con detección de duplicados.",
              },
            ].map((f) => (
              <details key={f.q} className="group rounded-2xl border border-white/[0.08] bg-surface/60 px-5 py-4 transition open:border-white/15 open:bg-surface">
                <summary className="flex items-center justify-between gap-4 text-sm font-medium text-cream/90">
                  {f.q}
                  <Plus className="faq-plus h-4 w-4 shrink-0 text-rose transition" />
                </summary>
                <p className="mt-3 text-[13px] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x pt-24">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(120deg,#2A0F22,#0B0A0F_50%,#1C1430)] px-6 py-14 text-center sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[600px] -translate-x-1/2 rounded-full bg-rose/20 blur-[100px]" />
          <span className="eyebrow justify-center">
            <Zap className="h-3.5 w-3.5 text-gold" /> Acceso anticipado
          </span>
          <h2 className="display relative mx-auto mt-4 max-w-2xl text-4xl leading-[1.03] sm:text-[56px]">
            Tu próxima suscripción
            <br />
            empieza <span className="italic text-rose">aquí</span>.
          </h2>
          <p className="relative mx-auto mt-5 max-w-md text-sm leading-relaxed text-cream/60">
            Sé de las primeras creadoras o de los primeros fans. Cupos limitados para el lanzamiento en Latinoamérica.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/registro" className="btn-primary">
              Crear mi cuenta
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/explorar" className="btn-ghost">
              Explorar sin registrarme
            </Link>
          </div>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-muted">
            <span className="inline-flex items-center gap-1.5"><CreditCard className="h-3.5 w-3.5" /> Pago seguro</span>
            <span className="inline-flex items-center gap-1.5"><Globe className="h-3.5 w-3.5" /> GTQ y USD</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> 18+ verificado</span>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
