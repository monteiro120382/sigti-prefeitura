import LinhaChamado from "./LinhaChamado";

import type { Chamado } from "@/types/chamado";

interface Props {
  chamados: Chamado[];

  onVisualizar?: (chamado: Chamado) => void;

  onEditar?: (chamado: Chamado) => void;

  onFinalizar?: (chamado: Chamado) => void;

  onExcluir?: (id: number) => void;
}

export default function TabelaChamados({
  chamados,
  onVisualizar,
  onEditar,
  onFinalizar,
  onExcluir,
}: Props) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left">
                Protocolo
              </th>

              <th className="px-4 py-3 text-left">
                Título
              </th>

              <th className="px-4 py-3 text-left">
                Prioridade
              </th>

              <th className="px-4 py-3 text-left">
                Status
              </th>

              <th className="px-4 py-3 text-left">
                Funcionário
              </th>

              <th className="px-4 py-3 text-right">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {chamados.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-slate-500"
                >
                  Nenhum chamado encontrado.
                </td>
              </tr>
            ) : (
              chamados.map((chamado) => (
                <LinhaChamado
                  key={chamado.id}
                  chamado={chamado}
                  onVisualizar={onVisualizar}
                  onEditar={onEditar}
                  onFinalizar={onFinalizar}
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
