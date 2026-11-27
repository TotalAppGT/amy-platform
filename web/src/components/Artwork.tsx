import { cn } from "@/lib/utils";

type Props = {
  initials: string;
  gradient: string;
  className?: string;
  locked?: boolean;
  label?: string;
  compact?: boolean;
  mini?: boolean;
};

export default function Artwork({ initials, gradient, className, locked, label, compact, mini }: Props) {
  return (
    <div
      className={cn("grain relative overflow-hidden", className)}
      style={{ backgroundImage: gradient }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.32),transparent_55%)]" />
      <div className="absolute -bottom-16 -right-10 h-52 w-52 rounded-full border border-white/20 bg-white/[0.06] blur-[1px]" />
      <div className="absolute -left-12 top-1/3 h-40 w-40 rounded-full border border-white/10" />
      <span
        className={cn(
          "absolute inset-0 grid place-items-center font-display font-light tracking-[0.08em] text-white/85",
          locked && "blur-[2px]",
          mini ? "text-base" : compact ? "text-4xl" : "text-6xl sm:text-7xl",
        )}
      >
        {initials}
      </span>
      {label ? (
        <span className="absolute bottom-3 left-3 rounded-full bg-black/35 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/80 backdrop-blur">
          {label}
        </span>
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
    </div>
  );
}
