"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type GallerySlide = {
  label: string;
  gradient: string;
  image?: string;
};

export default function PhotoCarousel({
  slides,
  initials,
  className,
  aspect = "aspect-[4/3]",
}: {
  slides: GallerySlide[];
  initials: string;
  className?: string;
  aspect?: string;
}) {
  const [index, setIndex] = useState(0);
  const total = slides.length;

  const go = (dir: number) => setIndex((i) => (i + dir + total) % total);

  return (
    <div className={cn("group relative overflow-hidden rounded-[24px] border border-white/10 bg-surface", className)}>
      <div className={cn("relative w-full overflow-hidden", aspect)}>
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div key={`${s.label}-${i}`} className="relative h-full w-full shrink-0">
              {s.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={s.image} alt={s.label} className="h-full w-full object-cover" />
              ) : (
                <div className="grain relative h-full w-full" style={{ backgroundImage: s.gradient }}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.32),transparent_55%)]" />
                  <div className="absolute -bottom-16 -right-10 h-52 w-52 rounded-full border border-white/20 bg-white/[0.06]" />
                  <span className="absolute inset-0 grid place-items-center font-display text-6xl font-light tracking-[0.08em] text-white/85 sm:text-7xl">
                    {initials}
                  </span>
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-4">
                <span className="rounded-full bg-black/35 px-3 py-1.5 text-[10px] font-medium text-white/85 backdrop-blur">
                  {s.label}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-black/35 px-2.5 py-1.5 text-[10px] text-white/75 backdrop-blur">
                  <ImageIcon className="h-3 w-3" /> {i + 1}/{total}
                </span>
              </div>
            </div>
          ))}
        </div>

        {total > 1 ? (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/35 text-white/80 opacity-100 backdrop-blur transition hover:bg-black/55 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Foto siguiente"
              className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/35 text-white/80 opacity-100 backdrop-blur transition hover:bg-black/55 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <div className="absolute bottom-14 left-1/2 flex -translate-x-1/2 gap-1.5">
              {slides.map((s, i) => (
                <button
                  key={s.label + i}
                  onClick={() => setIndex(i)}
                  aria-label={`Ir a la foto ${i + 1}`}
                  className="grid h-6 w-6 place-items-center"
                >
                  <span
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      i === index ? "w-5 bg-white" : "w-1.5 bg-white/35 hover:bg-white/60",
                    )}
                  />
                </button>
              ))}
            </div>
          </>
        ) : null}
      </div>

      <div className="flex items-center gap-2 border-t border-white/[0.07] bg-black/20 p-3">
        {slides.map((s, i) => (
          <button
            key={`thumb-${s.label}-${i}`}
            onClick={() => setIndex(i)}
            aria-label={`Ver ${s.label}`}
            className={cn(
              "relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border transition sm:h-14 sm:w-20",
              i === index ? "border-rose opacity-100" : "border-white/10 opacity-55 hover:opacity-90",
            )}
          >
            <span className="absolute inset-0" style={{ backgroundImage: s.gradient }} />
            {s.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={s.image} alt={s.label} className="absolute inset-0 h-full w-full object-cover" />
            ) : null}
            <span className="absolute inset-x-0 bottom-0 truncate bg-black/50 px-1 py-0.5 text-[7px] text-white/70">
              {s.label}
            </span>
          </button>
        ))}
        <span className="ml-auto hidden text-[9px] text-muted sm:block">Desliza o elige una foto</span>
      </div>
    </div>
  );
}
