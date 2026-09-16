import LinhaSecretaria from "./LinhaSecretaria";

import type { Secretaria } from "@/types/secretaria";

interface Props {
  secretarias: Secretaria[];
  onEditar: (secretaria: Secretaria) => void;
  onExcluir: (id: number) => void;
}

export default function TabelaSecretarias({
  secretarias,
  onEditar,
  onExcluir,
}: Props) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left">
                Nome
              </th>

              <th className="px-4 py-3 text-left">
                Sigla
              </th>

              <th className="px-4 py-3 text-left">
                Status
              </th>

              <th className="px-4 py-3 text-right">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {secretarias.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-slate-500"
                >
                  Nenhuma secretaria encontrada.
                </td>
              </tr>
            ) : (
              secretarias.map((secretaria) => (
                <LinhaSecretaria
                  key={secretaria.id}
                  secretaria={secretaria}
                  onEditar={onEditar}
                  onExcluir={onExcluir}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
