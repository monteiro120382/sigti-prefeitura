import api from "./api";

import type { Usuario, Perfil } from "@/types/usuario";

export async function listarUsuarios() {
  const response = await api.get("/users");

  return response.data.data as Usuario[];
}

export async function buscarUsuario(id: number) {
  const response = await api.get(`/users/${id}`);

  return response.data.data as Usuario;
}

export async function criarUsuario(
  dados: {
    nome: string;
    email: string;
    senha: string;
    perfil?: Perfil;
    ativo?: boolean;
  }
) {
  const response = await api.post(
    "/users",
    dados
  );

  return response.data.data as Usuario;
}

export async function atualizarUsuario(
  id: number,
  dados: {
    nome?: string;
    email?: string;
    perfil?: Perfil;
    ativo?: boolean;
  }
) {
  const response = await api.put(
    `/users/${id}`,
    dados
  );

  return response.data.data as Usuario;
}

export async function resetarSenha(
  id: number,
  senha: string
) {
  const response = await api.put(
    `/users/${id}/reset-password`,
    { senha }
  );

  return response.data.data as Usuario;
}

export async function excluirUsuario(
  id: number
) {
  return api.delete(`/users/${id}`);
}
