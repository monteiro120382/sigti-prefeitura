import { Eye, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { Equipamento } from "@/types/equipamento";

interface Props {
  equipamento: Equipamento;
  onVisualizar?: (equipamento: Equipamento) => void;
  onEditar?: (equipamento: Equipamento) => void;
  onExcluir?: (id: number) => void;
}

export default function LinhaEquipamento({
  equipamento,
  onVisualizar,
  onEditar,
  onExcluir,
}: Props) {
  function corStatus(status: string) {
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
    <tr className="border-t hover:bg-slate-50">

      <td className="p-3 font-medium">
        {equipamento.patrimonio}
      </td>

      <td className="p-3">
        {equipamento.tipo}
      </td>

      <td className="p-3">
        {equipamento.marca}
      </td>

      <td className="p-3">
        {equipamento.modelo}
      </td>

      <td className="p-3">
        {equipamento.funcionario?.nome ?? "-"}
      </td>

      <td className="p-3 text-center">

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${corStatus(
            equipamento.status
          )}`}
        >
          {equipamento.status}
        </span>

      </td>

      <td className="p-3">

        <div className="flex justify-center gap-2">

          <Button
            size="sm"
            variant="outline"
            onClick={() => onVisualizar?.(equipamento)}
          >
            <Eye size={16} />
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => onEditar?.(equipamento)}
          >
            <Pencil size={16} />
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => onExcluir?.(equipamento.id)}
          >
            <Trash2 size={16} />
          </Button>

        </div>

      </td>

    </tr>
  );
}
