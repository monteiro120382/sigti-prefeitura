import type { Chamado } from "@/types/chamado";

interface Props {
  chamado: Chamado | null;
}

export default function VisualizarChamado({
  chamado,
}: Props) {
  if (!chamado) return null;

  function nomeStatus(status: string) {
    switch (status) {
      case "ABERTO":
        return "Aberto";

      case "EM_ATENDIMENTO":
        return "Em atendimento";

      case "AGUARDANDO":
        return "Aguardando";

      case "FINALIZADO":
        return "Finalizado";

      case "CANCELADO":
        return "Cancelado";

      default:
        return status;
    }
  }

  function corStatus(status: string) {
    switch (status) {
      case "ABERTO":
        return "bg-blue-100 text-blue-700 border-blue-200";

      case "EM_ATENDIMENTO":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";

      case "AGUARDANDO":
        return "bg-orange-100 text-orange-700 border-orange-200";

      case "FINALIZADO":
        return "bg-green-100 text-green-700 border-green-200";

      case "CANCELADO":
        return "bg-red-100 text-red-700 border-red-200";

      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  }

  const resolucao =
    chamado.resolucao?.trim() ||
    chamado.historicos
      ?.find(
        (historico) =>
          historico.statusNovo === "FINALIZADO" &&
          historico.observacao?.trim()
      )
      ?.observacao?.trim() ||
    null;

  return (
    <div className="space-y-5">

      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="text-sm font-semibold text-slate-500">
            Protocolo
          </label>

          <div className="rounded border bg-slate-50 p-2 font-medium">
            {chamado.protocolo ?? "-"}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-500">
            Status
          </label>

          <div
            className={`rounded border p-2 text-center font-semibold ${corStatus(
              chamado.status
            )}`}
          >
            {nomeStatus(chamado.status)}
          </div>
        </div>

        <div className="col-span-2">
          <label className="text-sm font-semibold text-slate-500">
            Título
          </label>

          <div className="rounded border bg-slate-50 p-2">
            {chamado.titulo}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-500">
            Prioridade
          </label>

          <div className="rounded border bg-slate-50 p-2">
            {chamado.prioridade}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-500">
            Funcionário
          </label>

          <div className="rounded border bg-slate-50 p-2">
            {chamado.funcionario?.nome ?? "-"}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-500">
            Secretaria
          </label>

          <div className="rounded border bg-slate-50 p-2">
            {chamado.secretaria?.nome ?? "-"}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-500">
            Setor
          </label>

          <div className="rounded border bg-slate-50 p-2">
            {chamado.setor?.nome ?? "-"}
          </div>
        </div>

        <div className="col-span-2">
          <label className="text-sm font-semibold text-slate-500">
            Técnico responsável
          </label>

          <div className="rounded border bg-slate-50 p-2">
            {chamado.tecnico?.nome ?? "Ainda não atribuído"}
          </div>
        </div>

        <div className="col-span-2">
          <label className="text-sm font-semibold text-slate-500">
            Equipamento
          </label>

          <div className="rounded border bg-slate-50 p-2">
            {chamado.equipamento
              ? `${chamado.equipamento.patrimonio} - ${
                  chamado.equipamento.marca ?? ""
                } ${chamado.equipamento.modelo ?? ""}`
              : "-"}
          </div>
        </div>

      </div>

      <div>
        <label className="text-sm font-semibold text-slate-500">
          Descrição
        </label>

        <div className="min-h-32 whitespace-pre-wrap rounded border bg-slate-50 p-3">
          {chamado.descricao}
        </div>
      </div>

      {chamado.status === "FINALIZADO" && (
        <div>
          <label className="text-sm font-semibold text-slate-500">
            Resolução
          </label>

          <div className="min-h-24 whitespace-pre-wrap rounded border border-green-200 bg-green-50 p-3 text-slate-700">
            {resolucao ?? "Resolução não informada."}
          </div>
        </div>
      )}

      {(chamado.createdAt || chamado.updatedAt) && (
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="text-sm font-semibold text-slate-500">
              Criado em
            </label>

            <div className="rounded border bg-slate-50 p-2">
              {chamado.createdAt
                ? new Date(
                    chamado.createdAt
                  ).toLocaleString("pt-BR")
                : "-"}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-500">
              Última atualização
            </label>

            <div className="rounded border bg-slate-50 p-2">
              {chamado.updatedAt
                ? new Date(
                    chamado.updatedAt
                  ).toLocaleString("pt-BR")
                : "-"}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}