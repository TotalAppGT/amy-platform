import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  hrefLabel = "Ver todo",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <span className="eyebrow">
          <span className="h-1 w-1 rounded-full bg-rose" />
          {eyebrow}
        </span>
        <h2 className="display mt-3 text-3xl leading-[1.08] sm:text-[42px]">{title}</h2>
        {description ? <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{description}</p> : null}
      </div>
      {href ? (
        <Link href={href} className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-cream/80 hover:text-cream">
          {hrefLabel}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      ) : null}
    </div>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="display text-2xl text-cream sm:text-3xl">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted">{label}</div>
    </div>
  );
}
