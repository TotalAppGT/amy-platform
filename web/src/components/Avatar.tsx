import { cn } from "@/lib/utils";

type Props = {
  initials: string;
  gradient: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  online?: boolean;
  ring?: boolean;
  className?: string;
};

const sizes = {
  xs: "h-8 w-8 text-[10px]",
  sm: "h-10 w-10 text-xs",
  md: "h-14 w-14 text-sm",
  lg: "h-20 w-20 text-lg",
  xl: "h-28 w-28 text-2xl",
};

export default function Avatar({ initials, gradient, size = "md", online, ring, className }: Props) {
  return (
    <span className={cn("relative inline-flex shrink-0 rounded-full", className)}>
      <span
        className={cn(
          "grain relative grid place-items-center overflow-hidden rounded-full font-semibold tracking-wider text-white/90",
          ring && "ring-2 ring-ink ring-offset-2 ring-offset-rose/60",
          sizes[size],
        )}
        style={{ backgroundImage: gradient }}
      >
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
        <span className="relative drop-shadow-sm">{initials}</span>
      </span>
      {online ? (
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-ink bg-emerald-400">
          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60" />
        </span>
      ) : null}
    </span>
  );
}
