import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import { useAuth } from "../../contexts/AuthContext";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { autenticado, carregando } = useAuth();

  if (carregando) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-sm text-gray-500">
          Carregando...
        </div>
      </div>
    );
  }

  if (!autenticado) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
