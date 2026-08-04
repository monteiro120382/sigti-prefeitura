import LinhaEquipamento from "./LinhaEquipamento";
import type { Equipamento } from "@/types/equipamento";

interface Props {
  equipamentos: Equipamento[];

  onVisualizar?: (equipamento: Equipamento) => void;

  onEditar?: (equipamento: Equipamento) => void;

  onExcluir?: (id: number) => void;
}

export default function TabelaEquipamentos({
  equipamentos,
  onVisualizar,
  onEditar,
  onExcluir,
}: Props) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-3 text-left">
              Patrimônio
            </th>

            <th className="p-3 text-left">
              Tipo
            </th>

            <th className="p-3 text-left">
              Marca
            </th>

            <th className="p-3 text-left">
              Modelo
            </th>

            <th className="p-3 text-left">
              Funcionário
            </th>

            <th className="p-3 text-center">
              Status
            </th>

            <th className="p-3 text-center">
              Ações
            </th>

          </tr>

        </thead>

        <tbody>

          {equipamentos.length === 0 && (

            <tr>

              <td
                colSpan={7}
                className="p-8 text-center text-slate-500"
              >
                Nenhum equipamento encontrado.
              </td>

            </tr>

          )}

          {equipamentos.map((equipamento) => (

            <LinhaEquipamento
              key={equipamento.id}
              equipamento={equipamento}
              onVisualizar={onVisualizar}
              onEditar={onEditar}
              onExcluir={onExcluir}
            />

          ))}

        </tbody>

      </table>

    </div>
  );
}
