import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Clock, MapPin, Star } from "lucide-react";
import type { Service } from "@/lib/services";
import { money } from "@/lib/utils";
import Artwork from "./Artwork";

export default function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  return (
    <Link
      href={`/servicios/${service.slug}`}
      className="group overflow-hidden rounded-[26px] border border-white/[0.08] bg-surface/70 transition duration-500 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-card"
      style={{ animationDelay: `${index * 55}ms` }}
    >
      <div className="relative">
        <Artwork initials={service.initials} gradient={service.gradient} className="aspect-[16/10] w-full" compact />

        <div className="absolute left-3 top-3 flex gap-1.5">
          <span className="rounded-full bg-black/45 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide text-white/85 backdrop-blur">
            {service.category}
          </span>
          {service.popular ? (
            <span className="rounded-full bg-gold/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-ink">Popular</span>
          ) : null}
        </div>

        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-1 text-[9px] text-white/85 backdrop-blur">
          <Clock className="h-3 w-3" /> {service.durationLabel}
        </span>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 className="text-[15px] font-semibold text-white">{service.name}</h3>
          <p className="mt-0.5 flex items-center gap-1.5 text-[10px] text-white/65">
            <MapPin className="h-3 w-3" /> {service.zone} · {service.city}
          </p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2.5">
          <span
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[9px] font-semibold text-white/90"
            style={{ backgroundImage: service.gradient }}
          >
            {service.initials}
          </span>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1 truncate text-[11px] font-medium">
              {service.provider}
              {service.verified ? <BadgeCheck className="h-3 w-3 shrink-0 text-rose" /> : null}
            </p>
            <p className="truncate text-[9px] text-muted">{service.providerRole}</p>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] text-cream/80">
            <Star className="h-3 w-3 fill-gold text-gold" /> {service.rating}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {service.modalities.map((m) => (
            <span key={m} className="rounded-full border border-white/10 px-2 py-0.5 text-[9px] text-muted">{m}</span>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-3">
          <span className="text-[11px] text-muted">
            Desde <span className="text-sm font-semibold text-cream">{money(service.price)}</span>
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-rose">
            Reservar <ArrowUpRight className="h-3 w-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
