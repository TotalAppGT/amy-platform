import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import AgeGate from "@/components/AgeGate";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

export const metadata: Metadata = {
  title: "AMY — Contenido privado, chat y llamadas",
  description:
    "La plataforma guatemalteca donde creadoras verificadas venden contenido, conversan y atienden llamadas privadas. Discreto, seguro y con pagos protegidos.",
  metadataBase: new URL("https://amy.gt"),
  robots: { index: false, follow: false },
  openGraph: {
    title: "AMY — Tu lado más privado",
    description: "Contenido exclusivo, chat en vivo y llamadas privadas con creadoras verificadas de Guatemala.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen antialiased">
        <AgeGate />
        {children}
      </body>
    </html>
  );
}
