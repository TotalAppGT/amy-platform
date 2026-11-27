import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarCheck,
  Check,
  Clock,
  Info,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PhotoCarousel from "@/components/PhotoCarousel";
import BookingPanel from "@/components/BookingPanel";
import ServiceCard from "@/components/ServiceCard";
import { getService, services } from "@/lib/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Servicio no encontrado — AMY" };
  return { title: `${service.name} — AMY`, description: service.description };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== service.slug && s.category === service.category).slice(0, 3);
  const fallback = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const suggestions = related.length >= 2 ? related : fallback;

  return (
    <main>
      <Navbar />

      <div className="relative h-[250px] overflow-hidden sm:h-[300px]" style={{ backgroundImage: service.gradient }}>
        <div className="grain absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.3),transparent_55%)]" />
        <div className="absolute -right-6 top-0 select-none font-display text-[240px] leading-none text-white/10 sm:text-[320px]">
          {service.initials}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-black/10" />

        <div className="container-x relative flex h-full items-start justify-between pt-5">
          <Link href="/servicios" className="inline-flex items-center gap-2 rounded-full bg-black/35 px-3.5 py-2 text-xs font-medium text-white/85 backdrop-blur transition hover:bg-black/50">
            <ArrowLeft className="h-3.5 w-3.5" /> Servicios
          </Link>
          <span className="rounded-full bg-black/35 px-3 py-2 text-[10px] uppercase tracking-wider text-white/80 backdrop-blur">
            {service.category}
          </span>
        </div>
      </div>

      <div className="container-x relative -mt-16 sm:-mt-20">
        <div className="max-w-3xl">
          <h1 className="display text-3xl leading-[1.05] sm:text-5xl">{service.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5"><Star className="h-3.5 w-3.5 fill-gold text-gold" /> {service.rating} · {service.reviews} reseñas</span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {service.zone}, {service.city}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {service.durationLabel}</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-300"><ShieldCheck className="h-3.5 w-3.5" /> Verificado</span>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-surface/60 p-4">
              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-[11px] font-semibold text-white/90"
                style={{ backgroundImage: service.gradient }}
              >
                {service.initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1 text-sm font-semibold">
                  {service.provider} <BadgeCheck className="h-4 w-4 text-rose" />
                </p>
                <p className="text-[10px] text-muted">{service.providerRole}</p>
              </div>
              <Link href="/chat" className="hidden items-center gap-1.5 rounded-full border border-white/10 px-3 py-2 text-[10px] text-cream/75 hover:bg-white/5 sm:inline-flex">
                <MessageCircle className="h-3.5 w-3.5" /> Preguntar
              </Link>
            </div>

            <section className="mt-7">
              <h2 className="text-lg font-semibold">Sobre el servicio</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-cream/70">{service.description}</p>
            </section>

            <section className="mt-7">
              <h2 className="text-lg font-semibold">Qué incluye</h2>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {service.includes.map((i) => (
                  <div key={i} className="flex items-start gap-2 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3.5 py-2.5 text-[12px] text-cream/75">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" /> {i}
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-7">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">El espacio</h2>
                <span className="text-[10px] text-muted">4 fotos · desliza para ver más</span>
              </div>
              <div className="mt-3">
                <PhotoCarousel
                  initials={service.initials}
                  aspect="aspect-[2/1]"
                  slides={[
                    { label: "Estudio principal", gradient: service.gradient },
                    { label: "Detalle del espacio", gradient: "linear-gradient(145deg,#2B1B3D,#7A2E4D)" },
                    { label: "Ambiente", gradient: "linear-gradient(145deg,#1C1430,#C08552)" },
                    { label: "Zona de descanso", gradient: "linear-gradient(145deg,#0B3B3C,#1F9D8B)" },
                  ]}
                />
              </div>
            </section>

            <section className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/[0.08] bg-surface/60 p-5">
                <p className="flex items-center gap-2 text-xs font-semibold"><MapPin className="h-4 w-4 text-rose" /> Dónde</p>
                <p className="mt-2 text-[12px] text-cream/75">{service.zone}, {service.city}</p>
                <p className="mt-1 text-[10px] leading-relaxed text-muted">La dirección exacta se comparte al confirmar la reserva.</p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-surface/60 p-5">
                <p className="flex items-center gap-2 text-xs font-semibold"><CalendarCheck className="h-4 w-4 text-rose" /> Modalidades</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {service.modalities.map((m) => (
                    <span key={m} className="chip !py-1 text-[10px]">{m}</span>
                  ))}
                </div>
                <p className="mt-2 text-[10px] text-muted">Disponibilidad mostrada en horario local.</p>
              </div>
            </section>

            <section className="mt-7">
              <h2 className="text-lg font-semibold">Antes de reservar</h2>
              <ul className="mt-3 space-y-2.5">
                {[
                  "Anticipo del 20% para bloquear el horario; el saldo se paga directamente a la profesional.",
                  "Cancelación gratis hasta 24 horas antes. Después, el anticipo se retiene.",
                  "Si la profesional cancela, se devuelve el 100% o se reprograma sin costo.",
                  "Servicio estrictamente profesional. Cualquier solicitud fuera de lo acordado termina la sesión sin reembolso.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-[12px] leading-relaxed text-muted">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-rose" /> {t}
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-7 flex items-start gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 text-[10px] leading-relaxed text-muted">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              AMY actúa como intermediario de agenda y pagos. El servicio lo presta la profesional de forma independiente.
              No se permiten servicios sexuales ni acompañamiento íntimo.
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <BookingPanel service={service} />
          </aside>
        </div>

        <section className="mt-16">
          <div className="flex items-end justify-between">
            <div>
              <span className="eyebrow"><Sparkles className="h-3.5 w-3.5 text-gold" /> También te puede interesar</span>
              <h2 className="display mt-2 text-2xl sm:text-3xl">Otros planes cerca de ti.</h2>
            </div>
            <Link href="/servicios" className="hidden text-xs font-medium text-cream/70 hover:text-cream sm:block">Ver todos →</Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {suggestions.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </section>
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </main>
  );
}
