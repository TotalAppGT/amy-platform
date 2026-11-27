import AuthShell from "@/components/AuthShell";
import RegisterForm from "@/components/RegisterForm";

export const metadata = { title: "Crear cuenta — AMY" };

export default function RegisterPage() {
  return (
    <AuthShell
      title={<>Empieza tu lado <span className="italic text-rose">privado</span>.</>}
      subtitle="Crea tu cuenta en menos de un minuto. Si eres creadora, el siguiente paso es la verificación de identidad."
      footer={<>Al continuar aceptas ser mayor de 18 años y nuestros términos.</>}
    >
      <RegisterForm />
    </AuthShell>
  );
}
