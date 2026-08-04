import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2 } from "lucide-react";

import { Button } from "../../components/ui/button";
import { login as loginApi } from "../../api/auth";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setErro("");
    setLoading(true);

    try {
      const response = await loginApi({
        email,
        senha,
      });

      login(response.token, response.user);

      navigate("/dashboard");
    } catch {
      setErro("E-mail ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  }

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

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border p-3"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full rounded-lg border p-3"
          />

          {erro && (
            <p className="text-sm text-red-600">
              {erro}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>

        </form>

      </div>
    </div>
  );
}