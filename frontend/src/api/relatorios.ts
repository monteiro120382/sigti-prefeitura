import api from "./api";

export async function buscarResumoRelatorios() {
const response = await api.get("/relatorios/resumo");
return response.data.data;
}

export async function buscarRelatoriosPorTecnico() {
const response = await api.get("/relatorios/por-tecnico");
return response.data.data;
}

export async function buscarRelatoriosPorSecretaria() {
const response = await api.get("/relatorios/por-secretaria");
return response.data.data;
}

export async function buscarRelatoriosPorPeriodo(
dataInicial?: string,
dataFinal?: string
) {
const params: {
dataInicial?: string;
dataFinal?: string;
} = {};

if (dataInicial) {
params.dataInicial = dataInicial;
}

if (dataFinal) {
params.dataFinal = dataFinal;
}

const response = await api.get("/relatorios/por-periodo", {
params,
});

return response.data.data;
}

export async function buscarChamadosRecentes() {
const response = await api.get("/relatorios/recentes");
return response.data.data;
}
