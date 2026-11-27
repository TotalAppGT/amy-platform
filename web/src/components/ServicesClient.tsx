"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarCheck, CreditCard, Search, ShieldCheck, Sparkles, X } from "lucide-react";
import { services, serviceCategories } from "@/lib/services";
import ServiceCard from "./ServiceCard";

const cities = ["Todas", "Guatemala", "Antigua Guatemala", "Quetzaltenango"];

export default function ServicesClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [city, setCity] = useState("Todas");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((s) => {
      const matchesQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.provider.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q)) ||
        s.city.toLowerCase().includes(q);
      const matchesCategory = category === "Todos" || s.category === category;
      const matchesCity = city === "Todas" || s.city === city;
      return matchesQuery && matchesCategory && matchesCity;
    });
  }, [query, category, city]);

  return (
    <div className="container-x py-10 sm:py-14">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <span className="eyebrow">
            <Sparkles className="h-3.5 w-3.5 text-gold" /> Servicios profesionales
          </span>
          <h1 className="display mt-3 text-4xl leading-[1.01] sm:text-6xl">
            Bienestar, belleza
            <br />
            y <span className="italic text-rose">buenos planes</span>.
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
            Masajes, spa, fotografía, maquillaje y eventos con profesionales verificados. Reserva con anticipo protegido y
            coordinamos el resto por chat.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#catalogo" className="btn-primary">
              Ver servicios
              <CalendarCheck className="h-4 w-4" />
            </a>
            <Link href="/registro?rol=creadora" className="btn-ghost">
              Ofrecer mis servicios
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: ShieldCheck, title: "Identidad verificada", text: "KYC y referencias" },
            { icon: CreditCard, title: "Anticipo protegido", text: "20% y saldo al final" },
            { icon: CalendarCheck, title: "Agenda clara", text: "Confirma en minutos" },
            { icon: Sparkles, title: "Solo legal", text: "Servicios profesionales" },
          ].map((t) => (
            <div key={t.title} className="rounded-2xl border border-white/[0.08] bg-surface/60 p-4">
              <t.icon className="h-4 w-4 text-rose" />
              <p className="mt-2 text-[11px] font-semibold">{t.title}</p>
              <p className="text-[9px] text-muted">{t.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div id="catalogo" className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca masaje, fotografía, zona o profesional…"
            aria-label="Buscar servicios"
            className="field pl-11"
          />
          {query ? (
            <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
        <select aria-label="Filtrar por ciudad" value={city} onChange={(e) => setCity(e.target.value)} className="field w-auto min-w-[170px] text-xs">
          {cities.map((c) => (
            <option key={c} value={c} className="bg-surface">{c === "Todas" ? "Todas las ciudades" : c}</option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {serviceCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-medium transition ${
              category === c
                ? "bg-cream text-ink"
                : "border border-white/10 bg-white/[0.03] text-cream/65 hover:border-white/25 hover:text-cream"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-xs font-normal text-muted">
          <span className="font-semibold text-cream">{filtered.length}</span> servicios disponibles
        </h2>
        <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Profesionales verificados
        </span>
      </div>

      {filtered.length ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-3xl border border-dashed border-white/15 py-20 text-center">
          <p className="text-sm text-cream/80">No encontramos servicios con esos filtros.</p>
          <button
            onClick={() => {
              setQuery("");
              setCategory("Todos");
              setCity("Todas");
            }}
            className="btn-ghost mt-4"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      <div className="mt-14 rounded-[28px] border border-white/10 bg-[linear-gradient(120deg,rgba(233,196,106,0.08),rgba(16,14,21,0.9)_50%,rgba(255,77,141,0.08))] p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow">
              <Sparkles className="h-3.5 w-3.5 text-gold" /> Para profesionales
            </p>
            <h2 className="display mt-2 text-2xl sm:text-3xl">¿Das masajes, maquillaje o fotografía?</h2>
            <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-muted">
              Publica tus servicios, maneja tu agenda y recibe anticipos. Comisión clara del 20%, pagos semanales y
              verificación de identidad incluida.
            </p>
          </div>
          <Link href="/registro?rol=creadora" className="btn-primary shrink-0">
            Publicar mis servicios
          </Link>
        </div>
      </div>

      <div className="mt-6 flex items-start gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 text-[10px] leading-relaxed text-muted">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
        AMY solo permite servicios profesionales legales. No se permiten servicios sexuales, citas tipo escort ni
        acompañamiento íntimo. El anticipo se devuelve si la profesional cancela.
      </div>
    </div>
  );
}
