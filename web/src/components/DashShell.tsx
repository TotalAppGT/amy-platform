import Link from "next/link";
import { Bell, ChevronDown, ExternalLink, HelpCircle, Search, type LucideIcon } from "lucide-react";
import Logo from "./Logo";
import Avatar from "./Avatar";

export type DashItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
};

export default function DashShell({
  items,
  active,
  role,
  name,
  initials,
  gradient,
  children,
  searchPlaceholder = "Buscar…",
}: {
  items: DashItem[];
  active: string;
  role: string;
  name: string;
  initials: string;
  gradient: string;
  children: React.ReactNode;
  searchPlaceholder?: string;
}) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[236px_1fr]">
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-white/[0.07] bg-[#0b0910] p-4 lg:flex">
        <div className="px-2 py-2">
          <Logo />
          <p className="mt-2 pl-0.5 text-[9px] uppercase tracking-[0.22em] text-muted/60">{role}</p>
        </div>

        <nav className="mt-5 flex-1 space-y-1">
          {items.map((item) => {
            const isActive = item.label === active;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[12px] transition ${
                  isActive
                    ? "bg-white/[0.07] font-medium text-cream"
                    : "text-muted hover:bg-white/[0.04] hover:text-cream/85"
                }`}
              >
                <item.icon className={`h-4 w-4 ${isActive ? "text-rose" : ""}`} />
                <span className="flex-1">{item.label}</span>
                {item.badge ? (
                  <span className="rounded-full bg-rose/20 px-1.5 py-0.5 text-[9px] font-semibold text-rose">{item.badge}</span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-2 border-t border-white/[0.07] pt-3">
          <Link href="/" className="flex items-center gap-2 rounded-xl px-3 py-2 text-[11px] text-muted transition hover:text-cream">
            <ExternalLink className="h-3.5 w-3.5" /> Ver sitio público
          </Link>
          <Link href="/#faq" className="flex items-center gap-2 rounded-xl px-3 py-2 text-[11px] text-muted transition hover:text-cream">
            <HelpCircle className="h-3.5 w-3.5" /> Centro de ayuda
          </Link>
          <div className="mt-2 flex items-center gap-2.5 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3">
            <Avatar initials={initials} gradient={gradient} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-medium">{name}</p>
              <p className="text-[9px] text-muted">{role}</p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-muted" />
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-40 border-b border-white/[0.07] glass">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <div className="lg:hidden">
              <Logo />
            </div>
            <div className="relative ml-auto hidden w-full max-w-xs sm:block">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
              <input aria-label="Buscar" placeholder={searchPlaceholder} className="field !py-2 !pl-9 text-[11px]" />
            </div>
            <button aria-label="Notificaciones" className="relative grid h-9 w-9 place-items-center rounded-full border border-white/10 text-muted hover:text-cream">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose" />
            </button>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1 pl-1 pr-2">
              <Avatar initials={initials} gradient={gradient} size="xs" />
              <span className="hidden text-[11px] font-medium sm:block">{name.split(" ")[0]}</span>
            </div>
          </div>

          <nav className="flex gap-1 overflow-x-auto border-t border-white/[0.05] px-3 py-2 no-scrollbar lg:hidden">
            {items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] ${
                  item.label === active ? "bg-rose/15 text-rose" : "text-muted"
                }`}
              >
                <item.icon className="h-3 w-3" /> {item.label}
              </Link>
            ))}
          </nav>
        </header>

        <main className="mx-auto w-full max-w-[1180px] p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
