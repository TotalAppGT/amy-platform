"use client";

import { useState } from "react";
import { Download, KeyRound, Lock, ShieldCheck, Trash2, UserX } from "lucide-react";

const initial = [
  { id: "discreet", label: "Modo discreto", note: "Oculta tu estado en línea y las vistas previas de notificaciones.", on: true },
  { id: "online", label: "Ocultar “en línea”", note: "Los demás no ven cuándo estás conectado.", on: true },
  { id: "country", label: "Ocultar país y ciudad", note: "Solo se muestra una región general.", on: true },
  { id: "dms", label: "Permitir mensajes solo de suscripciones", note: "Bloquea DMs de cuentas que no te siguen.", on: true },
  { id: "billing", label: "Pagos discretos", note: "El estado de cuenta muestra AMY, no tu alias.", on: true },
  { id: "analytics", label: "Analítica opcional", note: "Ayuda a mejorar la plataforma con datos agregados.", on: false },
];

export default function PrivacyCenter() {
  const [toggles, setToggles] = useState(initial);
  const [toast, setToast] = useState("");

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 3200);
  }

  return (
    <div className="space-y-4">
      <div className="rounded-[24px] border border-white/[0.08] bg-surface/70 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold"><ShieldCheck className="h-4 w-4 text-emerald-400" /> Controles de privacidad</p>
            <p className="mt-0.5 text-[10px] text-muted">Así se vería tu panel. En producción se guarda por cuenta.</p>
          </div>
          <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[9px] font-medium text-emerald-300">Privado por defecto</span>
        </div>

        <div className="mt-4 divide-y divide-white/[0.05]">
          {toggles.map((t) => (
            <div key={t.id} className="flex items-center gap-3 py-3">
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium">{t.label}</p>
                <p className="text-[9px] leading-relaxed text-muted">{t.note}</p>
              </div>
              <button
                aria-label={`${t.on ? "Desactivar" : "Activar"} ${t.label}`}
                onClick={() => {
                  setToggles((prev) => prev.map((x) => (x.id === t.id ? { ...x, on: !x.on } : x)));
                  notify(`${t.label}: ${t.on ? "desactivado" : "activado"}.`);
                }}
                className={`relative h-5 w-9 shrink-0 rounded-full transition ${t.on ? "bg-[#C2185B]" : "bg-white/15"}`}
              >
                <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition ${t.on ? "left-[18px]" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { icon: Download, title: "Descargar mis datos", note: "Copia de tu perfil, compras y mensajes.", action: "Preparamos tu exportación. Te avisaremos por correo." },
          { icon: KeyRound, title: "Sesiones y 2FA", note: "Cierra sesiones y activa doble factor.", action: "Demo: aquí se abriría la gestión de sesiones y 2FA." },
          { icon: UserX, title: "Ocultar mi perfil", note: "Deja de aparecer en búsquedas y recomendaciones.", action: "Demo: tu perfil se ocultaría del catálogo." },
          { icon: Trash2, title: "Eliminar mi cuenta", note: "Borra tus datos salvo obligaciones legales.", action: "Demo: se iniciaría el proceso de eliminación con confirmación." },
        ].map((item) => (
          <button
            key={item.title}
            onClick={() => notify(item.action)}
            className="flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-surface/60 p-4 text-left transition hover:border-white/20 hover:bg-surface"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-rose">
              <item.icon className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-[11px] font-semibold">{item.title}</span>
              <span className="mt-0.5 block text-[9px] leading-relaxed text-muted">{item.note}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="flex items-start gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 text-[10px] leading-relaxed text-muted">
        <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
        Tus mensajes privados no se usan para publicidad. Los documentos de KYC se guardan separados del contenido y solo
        los ve el equipo de verificación.
      </div>

      {toast ? (
        <div className="fixed bottom-6 left-1/2 z-[95] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl border border-white/10 bg-[#1a1622] px-4 py-3 text-center text-xs text-cream/85 shadow-card">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
