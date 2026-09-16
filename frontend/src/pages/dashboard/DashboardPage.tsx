import { useEffect, useMemo, useState } from "react";

import DashboardCards from "./DashboardCards";
import DashboardChart from "./DashboardChart";
import RecentCalls from "./RecentCalls";

import { listarChamados } from "@/api/chamados";
import { listarEquipamentos } from "@/api/equipamentos";

import type {
  Chamado,
  PrioridadeChamado,
} from "@/types/chamado";
import type { Equipamento } from "@/types/equipamento";

interface RespostaAPI<T> {
  success?: boolean;
  message?: string;
  data?: T[];
}

type PeriodoFiltro =
  | "TODOS"
  | "7"
  | "30"
  | "90"
  | "180";

type PrioridadeFiltro =
  | "TODAS"
  | PrioridadeChamado;

export default function DashboardPage() {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [equipamentos, setEquipamentos] = useState<
    Equipamento[]
  >([]);

  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [erro, setErro] = useState("");

  const [periodo, setPeriodo] =
    useState<PeriodoFiltro>("TODOS");

  const [prioridade, setPrioridade] =
    useState<PrioridadeFiltro>("TODAS");

  async function carregarDados(
    isAtualizacao = false
  ) {
    if (isAtualizacao) {
      setAtualizando(true);
    } else {
      setCarregando(true);
    }

    setErro("");

    try {
      const resChamados = await listarChamados();

      const respostaChamados =
        resChamados.data as RespostaAPI<Chamado>;

      if (Array.isArray(respostaChamados?.data)) {
        setChamados(respostaChamados.data);
      }

      const resEquipamentos =
        await listarEquipamentos();

      const respostaEquipamentos =
        resEquipamentos.data as RespostaAPI<Equipamento>;

      if (Array.isArray(respostaEquipamentos?.data)) {
        setEquipamentos(respostaEquipamentos.data);
      }
    } catch (error) {
      console.error(
        "Erro ao carregar Dashboard:",
        error
      );

      setErro(
        "Não foi possível atualizar os dados da Dashboard."
      );
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  const chamadosFiltrados = useMemo(() => {
    let resultado = [...chamados];

    if (periodo !== "TODOS") {
      const dias = Number(periodo);

      const limite = new Date();

      limite.setDate(
        limite.getDate() - dias
      );

      resultado = resultado.filter((chamado) => {
        if (!chamado.createdAt) {
          return false;
        }

        const dataChamado = new Date(
          chamado.createdAt
        );

        return dataChamado >= limite;
      });
    }

    if (prioridade !== "TODAS") {
      resultado = resultado.filter(
        (chamado) =>
          chamado.prioridade === prioridade
      );
    }

    return resultado;
  }, [chamados, periodo, prioridade]);

  const indicadoresPrioridade = useMemo(() => {
    return [
      {
        chave: "BAIXA" as PrioridadeChamado,
        nome: "Baixa",
        quantidade: chamadosFiltrados.filter(
          (chamado) =>
            chamado.prioridade === "BAIXA"
        ).length,
        corFundo: "bg-green-50",
        corTexto: "text-green-700",
        corBarra: "bg-green-500",
      },
      {
        chave: "MEDIA" as PrioridadeChamado,
        nome: "Média",
        quantidade: chamadosFiltrados.filter(
          (chamado) =>
            chamado.prioridade === "MEDIA"
        ).length,
        corFundo: "bg-yellow-50",
        corTexto: "text-yellow-700",
        corBarra: "bg-yellow-500",
      },
      {
        chave: "ALTA" as PrioridadeChamado,
        nome: "Alta",
        quantidade: chamadosFiltrados.filter(
          (chamado) =>
            chamado.prioridade === "ALTA"
        ).length,
        corFundo: "bg-orange-50",
        corTexto: "text-orange-700",
        corBarra: "bg-orange-500",
      },
    ];
  }, [chamadosFiltrados]);

  const maiorQuantidadePrioridade = Math.max(
    ...indicadoresPrioridade.map(
      (item) => item.quantidade
    ),
    1
  );

  function limparFiltros() {
    setPeriodo("TODOS");
    setPrioridade("TODAS");
  }

  const filtrosAtivos =
    periodo !== "TODOS" ||
    prioridade !== "TODAS";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="text-slate-500">
            Bem-vindo ao Sistema Integrado de Gestão de TI.
          </p>
        </div>

        <button
          type="button"
          onClick={() => carregarDados(true)}
          disabled={
            carregando || atualizando
          }
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {atualizando
            ? "Atualizando..."
            : "Atualizar"}
        </button>
      </div>

      {erro && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {erro}
        </div>
      )}

      {carregando ? (
        <div className="rounded-lg border bg-white p-8 text-center text-slate-500">
          Carregando dados da Dashboard...
        </div>
      ) : (
        <>
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-end gap-4">
              <div className="min-w-[180px] flex-1">
                <label
                  htmlFor="filtro-periodo"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Período
                </label>

                <select
                  id="filtro-periodo"
                  value={periodo}
                  onChange={(event) =>
                    setPeriodo(
                      event.target
                        .value as PeriodoFiltro
                    )
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="TODOS">
                    Todos os períodos
                  </option>

                  <option value="7">
                    Últimos 7 dias
                  </option>

                  <option value="30">
                    Últimos 30 dias
                  </option>

                  <option value="90">
                    Últimos 90 dias
                  </option>

                  <option value="180">
                    Últimos 6 meses
                  </option>
                </select>
              </div>

              <div className="min-w-[180px] flex-1">
                <label
                  htmlFor="filtro-prioridade"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Prioridade
                </label>

                <select
                  id="filtro-prioridade"
                  value={prioridade}
                  onChange={(event) =>
                    setPrioridade(
                      event.target
                        .value as PrioridadeFiltro
                    )
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="TODAS">
                    Todas as prioridades
                  </option>

                  <option value="BAIXA">
                    Baixa
                  </option>

                  <option value="MEDIA">
                    Média
                  </option>

                  <option value="ALTA">
                    Alta
                  </option>
                </select>
              </div>

              {filtrosAtivos && (
                <button
                  type="button"
                  onClick={limparFiltros}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Limpar filtros
                </button>
              )}

              <div className="rounded-lg bg-blue-50 px-4 py-2">
                <p className="text-xs text-blue-600">
                  Chamados exibidos
                </p>

                <p className="text-lg font-bold text-blue-700">
                  {chamadosFiltrados.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-slate-800">
                Chamados por prioridade
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Distribuição dos chamados conforme os filtros selecionados
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {indicadoresPrioridade.map((item) => {
                const largura =
                  item.quantidade === 0
                    ? 0
                    : Math.max(
                        (item.quantidade /
                          maiorQuantidadePrioridade) *
                          100,
                        4
                      );

                return (
                  <div
                    key={item.chave}
                    className={`rounded-xl p-4 ${item.corFundo}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`text-sm font-semibold ${item.corTexto}`}
                      >
                        {item.nome}
                      </span>

                      <span
                        className={`text-2xl font-bold ${item.corTexto}`}
                      >
                        {item.quantidade}
                      </span>
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/80">
                      <div
                        className={`h-full rounded-full transition-all ${item.corBarra}`}
                        style={{
                          width: `${largura}%`,
                        }}
                      />
                    </div>

                    <p
                      className={`mt-2 text-xs ${item.corTexto}`}
                    >
                      {item.quantidade === 1
                        ? "1 chamado"
                        : `${item.quantidade} chamados`}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <DashboardCards
            chamados={chamadosFiltrados}
            equipamentos={equipamentos}
          />

          <DashboardChart
            chamados={chamadosFiltrados}
            equipamentos={equipamentos}
          />

          <RecentCalls
            chamados={chamadosFiltrados}
          />
        </>
      )}
    </div>
  );
}
