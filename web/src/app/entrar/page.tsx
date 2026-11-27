import AuthShell from "@/components/AuthShell";
import LoginForm from "@/components/LoginForm";

export const metadata = { title: "Entrar — AMY" };

export default function LoginPage() {
  return (
    <AuthShell
      title={<>Bienvenido <span className="italic text-rose">de vuelta</span>.</>}
      subtitle="Entra a tu cuenta para seguir conversando, desbloquear contenido y reservar llamadas."
      footer={<>Tu privacidad es la prioridad. Nunca compartimos tu actividad.</>}
    >
      <LoginForm />
    </AuthShell>
  );
}
