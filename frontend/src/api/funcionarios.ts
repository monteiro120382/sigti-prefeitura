import api from "./api";

export async function listarFuncionarios() {
  const response = await api.get("/funcionarios");
  return response.data.data;
}