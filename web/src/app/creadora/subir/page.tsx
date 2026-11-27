import DashShell, { type DashItem } from "@/components/DashShell";
import UploadStudio from "@/components/UploadStudio";
import {
  Banknote,
  Image as ImageIcon,
  LayoutDashboard,
  MessageCircle,
  Settings,
  Sparkles,
  Upload,
  Users,
  Wallet,
} from "lucide-react";

const nav: DashItem[] = [
  { label: "Resumen", href: "/creadora", icon: LayoutDashboard },
  { label: "Contenido", href: "/creadora#contenido", icon: ImageIcon },
  { label: "Subir", href: "/creadora/subir", icon: Upload },
  { label: "Servicios", href: "/servicios", icon: Sparkles },
  { label: "Mensajes", href: "/chat", icon: MessageCircle, badge: "12" },
  { label: "Suscriptores", href: "/creadora#suscriptores", icon: Users },
  { label: "Ganancias", href: "/creadora#ganancias", icon: Wallet },
  { label: "Retiros", href: "/creadora#retiros", icon: Banknote },
  { label: "Ajustes", href: "/creadora#ajustes", icon: Settings },
];

export const metadata = { title: "Subir contenido — AMY" };

export default function UploadPage() {
  return (
    <DashShell
      items={nav}
      active="Subir"
      role="Panel de creadora"
      name="Camila Rivas"
      initials="CR"
      gradient="linear-gradient(145deg,#FF4D8D,#5B2A86)"
      searchPlaceholder="Buscar en tu estudio…"
    >
      <UploadStudio />
    </DashShell>
  );
}
