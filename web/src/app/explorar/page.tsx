import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExploreClient from "@/components/ExploreClient";

export const metadata = {
  title: "Explorar creadoras — AMY",
  description: "Catálogo de creadoras verificadas: contenido, chat y llamadas privadas.",
};

export default function ExplorePage() {
  return (
    <main>
      <Navbar />
      <ExploreClient />
      <Footer />
    </main>
  );
}
