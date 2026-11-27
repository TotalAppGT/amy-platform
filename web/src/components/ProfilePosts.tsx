"use client";

import { useState } from "react";
import { Heart, Lock, MessageCircle, Play, Images, Unlock, Check } from "lucide-react";
import type { Creator, Post } from "@/lib/data";
import { money } from "@/lib/utils";
import Artwork from "./Artwork";

export default function ProfilePosts({ creator, posts }: { creator: Creator; posts: Post[] }) {
  const [tab, setTab] = useState<"posts" | "media" | "about">("posts");
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());

  const unlock = (id: string) => setUnlocked((s) => new Set(s).add(id));

  return (
    <div>
      <div className="flex items-center gap-1 overflow-x-auto border-b border-white/[0.08] no-scrollbar">
        {[
          { id: "posts", label: `Posts · ${posts.length}` },
          { id: "media", label: "Media" },
          { id: "about", label: "Sobre mí" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as typeof tab)}
            className={`relative shrink-0 px-4 py-3 text-sm transition ${
              tab === t.id ? "text-cream" : "text-muted hover:text-cream/80"
            }`}
          >
            {t.label}
            {tab === t.id ? <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-rose" /> : null}
          </button>
        ))}
      </div>

      {tab === "posts" || tab === "media" ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {(tab === "media" ? posts.filter((p) => p.kind !== "photo") : posts).map((post) => {
            const isUnlocked = !post.locked || unlocked.has(post.id);
            return (
              <article key={post.id} className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-surface/70">
                <div className="relative">
                  <Artwork
                    initials={creator.initials}
                    gradient={post.gradient}
                    className={`aspect-[4/3] w-full transition duration-500 ${isUnlocked ? "" : "blur-[7px] brightness-[0.7]"}`}
                    compact
                  />

                  <div className="absolute left-3 top-3 flex gap-1.5">
                    <span className="rounded-full bg-black/45 px-2 py-1 text-[9px] font-medium uppercase tracking-wide text-white/80 backdrop-blur">
                      {post.kind === "video" ? "Video" : post.kind === "set" ? "Set" : "Foto"}
                    </span>
                    {post.duration ? (
                      <span className="rounded-full bg-black/45 px-2 py-1 text-[9px] text-white/80 backdrop-blur">{post.duration}</span>
                    ) : null}
                  </div>

                  {!isUnlocked ? (
                    <div className="absolute inset-0 grid place-items-center">
                      <button
                        onClick={() => unlock(post.id)}
                        className="flex flex-col items-center gap-2 rounded-2xl border border-white/15 bg-black/55 px-5 py-4 text-center backdrop-blur transition hover:bg-black/70"
                      >
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#C2185B] text-white">
                          <Lock className="h-4 w-4" />
                        </span>
                        <span className="text-[11px] font-semibold text-white">Desbloquear</span>
                        <span className="text-[10px] text-white/60">{money(post.price)}</span>
                      </button>
                    </div>
                  ) : (
                    <div className="absolute inset-0 grid place-items-center opacity-0 transition group-hover:opacity-100">
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-black/50 text-white backdrop-blur">
                        {post.kind === "video" ? <Play className="h-5 w-5 fill-white" /> : <Images className="h-5 w-5" />}
                      </span>
                    </div>
                  )}

                  {isUnlocked && post.locked ? (
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald-400/90 px-2 py-1 text-[9px] font-bold text-ink">
                      <Unlock className="h-2.5 w-2.5" /> Comprado
                    </span>
                  ) : null}
                </div>

                <div className="p-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-[13px] font-medium text-cream/90">{post.title}</h3>
                      <p className="mt-0.5 text-[10px] text-muted">
                        {isUnlocked ? "Contenido desbloqueado" : `PPV · ${money(post.price)}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-muted">
                      <span className="inline-flex items-center gap-1"><Heart className="h-3 w-3" /> {post.likes}</span>
                      <span className="inline-flex items-center gap-1"><MessageCircle className="h-3 w-3" /> {post.comments}</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          <div className="rounded-2xl border border-white/[0.08] bg-surface/60 p-5">
            <h3 className="text-sm font-semibold">Sobre {creator.name.split(" ")[0]}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">{creator.bio}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: "Ciudad", value: creator.city },
              { label: "Idiomas", value: creator.languages.join(", ") },
              { label: "Miembro desde", value: "2023" },
              { label: "Respuesta promedio", value: "12 minutos" },
              { label: "Contenido", value: `${creator.posts} publicaciones` },
              { label: "Verificación", value: "Identidad + edad (KYC)" },
            ].map((row) => (
              <div key={row.label} className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.15em] text-muted">{row.label}</p>
                <p className="mt-1 text-sm text-cream/85">{row.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.04] p-5">
            <p className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
              <Check className="h-4 w-4" /> Reglas de la casa
            </p>
            <ul className="mt-3 space-y-2 text-[12px] leading-relaxed text-cream/70">
              <li>· Respeto siempre. No se tolera acoso ni insistencia.</li>
              <li>· No se comparte contenido fuera de la plataforma.</li>
              <li>· Las llamadas se cobran por minuto y se cortan al agotar saldo.</li>
              <li>· Todo el contenido cuenta con consentimiento registrado.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
