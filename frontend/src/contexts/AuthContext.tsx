import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil: string;
}

interface AuthContextData {
  usuario: Usuario | null;
  token: string | null;
  login: (token: string, usuario: Usuario) => void;
  logout: () => void;
  autenticado: boolean;
  carregando: boolean;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    try {
      const tokenStorage = localStorage.getItem("token");
      const usuarioStorage = localStorage.getItem("usuario");

      if (tokenStorage && usuarioStorage) {
        setToken(tokenStorage);
        setUsuario(JSON.parse(usuarioStorage));
      }
    } catch (erro) {
      console.error("Erro ao recuperar sessão:", erro);

      localStorage.removeItem("token");
      localStorage.removeItem("usuario");

      setToken(null);
      setUsuario(null);
    } finally {
      setCarregando(false);
    }
  }, []);

  function login(token: string, usuario: Usuario) {
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));

    setToken(token);
    setUsuario(usuario);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    setToken(null);
    setUsuario(null);
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        login,
        logout,
        autenticado: !!token,
        carregando,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
