import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesClient from "@/components/ServicesClient";

export const metadata = {
  title: "Servicios y reservas — AMY",
  description: "Masajes, spa, fotografía, belleza, fitness y eventos con profesionales verificados en Latinoamérica.",
};

export default function ServicesPage() {
  return (
    <main>
      <Navbar />
      <ServicesClient />
      <Footer />
    </main>
  );
}
