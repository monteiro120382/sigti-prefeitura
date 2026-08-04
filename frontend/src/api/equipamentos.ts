import api from "./api";
import type { Equipamento } from "@/types/equipamento";

export async function listarEquipamentos() {
  return api.get("/equipamentos");
}

export async function buscarEquipamento(id: number) {
  return api.get(`/equipamentos/${id}`);
}

export async function criarEquipamento(
  dados: Equipamento
) {
  return api.post("/equipamentos", dados);
}

export async function atualizarEquipamento(
  id: number,
  dados: Partial<Equipamento>
) {
  return api.put(`/equipamentos/${id}`, dados);
}

export async function excluirEquipamento(id: number) {
  return api.delete(`/equipamentos/${id}`);
}