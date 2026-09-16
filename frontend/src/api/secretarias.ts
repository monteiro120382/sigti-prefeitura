import api from "./api";

import type { Secretaria } from "@/types/secretaria";

export async function listarSecretarias() {
  const response = await api.get("/secretarias");

  return response.data.data as Secretaria[];
}

export async function buscarSecretaria(id: number) {
  const response = await api.get(`/secretarias/${id}`);

  return response.data.data as Secretaria;
}

export async function criarSecretaria(
  dados: {
    nome: string;
    sigla: string;
  }
) {
  const response = await api.post(
    "/secretarias",
    dados
  );

  return response.data.data as Secretaria;
}

export async function atualizarSecretaria(
  id: number,
  dados: {
    nome: string;
    sigla: string;
  }
) {
  const response = await api.put(
    `/secretarias/${id}`,
    dados
  );

  return response.data.data as Secretaria;
}

export async function excluirSecretaria(
  id: number
) {
  return api.delete(`/secretarias/${id}`);
}
