"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ImagePlus,
  Info,
  Lock,
  Save,
  ShieldCheck,
  Sparkles,
  Star,
  UploadCloud,
  Video,
  X,
} from "lucide-react";
import { money } from "@/lib/utils";

type FileItem = {
  id: string;
  url: string;
  name: string;
  size: number;
  isImage: boolean;
};

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function Dropzone({
  onFiles,
  title,
  hint,
  multiple = true,
}: {
  onFiles: (files: FileList | null) => void;
  title: string;
  hint: string;
  multiple?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        onFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed p-7 text-center transition ${
        over ? "border-rose/70 bg-rose/[0.07]" : "border-white/15 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.04]"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/mp4,video/quicktime"
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          onFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <span className="grid h-11 w-11 place-items-center rounded-full bg-white/[0.06] text-rose">
        <UploadCloud className="h-5 w-5" />
      </span>
      <p className="mt-3 text-sm font-medium">{title}</p>
      <p className="mt-1 text-[11px] leading-relaxed text-muted">{hint}</p>
      <span className="mt-4 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] text-cream/70">
        Elegir archivos
      </span>
    </div>
  );
}

function Thumb({ file, onRemove }: { file: FileItem; onRemove: () => void }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/30">
      {file.isImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={file.url} alt={file.name} className="aspect-[4/5] w-full object-cover" />
      ) : (
        <div className="grid aspect-[4/5] w-full place-items-center bg-white/[0.04] text-muted">
          <Video className="h-6 w-6" />
        </div>
      )}
      <button
        onClick={onRemove}
        className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-black/60 text-white/80 backdrop-blur hover:bg-rose hover:text-white"
        aria-label="Quitar archivo"
      >
        <X className="h-3.5 w-3.5" />
      </button>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
        <p className="truncate text-[9px] text-white/80">{file.name}</p>
        <p className="text-[8px] text-white/45">{formatSize(file.size)}</p>
      </div>
    </div>
  );
}

export default function UploadStudio() {
  const [tab, setTab] = useState<"gallery" | "post">("gallery");
  const [gallery, setGallery] = useState<FileItem[]>([]);
  const [content, setContent] = useState<FileItem[]>([]);
  const [cover, setCover] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("suscriptores");
  const [price, setPrice] = useState(75);
  const [toast, setToast] = useState("");
  const [success, setSuccess] = useState<"gallery" | "post" | null>(null);

  function addFiles(list: FileList | null, target: "gallery" | "post") {
    if (!list?.length) return;
    const incoming: FileItem[] = Array.from(list).map((f) => ({
      id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2, 7)}`,
      url: URL.createObjectURL(f),
      name: f.name,
      size: f.size,
      isImage: f.type.startsWith("image/"),
    }));

    if (target === "gallery") {
      const next = [...gallery, ...incoming].slice(0, 4);
      if (gallery.length + incoming.length > 4) setToast("La galería del perfil permite máximo 4 fotos.");
      setGallery(next);
    } else {
      const next = [...content, ...incoming].slice(0, 6);
      if (content.length + incoming.length > 6) setToast("Puedes adjuntar hasta 6 archivos por publicación.");
      setContent(next);
    }
  }

  function removeFile(id: string, target: "gallery" | "post") {
    if (target === "gallery") {
      setGallery((prev) => prev.filter((f) => f.id !== id));
      setCover(0);
    } else {
      setContent((prev) => prev.filter((f) => f.id !== id));
    }
  }

  function moveCover(dir: number) {
    setCover((c) => (c + dir + gallery.length) % gallery.length);
  }

  function publishGallery() {
    if (!gallery.length) {
      setToast("Agrega al menos una foto para publicar tu galería.");
      return;
    }
    setSuccess("gallery");
  }

  function publishPost() {
    if (!content.length) {
      setToast("Agrega al menos una foto o video.");
      return;
    }
    if (!title.trim()) {
      setToast("Ponle un título a la publicación.");
      return;
    }
    setSuccess("post");
  }

  if (success) {
    return (
      <div className="mx-auto max-w-xl rounded-[28px] border border-emerald-400/20 bg-emerald-400/[0.05] p-7 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
          <Check className="h-7 w-7" />
        </span>
        <h2 className="mt-4 display text-3xl">
          {success === "gallery" ? "Galería publicada" : "Publicación creada"}
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-[12px] leading-relaxed text-muted">
          {success === "gallery"
            ? "Las primeras 4 fotos ya aparecen en tu perfil, con la primera marcada como portada."
            : `Tu publicación "${title}" quedó lista. En producción se subiría a R2, se transcodificaría a HLS y se protegería con marca de agua.`}
        </p>

        <div className="mt-5 grid grid-cols-4 gap-2">
          {(success === "gallery" ? gallery : content).slice(0, 4).map((f) => (
            <div key={f.id} className="overflow-hidden rounded-xl border border-white/10">
              {f.isImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={f.url} alt={f.name} className="aspect-[4/5] w-full object-cover" />
              ) : (
                <div className="grid aspect-[4/5] place-items-center bg-white/[0.04] text-muted"><Video className="h-5 w-5" /></div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link href="/c/camila-rivas" className="btn-primary !py-2.5 !text-xs">Ver en mi perfil</Link>
          <button
            onClick={() => {
              setSuccess(null);
              setGallery([]);
              setContent([]);
              setTitle("");
              setDescription("");
              setToast("");
            }}
            className="btn-ghost !py-2.5 !text-xs"
          >
            Subir más
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href="/creadora" className="inline-flex items-center gap-1.5 text-[11px] text-muted hover:text-cream">
            <ArrowLeft className="h-3.5 w-3.5" /> Volver al panel
          </Link>
          <h1 className="display mt-2 text-3xl sm:text-4xl">Subir contenido</h1>
          <p className="mt-1.5 text-sm text-muted">Arrastra, ordena y publica. La protección se activa automáticamente.</p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.04] px-3.5 py-2 text-[10px] text-emerald-200/80">
          <ShieldCheck className="h-4 w-4" />
          Marca de agua + URL firmada activas
        </div>
      </div>

      <div className="mt-6 flex gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-1">
        <button
          onClick={() => setTab("gallery")}
          className={`flex-1 rounded-xl py-2.5 text-xs font-medium transition ${tab === "gallery" ? "bg-cream text-ink" : "text-muted hover:text-cream"}`}
        >
          Galería del perfil · 4 fotos
        </button>
        <button
          onClick={() => setTab("post")}
          className={`flex-1 rounded-xl py-2.5 text-xs font-medium transition ${tab === "post" ? "bg-[#C2185B] text-white" : "text-muted hover:text-cream"}`}
        >
          Publicación / PPV
        </button>
      </div>

      {toast ? (
        <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-rose/25 bg-rose/[0.08] px-4 py-2.5 text-[11px] text-cream/80">
          <span className="flex items-center gap-2"><Info className="h-3.5 w-3.5 text-rose" /> {toast}</span>
          <button onClick={() => setToast("")}><X className="h-3.5 w-3.5" /></button>
        </div>
      ) : null}

      {tab === "gallery" ? (
        <div className="mt-4 grid gap-4 xl:grid-cols-[1.3fr_1fr] xl:items-start">
          <div className="rounded-2xl border border-white/[0.08] bg-surface/70 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Fotos del perfil</p>
              <span className={`text-[10px] ${gallery.length === 4 ? "text-emerald-300" : "text-muted"}`}>{gallery.length}/4</span>
            </div>
            <p className="mt-1 text-[10px] text-muted">La primera foto es la portada. Puedes cambiar el orden con las flechas.</p>

            <div className="mt-4">
              <Dropzone
                onFiles={(f) => addFiles(f, "gallery")}
                title="Arrastra tus fotos aquí"
                hint="JPG, PNG o WebP · mínimo 1,200 px de ancho · máximo 4 fotos"
              />
            </div>

            {gallery.length ? (
              <>
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {gallery.map((f, i) => (
                    <div key={f.id} className="relative">
                      <Thumb file={f} onRemove={() => removeFile(f.id, "gallery")} />
                      {i === cover ? (
                        <span className="absolute left-1.5 top-1.5 inline-flex items-center gap-1 rounded-full bg-gold px-1.5 py-0.5 text-[8px] font-bold text-ink">
                          <Star className="h-2.5 w-2.5 fill-ink" /> Portada
                        </span>
                      ) : (
                        <button
                          onClick={() => setCover(i)}
                          className="absolute left-1.5 top-1.5 rounded-full bg-black/55 px-1.5 py-0.5 text-[8px] text-white/70 backdrop-blur transition hover:bg-black/75 hover:text-white"
                        >
                          Portada
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-2.5">
                  <span className="text-[10px] text-muted">Portada actual: foto {cover + 1}</span>
                  <div className="flex gap-1.5">
                    <button onClick={() => moveCover(-1)} className="grid h-7 w-7 place-items-center rounded-lg border border-white/10 text-muted hover:text-cream">
                      <ArrowLeft className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => moveCover(1)} className="grid h-7 w-7 place-items-center rounded-lg border border-white/10 text-muted hover:text-cream">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                {[
                  { icon: Star, title: "1 portada", text: "La primera foto vende el perfil." },
                  { icon: ImagePlus, title: "3–4 fotos", text: "Rostro, cuerpo y un detalle." },
                  { icon: Lock, title: "Con protección", text: "Marca de agua y URL firmada." },
                ].map((t) => (
                  <div key={t.title} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
                    <t.icon className="h-3.5 w-3.5 text-rose" />
                    <p className="mt-2 text-[10px] font-medium">{t.title}</p>
                    <p className="mt-0.5 text-[9px] leading-relaxed text-muted">{t.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-white/[0.08] bg-surface/70 p-5">
              <p className="flex items-center gap-2 text-sm font-semibold"><ImagePlus className="h-4 w-4 text-rose" /> Cómo se verá</p>
              <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
                <div className="relative aspect-[16/10] w-full" style={{ backgroundImage: gallery[cover] ? undefined : "linear-gradient(145deg,#FF4D8D,#5B2A86)" }}>
                  {gallery[cover]?.isImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={gallery[cover].url} alt="Portada" className="h-full w-full object-cover" />
                  ) : (
                    <div className="grid h-full place-items-center font-display text-5xl text-white/80">CR</div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/80 to-transparent p-3">
                    <span className="rounded-full bg-black/40 px-2 py-1 text-[9px] text-white/80 backdrop-blur">Portada del perfil</span>
                    <span className="rounded-full bg-black/40 px-2 py-1 text-[9px] text-white/60 backdrop-blur">1/4</span>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-[10px] leading-relaxed text-muted">
                Las fotos se muestran en carrusel de 4. La portada también aparece en el catálogo y en las tarjetas de creadora.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-surface/70 p-5">
              <p className="flex items-center gap-2 text-sm font-semibold"><Lock className="h-4 w-4 text-gold" /> Protección anti-descarga</p>
              <ul className="mt-3 space-y-2 text-[10px] leading-relaxed text-muted">
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" /> URL firmada con expiración de 10 minutos.</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" /> Marca de agua con ID de usuario.</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" /> Sin descarga directa; solo streaming.</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" /> Registro de accesos y dispositivos.</li>
              </ul>
              <p className="mt-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-2.5 text-[9px] leading-relaxed text-muted/70">
                Ningún navegador puede impedir 100% una grabación de pantalla. La protección disuade, identifica y permite tomar acciones legales.
              </p>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setToast("Borrador guardado localmente (demo).")} className="btn-ghost flex-1 !py-2.5 !text-xs">
                <Save className="h-3.5 w-3.5" /> Borrador
              </button>
              <button onClick={publishGallery} className="btn-primary flex-1 !py-2.5 !text-xs">
                Publicar galería
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4 grid gap-4 xl:grid-cols-[1.3fr_1fr] xl:items-start">
          <div className="rounded-2xl border border-white/[0.08] bg-surface/70 p-5">
            <p className="text-sm font-semibold">Archivos de la publicación</p>
            <p className="mt-1 text-[10px] text-muted">Hasta 6 fotos o un video corto. Para videos largos usa la carga por fragmentos.</p>
            <div className="mt-4">
              <Dropzone
                onFiles={(f) => addFiles(f, "post")}
                title="Arrastra fotos o video"
                hint="JPG, PNG, WebP, MP4 o MOV · máximo 6 archivos"
              />
            </div>

            {content.length ? (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {content.map((f) => (
                  <Thumb key={f.id} file={f} onRemove={() => removeFile(f.id, "post")} />
                ))}
              </div>
            ) : null}

            <div className="mt-5 space-y-3">
              <div>
                <label className="mb-1.5 block text-[10px] font-medium text-cream/60">Título</label>
                <input aria-label="Título de la publicación" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej. Rooftop — edición privada" className="field !py-2.5 text-xs" />
              </div>
              <div>
                <label className="mb-1.5 block text-[10px] font-medium text-cream/60">Descripción</label>
                <textarea
                  aria-label="Descripción de la publicación"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Cuenta qué incluye, sin promesas fuera de la plataforma…"
                  className="field resize-none !py-2.5 text-xs"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-white/[0.08] bg-surface/70 p-5">
              <p className="text-sm font-semibold">Visibilidad y precio</p>
              <div className="mt-3 space-y-2">
                {[
                  { id: "gratis", label: "Gratis para todos", note: "Sirve para atraer fans" },
                  { id: "suscriptores", label: "Solo suscriptores", note: "Parte de tu muro de pago" },
                  { id: "ppv", label: "PPV — pago único", note: "Se desbloquea con saldo" },
                ].map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setVisibility(v.id)}
                    className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-left transition ${
                      visibility === v.id ? "border-rose/50 bg-rose/[0.07]" : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    <span>
                      <span className="block text-[11px] font-medium">{v.label}</span>
                      <span className="block text-[9px] text-muted">{v.note}</span>
                    </span>
                    <span className={`grid h-4 w-4 place-items-center rounded-full border ${visibility === v.id ? "border-rose bg-rose" : "border-white/25"}`}>
                      {visibility === v.id ? <Check className="h-2.5 w-2.5 text-white" /> : null}
                    </span>
                  </button>
                ))}
              </div>

              {visibility === "ppv" ? (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted">Precio de desbloqueo</span>
                    <span className="font-semibold">{money(price)}</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={300}
                    step={5}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    aria-label="Precio de desbloqueo"
                    className="mt-2 w-full"
                    style={{ ["--range" as string]: `${((price - 20) / 280) * 100}%` }}
                  />
                </div>
              ) : null}

              <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.04] p-3 text-[9px] leading-relaxed text-emerald-200/70">
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                Tu comisión es 20%. Recibes {money(Math.round((visibility === "ppv" ? price : 0) * 0.8))} de cada {money(visibility === "ppv" ? price : 0)} vendido.
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-surface/70 p-5">
              <p className="flex items-center gap-2 text-sm font-semibold"><ShieldCheck className="h-4 w-4 text-emerald-400" /> Protección activa</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["Marca de agua", "URL firmada", "HLS", "Sin descarga", "Registro de accesos"].map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[9px] text-muted">{t}</span>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setToast("Borrador guardado localmente (demo).")} className="btn-ghost flex-1 !py-2.5 !text-xs">
                <Save className="h-3.5 w-3.5" /> Borrador
              </button>
              <button onClick={publishPost} className="btn-primary flex-1 !py-2.5 !text-xs">
                Publicar
              </button>
            </div>

            <p className="flex items-start gap-1.5 text-[9px] leading-relaxed text-muted/50">
              <Info className="mt-0.5 h-3 w-3 shrink-0" />
              Demo local: los archivos se previsualizan en tu navegador, no se suben a ningún servidor todavía.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
