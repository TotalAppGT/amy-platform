"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  CheckCheck,
  CreditCard,
  Heart,
  Image as ImageIcon,
  Lock,
  Mic,
  MicOff,
  MoreHorizontal,
  Paperclip,
  Phone,
  PhoneOff,
  Plus,
  Search,
  Send,
  ShieldCheck,
  Smile,
  Video,
  Wallet,
} from "lucide-react";
import Avatar from "./Avatar";
import Artwork from "./Artwork";
import { conversations, getCreator, initialMessages, type Message } from "@/lib/data";
import { money } from "@/lib/utils";

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

const starterMessages: Record<string, Message[]> = {
  c1: initialMessages,
  c2: [
    { id: "v1", from: "creator", text: "¿Entrenamos mañana? Te preparé una rutina suave para empezar.", time: "18:12" },
    { id: "v2", from: "fan", text: "Me encantaría, ¿a qué hora?", time: "18:14" },
    { id: "v3", from: "creator", text: "A las 7:00 en el estudio. Lleva ropa cómoda y agua.", time: "18:15" },
  ],
  c3: [
    { id: "s1", from: "creator", text: "El set de cosplay ya está listo. Quedó mejor de lo que esperaba.", time: "17:03" },
    { id: "s2", from: "fan", text: "¿Cuántas fotos son?", time: "17:10" },
    { id: "s3", from: "creator", text: "24 fotos y un video corto. Te lo mando al privado.", time: "17:12" },
  ],
  c4: [
    { id: "d1", from: "creator", text: "Gracias por la propina, en serio. Me alegraste el día.", time: "15:22" },
    { id: "d2", from: "fan", text: "Te lo mereces. ¿Cómo va la semana?", time: "15:25" },
    { id: "d3", from: "creator", text: "Bastante bien. Esta noche me conecto un rato.", time: "15:26" },
  ],
  c5: [
    { id: "i1", from: "creator", text: "Live el jueves, no faltes. Voy a estrenar una coreografía.", time: "11:40" },
    { id: "i2", from: "fan", text: "Ahí estaré. ¿A qué hora?", time: "11:44" },
    { id: "i3", from: "creator", text: "8:00 p.m., hora local. Te guardo lugar.", time: "11:45" },
  ],
};

export default function ChatClient() {
  const [active, setActive] = useState("c1");
  const [messagesByConv, setMessagesByConv] = useState<Record<string, Message[]>>(starterMessages);
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());
  const [input, setInput] = useState("");
  const [balance, setBalance] = useState(250);
  const [toast, setToast] = useState("");
  const [callSeconds, setCallSeconds] = useState<number | null>(null);
  const [muted, setMuted] = useState(false);
  const [mobileChat, setMobileChat] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find((c) => c.id === active)!;
  const creator = getCreator(activeConv.slug)!;
  const messages = messagesByConv[active] ?? [];

  function updateMessages(updater: (prev: Message[]) => Message[]) {
    setMessagesByConv((prev) => ({ ...prev, [active]: updater(prev[active] ?? []) }));
  }

  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, mobileChat]);

  useEffect(() => {
    if (callSeconds === null) return;
    const id = window.setInterval(() => setCallSeconds((s) => (s === null ? null : s + 1)), 1000);
    return () => window.clearInterval(id);
  }, [callSeconds === null]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(id);
  }, [toast]);

  const callCost = useMemo(() => ((callSeconds ?? 0) / 60) * creator.callPrice, [callSeconds, creator.callPrice]);

  function spend(amount: number) {
    if (balance < amount) {
      setToast("Saldo insuficiente. Recarga tu wallet para continuar.");
      return false;
    }
    setBalance((b) => b - amount);
    return true;
  }

  function send() {
    const text = input.trim();
    if (!text) return;
    updateMessages((prev) => [
      ...prev,
      { id: `m${Date.now()}`, from: "fan", text, time: "Ahora" },
    ]);
    setInput("");
  }

  function unlockMedia(m: Message) {
    if (!m.media) return;
    if (!spend(m.media.price)) return;
    setUnlocked((s) => new Set(s).add(m.id));
    setToast(`Contenido desbloqueado por ${money(m.media.price)}.`);
  }

  function tip(amount: number) {
    if (!spend(amount)) return;
    updateMessages((prev) => [
      ...prev,
      { id: `tip${Date.now()}`, from: "fan", text: "Te envié una propina", tip: amount, time: "Ahora" },
      { id: `thx${Date.now()}`, from: "creator", text: "¡Gracias, mi amor! Te lo devuelvo con un audio más tarde.", time: "Ahora" },
    ]);
  }

  function startCall() {
    if (balance < creator.callPrice) {
      setToast("Necesitas al menos un minuto de saldo para iniciar la llamada.");
      return;
    }
    setCallSeconds(0);
  }

  function endCall() {
    const seconds = callSeconds ?? 0;
    const cost = (seconds / 60) * creator.callPrice;
    setBalance((b) => Math.max(0, Math.round((b - cost) * 100) / 100));
    if (seconds > 2) {
      updateMessages((prev) => [
        ...prev,
        {
          id: `call${Date.now()}`,
          from: "creator",
          text: `Llamada finalizada · ${formatTime(seconds)} · ${money(Math.round(cost * 100) / 100)}`,
          time: "Ahora",
        },
      ]);
    }
    setCallSeconds(null);
    setMuted(false);
  }

  return (
    <div className="border-t border-white/[0.05]">
      <div className="container-x py-4 lg:py-6">
        <div className="grid h-[calc(100vh-72px-2rem)] min-h-[560px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-surface/60 lg:h-[calc(100vh-72px-3rem)] lg:grid-cols-[300px_1fr_292px]">
          {/* Conversation list */}
          <aside className={`${mobileChat ? "hidden" : "block"} border-r border-white/[0.07] lg:block`}>
            <div className="border-b border-white/[0.07] p-4">
              <div className="flex items-center justify-between">
                <h1 className="text-sm font-semibold">Mensajes</h1>
                <button aria-label="Nuevo mensaje" className="grid h-8 w-8 place-items-center rounded-full bg-white/[0.05] text-muted hover:text-cream">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="relative mt-3">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
                <input aria-label="Buscar conversación" placeholder="Buscar conversación" className="field !py-2 !pl-9 text-[11px]" />
              </div>
            </div>

            <div className="h-[calc(100%-137px)] overflow-y-auto">
              {conversations.map((conv) => {
                const c = getCreator(conv.slug)!;
                return (
                  <button
                    key={conv.id}
                    onClick={() => {
                      setActive(conv.id);
                      setMobileChat(true);
                      setUnlocked(new Set());
                    }}
                    className={`flex w-full items-center gap-3 border-b border-white/[0.04] px-4 py-3.5 text-left transition ${
                      active === conv.id ? "bg-white/[0.05]" : "hover:bg-white/[0.03]"
                    }`}
                  >
                    <Avatar initials={c.initials} gradient={c.gradient} size="sm" online={conv.online} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-xs font-semibold">{c.name}</p>
                        <span className="shrink-0 text-[9px] text-muted">{conv.time}</span>
                      </div>
                      <p className="mt-0.5 truncate text-[10px] text-muted">{conv.last}</p>
                    </div>
                    {conv.unread ? (
                      <span className="grid h-4 min-w-4 place-items-center rounded-full bg-[#C2185B] px-1 text-[9px] font-bold text-white">
                        {conv.unread}
                      </span>
                    ) : null}
                  </button>
                );
              })}

              <div className="m-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-muted">
                  <Wallet className="h-3.5 w-3.5 text-gold" /> Tu wallet
                </div>
                <p className="mt-2 display text-2xl">{money(balance)}</p>
                <button
                  onClick={() => {
                    setBalance((b) => b + 100);
                    setToast("Recarga demo de Q100 añadida a tu wallet.");
                  }}
                  className="mt-3 w-full rounded-xl border border-white/10 bg-white/[0.05] py-2 text-[11px] font-medium hover:bg-white/10"
                >
                  Recargar saldo
                </button>
              </div>
            </div>
          </aside>

          {/* Chat */}
          <section className={`${mobileChat ? "flex" : "hidden"} min-h-0 min-w-0 flex-col overflow-hidden lg:flex`}>
            <header className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3">
              <button aria-label="Volver a mensajes" onClick={() => setMobileChat(false)} className="grid h-8 w-8 place-items-center rounded-full text-muted lg:hidden">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <Avatar initials={creator.initials} gradient={creator.gradient} size="sm" online={activeConv.online} />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1 text-xs font-semibold">
                  {creator.name} <BadgeCheck className="h-3.5 w-3.5 text-rose" />
                </p>
                <p className={`text-[9px] ${activeConv.online ? "text-emerald-300" : "text-muted"}`}>
                  {activeConv.online ? "En línea · responde en ~5 min" : "Última conexión hace 1 h"}
                </p>
              </div>
              <button onClick={startCall} className="grid h-9 w-9 place-items-center rounded-full bg-white/[0.05] text-cream/80 hover:bg-white/10" aria-label="Llamada de voz">
                <Phone className="h-4 w-4" />
              </button>
              <button onClick={startCall} className="grid h-9 w-9 place-items-center rounded-full bg-rose/15 text-rose hover:bg-rose/25" aria-label="Videollamada">
                <Video className="h-4 w-4" />
              </button>
              <button aria-label="Más opciones" className="hidden h-9 w-9 place-items-center rounded-full text-muted hover:bg-white/5 sm:grid">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </header>

            <div ref={messagesRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4 sm:p-5">
              <div className="mx-auto w-fit rounded-full bg-white/[0.05] px-3 py-1 text-[9px] text-muted">Hoy, 20:41</div>

              {messages.map((m) => {
                const mine = m.from === "fan";
                const isUnlocked = unlocked.has(m.id);
                return (
                  <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[86%] sm:max-w-[78%] ${mine ? "items-end" : "items-start"} flex flex-col gap-1`}>
                      {m.media ? (
                        <div className="w-[250px] overflow-hidden rounded-2xl border border-white/10 bg-[#17131f] sm:w-[280px]">
                          <div className="relative">
                            <Artwork
                              initials={creator.initials}
                              gradient={m.media.gradient}
                              className={`h-32 w-full ${isUnlocked ? "" : "blur-[6px] brightness-75"}`}
                              compact
                            />
                            {!isUnlocked ? (
                              <button
                                onClick={() => unlockMedia(m)}
                                className="absolute inset-0 grid place-items-center bg-black/30"
                              >
                                <span className="flex flex-col items-center gap-1 rounded-xl border border-white/15 bg-black/55 px-4 py-2.5 backdrop-blur">
                                  <Lock className="h-4 w-4 text-rose" />
                                  <span className="text-[10px] font-semibold">Desbloquear {money(m.media.price)}</span>
                                </span>
                              </button>
                            ) : (
                              <span className="absolute bottom-2 right-2 rounded-full bg-emerald-400/90 px-2 py-0.5 text-[8px] font-bold text-ink">DESBLOQUEADO</span>
                            )}
                          </div>
                          <div className="p-3">
                            <p className="text-[11px] font-medium">{m.media.title}</p>
                            <p className="mt-0.5 text-[9px] text-muted">{m.media.duration} · Contenido privado</p>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`rounded-2xl px-3.5 py-2.5 text-[12px] leading-relaxed ${
                            mine ? "rounded-br-md bg-[#C2185B] text-white" : "rounded-bl-md bg-white/[0.07] text-cream/85"
                          }`}
                        >
                          {m.text}
                          {m.tip ? (
                            <span className="mt-2 flex items-center gap-1.5 rounded-xl bg-black/20 px-2.5 py-1.5 text-[10px] font-medium">
                              <Heart className="h-3 w-3 fill-white" /> Propina de {money(m.tip)}
                            </span>
                          ) : null}
                        </div>
                      )}
                      <span className="flex items-center gap-1 px-1 text-[9px] text-muted/60">
                        {m.time} {mine ? <CheckCheck className="h-3 w-3 text-lilac" /> : null}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-white/[0.07] p-3">
              <div className="mb-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {[25, 50, 100].map((v) => (
                  <button
                    key={v}
                    onClick={() => tip(v)}
                    className="shrink-0 rounded-full border border-rose/25 bg-rose/[0.08] px-2.5 py-1 text-[10px] font-medium text-rose hover:bg-rose/15"
                  >
                    Propina {money(v)}
                  </button>
                ))}
                <button onClick={startCall} className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] text-cream/70">
                  Llamada {money(creator.callPrice)}/min
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button aria-label="Adjuntar archivo" className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted hover:bg-white/5"><Plus className="h-4 w-4" /></button>
                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
                  <input
                    aria-label="Escribir mensaje"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") send();
                    }}
                    placeholder="Escribe un mensaje…"
                    className="min-w-0 flex-1 bg-transparent text-[11px] text-cream placeholder:text-muted/70 focus:outline-none"
                  />
                  <button aria-label="Emoji" className="text-muted hover:text-cream"><Smile className="h-4 w-4" /></button>
                  <button aria-label="Adjuntar archivo" className="hidden text-muted hover:text-cream sm:block"><Paperclip className="h-4 w-4" /></button>
                  <button aria-label="Enviar imagen" className="hidden text-muted hover:text-cream sm:block"><ImageIcon className="h-4 w-4" /></button>
                  <button aria-label="Grabar audio" className="text-muted hover:text-cream"><Mic className="h-4 w-4" /></button>
                </div>
                <button aria-label="Enviar mensaje" onClick={send} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#C2185B] text-white">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>

          {/* Right panel */}
          <aside className="hidden border-l border-white/[0.07] p-4 lg:block">
            <div className="text-center">
              <Avatar initials={creator.initials} gradient={creator.gradient} size="lg" online={activeConv.online} className="mx-auto" />
              <p className="mt-3 flex items-center justify-center gap-1 text-sm font-semibold">
                {creator.name} <BadgeCheck className="h-4 w-4 text-rose" />
              </p>
              <p className="text-[10px] text-muted">{creator.handle}</p>
              <p className="mt-2 text-[11px] leading-relaxed text-muted">{creator.tagline}</p>
              <Link href={`/c/${creator.slug}`} className="mt-3 inline-block text-[10px] font-medium text-rose">
                Ver perfil completo →
              </Link>
            </div>

            <div className="my-4 h-px bg-white/10" />

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-muted">
                <Wallet className="h-3.5 w-3.5 text-gold" /> Saldo disponible
              </p>
              <p className="mt-1.5 display text-2xl">{money(balance)}</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-rose to-gold" style={{ width: `${Math.min(100, (balance / 500) * 100)}%` }} />
              </div>
              <p className="mt-2 text-[9px] text-muted">Límite diario {money(500)}</p>
              <button
                onClick={() => {
                  setBalance((b) => b + 100);
                  setToast("Recarga demo de Q100 añadida a tu wallet.");
                }}
                className="btn-soft mt-3 w-full !py-2 !text-[11px]"
              >
                <CreditCard className="h-3.5 w-3.5" /> Recargar
              </button>
            </div>

            <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cream/50">Tarifas</p>
              <div className="mt-3 space-y-2 text-[11px]">
                <div className="flex justify-between"><span className="text-muted">Suscripción</span><span>{money(creator.subPrice)}/mes</span></div>
                <div className="flex justify-between"><span className="text-muted">Llamada</span><span>{money(creator.callPrice)}/min</span></div>
                <div className="flex justify-between"><span className="text-muted">Mensaje</span><span>{money(creator.msgPrice)}</span></div>
              </div>
            </div>

            <div className="mt-3 flex items-start gap-2 rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.04] p-3 text-[9px] leading-relaxed text-emerald-200/70">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Pago protegido. Si la llamada falla, devolvemos el saldo automáticamente.
            </div>
          </aside>
        </div>
      </div>

      {/* Call modal */}
      {callSeconds !== null ? (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-ink/90 p-4 backdrop-blur-xl">
          <div className="relative w-full max-w-sm overflow-hidden rounded-[30px] border border-white/10 bg-surface p-6 text-center">
            <div className="absolute inset-x-0 top-0 h-40 opacity-40" style={{ backgroundImage: creator.gradient }} />
            <div className="relative">
              <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-300">Llamada en curso</p>
              <Avatar initials={creator.initials} gradient={creator.gradient} size="xl" className="mx-auto mt-4 ring-4 ring-ink" />
              <h3 className="mt-4 flex items-center justify-center gap-1.5 text-lg font-semibold">
                {creator.name} <BadgeCheck className="h-4 w-4 text-rose" />
              </h3>
              <p className="mt-1 font-mono text-2xl tracking-widest">{formatTime(callSeconds)}</p>
              <p className="mt-1 text-[11px] text-muted">Consumo: {money(Math.round(callCost * 100) / 100)} · {money(creator.callPrice)}/min</p>

              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  aria-label={muted ? "Activar micrófono" : "Silenciar micrófono"}
                  onClick={() => setMuted((v) => !v)}
                  className={`grid h-12 w-12 place-items-center rounded-full border ${muted ? "border-rose/40 bg-rose/15 text-rose" : "border-white/10 bg-white/5 text-cream/80"}`}
                >
                  {muted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>
                <button aria-label="Colgar" onClick={endCall} className="grid h-14 w-14 place-items-center rounded-full bg-[#C2185B] text-white shadow-glow">
                  <PhoneOff className="h-6 w-6" />
                </button>
                <button aria-label="Activar cámara" className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/5 text-cream/80">
                  <Video className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-5 text-[9px] text-muted/60">La llamada se cobra por minuto y se corta automáticamente al agotar tu saldo.</p>
            </div>
          </div>
        </div>
      ) : null}

      {toast ? (
        <div className="fixed bottom-6 left-1/2 z-[95] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl border border-white/10 bg-[#1a1622] px-4 py-3 text-center text-xs text-cream/85 shadow-card">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
