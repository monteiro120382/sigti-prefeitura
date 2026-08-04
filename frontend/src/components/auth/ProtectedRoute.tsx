import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import { useAuth } from "../../contexts/AuthContext";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { autenticado } = useAuth();

  if (!autenticado) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}