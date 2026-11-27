"use client";

import { useMemo, useState } from "react";
import { Wallet, TrendingUp, Info } from "lucide-react";
import { money } from "@/lib/utils";

export default function CommissionCalc() {
  const [price, setPrice] = useState(150);
  const [fans, setFans] = useState(60);
  const [commission, setCommission] = useState(20);

  const gross = useMemo(() => price * fans, [price, fans]);
  const fee = Math.round(gross * (commission / 100));
  const net = gross - fee;

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0d0b12] p-6 shadow-card sm:p-7">
      <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-rose/20 blur-3xl" />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Calculadora</p>
          <h3 className="mt-1 text-lg font-semibold">¿Cuánto puedes ganar?</h3>
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-gold">
          <Wallet className="h-5 w-5" />
        </span>
      </div>

      <div className="mt-7 space-y-6">
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-cream/70">Suscripción mensual</span>
            <span className="font-semibold text-cream">{money(price)}</span>
          </div>
          <input
            type="range"
            min={50}
            max={500}
            step={10}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            aria-label="Precio de suscripción mensual"
            className="w-full"
            style={{ ["--range" as string]: `${((price - 50) / 450) * 100}%` }}
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-cream/70">Suscriptores activos</span>
            <span className="font-semibold text-cream">{fans}</span>
          </div>
          <input
            type="range"
            min={10}
            max={300}
            step={5}
            value={fans}
            onChange={(e) => setFans(Number(e.target.value))}
            aria-label="Suscriptores activos"
            className="w-full"
            style={{ ["--range" as string]: `${((fans - 10) / 290) * 100}%` }}
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-cream/70">Comisión de la plataforma</span>
            <span className="font-semibold text-cream">{commission}%</span>
          </div>
          <input
            type="range"
            min={10}
            max={35}
            step={1}
            value={commission}
            onChange={(e) => setCommission(Number(e.target.value))}
            aria-label="Comisión de la plataforma"
            className="w-full"
            style={{ ["--range" as string]: `${((commission - 10) / 25) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <div className="flex items-center justify-between text-xs text-muted">
          <span>Facturación bruta estimada</span>
          <span>{money(gross)}/mes</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-muted">
          <span>Comisión AMY ({commission}%)</span>
          <span>−{money(fee)}</span>
        </div>
        <div className="my-3 h-px bg-white/10" />
        <div className="flex items-end justify-between">
          <span className="flex items-center gap-1.5 text-sm text-cream/80">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            Tú recibes
          </span>
          <span className="display text-3xl text-cream">{money(net)}</span>
        </div>
        <p className="mt-2 text-[10px] text-muted/70">Estimado antes de impuestos y comisiones de pago. No incluye PPV, propinas ni llamadas.</p>
      </div>

      <div className="mt-4 flex items-start gap-2 text-[10px] leading-relaxed text-muted/80">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Los retiros se procesan cada viernes a tu cuenta bancaria o wallet USDT.
      </div>
    </div>
  );
}
