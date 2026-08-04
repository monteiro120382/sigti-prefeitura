import api from "./api";

export async function listarSecretarias() {
  const response = await api.get("/secretarias");
  return response.data.data;
}