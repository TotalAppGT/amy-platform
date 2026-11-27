import Link from "next/link";
import {
  ArrowUpRight,
  Banknote,
  CheckCircle2,
  Clock,
  Eye,
  Image as ImageIcon,
  LayoutDashboard,
  MessageCircle,
  MoreHorizontal,
  Play,
  Settings,
  Share2,
  Sparkles,
  TrendingUp,
  Upload,
  Users,
  Wallet,
} from "lucide-react";
import DashShell, { type DashItem } from "@/components/DashShell";
import Artwork from "@/components/Artwork";
import GrowthPanel from "@/components/GrowthPanel";
import { creatorTransactions, earnings, getCreator, postsFor } from "@/lib/data";
import { money } from "@/lib/utils";

export const metadata = { title: "Panel de creadora — AMY" };

const nav: DashItem[] = [
  { label: "Resumen", href: "/creadora", icon: LayoutDashboard },
  { label: "Contenido", href: "#contenido", icon: ImageIcon },
  { label: "Subir", href: "/creadora/subir", icon: Upload },
  { label: "Servicios", href: "/servicios", icon: Sparkles },
  { label: "Mensajes", href: "/chat", icon: MessageCircle, badge: "12" },
  { label: "Suscriptores", href: "#suscriptores", icon: Users },
  { label: "Ganancias", href: "#ganancias", icon: Wallet },
  { label: "Retiros", href: "#retiros", icon: Banknote },
  { label: "Ajustes", href: "#ajustes", icon: Settings },
];

const kpis = [
  { label: "Ingresos del mes", value: "Q11,840", delta: "+22.4%", note: "vs. octubre", icon: TrendingUp, tone: "text-emerald-300" },
  { label: "Disponible", value: "Q8,420", delta: "Listo para retirar", note: "después de comisión", icon: Wallet, tone: "text-cream" },
  { label: "Pendiente", value: "Q1,240", delta: "En periodo de gracia", note: "se libera en 7 días", icon: Clock, tone: "text-gold" },
  { label: "Suscriptores", value: "842", delta: "+36 este mes", note: "72% renovación", icon: Users, tone: "text-lilac" },
];

export default function CreatorDashboard() {
  const creator = getCreator("camila-rivas")!;
  const posts = postsFor(creator.slug).slice(0, 4);
  const max = Math.max(...earnings.map((e) => e.value));

  return (
    <DashShell
      items={nav}
      active="Resumen"
      role="Panel de creadora"
      name={creator.name}
      initials={creator.initials}
      gradient={creator.gradient}
      searchPlaceholder="Buscar fans, pagos, contenido…"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Martes, 26 de noviembre</p>
          <h1 className="display mt-1 text-3xl sm:text-4xl">Hola, Camila.</h1>
          <p className="mt-1.5 text-sm text-muted">Esto es lo que pasó mientras dormías.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-ghost !py-2.5 !text-xs">
            <Share2 className="h-3.5 w-3.5" /> Compartir perfil
          </button>
          <Link href="/creadora/subir" className="btn-primary !py-2.5 !text-xs">
            <Upload className="h-3.5 w-3.5" /> Subir contenido
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-2xl border border-white/[0.08] bg-surface/70 p-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.14em] text-muted">{k.label}</p>
              <k.icon className="h-3.5 w-3.5 text-muted/60" />
            </div>
            <p className="mt-2 display text-2xl">{k.value}</p>
            <p className={`mt-1 text-[10px] ${k.tone}`}>{k.delta}</p>
            <p className="text-[9px] text-muted/60">{k.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.55fr_1fr]">
        <div className="rounded-2xl border border-white/[0.08] bg-surface/70 p-5" id="ganancias">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold">Ingresos</p>
              <p className="mt-0.5 text-[10px] text-muted">Últimos 6 meses · antes de comisión</p>
            </div>
            <button className="chip !py-1 text-[10px]">Últimos 6 meses</button>
          </div>

          <div className="mt-6 flex h-44 items-end gap-2 sm:gap-3">
            {earnings.map((e, i) => (
              <div key={e.month} className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
                <span className={`mb-1 text-[9px] ${i === earnings.length - 1 ? "font-semibold text-cream" : "text-muted/40 group-hover:text-muted"}`}>
                  {money(e.value)}
                </span>
                <div
                  className={`w-full rounded-t-lg transition ${
                    i === earnings.length - 1
                      ? "bg-gradient-to-t from-rose/40 to-rose"
                      : "bg-white/[0.09] group-hover:bg-white/[0.16]"
                  }`}
                  style={{ height: `${(e.value / max) * 126 + 6}px` }}
                />
                <span className={`text-[9px] ${i === earnings.length - 1 ? "text-cream" : "text-muted/60"}`}>{e.month}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-3 border-t border-white/[0.07] pt-4 sm:grid-cols-3">
            {[
              { label: "Suscripciones", value: "62%", amount: "Q7,340", color: "bg-rose" },
              { label: "PPV", value: "23%", amount: "Q2,720", color: "bg-lilac" },
              { label: "Llamadas", value: "15%", amount: "Q1,780", color: "bg-gold" },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-muted">{s.label}</span>
                  <span>{s.value}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                  <div className={`h-full rounded-full ${s.color}`} style={{ width: s.value }} />
                </div>
                <p className="mt-1 text-[10px] font-medium text-cream/70">{s.amount}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4" id="retiros">
          <div className="relative overflow-hidden rounded-2xl border border-rose/20 bg-[linear-gradient(140deg,rgba(255,77,141,0.12),rgba(16,14,21,0.9))] p-5">
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-rose/20 blur-2xl" />
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted">Próximo retiro</p>
              <Banknote className="h-4 w-4 text-gold" />
            </div>
            <p className="mt-2 display text-3xl">{money(8420)}</p>
            <p className="mt-1 text-[10px] text-muted">Viernes 28 · BAM ****4821</p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-rose to-gold" />
            </div>
            <p className="mt-2 text-[9px] text-muted/70">Mínimo Q200 · comisión 20% ya descontada</p>
            <button className="btn-primary mt-4 w-full !py-2.5 !text-xs">Solicitar retiro</button>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-surface/70 p-5">
            <p className="text-sm font-semibold">Rendimiento</p>
            <div className="mt-4 space-y-3">
              {[
                { label: "Tasa de conversión", value: "8.4%", delta: "+1.2%" },
                { label: "Ticket promedio", value: money(212), delta: "+Q18" },
                { label: "Renovación", value: "72%", delta: "+4%" },
                { label: "Tiempo de respuesta", value: "6 min", delta: "−2 min" },
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between">
                  <span className="text-[11px] text-muted">{r.label}</span>
                  <span className="text-[11px] font-medium">
                    {r.value} <span className="ml-1 text-[9px] text-emerald-300">{r.delta}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.04] p-3.5 text-[10px] leading-relaxed text-emerald-200/75">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Tu KYC está aprobado. Puedes retirar sin límites adicionales.
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/[0.08] bg-surface/70">
        <div className="flex items-center justify-between p-5 pb-3">
          <div>
            <p className="text-sm font-semibold">Últimas transacciones</p>
            <p className="mt-0.5 text-[10px] text-muted">Comisión AMY del 20% ya aplicada.</p>
          </div>
          <Link href="#ganancias" className="text-[10px] font-medium text-rose">Ver todo →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead className="border-y border-white/[0.06] text-[9px] uppercase tracking-[0.14em] text-muted/70">
              <tr>
                <th className="px-5 py-2.5 font-medium">Fan</th>
                <th className="px-5 py-2.5 font-medium">Concepto</th>
                <th className="px-5 py-2.5 font-medium">Bruto</th>
                <th className="px-5 py-2.5 font-medium">Comisión</th>
                <th className="px-5 py-2.5 font-medium">Neto</th>
                <th className="px-5 py-2.5 font-medium">Estado</th>
                <th className="px-5 py-2.5 font-medium">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {creatorTransactions.map((t) => (
                <tr key={t.id} className="text-[11px] transition hover:bg-white/[0.02]">
                  <td className="px-5 py-3 font-medium text-cream/85">{t.fan}</td>
                  <td className="px-5 py-3 text-muted">{t.kind}</td>
                  <td className="px-5 py-3">{money(t.amount)}</td>
                  <td className="px-5 py-3 text-muted">−{money(t.commission)}</td>
                  <td className="px-5 py-3 font-medium text-emerald-300">{money(t.net)}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[9px] ${
                      t.status === "Disponible" ? "bg-emerald-400/10 text-emerald-300" : "bg-gold/10 text-gold"
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-muted/70">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_1fr]" id="contenido">
        <div className="rounded-2xl border border-white/[0.08] bg-surface/70 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Contenido top</p>
            <button className="text-[10px] text-rose">Gestionar</button>
          </div>
          <div className="mt-4 space-y-3">
            {posts.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <Artwork initials={creator.initials} gradient={p.gradient} className="h-11 w-11 shrink-0 rounded-xl" mini />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-medium">{p.title}</p>
                  <p className="text-[9px] text-muted">{p.kind === "video" ? "Video" : p.kind === "set" ? "Set de fotos" : "Foto"} · {p.locked ? money(p.price) : "Gratis"}</p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-[10px]">{[(3200 + i * 410).toLocaleString("es-GT"), (2800 + i * 320).toLocaleString("es-GT"), (2100 + i * 280).toLocaleString("es-GT"), (1900 + i * 210).toLocaleString("es-GT")][i]} vistas</p>
                  <p className="text-[9px] text-emerald-300">{[1840, 1290, 980, 760][i] ? money([1840, 1290, 980, 760][i]) : "—"}</p>
                </div>
                <button aria-label={`Opciones de ${p.title}`} className="text-muted"><MoreHorizontal className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-surface/70 p-5" id="suscriptores">
          <p className="text-sm font-semibold">Actividad reciente</p>
          <div className="mt-4 space-y-4">
            {[
              { icon: Users, text: "Nuevo suscriptor en plan 3 meses", time: "Hace 4 min", tone: "text-emerald-300" },
              { icon: Wallet, text: "Pago de llamada · 12 min", time: "Hace 38 min", tone: "text-gold" },
              { icon: MessageCircle, text: "3 mensajes sin responder", time: "Hace 1 h", tone: "text-lilac" },
              { icon: Play, text: "Tu video superó 1,000 vistas", time: "Hace 3 h", tone: "text-rose" },
            ].map((a) => (
              <div key={a.text} className="flex items-start gap-3">
                <span className={`mt-0.5 grid h-7 w-7 place-items-center rounded-lg bg-white/[0.05] ${a.tone}`}>
                  <a.icon className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="text-[11px] text-cream/80">{a.text}</p>
                  <p className="text-[9px] text-muted/60">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/chat" className="mt-5 flex items-center justify-center gap-1 rounded-xl border border-white/10 py-2 text-[10px] text-cream/70 hover:bg-white/5">
            Ir a mensajes <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      <GrowthPanel creatorName={creator.name} />

      <p className="mt-6 flex items-center gap-1.5 text-[9px] text-muted/40">
        <Eye className="h-3 w-3" /> Vista de demostración con datos ficticios. El panel real incluye 2FA, auditoría y exportación a FEL.
      </p>
    </DashShell>
  );
}
