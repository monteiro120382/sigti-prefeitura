import type { Equipamento } from "@/types/equipamento";

interface Props {
  equipamento: Equipamento;
  onVisualizar?: (equipamento: Equipamento) => void;
  onEditar?: (equipamento: Equipamento) => void;
  onExcluir?: (id: number) => void;
  onAlterarStatus?: (equipamento: Equipamento) => void;
}

export default function LinhaEquipamento({
  equipamento,
  onVisualizar,
  onEditar,
  onExcluir,
  onAlterarStatus,
}: Props) {
  function corStatus(status: string) {
    switch (status) {
      case "EM_USO":
        return "rounded bg-green-100 px-2 py-1 text-sm text-green-700";

      case "ESTOQUE":
        return "rounded bg-blue-100 px-2 py-1 text-sm text-blue-700";

      case "MANUTENCAO":
        return "rounded bg-yellow-100 px-2 py-1 text-sm text-yellow-700";

      case "BAIXADO":
        return "rounded bg-red-100 px-2 py-1 text-sm text-red-700";

      default:
        return "rounded bg-slate-100 px-2 py-1 text-sm text-slate-700";
    }
  }

  return (
    <tr
      key={equipamento.id}
      className="border-t"
    >
      <td className="px-4 py-3">
        {equipamento.patrimonio}
      </td>

      <td className="px-4 py-3">
        {equipamento.tipo}
      </td>

      <td className="px-4 py-3">
        {equipamento.marca}
      </td>

      <td className="px-4 py-3">
        {equipamento.modelo}
      </td>

      <td className="px-4 py-3">
        {equipamento.funcionario?.nome ?? "-"}
      </td>

      <td className="px-4 py-3">
        <span className={corStatus(equipamento.status)}>
          {equipamento.status}
        </span>
      </td>

      <td className="px-4 py-3">
        <div className="flex justify-end gap-2">

          {onVisualizar && (
            <button
              type="button"
              onClick={() => onVisualizar(equipamento)}
              className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
            >
              Visualizar
            </button>
          )}

          {onEditar && (
            <button
              type="button"
              onClick={() => onEditar(equipamento)}
              className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
            >
              Editar
            </button>
          )}

          {onAlterarStatus && (
            <button
              type="button"
              onClick={() => onAlterarStatus(equipamento)}
              className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
            >
              Status
            </button>
          )}

          {onExcluir && equipamento.id && (
            <button
              type="button"
              onClick={() => onExcluir(equipamento.id!)}
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
