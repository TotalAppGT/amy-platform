import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getLegalDoc, legalDocs } from "@/lib/legal";

export function generateStaticParams() {
  return legalDocs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  return { title: doc ? `${doc.title} — AMY` : "Legal — AMY" };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();

  return (
    <main>
      <Navbar />
      <div className="container-x py-12 sm:py-16">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-cream">
          <ArrowLeft className="h-3.5 w-3.5" /> Inicio
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Legal</p>
            <nav className="mt-3 space-y-1">
              {legalDocs.map((d) => (
                <Link
                  key={d.slug}
                  href={`/legal/${d.slug}`}
                  className={`block rounded-lg px-3 py-2 text-[12px] transition ${
                    d.slug === slug ? "bg-white/[0.06] text-cream" : "text-muted hover:bg-white/[0.03] hover:text-cream"
                  }`}
                >
                  {d.title}
                </Link>
              ))}
            </nav>
            <div className="mt-6 rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.04] p-4 text-[10px] leading-relaxed text-emerald-200/70">
              <ShieldCheck className="mb-2 h-4 w-4" />
              Documento modelo. Antes de operar, valida estos textos con un abogado guatemalteco y tu contador.
            </div>
          </aside>

          <article className="max-w-3xl">
            <span className="eyebrow">Documento legal</span>
            <h1 className="display mt-3 text-4xl leading-tight sm:text-5xl">{doc.title}</h1>
            <p className="mt-2 text-[11px] text-muted">Actualizado: {doc.updated}</p>
            <p className="mt-6 text-[15px] leading-relaxed text-cream/75">{doc.intro}</p>

            <div className="mt-9 space-y-8">
              {doc.sections.map((s) => (
                <section key={s.h}>
                  <h2 className="text-lg font-semibold text-cream">{s.h}</h2>
                  <div className="mt-3 space-y-3">
                    {s.p.map((p) => (
                      <p key={p} className="text-[13px] leading-relaxed text-muted">{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-white/10 bg-surface/60 p-5 text-[12px] leading-relaxed text-muted">
              ¿Dudas? Escríbenos a <span className="text-cream">amyoficialfan@gmail.com</span>. Respondemos en horario de Guatemala.
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </main>
  );
}
