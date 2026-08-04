import api from "./api";

export async function listarSetores() {
  const response = await api.get("/setores");
  return response.data.data;
}