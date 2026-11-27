"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { creators, categories } from "@/lib/data";
import CreatorCard from "@/components/CreatorCard";
import { money } from "@/lib/utils";

export default function ExploreClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todo");
  const [maxPrice, setMaxPrice] = useState(200);
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [sort, setSort] = useState("relevancia");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = creators.filter((c) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.handle.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)) ||
        c.city.toLowerCase().includes(q);
      const matchesCategory =
        category === "Todo" ||
        (category === "En línea" && c.online) ||
        (category === "Nuevas" && c.isNew) ||
        (category === "Llamadas" && c.callPrice > 0) ||
        c.tags.includes(category);
      const matchesPrice = c.subPrice <= maxPrice;
      const matchesOnline = !onlineOnly || c.online;
      return matchesQuery && matchesCategory && matchesPrice && matchesOnline;
    });

    if (sort === "precio-asc") list = [...list].sort((a, b) => a.subPrice - b.subPrice);
    if (sort === "precio-desc") list = [...list].sort((a, b) => b.subPrice - a.subPrice);
    if (sort === "fans") list = [...list].sort((a, b) => b.fans - a.fans);
    if (sort === "nuevas") list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew));
    return list;
  }, [query, category, maxPrice, onlineOnly, sort]);

  const filters = (
    <div className="space-y-7">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/50">Disponibilidad</p>
        <button
          onClick={() => setOnlineOnly((v) => !v)}
          className="mt-3 flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm"
        >
          <span className="flex items-center gap-2 text-cream/80">
            <span className={`h-2 w-2 rounded-full ${onlineOnly ? "bg-emerald-400" : "bg-white/20"}`} />
            Solo en línea
          </span>
          <span className={`relative h-5 w-9 rounded-full transition ${onlineOnly ? "bg-rose" : "bg-white/15"}`}>
            <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition ${onlineOnly ? "left-[18px]" : "left-0.5"}`} />
          </span>
        </button>
      </div>

      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/50">Categorías</p>
        <div className="mt-3 space-y-1">
          {categories.filter((c) => c !== "En línea" && c !== "Nuevas").map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                category === c ? "bg-rose/12 text-rose" : "text-cream/70 hover:bg-white/5 hover:text-cream"
              }`}
            >
              {c}
              <span className="text-[10px] text-muted/60">
                {c === "Todo"
                  ? creators.length
                  : c === "VIP" || c === "Llamadas"
                    ? creators.filter((x) => x.tags.includes(c) || c === "Llamadas").length
                    : creators.filter((x) => x.tags.includes(c)).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/50">Suscripción máx.</p>
          <span className="text-xs font-semibold text-cream">{money(maxPrice)}</span>
        </div>
        <input
          type="range"
          min={50}
          max={200}
          step={10}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          aria-label="Precio máximo de suscripción"
          className="mt-4 w-full"
          style={{ ["--range" as string]: `${((maxPrice - 50) / 150) * 100}%` }}
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-xs font-medium text-cream/80">¿Buscas algo específico?</p>
        <p className="mt-1 text-[11px] leading-relaxed text-muted">
          Escríbenos y te ayudamos a encontrar una creadora que encaje contigo.
        </p>
        <button className="mt-3 text-[11px] font-semibold text-rose">Hablar con soporte →</button>
      </div>
    </div>
  );

  return (
    <div className="container-x py-10">
      <div className="max-w-2xl">
        <span className="eyebrow">
          <span className="h-1 w-1 rounded-full bg-rose" /> Catálogo
        </span>
        <h1 className="display mt-3 text-4xl leading-[1.02] sm:text-6xl">
          Encuentra tu próxima <span className="italic text-rose">conexión</span>.
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
          Creadoras verificadas de Latinoamérica y el mundo. Filtra por categoría, disponibilidad y presupuesto.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca por nombre, ciudad o categoría…"
            aria-label="Buscar creadoras"
            className="field pl-11"
          />
          {query ? (
            <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
        <div className="flex gap-2">
          <select aria-label="Ordenar creadoras" value={sort} onChange={(e) => setSort(e.target.value)} className="field w-auto min-w-[150px] text-xs">
            <option value="relevancia" className="bg-surface">Relevancia</option>
            <option value="fans" className="bg-surface">Más fans</option>
            <option value="nuevas" className="bg-surface">Nuevas primero</option>
            <option value="precio-asc" className="bg-surface">Menor precio</option>
            <option value="precio-desc" className="bg-surface">Mayor precio</option>
          </select>
          <button onClick={() => setFiltersOpen(true)} className="btn-ghost shrink-0 lg:hidden">
            <SlidersHorizontal className="h-4 w-4" /> Filtros
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[230px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">{filters}</div>
        </aside>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs text-muted">
              <span className="font-semibold text-cream">{filtered.length}</span> creadoras
              {category !== "Todo" ? ` · ${category}` : ""}
            </p>
            <div className="flex gap-2 overflow-x-auto no-scrollbar lg:hidden">
              {["Todo", "En línea", "Nuevas", "VIP"].map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-medium ${
                    category === c ? "bg-cream text-ink" : "border border-white/10 text-cream/70"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {filtered.length ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((creator, i) => (
                <CreatorCard key={creator.slug} creator={creator} index={i} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-white/15 py-20 text-center">
              <p className="text-sm text-cream/80">No encontramos creadoras con esos filtros.</p>
              <button
                onClick={() => {
                  setQuery("");
                  setCategory("Todo");
                  setOnlineOnly(false);
                  setMaxPrice(200);
                }}
                className="btn-ghost mt-4"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {filtersOpen ? (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setFiltersOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[28px] border-t border-white/10 bg-surface p-6">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-semibold">Filtros</p>
              <button onClick={() => setFiltersOpen(false)} className="text-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            {filters}
            <button onClick={() => setFiltersOpen(false)} className="btn-primary mt-6 w-full">
              Ver {filtered.length} creadoras
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
