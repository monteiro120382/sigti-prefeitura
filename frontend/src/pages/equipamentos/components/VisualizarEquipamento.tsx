import type { Equipamento } from "@/types/equipamento";

interface Props {
equipamento: Equipamento;
}

export default function VisualizarEquipamento({
equipamento,
}: Props) {
function formatarValor(valor?: number | null) {
if (valor === null || valor === undefined) {
return "-";
}

return valor.toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL",
});

}

function formatarData(data?: string) {
if (!data) {
return "-";
}

const dataFormatada = new Date(data);

if (Number.isNaN(dataFormatada.getTime())) {
  return "-";
}

return dataFormatada.toLocaleDateString("pt-BR");

}

function classeStatus(status?: string) {
switch (status) {
case "EM_USO":
return "bg-green-100 text-green-700";

  case "ESTOQUE":
    return "bg-blue-100 text-blue-700";

  case "MANUTENCAO":
    return "bg-yellow-100 text-yellow-700";

  case "BAIXADO":
    return "bg-red-100 text-red-700";

  default:
    return "bg-slate-100 text-slate-700";
}

}

return (
<div className="space-y-6">
<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
<div>
<label className="text-sm font-semibold text-slate-600">
Patrimônio
</label>

      <p className="rounded border bg-slate-50 p-2">
        {equipamento.patrimonio || "-"}
      </p>
    </div>

    <div>
      <label className="text-sm font-semibold text-slate-600">
        Tombamento
      </label>

      <p className="rounded border bg-slate-50 p-2">
        {equipamento.tombamento || "-"}
      </p>
    </div>

    <div>
      <label className="text-sm font-semibold text-slate-600">
        Tipo
      </label>

      <p className="rounded border bg-slate-50 p-2">
        {equipamento.tipo || "-"}
      </p>
    </div>

    <div>
      <label className="text-sm font-semibold text-slate-600">
        Categoria
      </label>

      <p className="rounded border bg-slate-50 p-2">
        {equipamento.categoria || "-"}
      </p>
    </div>

    <div>
      <label className="text-sm font-semibold text-slate-600">
        Marca
      </label>

      <p className="rounded border bg-slate-50 p-2">
        {equipamento.marca || "-"}
      </p>
    </div>

    <div>
      <label className="text-sm font-semibold text-slate-600">
        Fabricante
      </label>

      <p className="rounded border bg-slate-50 p-2">
        {equipamento.fabricante || "-"}
      </p>
    </div>

    <div>
      <label className="text-sm font-semibold text-slate-600">
        Modelo
      </label>

      <p className="rounded border bg-slate-50 p-2">
        {equipamento.modelo || "-"}
      </p>
    </div>

    <div>
      <label className="text-sm font-semibold text-slate-600">
        Número de Série
      </label>

      <p className="rounded border bg-slate-50 p-2">
        {equipamento.numeroSerie || "-"}
      </p>
    </div>

    <div>
      <label className="text-sm font-semibold text-slate-600">
        Secretaria
      </label>

      <p className="rounded border bg-slate-50 p-2">
        {equipamento.secretaria?.nome || "-"}
      </p>
    </div>

    <div>
      <label className="text-sm font-semibold text-slate-600">
        Setor
      </label>

      <p className="rounded border bg-slate-50 p-2">
        {equipamento.setor?.nome || "-"}
      </p>
    </div>

    <div>
      <label className="text-sm font-semibold text-slate-600">
        Funcionário
      </label>

      <p className="rounded border bg-slate-50 p-2">
        {equipamento.funcionario?.nome || "-"}
      </p>
    </div>

    <div>
      <label className="text-sm font-semibold text-slate-600">
        Valor de Aquisição
      </label>

      <p className="rounded border bg-slate-50 p-2">
        {formatarValor(equipamento.valorAquisicao)}
      </p>
    </div>

    <div>
      <label className="text-sm font-semibold text-slate-600">
        Status
      </label>

      <div className="rounded border bg-slate-50 p-2">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${classeStatus(
            equipamento.status
          )}`}
        >
          {equipamento.status || "-"}
        </span>
      </div>
    </div>

    <div>
      <label className="text-sm font-semibold text-slate-600">
        Estado
      </label>

      <p className="rounded border bg-slate-50 p-2">
        {equipamento.estado || "-"}
      </p>
    </div>

    <div>
      <label className="text-sm font-semibold text-slate-600">
        Data de Cadastro
      </label>

      <p className="rounded border bg-slate-50 p-2">
        {formatarData(equipamento.createdAt)}
      </p>
    </div>

    <div>
      <label className="text-sm font-semibold text-slate-600">
        Última Atualização
      </label>

      <p className="rounded border bg-slate-50 p-2">
        {formatarData(equipamento.updatedAt)}
      </p>
    </div>
  </div>

  <div>
    <label className="mb-1 block text-sm font-semibold text-slate-600">
      Observação
    </label>

    <p className="min-h-20 whitespace-pre-wrap rounded border bg-slate-50 p-3">
      {equipamento.observacao || "-"}
    </p>
  </div>
</div>

);
}