import type { Chamado } from "@/types/chamado";

interface Props {
  chamado: Chamado;
  onVisualizar?: (chamado: Chamado) => void;
  onEditar?: (chamado: Chamado) => void;
  onFinalizar?: (chamado: Chamado) => void;
  onExcluir?: (id: number) => void;
}

export default function LinhaChamado({
  chamado,
  onVisualizar,
  onEditar,
  onFinalizar,
  onExcluir,
}: Props) {
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
        return "rounded bg-blue-100 px-2 py-1 text-sm text-blue-700";

      case "EM_ATENDIMENTO":
        return "rounded bg-yellow-100 px-2 py-1 text-sm text-yellow-700";

      case "AGUARDANDO":
        return "rounded bg-orange-100 px-2 py-1 text-sm text-orange-700";

      case "FINALIZADO":
        return "rounded bg-green-100 px-2 py-1 text-sm text-green-700";

      case "CANCELADO":
        return "rounded bg-red-100 px-2 py-1 text-sm text-red-700";

      default:
        return "rounded bg-slate-100 px-2 py-1 text-sm text-slate-700";
    }
  }

  return (
    <tr
      key={chamado.id}
      className="border-t"
    >
      <td className="px-4 py-3">
        {chamado.protocolo ?? "-"}
      </td>

      <td className="px-4 py-3">
        {chamado.titulo}
      </td>

      <td className="px-4 py-3">
        {chamado.prioridade}
      </td>

      <td className="px-4 py-3">
        <span className={corStatus(chamado.status)}>
          {nomeStatus(chamado.status)}
        </span>
      </td>

      <td className="px-4 py-3">
        {chamado.funcionario?.nome ?? "-"}
      </td>

      <td className="px-4 py-3">
        <div className="flex justify-end gap-2">

          {onVisualizar && (
            <button
              type="button"
              onClick={() => onVisualizar(chamado)}
              className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
            >
              Visualizar
            </button>
          )}

          {onEditar && (
            <button
              type="button"
              onClick={() => onEditar(chamado)}
              className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
            >
              Editar
            </button>
          )}

          {onFinalizar && chamado.status !== "FINALIZADO" && (
            <button
              type="button"
              onClick={() => onFinalizar(chamado)}
              className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
            >
              Finalizar
            </button>
          )}

          {onExcluir && chamado.id && (
            <button
              type="button"
              onClick={() => onExcluir(chamado.id!)}
              className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
            >
              Excluir
            </button>
          )}

        </div>
      </td>
    </tr>
  );
}
