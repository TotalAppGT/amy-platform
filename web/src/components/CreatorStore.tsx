"use client";

import { useState } from "react";
import {
  Gift,
  Heart,
  Image as ImageIcon,
  Phone,
  Sparkles,
  Star,
  TrendingUp,
  Video,
  Wallet,
} from "lucide-react";
import type { Creator } from "@/lib/data";
import { offersFor, topFans } from "@/lib/data";
import { money } from "@/lib/utils";

const icons = {
  gift: Gift,
  phone: Phone,
  sparkles: Sparkles,
  heart: Heart,
  video: Video,
  image: ImageIcon,
};

export default function CreatorStore({ creator }: { creator: Creator }) {
  const [toast, setToast] = useState("");
  const offers = offersFor(creator);

  function buy(offer: (typeof offers)[number]) {
    setToast(`${offer.title} agregado. Demo: se abriría el checkout con wallet o tarjeta.`);
    window.setTimeout(() => setToast(""), 3200);
  }

  return (
    <section className="mt-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="eyebrow">
            <Sparkles className="h-3.5 w-3.5 text-gold" /> Tienda de {creator.name.split(" ")[0]}
          </span>
          <h2 className="display mt-2 text-2xl sm:text-3xl">Compra directo, sin vueltas.</h2>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.05] px-3 py-1.5 text-[10px] text-emerald-300">
          <Wallet className="h-3.5 w-3.5" /> Pago inmediato con wallet
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {offers.map((offer) => {
          const Icon = icons[offer.icon as keyof typeof icons] ?? Sparkles;
          return (
            <div key={offer.id} className="group flex flex-col rounded-2xl border border-white/[0.08] bg-surface/70 p-4 transition hover:border-white/20 hover:bg-surface">
              <div className="flex items-start justify-between gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl border border-rose/20 bg-rose/[0.08] text-rose">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-cream/60">
                  {offer.badge}
                </span>
              </div>
              <h3 className="mt-3 text-[13px] font-semibold">{offer.title}</h3>
              <p className="mt-0.5 text-[10px] leading-relaxed text-muted">{offer.detail}</p>
              <div className="mt-auto flex items-end justify-between gap-2 pt-4">
                <div>
                  <p className="text-[9px] text-muted/60 line-through">{money(offer.oldPrice)}</p>
                  <p className="display text-xl">{money(offer.price)}</p>
                </div>
                <button
                  onClick={() => buy(offer)}
                  className="rounded-full bg-[#C2185B] px-3.5 py-2 text-[10px] font-semibold text-white transition hover:bg-[#ff669e]"
                >
                  Comprar
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-2xl border border-white/[0.08] bg-surface/70 p-5">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 text-xs font-semibold">
              <TrendingUp className="h-4 w-4 text-emerald-400" /> Top fans del mes
            </p>
            <span className="text-[9px] text-muted">Ranking por gasto</span>
          </div>
          <div className="mt-3 divide-y divide-white/[0.04]">
            {topFans.slice(0, 4).map((fan, i) => (
              <div key={fan.id} className="flex items-center gap-3 py-2.5">
                <span className={`grid h-6 w-6 place-items-center rounded-full text-[9px] font-bold ${
                  i === 0 ? "bg-gold text-ink" : i === 1 ? "bg-white/20 text-cream" : "bg-white/[0.06] text-muted"
                }`}>
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-medium">{fan.name}</p>
                  <p className="text-[9px] text-muted">{fan.tier} · {fan.since}</p>
                </div>
                <span className="text-[11px] font-semibold text-cream/85">{money(fan.spend)}</span>
                <span className="hidden text-[8px] text-muted/50 sm:block">{fan.last}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gold/20 bg-[linear-gradient(145deg,rgba(233,196,106,0.08),rgba(16,14,21,0.9))] p-5">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 text-xs font-semibold">
              <Star className="h-4 w-4 fill-gold text-gold" /> Meta del mes
            </p>
            <span className="text-[9px] text-gold">68%</span>
          </div>
          <p className="mt-2 display text-2xl">{money(6800)} <span className="text-xs font-sans text-muted">/ {money(10000)}</span></p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-gold to-rose" />
          </div>
          <p className="mt-2 text-[10px] leading-relaxed text-muted">
            Si se llega a la meta, {creator.name.split(" ")[0]} publica un video gratis para todos los suscriptores.
          </p>
          <button
            onClick={() => setToast("Demo: se abriría la propina con montos sugeridos.")}
            className="mt-3 w-full rounded-xl bg-white/[0.06] py-2 text-[10px] font-medium text-cream/80 hover:bg-white/10"
          >
            Contribuir a la meta
          </button>
        </div>
      </div>

      {toast ? (
        <div className="fixed bottom-6 left-1/2 z-[95] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl border border-white/10 bg-[#1a1622] px-4 py-3 text-center text-xs text-cream/85 shadow-card">
          {toast}
        </div>
      ) : null}
    </section>
  );
}
