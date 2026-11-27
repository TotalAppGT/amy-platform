"use client";

import { useState } from "react";
import Link from "next/link";
import { BadgeCheck, Check, CreditCard, Lock, MessageCircle, Phone, ShieldCheck, Sparkles } from "lucide-react";
import type { Creator } from "@/lib/data";
import { money } from "@/lib/utils";

const tiers = [
  { id: "mensual", name: "Mensual", price: 150, note: "Renueva cada mes", perks: ["Muro completo", "Chat 24 h", "10% off en PPV"] },
  { id: "trimestral", name: "3 meses", price: 390, note: "Ahorra 13%", perks: ["Todo lo mensual", "1 llamada de 10 min", "Acceso anticipado"] },
  { id: "vip", name: "VIP", price: 650, note: "Todo incluido", perks: ["Chat ilimitado", "2 llamadas de 15 min", "Contenido personalizado"] },
];

export default function SubscribePanel({ creator }: { creator: Creator }) {
  const [selected, setSelected] = useState("mensual");
  const [notice, setNotice] = useState("");
  const tier = tiers.find((t) => t.id === selected)!;
  const priceFor = (t: (typeof tiers)[number]) => Math.round(creator.subPrice * (t.price / 150));

  return (
    <div className="space-y-4">
      <div className="rounded-[24px] border border-white/[0.09] bg-surface/80 p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Suscríbete</p>
          <span className="chip !py-1 text-[10px]">
            <Sparkles className="h-3 w-3 text-gold" /> Acceso inmediato
          </span>
        </div>

        <div className="mt-4 space-y-2">
          {tiers.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setSelected(t.id);
                setNotice("");
              }}
              className={`w-full rounded-2xl border p-3.5 text-left transition ${
                selected === t.id
                  ? "border-rose/60 bg-rose/[0.08]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <span className={`grid h-4 w-4 place-items-center rounded-full border ${selected === t.id ? "border-rose bg-rose" : "border-white/25"}`}>
                    {selected === t.id ? <Check className="h-2.5 w-2.5 text-white" /> : null}
                  </span>
                  {t.name}
                </span>
                <span className="text-sm font-semibold">
                  {money(priceFor(t))}
                  <span className="text-[10px] font-normal text-muted">/{t.id === "trimestral" ? "3 meses" : "mes"}</span>
                </span>
              </div>
              <p className="ml-6 mt-0.5 text-[10px] text-muted">{t.note}</p>
              {selected === t.id ? (
                <ul className="ml-6 mt-2 space-y-1">
                  {t.perks.map((p) => (
                    <li key={p} className="flex items-center gap-1.5 text-[10px] text-cream/60">
                      <Check className="h-2.5 w-2.5 text-emerald-400" /> {p}
                    </li>
                  ))}
                </ul>
              ) : null}
            </button>
          ))}
        </div>

        <button onClick={() => setNotice("Demo visual: aquí se abriría el checkout con wallet, tarjeta o cripto.")} className="btn-primary mt-4 w-full">
          Continuar · {money(priceFor(tier))}
        </button>

        {notice ? <p className="mt-3 rounded-xl bg-white/[0.04] p-3 text-[10px] leading-relaxed text-cream/60">{notice}</p> : null}

        <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-muted/70">
          <Lock className="h-3 w-3" /> Pago protegido · Cancela cuando quieras
        </div>
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {["VISA", "MC", "USDT", "ACH"].map((m) => (
            <span key={m} className="rounded border border-white/10 px-1.5 py-0.5 text-[8px] text-muted/60">{m}</span>
          ))}
        </div>
      </div>

      <div className="rounded-[24px] border border-white/[0.09] bg-surface/80 p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Llamada privada</p>
          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Disponible
          </span>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="display text-2xl">{money(creator.callPrice)}<span className="text-xs font-sans text-muted"> /min</span></p>
            <p className="mt-1 text-[10px] text-muted">Video o audio · sin mínimo</p>
          </div>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[#C2185B] text-white">
            <Phone className="h-5 w-5" />
          </span>
        </div>
        <button
          onClick={() => setNotice("Demo visual: se reservaría un horario y se bloquearía el saldo por minuto.")}
          className="btn-ghost mt-4 w-full"
        >
          Reservar llamada
        </button>
      </div>

      <div className="rounded-[24px] border border-white/[0.09] bg-surface/80 p-5">
        <p className="flex items-center gap-2 text-xs font-semibold">
          <ShieldCheck className="h-4 w-4 text-emerald-400" /> Compra con confianza
        </p>
        <ul className="mt-3 space-y-2 text-[11px] leading-relaxed text-muted">
          <li className="flex gap-2"><BadgeCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose" /> Identidad y edad verificadas.</li>
          <li className="flex gap-2"><CreditCard className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose" /> Saldo reembolsable si algo falla.</li>
          <li className="flex gap-2"><MessageCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose" /> Soporte por chat en menos de 2 h.</li>
        </ul>
      </div>

      <Link href="/chat" className="flex items-center justify-center gap-2 text-xs font-medium text-rose hover:text-blush">
        <MessageCircle className="h-4 w-4" /> Enviar mensaje antes de suscribirme
      </Link>
    </div>
  );
}
