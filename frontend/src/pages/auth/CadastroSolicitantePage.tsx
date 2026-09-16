import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, ArrowLeft, UserPlus } from "lucide-react";

import { Button } from "../../components/ui/button";
import api from "../../api/api";

export default function CadastroSolicitantePage() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setErro("");

    if (senha !== confirmarSenha) {
      setErro("As senhas não conferem.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/cadastro-solicitante", {
        nome,
        email,
        senha,
      });

      alert(
        "Cadastro realizado com sucesso. Agora você pode entrar no SIGTI."
      );

      navigate("/");
    } catch (error: any) {
      console.error("Erro ao cadastrar solicitante:", error);
      console.error("Resposta:", error.response?.data);

      setErro(
        error.response?.data?.erro ??
          error.response?.data?.message ??
          "Não foi possível realizar o cadastro."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        <div className="mb-8 text-center">
          <Building2 className="mx-auto mb-3 h-14 w-14 text-blue-700" />

          <h1 className="text-3xl font-bold text-slate-800">
            SIGTI
          </h1>

          <p className="text-slate-500">
            Cadastro de Solicitante
          </p>

          <p className="text-sm text-slate-400">
            Sistema Integrado de Gestão de TI
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div>
            <label className="mb-1 block font-medium">
              Nome
            </label>

            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
              required
              minLength={3}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">
              E-mail
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              required
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Senha
            </label>

            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Mínimo de 6 caracteres"
              required
              minLength={6}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Confirmar senha
            </label>

            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Digite a senha novamente"
              required
              minLength={6}
              className="w-full rounded-lg border p-3"
            />
          </div>

          {erro && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {erro}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            <UserPlus className="mr-2 h-4 w-4" />

            {loading
              ? "Cadastrando..."
              : "Criar cadastro"}
          </Button>

        </form>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-5 flex w-full items-center justify-center gap-2 text-sm text-slate-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para o login
        </button>

      </div>
    </div>
  );
}
