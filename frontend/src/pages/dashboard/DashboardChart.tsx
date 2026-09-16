import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { Chamado } from "@/types/chamado";
import type { Equipamento } from "@/types/equipamento";

interface Props {
  chamados: Chamado[];
  equipamentos: Equipamento[];
}

const meses = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

function chamadosPorMes(chamados: Chamado[]) {
  const agora = new Date();

  const resultado: {
    nome: string;
    quantidade: number;
  }[] = [];

  for (let i = 5; i >= 0; i--) {
    const data = new Date(
      agora.getFullYear(),
      agora.getMonth() - i,
      1
    );

    const ano = data.getFullYear();
    const mes = data.getMonth();

    const quantidade = chamados.filter((chamado) => {
      if (!chamado.createdAt) {
        return false;
      }

      const dataChamado = new Date(chamado.createdAt);

      return (
        dataChamado.getFullYear() === ano &&
        dataChamado.getMonth() === mes
      );
    }).length;

    resultado.push({
      nome: `${meses[mes]}/${String(ano).slice(-2)}`,
      quantidade,
    });
  }

  return resultado;
}

function equipamentosPorStatus(equipamentos: Equipamento[]) {
  const status = [
    {
      chave: "EM_USO",
      nome: "Em uso",
      cor: "bg-blue-600",
    },
    {
      chave: "ESTOQUE",
      nome: "Estoque",
      cor: "bg-slate-400",
    },
    {
      chave: "MANUTENCAO",
      nome: "Manutenção",
      cor: "bg-orange-500",
    },
    {
      chave: "BAIXADO",
      nome: "Baixado",
      cor: "bg-red-500",
    },
  ];

  return status.map((item) => ({
    nome: item.nome,
    cor: item.cor,
    quantidade: equipamentos.filter(
      (equipamento) => equipamento.status === item.chave
    ).length,
  }));
}

export default function DashboardChart({
  chamados,
  equipamentos,
}: Props) {
  const dadosChamados = chamadosPorMes(chamados);
  const dadosEquipamentos = equipamentosPorStatus(equipamentos);

  const maiorQuantidadeChamados = Math.max(
    ...dadosChamados.map((item) => item.quantidade),
    1
  );

  const maiorQuantidadeEquipamentos = Math.max(
    ...dadosEquipamentos.map((item) => item.quantidade),
    1
  );

  const totalPeriodo = dadosChamados.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  const mediaPeriodo =
    dadosChamados.length > 0
      ? totalPeriodo / dadosChamados.length
      : 0;

  const maiorMes = dadosChamados.reduce(
    (maior, item) =>
      item.quantidade > maior.quantidade
        ? item
        : maior,
    {
      nome: "-",
      quantidade: 0,
    }
  );

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle>Chamados por mês</CardTitle>

              <p className="mt-1 text-sm text-slate-500">
                Evolução dos chamados nos últimos 6 meses
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-slate-500">
                Total no período
              </p>

              <p className="text-2xl font-bold text-slate-800">
                {totalPeriodo}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="mb-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-500">
                Média mensal
              </p>

              <p className="mt-1 text-lg font-semibold text-slate-800">
                {mediaPeriodo.toFixed(1)}
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-3">
              <p className="text-xs text-slate-500">
                Maior volume
              </p>

              <p className="mt-1 text-lg font-semibold text-blue-700">
                {maiorMes.nome} · {maiorMes.quantidade}
              </p>
            </div>
          </div>

          <div className="flex h-80 items-end gap-3 border-b border-l px-4 pb-2 pt-6">
            {dadosChamados.map((item) => {
              const altura =
                item.quantidade === 0
                  ? 0
                  : Math.max(
                      (item.quantidade /
                        maiorQuantidadeChamados) *
                        100,
                      5
                    );

              const ehMaiorMes =
                item.quantidade === maiorMes.quantidade &&
                item.quantidade > 0;

              return (
                <div
                  key={item.nome}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                >
                  <span
                    className={`text-xs font-medium ${
                      ehMaiorMes
                        ? "text-blue-700"
                        : "text-slate-600"
                    }`}
                  >
                    {item.quantidade}
                  </span>

                  <div className="flex h-full w-full items-end">
                    <div
                      className={`w-full rounded-t transition-all ${
                        ehMaiorMes
                          ? "bg-blue-700"
                          : "bg-blue-500"
                      }`}
                      style={{
                        height: `${altura}%`,
                      }}
                      title={`${item.nome}: ${item.quantidade} chamados`}
                    />
                  </div>

                  <span
                    className={`text-xs ${
                      ehMaiorMes
                        ? "font-semibold text-blue-700"
                        : "text-slate-500"
                    }`}
                  >
                    {item.nome}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Equipamentos por status</CardTitle>

          <p className="mt-1 text-sm text-slate-500">
            Distribuição atual do patrimônio de TI
          </p>
        </CardHeader>

        <CardContent>
          <div className="space-y-5 pt-2">
            {dadosEquipamentos.map((item) => {
              const largura =
                item.quantidade === 0
                  ? 0
                  : Math.max(
                      (item.quantidade /
                        maiorQuantidadeEquipamentos) *
                        100,
                      3
                    );

              return (
                <div key={item.nome}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {item.nome}
                    </span>

                    <span className="text-sm font-semibold text-slate-600">
                      {item.quantidade}
                    </span>
                  </div>

                  <div className="h-4 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${item.cor} transition-all`}
                      style={{
                        width: `${largura}%`,
                      }}
                      title={`${item.nome}: ${item.quantidade} equipamentos`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
