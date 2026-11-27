import Link from "next/link";
import { BadgeCheck, ArrowUpRight, Video, Lock } from "lucide-react";
import type { Creator } from "@/lib/data";
import { money, compact } from "@/lib/utils";
import Artwork from "./Artwork";

export default function CreatorCard({ creator, index = 0 }: { creator: Creator; index?: number }) {
  return (
    <Link
      href={`/c/${creator.slug}`}
      className="group relative overflow-hidden rounded-[26px] border border-white/[0.08] bg-surface/70 transition duration-500 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-card"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative">
        <Artwork initials={creator.initials} gradient={creator.gradient} className="aspect-[4/5] w-full" />

        <div className="absolute left-3 top-3 flex items-center gap-1.5">
          {creator.online ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-semibold text-emerald-300 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> En línea
            </span>
          ) : null}
          {creator.isNew ? (
            <span className="rounded-full bg-gold/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ink">
              Nueva
            </span>
          ) : null}
        </div>

        <div className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-black/35 text-white/70 backdrop-blur">
          <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="flex items-end justify-between gap-2">
            <div className="min-w-0">
              <h3 className="flex items-center gap-1.5 text-[15px] font-semibold text-white">
                {creator.name}
                {creator.verified ? <BadgeCheck className="h-4 w-4 shrink-0 text-rose" /> : null}
              </h3>
              <p className="mt-0.5 line-clamp-1 text-[11px] text-white/65">{creator.tagline}</p>
            </div>
            <span className="shrink-0 whitespace-nowrap rounded-full bg-white/12 px-2 py-1 text-[9px] font-medium text-white/80 backdrop-blur">
              {compact(creator.fans)} fans
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex flex-wrap gap-1.5">
          {creator.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-muted">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-white/[0.06] pt-3 text-xs">
          <span className="text-muted">
            Desde <span className="font-semibold text-cream">{money(creator.subPrice)}</span>/mes
          </span>
          <span className="inline-flex items-center gap-1 text-muted">
            {creator.online ? <Video className="h-3.5 w-3.5 text-rose" /> : <Lock className="h-3.5 w-3.5" />}
            {money(creator.callPrice)}/min
          </span>
        </div>
      </div>
    </Link>
  );
}
