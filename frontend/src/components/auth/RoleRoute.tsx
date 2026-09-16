import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../../contexts/AuthContext";

interface Props {
  children: ReactNode;
  perfis: string[];
}

export default function RoleRoute({ children, perfis }: Props) {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  if (!perfis.includes(usuario.perfil)) {
    return <Navigate to="/chamados/novo" replace />;
  }

  return <>{children}</>;
}
