import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)} aria-label="AMY inicio">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/amy-icon.svg" alt="" className="h-9 w-9 transition group-hover:scale-105" />
      <span className="flex items-baseline gap-1.5">
        <span className="text-[19px] font-semibold tracking-[0.28em] text-cream">AMY</span>
        <span className="mb-0.5 h-1 w-1 rounded-full bg-rose" />
      </span>
    </Link>
  );
}
