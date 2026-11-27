import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-5">
      <div className="text-center">
        <div className="flex justify-center"><Logo /></div>
        <p className="mt-10 text-[11px] uppercase tracking-[0.25em] text-muted">Error 404</p>
        <h1 className="display mt-3 text-5xl">Esta página no existe.</h1>
        <p className="mx-auto mt-4 max-w-sm text-sm text-muted">
          Puede que el perfil haya cambiado de nombre o que el enlace esté roto.
        </p>
        <div className="mt-7 flex justify-center gap-2">
          <Link href="/" className="btn-primary">Volver al inicio</Link>
          <Link href="/explorar" className="btn-ghost">Explorar creadoras</Link>
        </div>
      </div>
    </main>
  );
}
