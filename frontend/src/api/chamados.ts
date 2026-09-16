import api from "./api";

import type { Chamado } from "@/types/chamado";

export async function listarChamados() {
  return api.get("/chamados");
}

export async function buscarChamado(id: number) {
  return api.get(`/chamados/${id}`);
}

export async function criarChamado(
  dados: Chamado
) {
  return api.post("/chamados", dados);
}

export async function atualizarChamado(
  id: number,
  dados: Partial<Chamado>
) {
  return api.put(`/chamados/${id}`, dados);
}

export async function finalizarChamado(
  id: number,
  observacao?: string
) {
  return api.put(`/chamados/${id}`, {
    status: "FINALIZADO",
    observacao,
  });
}

export async function excluirChamado(id: number) {
  return api.delete(`/chamados/${id}`);
}