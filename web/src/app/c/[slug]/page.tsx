import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  Bookmark,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  ShieldCheck,
  Star,
  Users,
  Video,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Avatar from "@/components/Avatar";
import CreatorStore from "@/components/CreatorStore";
import PhotoCarousel from "@/components/PhotoCarousel";
import ProfilePosts from "@/components/ProfilePosts";
import SubscribePanel from "@/components/SubscribePanel";
import { creators, galleryFor, getCreator, postsFor } from "@/lib/data";
import { compact, money } from "@/lib/utils";

export function generateStaticParams() {
  return creators.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const creator = getCreator(slug);
  if (!creator) return { title: "Creadora no encontrada — AMY" };
  return {
    title: `${creator.name} — AMY`,
    description: creator.tagline,
  };
}

export default async function CreatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const creator = getCreator(slug);
  if (!creator) notFound();
  const posts = postsFor(slug);

  return (
    <main className="pb-24 lg:pb-0">
      <Navbar />

      <div className="relative h-[230px] overflow-hidden sm:h-[300px]" style={{ backgroundImage: creator.gradient }}>
        <div className="grain absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.28),transparent_55%)]" />
        <div className="absolute -right-10 top-0 select-none font-display text-[220px] leading-none text-white/10 sm:text-[320px]">
          {creator.initials}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-black/10" />

        <div className="container-x relative flex h-full items-start justify-between pt-5">
          <Link href="/explorar" className="inline-flex items-center gap-2 rounded-full bg-black/35 px-3.5 py-2 text-xs font-medium text-white/85 backdrop-blur transition hover:bg-black/50">
            <ArrowLeft className="h-3.5 w-3.5" /> Explorar
          </Link>
          <div className="flex gap-2">
            <button className="grid h-9 w-9 place-items-center rounded-full bg-black/35 text-white/80 backdrop-blur transition hover:bg-black/50" aria-label="Compartir">
              <Share2 className="h-4 w-4" />
            </button>
            <button className="grid h-9 w-9 place-items-center rounded-full bg-black/35 text-white/80 backdrop-blur transition hover:bg-black/50" aria-label="Guardar">
              <Bookmark className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="container-x relative -mt-14 sm:-mt-16">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <Avatar initials={creator.initials} gradient={creator.gradient} size="xl" online={creator.online} className="ring-4 ring-ink" />
            <div className="pb-1">
              <h1 className="flex items-center gap-2 text-2xl font-semibold sm:text-3xl">
                {creator.name}
                {creator.verified ? <BadgeCheck className="h-5 w-5 text-rose" /> : null}
              </h1>
              <p className="text-sm text-muted">{creator.handle}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="btn-ghost !py-2.5">
              <MessageCircle className="h-4 w-4" /> Mensaje
            </button>
            <button className="btn-ghost !py-2.5">
              <Phone className="h-4 w-4" /> Llamar
            </button>
            <a href="#suscribirme" className="btn-primary !py-2.5">
              Suscribirme · {money(creator.subPrice)}
            </a>
          </div>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div>
            <p className="max-w-2xl text-[15px] leading-relaxed text-cream/80">{creator.tagline}</p>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {creator.city}</span>
              <span className="inline-flex items-center gap-1.5"><Star className="h-3.5 w-3.5 fill-gold text-gold" /> {creator.rating} · 214 reseñas</span>
              <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {compact(creator.fans)} fans</span>
              <span className="inline-flex items-center gap-1.5"><Video className="h-3.5 w-3.5" /> {creator.posts} publicaciones</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {creator.tags.map((t) => (
                <span key={t} className="chip !py-1 text-[10px]">{t}</span>
              ))}
              {creator.online ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-medium text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> En línea
                </span>
              ) : null}
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.04] px-4 py-3 text-[11px] text-emerald-200/80">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              Perfil verificado: identidad, edad y consentimiento validados por AMY.
            </div>

            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold">Galería</h2>
                <span className="text-[10px] text-muted">4 fotos · desliza para ver más</span>
              </div>
              <PhotoCarousel slides={galleryFor(creator)} initials={creator.initials} aspect="aspect-[2/1]" />
            </div>

            <CreatorStore creator={creator} />

            <div className="mt-8">
              <ProfilePosts creator={creator} posts={posts} />
            </div>
          </div>

          <aside id="suscribirme" className="lg:sticky lg:top-24 lg:self-start">
            <SubscribePanel creator={creator} />
          </aside>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-surface/95 p-3 backdrop-blur lg:hidden">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-[10px] text-muted">Suscripción mensual</p>
            <p className="text-sm font-semibold">{money(creator.subPrice)}</p>
          </div>
          <button aria-label="Guardar en favoritos" className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-cream/80">
            <Heart className="h-4 w-4" />
          </button>
          <a href="#suscribirme" className="btn-primary flex-1 !py-3">Suscribirme</a>
        </div>
      </div>

      <div className="hidden lg:block">
        <Footer />
      </div>
    </main>
  );
}
