"use client";

import { useState } from "react";
import { Check, FileText, ShieldCheck, X } from "lucide-react";
import { approvals } from "@/lib/data";

type Row = (typeof approvals)[number] & { status: "Pendiente" | "Aprobada" | "Rechazada" };

export default function AdminApprovals() {
  const [rows, setRows] = useState<Row[]>(approvals.map((a) => ({ ...a, status: "Pendiente" })));
  const [toast, setToast] = useState("");

  function act(id: string, status: Row["status"]) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    setToast(
      status === "Aprobada"
        ? "Creadora aprobada. Se habilitó su perfil y su wallet."
        : "Solicitud rechazada. Se notificó a la aspirante por correo.",
    );
    window.setTimeout(() => setToast(""), 3000);
  }

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-surface/70">
      <div className="flex items-center justify-between p-5 pb-3">
        <div>
          <p className="text-sm font-semibold">Solicitudes de creadoras</p>
          <p className="mt-0.5 text-[10px] text-muted">KYC, edad y contrato antes de publicar.</p>
        </div>
        <span className="rounded-full bg-rose/15 px-2.5 py-1 text-[9px] font-semibold text-rose">
          {rows.filter((r) => r.status === "Pendiente").length} pendientes
        </span>
      </div>

      <div className="divide-y divide-white/[0.04]">
        {rows.map((r) => (
          <div key={r.id} className="flex flex-col gap-3 px-5 py-3.5 sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-rose/30 to-lilac/20 text-[10px] font-semibold">
                {r.name.split(" ").map((n) => n[0]).join("")}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[12px] font-medium">{r.name}</p>
                <p className="truncate text-[10px] text-muted">{r.handle} · {r.city}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-muted">
              <FileText className="h-3.5 w-3.5" />
              {r.docs}
              <span className="text-muted/40">·</span>
              {r.date}
            </div>

            {r.status === "Pendiente" ? (
              <div className="flex gap-1.5">
                <button
                  onClick={() => act(r.id, "Aprobada")}
                  className="inline-flex items-center gap-1 rounded-lg bg-emerald-400/10 px-2.5 py-1.5 text-[10px] font-medium text-emerald-300 hover:bg-emerald-400/20"
                >
                  <Check className="h-3 w-3" /> Aprobar
                </button>
                <button
                  onClick={() => act(r.id, "Rechazada")}
                  className="inline-flex items-center gap-1 rounded-lg bg-white/[0.05] px-2.5 py-1.5 text-[10px] text-muted hover:bg-rose/15 hover:text-rose"
                >
                  <X className="h-3 w-3" /> Rechazar
                </button>
              </div>
            ) : (
              <span className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] ${
                r.status === "Aprobada" ? "bg-emerald-400/10 text-emerald-300" : "bg-white/[0.05] text-muted"
              }`}>
                {r.status === "Aprobada" ? <ShieldCheck className="h-3 w-3" /> : <X className="h-3 w-3" />}
                {r.status}
              </span>
            )}
          </div>
        ))}
      </div>

      {toast ? <div className="border-t border-white/[0.06] px-5 py-2.5 text-[10px] text-cream/70">{toast}</div> : null}
    </div>
  );
}
