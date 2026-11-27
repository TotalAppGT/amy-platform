import Navbar from "@/components/Navbar";
import ChatClient from "@/components/ChatClient";

export const metadata = {
  title: "Mensajes — AMY",
  description: "Chat privado con creadoras verificadas.",
};

export default function ChatPage() {
  return (
    <main>
      <Navbar />
      <ChatClient />
    </main>
  );
}
