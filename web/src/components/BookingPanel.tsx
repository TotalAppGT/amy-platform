"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarCheck, Check, Info, Lock, MessageCircle, ShieldCheck } from "lucide-react";
import type { Service } from "@/lib/services";
import { depositFor } from "@/lib/services";
import { money } from "@/lib/utils";

const days = [
  { id: "hoy", label: "Hoy", sub: "26 nov" },
  { id: "manana", label: "Mañana", sub: "27 nov" },
  { id: "jue", label: "Jue", sub: "28 nov" },
  { id: "vie", label: "Vie", sub: "29 nov" },
  { id: "sab", label: "Sáb", sub: "30 nov" },
];

const slots = ["09:00", "10:00", "12:00", "15:00", "17:30", "19:00"];
const busy: Record<string, string[]> = { hoy: ["09:00", "12:00"], manana: ["10:00"], jue: ["15:00"], vie: [], sab: ["09:00", "17:30"] };

export default function BookingPanel({ service }: { service: Service }) {
  const [day, setDay] = useState("hoy");
  const [slot, setSlot] = useState("15:00");
  const [modality, setModality] = useState(service.modalities[0]);
  const [done, setDone] = useState(false);
  const deposit = depositFor(service);
  const balance = service.price - deposit;
  const code = `AMY-${3200 + (service.price % 700)}`;

  if (done) {
    return (
      <div className="rounded-[24px] border border-emerald-400/25 bg-emerald-400/[0.06] p-5 text-center">
        <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
          <Check className="h-5 w-5" />
        </span>
        <h3 className="mt-3 text-base font-semibold">Reserva confirmada</h3>
        <p className="mt-1 text-[11px] text-muted">Código {code}</p>

        <div className="mt-4 space-y-2 rounded-xl border border-white/10 bg-black/20 p-3.5 text-left text-[11px]">
          <div className="flex justify-between"><span className="text-muted">Servicio</span><span className="text-right">{service.name}</span></div>
          <div className="flex justify-between"><span className="text-muted">Profesional</span><span>{service.provider}</span></div>
          <div className="flex justify-between"><span className="text-muted">Fecha</span><span>{days.find((d) => d.id === day)?.label} · {slot}</span></div>
          <div className="flex justify-between"><span className="text-muted">Modalidad</span><span>{modality}</span></div>
          <div className="flex justify-between"><span className="text-muted">Anticipo pagado</span><span className="text-emerald-300">{money(deposit)}</span></div>
          <div className="flex justify-between"><span className="text-muted">Saldo en el lugar</span><span>{money(balance)}</span></div>
        </div>

        <p className="mt-3 text-[10px] leading-relaxed text-muted">
          Demo visual. En producción se enviaría confirmación por correo y WhatsApp, y se bloquearía el anticipo hasta
          que la profesional acepte.
        </p>

        <div className="mt-4 flex flex-col gap-2">
          <Link href="/chat" className="btn-primary !py-2.5 !text-xs">
            <MessageCircle className="h-3.5 w-3.5" /> Coordinar por chat
          </Link>
          <button onClick={() => setDone(false)} className="btn-ghost !py-2.5 !text-xs">Hacer otra reserva</button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[24px] border border-white/[0.09] bg-surface/80 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted">Reservar</p>
          <p className="mt-1 display text-2xl">{money(service.price)}</p>
          <p className="text-[10px] text-muted">{service.durationLabel} · {service.modalities.join(" / ")}</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[9px] font-medium text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Disponible
        </span>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream/50">Elige el día</p>
        <div className="grid grid-cols-5 gap-1.5">
          {days.map((d) => (
            <button
              key={d.id}
              onClick={() => {
                setDay(d.id);
                const firstFree = slots.find((s) => !(busy[d.id] ?? []).includes(s));
                if (firstFree) setSlot(firstFree);
              }}
              className={`rounded-xl border py-2 text-center transition ${
                day === d.id ? "border-rose/60 bg-rose/[0.10]" : "border-white/10 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              <span className="block text-[10px] font-medium">{d.label}</span>
              <span className="block text-[8px] text-muted">{d.sub}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream/50">Hora</p>
        <div className="grid grid-cols-3 gap-1.5">
          {slots.map((s) => {
            const isBusy = (busy[day] ?? []).includes(s);
            return (
              <button
                key={s}
                disabled={isBusy}
                onClick={() => setSlot(s)}
                className={`rounded-lg border py-1.5 text-[10px] transition ${
                  isBusy
                    ? "cursor-not-allowed border-white/5 text-muted/30 line-through"
                    : slot === s
                      ? "border-rose/60 bg-rose/[0.10] text-cream"
                      : "border-white/10 text-muted hover:border-white/25"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream/50">Modalidad</p>
        <div className="flex flex-wrap gap-1.5">
          {service.modalities.map((m) => (
            <button
              key={m}
              onClick={() => setModality(m)}
              className={`rounded-full border px-3 py-1.5 text-[10px] ${
                modality === m ? "border-rose/60 bg-rose/[0.10] text-cream" : "border-white/10 text-muted"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-2 rounded-xl border border-white/10 bg-white/[0.03] p-3.5 text-[11px]">
        <div className="flex justify-between"><span className="text-muted">Servicio</span><span>{money(service.price)}</span></div>
        <div className="flex justify-between"><span className="text-muted">Anticipo (20%)</span><span className="text-rose">{money(deposit)}</span></div>
        <div className="flex justify-between"><span className="text-muted">Saldo en el lugar</span><span>{money(balance)}</span></div>
        <div className="my-2 h-px bg-white/10" />
        <div className="flex items-center justify-between">
          <span className="text-cream/80">Pagar ahora</span>
          <span className="display text-xl">{money(deposit)}</span>
        </div>
      </div>

      <button onClick={() => setDone(true)} className="btn-primary mt-4 w-full">
        <CalendarCheck className="h-4 w-4" /> Reservar con anticipo
      </button>

      <div className="mt-3 flex items-center justify-center gap-1.5 text-[9px] text-muted/70">
        <Lock className="h-3 w-3" /> Pago protegido · cancelación gratis 24 h antes
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        {["VISA", "MC", "ACH", "USDT"].map((m) => (
          <span key={m} className="rounded border border-white/10 px-1.5 py-0.5 text-[8px] text-muted/60">{m}</span>
        ))}
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 text-[9px] leading-relaxed text-muted">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
        El anticipo se libera a la profesional 24 h después del servicio. Si ella cancela, se devuelve completo.
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5 text-[9px] text-muted/60">
        <ShieldCheck className="h-3 w-3" /> Servicio profesional verificado
      </div>
    </div>
  );
}
