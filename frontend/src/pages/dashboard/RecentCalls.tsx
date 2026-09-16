import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type {
  Chamado,
  StatusChamado,
} from "@/types/chamado";

interface Props {
  chamados: Chamado[];
}

function nomeStatus(status: StatusChamado) {
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

function corStatus(status: StatusChamado) {
  switch (status) {
    case "ABERTO":
      return "bg-blue-100 text-blue-700";

    case "EM_ATENDIMENTO":
      return "bg-yellow-100 text-yellow-700";

    case "AGUARDANDO":
      return "bg-orange-100 text-orange-700";

    case "FINALIZADO":
      return "bg-green-100 text-green-700";

    case "CANCELADO":
      return "bg-red-100 text-red-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

function formatarData(data?: string) {
  if (!data) {
    return "-";
  }

  const dataFormatada = new Date(data);

  if (Number.isNaN(dataFormatada.getTime())) {
    return "-";
  }

  return dataFormatada.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function RecentCalls({
  chamados,
}: Props) {
  const ultimosChamados = [...chamados]
    .sort((a, b) => {
      const dataA = a.createdAt
        ? new Date(a.createdAt).getTime()
        : 0;

      const dataB = b.createdAt
        ? new Date(b.createdAt).getTime()
        : 0;

      return dataB - dataA;
    })
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle>Últimos Chamados</CardTitle>

            <p className="mt-1 text-sm text-slate-500">
              Chamados registrados mais recentemente
            </p>
          </div>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {ultimosChamados.length}{" "}
            {ultimosChamados.length === 1
              ? "chamado"
              : "chamados"}
          </span>
        </div>
      </CardHeader>

      <CardContent>
        {ultimosChamados.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200 py-10 text-center">
            <p className="text-sm font-medium text-slate-600">
              Nenhum chamado encontrado.
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Os chamados registrados aparecerão aqui.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Protocolo
                  </th>

                  <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Solicitante
                  </th>

                  <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Chamado
                  </th>

                  <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Data
                  </th>

                  <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {ultimosChamados.map((chamado) => (
                  <tr
                    key={chamado.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="py-4 pr-4">
                      <span className="font-semibold text-slate-700">
                        {chamado.protocolo ?? "-"}
                      </span>
                    </td>

                    <td className="py-4 pr-4">
                      <span className="text-sm text-slate-700">
                        {chamado.solicitante?.nome ??
                          chamado.funcionario?.nome ??
                          "-"}
                      </span>
                    </td>

                    <td className="max-w-[280px] py-4 pr-4">
                      <p className="truncate text-sm font-medium text-slate-800">
                        {chamado.titulo}
                      </p>
                    </td>

                    <td className="whitespace-nowrap py-4 pr-4">
                      <span className="text-sm text-slate-500">
                        {formatarData(
                          chamado.createdAt
                        )}
                      </span>
                    </td>

                    <td className="py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${corStatus(
                          chamado.status
                        )}`}
                      >
                        {nomeStatus(chamado.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
