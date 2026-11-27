"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Gift, MessageCircle, Target, Users } from "lucide-react";
import { topFans } from "@/lib/data";
import { money } from "@/lib/utils";

const funnel = [
  { label: "Visitas al perfil", value: "12,480", pct: 100, tone: "bg-rose" },
  { label: "Vieron un post", value: "6,320", pct: 51, tone: "bg-lilac" },
  { label: "Se suscribieron", value: "842", pct: 13, tone: "bg-gold" },
  { label: "Compraron PPV", value: "318", pct: 38, tone: "bg-emerald-400" },
  { label: "Repitieron compra", value: "41%", pct: 41, tone: "bg-cream" },
];

const initialCampaigns = [
  { id: "welcome", title: "Mensaje de bienvenida", note: "Se envía a cada nuevo suscriptor", active: true },
  { id: "reactivate", title: "Reactivación 30 días", note: "Para fans que no compran hace un mes", active: true },
  { id: "winback", title: "Win-back de exsuscriptores", note: "Oferta con 30% de descuento", active: false },
  { id: "birthday", title: "Cumpleaños y fechas", note: "Mensaje automático con regalo", active: false },
];

export default function GrowthPanel({ creatorName }: { creatorName: string }) {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [copied, setCopied] = useState(false);

  const referral = `https://amy.gt/r/${creatorName.toLowerCase().replace(/\s+/g, "-")}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(referral);
    } catch {
      // clipboard can fail in insecure contexts; the text is still visible
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <div className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-2xl border border-white/[0.08] bg-surface/70 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Crecimiento</p>
            <p className="mt-0.5 text-[10px] text-muted">Dónde se pierde el dinero y dónde se gana.</p>
          </div>
          <Target className="h-4 w-4 text-rose" />
        </div>

        <div className="mt-4 space-y-3">
          {funnel.map((f) => (
            <div key={f.label}>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-muted">{f.label}</span>
                <span className="font-medium">{f.value}</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div className={`h-full rounded-full ${f.tone}`} style={{ width: `${f.pct}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 text-[10px] leading-relaxed text-muted">
          <span className="font-medium text-cream/80">Oportunidad:</span> 6,320 fans vieron un post pero no se suscribieron.
          Una oferta de bienvenida a Q79 podría convertir 8–12% de ese grupo.
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-surface/70 p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Campañas y referidos</p>
          <Gift className="h-4 w-4 text-gold" />
        </div>

        <div className="mt-3 space-y-2">
          {campaigns.map((c) => (
            <button
              key={c.id}
              onClick={() => setCampaigns((prev) => prev.map((x) => (x.id === c.id ? { ...x, active: !x.active } : x)))}
              className="flex w-full items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2.5 text-left transition hover:border-white/15"
            >
              <span className={`relative h-4 w-7 shrink-0 rounded-full transition ${c.active ? "bg-rose" : "bg-white/15"}`}>
                <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition ${c.active ? "left-3.5" : "left-0.5"}`} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] font-medium">{c.title}</span>
                <span className="block text-[9px] text-muted">{c.note}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-lilac/20 bg-lilac/[0.05] p-3">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold text-lilac">
            <Users className="h-3.5 w-3.5" /> Programa de referidos
          </p>
          <p className="mt-1 text-[9px] leading-relaxed text-muted">
            Gana 5% de por vida por cada creadora que traigas y 10% por cada fan que refieras.
          </p>
          <div className="mt-2 flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/20 px-2.5 py-2">
            <span className="min-w-0 flex-1 truncate text-[9px] text-cream/60">{referral}</span>
            <button aria-label="Copiar enlace de referido" onClick={copy} className="grid h-6 w-6 place-items-center rounded-md bg-white/[0.06] text-muted hover:text-cream">
              {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between text-[9px] text-muted">
            <span>12 referidas activas</span>
            <span className="text-emerald-300">+{money(1240)} este mes</span>
          </div>
        </div>

        <div className="mt-3 divide-y divide-white/[0.04]">
          {topFans.slice(0, 3).map((f, i) => (
            <div key={f.id} className="flex items-center gap-2 py-2">
              <span className={`grid h-5 w-5 place-items-center rounded-full text-[8px] font-bold ${
                i === 0 ? "bg-gold text-ink" : "bg-white/10 text-muted"
              }`}>{i + 1}</span>
              <span className="flex-1 text-[10px]">{f.name}</span>
              <span className="text-[10px] text-cream/70">{money(f.spend)}</span>
            </div>
          ))}
        </div>

        <button className="mt-3 inline-flex items-center gap-1 text-[10px] font-medium text-rose">
          <MessageCircle className="h-3 w-3" /> Enviar campaña ahora <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
