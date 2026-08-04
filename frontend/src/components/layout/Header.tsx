import { LogOut } from "lucide-react";

import { Button } from "../ui/button";
import { useAuth } from "../../contexts/AuthContext";

export default function Header() {
  const { usuario, logout } = useAuth();

  function sair() {
    logout();
    window.location.href = "/";
  }

  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">

      <div>
        <h1 className="text-xl font-bold">
          SIGTI
        </h1>

        <p className="text-sm text-gray-500">
          Sistema Integrado de Gestão de TI
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="text-right">
          <p className="font-semibold">
            {usuario?.nome}
          </p>

          <p className="text-sm text-gray-500">
            {usuario?.perfil}
          </p>
        </div>

        <Button
          variant="outline"
          onClick={sair}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>

      </div>

    </header>
  );
}