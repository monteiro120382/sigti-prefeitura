import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <Building2 className="mx-auto mb-3 h-14 w-14 text-blue-700" />

          <h1 className="text-3xl font-bold text-slate-800">
            SIGTI
          </h1>

          <p className="text-slate-500">
            Sistema Integrado de Gestão de TI
          </p>

          <p className="text-sm text-slate-400">
            Prefeitura Municipal
          </p>
        </div>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Usuário"
            className="w-full rounded-lg border p-3"
          />

          <input
            type="password"
            placeholder="Senha"
            className="w-full rounded-lg border p-3"
          />

          <Button className="w-full">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}