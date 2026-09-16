import { useEffect, useState } from "react";
import {
  Settings,
  User,
  ShieldCheck,
  Save,
  Lock,
  Loader2,
} from "lucide-react";

import api from "@/api/api";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil: string;
  ativo?: boolean;
}

interface ErrosFormulario {
  nome?: string;
  email?: string;
  novaSenha?: string;
  confirmarSenha?: string;
}

export default function ConfiguracoesPage() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [carregando, setCarregando] = useState(true);
  const [salvandoPerfil, setSalvandoPerfil] = useState(false);
  const [salvandoSenha, setSalvandoSenha] = useState(false);

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const [errosFormulario, setErrosFormulario] =
    useState<ErrosFormulario>({});

  useEffect(() => {
    carregarPerfil();
  }, []);

  async function carregarPerfil() {
    try {
      setCarregando(true);
      setErro("");
      setMensagem("");
      setErrosFormulario({});

      const response = await api.get("/users/me");

      const dados = response.data.data as Usuario;

      setUsuario(dados);
      setNome(dados.nome ?? "");
      setEmail(dados.email ?? "");
    } catch (error: any) {
      console.error("Erro ao carregar perfil:", error);

      setErro(
        error?.response?.data?.message ??
          error?.response?.data?.erro ??
          "Não foi possível carregar o perfil."
      );
    } finally {
      setCarregando(false);
    }
  }

  function validarPerfil(): boolean {
    const novosErros: ErrosFormulario = {};

    const nomeLimpo = nome.trim();
    const emailLimpo = email.trim();

    if (!nomeLimpo) {
      novosErros.nome = "Informe o nome.";
    } else if (nomeLimpo.length < 3) {
      novosErros.nome =
        "O nome deve possuir pelo menos 3 caracteres.";
    }

    if (!emailLimpo) {
      novosErros.email = "Informe o e-mail.";
    } else {
      const emailValido =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpo);

      if (!emailValido) {
        novosErros.email = "Informe um e-mail válido.";
      }
    }

    setErrosFormulario(novosErros);

    return Object.keys(novosErros).length === 0;
  }

  async function salvarPerfil(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMensagem("");
    setErro("");

    if (!usuario) {
      setErro("Usuário não identificado.");
      return;
    }

    if (!validarPerfil()) {
      return;
    }

    try {
      setSalvandoPerfil(true);

      const dados = {
        nome: nome.trim(),
        email: email.trim(),
      };

      const response = await api.put(
        `/users/${usuario.id}`,
        dados
      );

      console.log(
        "Perfil atualizado:",
        response.data
      );

      setNome(dados.nome);
      setEmail(dados.email);

      setMensagem(
        "Perfil atualizado com sucesso."
      );

      setErrosFormulario({});
    } catch (error: any) {
      console.error(
        "Erro ao atualizar perfil:",
        error
      );

      console.error(
        "Resposta:",
        error?.response?.data
      );

      setErro(
        error?.response?.data?.message ??
          error?.response?.data?.erro ??
          "Não foi possível atualizar o perfil."
      );
    } finally {
      setSalvandoPerfil(false);
    }
  }

  function validarSenha(): boolean {
    const novosErros: ErrosFormulario = {};

    if (!novaSenha.trim()) {
      novosErros.novaSenha =
        "Informe a nova senha.";
    } else if (novaSenha.length < 6) {
      novosErros.novaSenha =
        "A nova senha deve possuir pelo menos 6 caracteres.";
    }

    if (!confirmarSenha.trim()) {
      novosErros.confirmarSenha =
        "Confirme a nova senha.";
    } else if (novaSenha !== confirmarSenha) {
      novosErros.confirmarSenha =
        "A nova senha e a confirmação não são iguais.";
    }

    setErrosFormulario(novosErros);

    return Object.keys(novosErros).length === 0;
  }

  async function alterarSenha(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setMensagem("");
    setErro("");

    if (!usuario) {
      setErro("Usuário não identificado.");
      return;
    }

    if (!validarSenha()) {
      return;
    }

    try {
      setSalvandoSenha(true);

      await api.put(
        `/users/${usuario.id}/reset-password`,
        {
          senha: novaSenha,
        }
      );

      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");

      setMensagem(
        "Senha alterada com sucesso."
      );

      setErrosFormulario({});
    } catch (error: any) {
      console.error(
        "Erro ao alterar senha:",
        error
      );

      console.error(
        "Resposta:",
        error?.response?.data
      );

      setErro(
        error?.response?.data?.message ??
          error?.response?.data?.erro ??
          "Não foi possível alterar a senha."
      );
    } finally {
      setSalvandoSenha(false);
    }
  }

  if (carregando) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-3 text-slate-600">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>
            Carregando configurações...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Configurações
        </h1>

        <p className="text-slate-500">
          Configurações gerais e informações do seu usuário no SIGTI
        </p>
      </div>

      {mensagem && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          {mensagem}
        </div>
      )}

      {erro && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {erro}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-xl border bg-white p-6 shadow-sm">

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
            <Settings className="h-6 w-6 text-slate-700" />
          </div>

          <h2 className="text-xl font-semibold text-slate-800">
            Sistema
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Informações gerais do sistema SIGTI.
          </p>

          <div className="mt-6 space-y-3 text-sm">

            <div className="flex justify-between border-b pb-2">
              <span className="text-slate-500">
                Sistema
              </span>

              <span className="font-medium text-slate-800">
                SIGTI
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-slate-500">
                Versão
              </span>

              <span className="font-medium text-slate-800">
                1.0.0
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">
                Status
              </span>

              <span className="font-medium text-green-600">
                Sistema ativo
              </span>
            </div>

          </div>

        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
            <User className="h-6 w-6 text-slate-700" />
          </div>

          <h2 className="text-xl font-semibold text-slate-800">
            Meu Perfil
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Consulte e altere suas informações de usuário.
          </p>

          <form
            onSubmit={salvarPerfil}
            className="mt-6 space-y-4"
          >

            <div>

              <label className="mb-1 block text-sm font-medium text-slate-700">
                Nome
              </label>

              <input
                type="text"
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value);

                  if (errosFormulario.nome) {
                    setErrosFormulario(
                      (anterior) => ({
                        ...anterior,
                        nome: undefined,
                      })
                    );
                  }
                }}
                required
                minLength={3}
                className="w-full rounded-lg border border-slate-300 p-2.5 outline-none focus:border-blue-500"
              />

              {errosFormulario.nome && (
                <p className="mt-1 text-sm text-red-600">
                  {errosFormulario.nome}
                </p>
              )}

            </div>

            <div>

              <label className="mb-1 block text-sm font-medium text-slate-700">
                E-mail
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);

                  if (errosFormulario.email) {
                    setErrosFormulario(
                      (anterior) => ({
                        ...anterior,
                        email: undefined,
                      })
                    );
                  }
                }}
                required
                className="w-full rounded-lg border border-slate-300 p-2.5 outline-none focus:border-blue-500"
              />

              {errosFormulario.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errosFormulario.email}
                </p>
              )}

            </div>

            {usuario && (
              <div className="rounded-lg bg-slate-50 p-3 text-sm">
                <div className="flex justify-between">

                  <span className="text-slate-500">
                    Perfil
                  </span>

                  <span className="font-medium text-slate-800">
                    {usuario.perfil}
                  </span>

                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={salvandoPerfil}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {salvandoPerfil ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Perfil
                </>
              )}

            </button>

          </form>

        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm md:col-span-2">

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
            <ShieldCheck className="h-6 w-6 text-slate-700" />
          </div>

          <h2 className="text-xl font-semibold text-slate-800">
            Segurança
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Altere a senha de acesso ao SIGTI.
          </p>

          <form
            onSubmit={alterarSenha}
            className="mt-6 grid gap-4 md:grid-cols-3"
          >

            <div>

              <label className="mb-1 block text-sm font-medium text-slate-700">
                Senha atual
              </label>

              <input
                type="password"
                value={senhaAtual}
                onChange={(e) =>
                  setSenhaAtual(e.target.value)
                }
                placeholder="Senha atual"
                className="w-full rounded-lg border border-slate-300 p-2.5 outline-none focus:border-blue-500"
              />

            </div>

            <div>

              <label className="mb-1 block text-sm font-medium text-slate-700">
                Nova senha
              </label>

              <input
                type="password"
                value={novaSenha}
                onChange={(e) => {
                  setNovaSenha(e.target.value);

                  if (errosFormulario.novaSenha) {
                    setErrosFormulario(
                      (anterior) => ({
                        ...anterior,
                        novaSenha: undefined,
                      })
                    );
                  }
                }}
                placeholder="Nova senha"
                minLength={6}
                required
                className="w-full rounded-lg border border-slate-300 p-2.5 outline-none focus:border-blue-500"
              />

              {errosFormulario.novaSenha && (
                <p className="mt-1 text-sm text-red-600">
                  {errosFormulario.novaSenha}
                </p>
              )}

            </div>

            <div>

              <label className="mb-1 block text-sm font-medium text-slate-700">
                Confirmar nova senha
              </label>

              <input
                type="password"
                value={confirmarSenha}
                onChange={(e) => {
                  setConfirmarSenha(e.target.value);

                  if (errosFormulario.confirmarSenha) {
                    setErrosFormulario(
                      (anterior) => ({
                        ...anterior,
                        confirmarSenha: undefined,
                      })
                    );
                  }
                }}
                placeholder="Confirme a nova senha"
                minLength={6}
                required
                className="w-full rounded-lg border border-slate-300 p-2.5 outline-none focus:border-blue-500"
              />

              {errosFormulario.confirmarSenha && (
                <p className="mt-1 text-sm text-red-600">
                  {errosFormulario.confirmarSenha}
                </p>
              )}

            </div>

            <div className="md:col-span-3 flex justify-end">

              <button
                type="submit"
                disabled={salvandoSenha}
                className="inline-flex items-center justify-center rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {salvandoSenha ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Alterando...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Alterar Senha
                  </>
                )}

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}
