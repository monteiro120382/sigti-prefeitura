import { Eye, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { Equipamento } from "@/types/equipamento";

interface Props {
  equipamento: Equipamento;

  onVisualizar?: (equipamento: Equipamento) => void;

  onEditar?: (equipamento: Equipamento) => void;

  onExcluir?: (id: number) => void;
}

export default function AcoesEquipamento({
  equipamento,
  onVisualizar,
  onEditar,
  onExcluir,
}: Props) {

  return (
    <div className="flex justify-center gap-2">

      <Button
        size="sm"
        variant="outline"
        title="Visualizar equipamento"
        onClick={() =>
          onVisualizar?.(equipamento)
        }
      >
        <Eye size={16} />
      </Button>


      <Button
        size="sm"
        variant="outline"
        title="Editar equipamento"
        onClick={() =>
          onEditar?.(equipamento)
        }
      >
        <Pencil size={16} />
      </Button>


      <Button
        size="sm"
        variant="destructive"
        title="Excluir equipamento"
        onClick={() =>
          equipamento.id &&
          onExcluir?.(equipamento.id)
        }
      >
        <Trash2 size={16} />
      </Button>

    </div>
  );
}