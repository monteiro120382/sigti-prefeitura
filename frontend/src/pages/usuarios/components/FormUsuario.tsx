import { useEffect, useState } from "react";

import {
  criarUsuario,
  atualizarUsuario,
  resetarSenha,
} from "@/api/usuarios";

import type {
  Usuario,
  Perfil,
} from "@/types/usuario";

interface Props {
  usuario: Usuario | null;
  onSuccess: () => void;
}

interface Formulario {
  nome: string;
  email: string;
  senha: string;
  perfil: Perfil;
  ativo: boolean;
}

function formularioVazio(): Formulario {
  return {
    nome: "",
    email: "",
    senha: "",
    perfil: "SOLICITANTE",
    ativo: true,
  };
}

export default function FormUsuario({
  usuario,
  onSuccess,
}: Props) {

  const [form, setForm] =
    useState<Formulario>(
      formularioVazio()
    );

  const [salvando, setSalvando] =
    useState(false);

  useEffect(() => {

    if (usuario) {

      setForm({
        nome: usuario.nome ?? "",
        email: usuario.email ?? "",
        senha: "",
        perfil:
          usuario.perfil ?? "SOLICITANTE",
        ativo:
          usuario.ativo !== false,
      });

    } else {

      setForm(
        formularioVazio()
      );

    }

  }, [usuario]);

  function alterarCampo(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {

    const {
      name,
      value,
      type,
    } = e.target;

    setForm(
      (anterior) => ({
        ...anterior,
        [name]:
          type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : value,
      })
    );

  }

  async function salvar(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setSalvando(true);

      if (usuario) {

        await atualizarUsuario(
          usuario.id,
          {
            nome: form.nome,
            email: form.email,
            perfil: form.perfil,
            ativo: form.ativo,
          }
        );

        if (form.senha.trim()) {

          if (form.senha.length < 6) {

            alert(
              "A nova senha deve ter no mínimo 6 caracteres."
            );

            return;
          }

          await resetarSenha(
            usuario.id,
            form.senha
          );

        }

        alert(
          "Usuário atualizado com sucesso."
        );

      } else {

        if (form.senha.length < 6) {

          alert(
            "A senha deve ter no mínimo 6 caracteres."
          );

          return;
        }

        await criarUsuario({
          nome: form.nome,
          email: form.email,
          senha: form.senha,
          perfil: form.perfil,
          ativo: form.ativo,
        });

        alert(
          "Usuário cadastrado com sucesso."
        );

      }

      onSuccess();

    } catch (error: any) {

      console.error(
        "Erro ao salvar usuário:",
        error
      );

      console.error(
        "Resposta:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ??
        error.response?.data?.erro ??
        "Não foi possível salvar o usuário."
      );

    } finally {

      setSalvando(false);

    }
  }

  return (
    <form
      onSubmit={salvar}
      className="space-y-4"
    >

      <div>

        <label className="mb-1 block font-medium">
          Nome
        </label>

        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={alterarCampo}
          required
          minLength={3}
          className="w-full rounded border p-2"
        />

      </div>

      <div>

        <label className="mb-1 block font-medium">
          E-mail
        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={alterarCampo}
          required
          className="w-full rounded border p-2"
        />

      </div>

      <div>

        <label className="mb-1 block font-medium">
          Perfil
        </label>

        <select
          name="perfil"
          value={form.perfil}
          onChange={alterarCampo}
          required
          className="w-full rounded border p-2"
        >

          <option value="ADMIN">
            Administrador
          </option>

          <option value="TECNICO">
            Técnico
          </option>

          <option value="SOLICITANTE">
            Solicitante
          </option>

          <option value="ESTAGIARIO">
            Estagiário
          </option>

        </select>

      </div>

      <div>

        <label className="mb-1 block font-medium">
          {usuario
            ? "Nova senha (opcional)"
            : "Senha"}
        </label>

        <input
          type="password"
          name="senha"
          value={form.senha}
          onChange={alterarCampo}
          required={!usuario}
          minLength={6}
          placeholder={
            usuario
              ? "Deixe vazio para manter a senha"
              : ""
          }
          className="w-full rounded border p-2"
        />

      </div>

      <div className="flex items-center gap-2">

        <input
          type="checkbox"
          name="ativo"
          checked={form.ativo}
          onChange={alterarCampo}
        />

        <label>
          Usuário ativo
        </label>

      </div>

      <div className="flex justify-end">

        <button
          type="submit"
          disabled={salvando}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {salvando
            ? "Salvando..."
            : usuario
              ? "Atualizar Usuário"
              : "Salvar Usuário"}
        </button>

      </div>

    </form>
  );
}
