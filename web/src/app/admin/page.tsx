import Link from "next/link";
import {
  AlertTriangle,
  ArrowDownToLine,
  Banknote,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Download,
  LayoutDashboard,
  Plus,
  Settings,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";
import DashShell, { type DashItem } from "@/components/DashShell";
import AdminApprovals from "@/components/AdminApprovals";
import { moderationQueue, platformTransactions } from "@/lib/data";
import { serviceBookings } from "@/lib/services";
import { money } from "@/lib/utils";

export const metadata = { title: "Panel de administración — AMY" };

const nav: DashItem[] = [
  { label: "Resumen", href: "/admin", icon: LayoutDashboard },
  { label: "Creadoras", href: "#solicitudes", icon: Users, badge: "7" },
  { label: "Moderación", href: "#moderacion", icon: ShieldAlert, badge: "3" },
  { label: "Transacciones", href: "#transacciones", icon: Wallet },
  { label: "Reservas", href: "#reservas", icon: CalendarDays, badge: "4" },
  { label: "Retiros", href: "#retiros", icon: Banknote },
  { label: "Reportes", href: "#reportes", icon: BarChart3 },
  { label: "Configuración", href: "#config", icon: Settings },
];

const kpis = [
  { label: "GMV del mes", value: "Q184,200", delta: "+18.6%", icon: TrendingUp },
  { label: "Comisión AMY", value: "Q36,840", delta: "20% promedio", icon: Wallet },
  { label: "Creadoras activas", value: "124", delta: "+9 este mes", icon: Users },
  { label: "Pendientes KYC", value: "7", delta: "Revisión hoy", icon: UserCheck },
];

const chart = [42, 58, 51, 66, 72, 64, 81, 76, 92, 88, 104, 118];

export default function AdminDashboard() {
  return (
    <DashShell
      items={nav}
      active="Resumen"
      role="Administración"
      name="Dany Admin"
      initials="DA"
      gradient="linear-gradient(145deg,#E9C46A,#7A2E4D)"
      searchPlaceholder="Buscar creadora, transacción, UUID…"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Operación · Guatemala</p>
          <h1 className="display mt-1 text-3xl sm:text-4xl">Panel de administración</h1>
          <p className="mt-1.5 text-sm text-muted">Dinero, personas y contenido bajo control.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-ghost !py-2.5 !text-xs">
            <Download className="h-3.5 w-3.5" /> Exportar
          </button>
          <button className="btn-primary !py-2.5 !text-xs">
            <Plus className="h-3.5 w-3.5" /> Nueva creadora
          </button>
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
            <p className="mt-1 text-[10px] text-emerald-300">{k.delta}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-white/[0.08] bg-surface/70 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold">GMV y comisión</p>
              <p className="mt-0.5 text-[10px] text-muted">Últimos 12 meses · Q miles</p>
            </div>
            <div className="flex items-center gap-3 text-[9px] text-muted">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-rose" /> GMV</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-gold" /> Comisión</span>
            </div>
          </div>
          <div className="mt-6 flex h-40 items-end gap-1.5">
            {chart.map((v, i) => (
              <div key={i} className="group flex flex-1 flex-col justify-end gap-1">
                <div className="relative flex w-full items-end gap-0.5">
                  <div className="w-full rounded-t bg-white/[0.09] transition group-hover:bg-white/[0.16]" style={{ height: `${v * 0.8}px` }} />
                  <div className="w-full rounded-t bg-gold/60" style={{ height: `${v * 0.16}px` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[8px] uppercase tracking-wider text-muted/50">
            <span>Dic</span><span>Mar</span><span>Jun</span><span>Sep</span><span>Nov</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-surface/70 p-5" id="retiros">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Retiros por aprobar</p>
            <span className="rounded-full bg-gold/10 px-2 py-0.5 text-[9px] text-gold">4 solicitudes</span>
          </div>
          <div className="mt-4 space-y-3">
            {[
              { name: "Camila Rivas", amount: 8420, method: "BAM ****4821", initials: "CR" },
              { name: "Sofía Méndez", amount: 5120, method: "USDT TRC20", initials: "SM" },
              { name: "Renata Paz", amount: 2340, method: "BAM ****1190", initials: "RP" },
              { name: "Valeria Soto", amount: 1980, method: "BAM ****7732", initials: "VS" },
            ].map((p) => (
              <div key={p.name} className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-rose/30 to-lilac/20 text-[9px] font-semibold">{p.initials}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-medium">{p.name}</p>
                  <p className="text-[9px] text-muted">{p.method}</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-medium">{money(p.amount)}</p>
                  <button className="text-[9px] font-medium text-rose">Aprobar</button>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/10 py-2 text-[10px] text-cream/70 hover:bg-white/5">
            <ArrowDownToLine className="h-3 w-3" /> Ver todas las solicitudes
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.45fr_1fr] xl:items-start" id="solicitudes">
        <AdminApprovals />

        <div className="rounded-2xl border border-white/[0.08] bg-surface/70" id="moderacion">
          <div className="flex items-center justify-between p-5 pb-3">
            <div>
              <p className="text-sm font-semibold">Cola de moderación</p>
              <p className="mt-0.5 text-[10px] text-muted">Prioridad por riesgo.</p>
            </div>
            <Link href="#moderacion" className="text-[10px] text-rose">Abrir cola →</Link>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {moderationQueue.map((m) => (
              <div key={m.id} className="px-5 py-3.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[11px] font-medium">{m.creator}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[8px] font-semibold ${
                    m.risk === "Alto" ? "bg-rose/15 text-rose" : m.risk === "Medio" ? "bg-gold/15 text-gold" : "bg-white/10 text-muted"
                  }`}>
                    {m.risk}
                  </span>
                </div>
                <p className="mt-0.5 text-[10px] text-muted">{m.asset} · {m.reason}</p>
                <div className="mt-2 flex gap-1.5">
                  <button className="rounded-md bg-white/[0.06] px-2 py-1 text-[9px] hover:bg-white/10">Revisar</button>
                  <button className="rounded-md bg-emerald-400/10 px-2 py-1 text-[9px] text-emerald-300">Aprobar</button>
                  <button className="rounded-md bg-rose/10 px-2 py-1 text-[9px] text-rose">Retirar</button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-4 rounded-xl border border-gold/15 bg-gold/[0.05] p-3 text-[9px] leading-relaxed text-gold/80">
            <span className="flex items-center gap-1.5 font-semibold"><AlertTriangle className="h-3 w-3" /> SLA: 2 h para riesgo alto</span>
            Todo retiro por menores, terceros sin consentimiento o contenido no verificado se escala a legal.
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/[0.08] bg-surface/70" id="transacciones">
        <div className="flex items-center justify-between p-5 pb-3">
          <div>
            <p className="text-sm font-semibold">Transacciones recientes</p>
            <p className="mt-0.5 text-[10px] text-muted">Conciliación del día.</p>
          </div>
          <button className="text-[10px] text-rose">Ver todas →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead className="border-y border-white/[0.06] text-[9px] uppercase tracking-[0.14em] text-muted/70">
              <tr>
                <th className="px-5 py-2.5 font-medium">Usuario</th>
                <th className="px-5 py-2.5 font-medium">Creadora</th>
                <th className="px-5 py-2.5 font-medium">Tipo</th>
                <th className="px-5 py-2.5 font-medium">Monto</th>
                <th className="px-5 py-2.5 font-medium">Comisión</th>
                <th className="px-5 py-2.5 font-medium">Hora</th>
                <th className="px-5 py-2.5 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {platformTransactions.map((t) => (
                <tr key={t.id} className="text-[11px] hover:bg-white/[0.02]">
                  <td className="px-5 py-3 font-medium text-cream/85">{t.user}</td>
                  <td className="px-5 py-3 text-muted">{t.creator}</td>
                  <td className="px-5 py-3">{t.kind}</td>
                  <td className="px-5 py-3">{money(t.amount)}</td>
                  <td className="px-5 py-3 text-emerald-300">+{money(t.fee)}</td>
                  <td className="px-5 py-3 text-muted/70">{t.date}</td>
                  <td className="px-5 py-3"><span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[9px] text-emerald-300"><CheckCircle2 className="h-2.5 w-2.5" /> Liquidada</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/[0.08] bg-surface/70" id="reservas">
        <div className="flex items-center justify-between p-5 pb-3">
          <div>
            <p className="text-sm font-semibold">Reservas de servicios</p>
            <p className="mt-0.5 text-[10px] text-muted">Masajes, spa, fotografía y eventos · anticipo 20%.</p>
          </div>
          <span className="rounded-full bg-gold/10 px-2.5 py-1 text-[9px] font-semibold text-gold">6 hoy</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead className="border-y border-white/[0.06] text-[9px] uppercase tracking-[0.14em] text-muted/70">
              <tr>
                <th className="px-5 py-2.5 font-medium">Código</th>
                <th className="px-5 py-2.5 font-medium">Servicio</th>
                <th className="px-5 py-2.5 font-medium">Profesional</th>
                <th className="px-5 py-2.5 font-medium">Cliente</th>
                <th className="px-5 py-2.5 font-medium">Fecha</th>
                <th className="px-5 py-2.5 font-medium">Total</th>
                <th className="px-5 py-2.5 font-medium">Anticipo</th>
                <th className="px-5 py-2.5 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {serviceBookings.map((b) => (
                <tr key={b.code} className="text-[11px] hover:bg-white/[0.02]">
                  <td className="px-5 py-3 font-mono text-[10px] text-cream/70">{b.code}</td>
                  <td className="px-5 py-3">{b.service}</td>
                  <td className="px-5 py-3 text-muted">{b.provider}</td>
                  <td className="px-5 py-3 text-muted">{b.client}</td>
                  <td className="px-5 py-3 text-muted/80">{b.date}</td>
                  <td className="px-5 py-3">{money(b.total)}</td>
                  <td className="px-5 py-3 text-emerald-300">{money(b.deposit)}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[9px] ${
                      b.status === "Confirmada" ? "bg-emerald-400/10 text-emerald-300" : "bg-gold/10 text-gold"
                    }`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3" id="reportes">
        {[
          { icon: ShieldCheck, label: "KYC al día", value: "117 / 124", note: "7 en revisión", color: "text-emerald-300" },
          { icon: AlertTriangle, label: "Chargebacks", value: "0.42%", note: "Bajo el límite de 1%", color: "text-gold" },
          { icon: Wallet, label: "Saldo en wallets", value: "Q64,180", note: "Pasivo de fans", color: "text-lilac" },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-surface/70 p-4">
            <span className={`grid h-9 w-9 place-items-center rounded-xl bg-white/[0.05] ${s.color}`}><s.icon className="h-4 w-4" /></span>
            <div>
              <p className="text-[10px] text-muted">{s.label}</p>
              <p className="text-sm font-semibold">{s.value}</p>
              <p className="text-[9px] text-muted/60">{s.note}</p>
            </div>
          </div>
        ))}
      </div>
    </DashShell>
  );
}
