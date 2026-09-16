import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Loader2,
  RefreshCw,
  Users,
  XCircle,
  AlertTriangle,
  Building2,
} from "lucide-react";

import {
  buscarResumoRelatorios,
  buscarRelatoriosPorTecnico,
  buscarRelatoriosPorSecretaria,
  buscarRelatoriosPorPeriodo,
  buscarChamadosRecentes,
} from "@/api/relatorios";

interface Resumo {
  total: number;

  status: {
    abertos: number;
    emAtendimento: number;
    aguardando: number;
    finalizados: number;
    cancelados: number;
  };

  prioridades: {
    baixa: number;
    media: number;
    alta: number;
    urgente: number;
  };
}

interface Tecnico {
  id: number;
  nome: string;
  email: string;
  total: number;
  abertos: number;
  emAtendimento: number;
  aguardando: number;
  finalizados: number;
  cancelados: number;
}

interface Secretaria {
  id: number;
  nome: string;
  sigla: string;
  total: number;
  abertos: number;
  emAtendimento: number;
  aguardando: number;
  finalizados: number;
  cancelados: number;
}

interface Chamado {
  id: number;
  protocolo: string;
  titulo: string;
  prioridade: string;
  status: string;
  createdAt: string;

  secretaria?: {
    id: number;
    nome: string;
    sigla: string;
  };

  tecnico?: {
    id: number;
    nome: string;
  };

  resolucao?: string | null;
}

function numeroSeguro(valor: unknown) {
  return typeof valor === "number" && Number.isFinite(valor)
    ? valor
    : 0;
}

function normalizarResumo(dados: any): Resumo {
  const origem = dados ?? {};

  const chamados =
    origem.chamados ??
    origem.status ??
    origem;

  const prioridades = origem.prioridades ?? {
    baixa: 0,
    media: 0,
    alta: 0,
    urgente: 0,
  };

  return {
    total: numeroSeguro(
      origem.total ??
        chamados.total
    ),

    status: {
      abertos: numeroSeguro(
        chamados.abertos
      ),

      emAtendimento: numeroSeguro(
        chamados.emAtendimento
      ),

      aguardando: numeroSeguro(
        chamados.aguardando
      ),

      finalizados: numeroSeguro(
        chamados.finalizados
      ),

      cancelados: numeroSeguro(
        chamados.cancelados
      ),
    },

    prioridades: {
      baixa: numeroSeguro(
        prioridades.baixa
      ),

      media: numeroSeguro(
        prioridades.media
      ),

      alta: numeroSeguro(
        prioridades.alta
      ),

      urgente: numeroSeguro(
        prioridades.urgente
      ),
    },
  };
}

function formatarData(data: string) {
  if (!data) {
    return "-";
  }

  return new Date(data).toLocaleDateString("pt-BR");
}

function obterClasseStatus(status: string) {
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

function obterClassePrioridade(prioridade: string) {
  switch (prioridade) {
    case "BAIXA":
      return "bg-slate-100 text-slate-700";

    case "MEDIA":
      return "bg-blue-100 text-blue-700";

    case "ALTA":
      return "bg-orange-100 text-orange-700";

    case "URGENTE":
      return "bg-red-100 text-red-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

function formatarStatus(status: string) {
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

export default function RelatoriosPage() {
  const [resumo, setResumo] = useState<Resumo | null>(null);

  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);

  const [secretarias, setSecretarias] = useState<Secretaria[]>([]);

  const [chamados, setChamados] = useState<Chamado[]>([]);

  const [dataInicial, setDataInicial] = useState("");

  const [dataFinal, setDataFinal] = useState("");

  const [loading, setLoading] = useState(true);

  const [erro, setErro] = useState("");

  const [atualizando, setAtualizando] = useState(false);

  async function carregarRelatorios(
    mostrarLoading = true
  ) {
    try {
      if (mostrarLoading) {
        setLoading(true);
      } else {
        setAtualizando(true);
      }

      setErro("");

      const [
        resumoData,
        tecnicosData,
        secretariasData,
        recentesData,
      ] = await Promise.all([
        buscarResumoRelatorios(),
        buscarRelatoriosPorTecnico(),
        buscarRelatoriosPorSecretaria(),
        buscarChamadosRecentes(),
      ]);

      setResumo(
        normalizarResumo(resumoData)
      );

      setTecnicos(
        Array.isArray(tecnicosData)
          ? tecnicosData
          : []
      );

      setSecretarias(
        Array.isArray(secretariasData)
          ? secretariasData
          : []
      );

      setChamados(
        Array.isArray(recentesData)
          ? recentesData
          : []
      );
    } catch (error: any) {
      console.error(
        "Erro ao carregar relatórios:",
        error
      );

      console.error(
        "Resposta:",
        error?.response?.data
      );

      setErro(
        error?.response?.data?.message ??
          error?.response?.data?.erro ??
          "Não foi possível carregar os relatórios."
      );
    } finally {
      setLoading(false);
      setAtualizando(false);
    }
  }

  useEffect(() => {
    carregarRelatorios();
  }, []);

  function exportarExcel() {
    const workbook = XLSX.utils.book_new();

    if (resumo) {
      const dadosResumo = [
        {
          Indicador: "Total de chamados",
          Quantidade: resumo.total,
        },
        {
          Indicador: "Abertos",
          Quantidade: resumo.status.abertos,
        },
        {
          Indicador: "Em atendimento",
          Quantidade:
            resumo.status.emAtendimento,
        },
        {
          Indicador: "Aguardando",
          Quantidade:
            resumo.status.aguardando,
        },
        {
          Indicador: "Finalizados",
          Quantidade:
            resumo.status.finalizados,
        },
        {
          Indicador: "Cancelados",
          Quantidade:
            resumo.status.cancelados,
        },
        {
          Indicador: "Prioridade baixa",
          Quantidade:
            resumo.prioridades.baixa,
        },
        {
          Indicador: "Prioridade média",
          Quantidade:
            resumo.prioridades.media,
        },
        {
          Indicador: "Prioridade alta",
          Quantidade:
            resumo.prioridades.alta,
        },
        {
          Indicador: "Prioridade urgente",
          Quantidade:
            resumo.prioridades.urgente,
        },
      ];

      const planilhaResumo =
        XLSX.utils.json_to_sheet(
          dadosResumo
        );

      XLSX.utils.book_append_sheet(
        workbook,
        planilhaResumo,
        "Resumo"
      );
    }

    const dadosTecnicos = tecnicos.map(
      (tecnico) => ({
        Técnico: tecnico.nome,
        Email: tecnico.email,
        Total: tecnico.total,
        Abertos: tecnico.abertos,
        "Em atendimento":
          tecnico.emAtendimento,
        Aguardando:
          tecnico.aguardando,
        Finalizados:
          tecnico.finalizados,
        Cancelados:
          tecnico.cancelados,
      })
    );

    const planilhaTecnicos =
      XLSX.utils.json_to_sheet(
        dadosTecnicos
      );

    XLSX.utils.book_append_sheet(
      workbook,
      planilhaTecnicos,
      "Por Técnico"
    );

    const dadosSecretarias =
      secretarias.map(
        (secretaria) => ({
          Secretaria: secretaria.nome,
          Sigla: secretaria.sigla,
          Total: secretaria.total,
          Abertos: secretaria.abertos,
          "Em atendimento":
            secretaria.emAtendimento,
          Aguardando:
            secretaria.aguardando,
          Finalizados:
            secretaria.finalizados,
          Cancelados:
            secretaria.cancelados,
        })
      );

    const planilhaSecretarias =
      XLSX.utils.json_to_sheet(
        dadosSecretarias
      );

    XLSX.utils.book_append_sheet(
      workbook,
      planilhaSecretarias,
      "Por Secretaria"
    );

    const dadosChamados = chamados.map(
      (chamado) => ({
        Protocolo: chamado.protocolo,
        Título: chamado.titulo,

        Secretaria:
          chamado.secretaria?.sigla ??
          chamado.secretaria?.nome ??
          "",

        Técnico:
          chamado.tecnico?.nome ??
          "",

        Prioridade:
          chamado.prioridade,

        Status:
          formatarStatus(
            chamado.status
          ),

        Resolução:
          chamado.resolucao ?? "",

        Data:
          formatarData(
            chamado.createdAt
          ),
      })
    );

    const planilhaChamados =
      XLSX.utils.json_to_sheet(
        dadosChamados
      );

    XLSX.utils.book_append_sheet(
      workbook,
      planilhaChamados,
      "Chamados"
    );

    const hoje = new Date()
      .toISOString()
      .slice(0, 10);

    XLSX.writeFile(
      workbook,
      `relatorio-sigti-${hoje}.xlsx`
    );
  }

  async function aplicarPeriodo() {
    try {
      setLoading(true);
      setErro("");

      const dados =
        await buscarRelatoriosPorPeriodo(
          dataInicial || undefined,
          dataFinal || undefined
        );

      setChamados(
        Array.isArray(dados)
          ? dados
          : []
      );
    } catch (error: any) {
      console.error(
        "Erro ao consultar período:",
        error
      );

      setErro(
        error?.response?.data?.message ??
          error?.response?.data?.erro ??
          "Erro ao consultar relatório por período."
      );
    } finally {
      setLoading(false);
    }
  }

  async function limparPeriodo() {
    setDataInicial("");
    setDataFinal("");

    await carregarRelatorios();
  }

  if (loading && !resumo) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-3 text-slate-600">
          <Loader2 className="h-6 w-6 animate-spin" />

          <span>
            Carregando relatórios...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Relatórios
          </h1>

          <p className="text-slate-500">
            Relatórios e indicadores do SIGTI
          </p>
        </div>

        <div className="flex flex-wrap gap-2">

          <button
            type="button"
            onClick={exportarExcel}
            disabled={loading || !resumo}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Exportar Excel
          </button>

          <button
            type="button"
            onClick={() =>
              carregarRelatorios(false)
            }
            disabled={atualizando}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${
                atualizando
                  ? "animate-spin"
                  : ""
              }`}
            />

            Atualizar
          </button>

        </div>

      </div>

      {erro && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {erro}
        </div>
      )}

      {resumo && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Total
                  </p>

                  <p className="mt-1 text-3xl font-bold text-slate-800">
                    {resumo.total}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-100 p-3">
                  <FileText className="h-6 w-6 text-slate-700" />
                </div>

              </div>
            </div>

            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Abertos
                  </p>

                  <p className="mt-1 text-3xl font-bold text-blue-600">
                    {resumo.status.abertos}
                  </p>
                </div>

                <div className="rounded-lg bg-blue-100 p-3">
                  <Clock3 className="h-6 w-6 text-blue-600" />
                </div>

              </div>
            </div>

            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Em atendimento
                  </p>

                  <p className="mt-1 text-3xl font-bold text-yellow-600">
                    {resumo.status.emAtendimento}
                  </p>
                </div>

                <div className="rounded-lg bg-yellow-100 p-3">
                  <Clock3 className="h-6 w-6 text-yellow-600" />
                </div>

              </div>
            </div>

            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Finalizados
                  </p>

                  <p className="mt-1 text-3xl font-bold text-green-600">
                    {resumo.status.finalizados}
                  </p>
                </div>

                <div className="rounded-lg bg-green-100 p-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>

              </div>
            </div>

            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Cancelados
                  </p>

                  <p className="mt-1 text-3xl font-bold text-red-600">
                    {resumo.status.cancelados}
                  </p>
                </div>

                <div className="rounded-lg bg-red-100 p-3">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>

              </div>
            </div>

          </div>

          <div className="grid gap-6 lg:grid-cols-2">

            <div className="rounded-xl border bg-white p-6 shadow-sm">

              <div className="mb-5 flex items-center gap-3">

                <div className="rounded-lg bg-slate-100 p-3">
                  <BarChart3 className="h-5 w-5 text-slate-700" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-slate-800">
                    Chamados por status
                  </h2>

                  <p className="text-sm text-slate-500">
                    Situação atual dos chamados
                  </p>
                </div>

              </div>

              <div className="space-y-4">

                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Aberto</span>

                    <span className="font-semibold">
                      {resumo.status.abertos}
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{
                        width: `${
                          resumo.total
                            ? (resumo.status.abertos /
                                resumo.total) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Em atendimento</span>

                    <span className="font-semibold">
                      {resumo.status.emAtendimento}
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-yellow-500"
                      style={{
                        width: `${
                          resumo.total
                            ? (resumo.status.emAtendimento /
                                resumo.total) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Aguardando</span>

                    <span className="font-semibold">
                      {resumo.status.aguardando}
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-orange-500"
                      style={{
                        width: `${
                          resumo.total
                            ? (resumo.status.aguardando /
                                resumo.total) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Finalizado</span>

                    <span className="font-semibold">
                      {resumo.status.finalizados}
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-green-500"
                      style={{
                        width: `${
                          resumo.total
                            ? (resumo.status.finalizados /
                                resumo.total) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Cancelado</span>

                    <span className="font-semibold">
                      {resumo.status.cancelados}
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-red-500"
                      style={{
                        width: `${
                          resumo.total
                            ? (resumo.status.cancelados /
                                resumo.total) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>

              </div>

            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">

              <div className="mb-5 flex items-center gap-3">

                <div className="rounded-lg bg-slate-100 p-3">
                  <AlertTriangle className="h-5 w-5 text-slate-700" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-slate-800">
                    Chamados por prioridade
                  </h2>

                  <p className="text-sm text-slate-500">
                    Distribuição das prioridades
                  </p>
                </div>

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="rounded-lg border bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">
                    Baixa
                  </p>

                  <p className="mt-1 text-2xl font-bold text-slate-700">
                    {resumo.prioridades.baixa}
                  </p>
                </div>

                <div className="rounded-lg border bg-blue-50 p-4">
                  <p className="text-sm text-blue-600">
                    Média
                  </p>

                  <p className="mt-1 text-2xl font-bold text-blue-700">
                    {resumo.prioridades.media}
                  </p>
                </div>

                <div className="rounded-lg border bg-orange-50 p-4">
                  <p className="text-sm text-orange-600">
                    Alta
                  </p>

                  <p className="mt-1 text-2xl font-bold text-orange-700">
                    {resumo.prioridades.alta}
                  </p>
                </div>

                <div className="rounded-lg border bg-red-50 p-4">
                  <p className="text-sm text-red-600">
                    Urgente
                  </p>

                  <p className="mt-1 text-2xl font-bold text-red-700">
                    {resumo.prioridades.urgente}
                  </p>
                </div>

              </div>

            </div>

          </div>
        </>
      )}

      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <div className="mb-5 flex items-center gap-3">

          <div className="rounded-lg bg-slate-100 p-3">
            <CalendarDays className="h-5 w-5 text-slate-700" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Relatório por período
            </h2>

            <p className="text-sm text-slate-500">
              Consulte chamados entre duas datas
            </p>
          </div>

        </div>

        <div className="grid gap-4 md:grid-cols-4">

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Data inicial
            </label>

            <input
              type="date"
              value={dataInicial}
              onChange={(event) =>
                setDataInicial(
                  event.target.value
                )
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Data final
            </label>

            <input
              type="date"
              value={dataFinal}
              onChange={(event) =>
                setDataFinal(
                  event.target.value
                )
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={aplicarPeriodo}
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Consultar período
            </button>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={limparPeriodo}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Limpar período
            </button>
          </div>

        </div>

      </div>

      <div className="rounded-xl border bg-white shadow-sm">

        <div className="border-b p-6">

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-slate-100 p-3">
              <FileText className="h-5 w-5 text-slate-700" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Chamados
              </h2>

              <p className="text-sm text-slate-500">
                Resultado da consulta
              </p>
            </div>

          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-left text-sm">

            <thead className="bg-slate-50 text-slate-600">

              <tr>
                <th className="px-6 py-3 font-medium">
                  Protocolo
                </th>

                <th className="px-6 py-3 font-medium">
                  Título
                </th>

                <th className="px-6 py-3 font-medium">
                  Secretaria
                </th>

                <th className="px-6 py-3 font-medium">
                  Técnico
                </th>

                <th className="px-6 py-3 font-medium">
                  Resolução
                </th>

                <th className="px-6 py-3 font-medium">
                  Prioridade
                </th>

                <th className="px-6 py-3 font-medium">
                  Status
                </th>

                <th className="px-6 py-3 font-medium">
                  Data
                </th>
              </tr>

            </thead>

            <tbody className="divide-y">

              {chamados.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-10 text-center text-slate-500"
                  >
                    Nenhum chamado encontrado.
                  </td>
                </tr>
              ) : (
                chamados.map(
                  (chamado) => (
                    <tr
                      key={chamado.id}
                      className="hover:bg-slate-50"
                    >

                      <td className="px-6 py-4 font-medium text-slate-800">
                        {chamado.protocolo}
                      </td>

                      <td className="max-w-xs px-6 py-4">
                        <div className="truncate text-slate-800">
                          {chamado.titulo}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {chamado.secretaria?.sigla ??
                          chamado.secretaria?.nome ??
                          "-"}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {chamado.tecnico?.nome ??
                          "-"}
                      </td>

                      <td className="max-w-sm px-6 py-4 text-slate-600">
                        <div
                          className="truncate"
                          title={
                            chamado.resolucao ??
                            undefined
                          }
                        >
                          {chamado.resolucao ??
                            "-"}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${obterClassePrioridade(
                            chamado.prioridade
                          )}`}
                        >
                          {chamado.prioridade}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${obterClasseStatus(
                            chamado.status
                          )}`}
                        >
                          {formatarStatus(
                            chamado.status
                          )}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {formatarData(
                          chamado.createdAt
                        )}
                      </td>

                    </tr>
                  )
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-xl border bg-white shadow-sm">

          <div className="border-b p-6">

            <div className="flex items-center gap-3">

              <div className="rounded-lg bg-slate-100 p-3">
                <Users className="h-5 w-5 text-slate-700" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Por técnico
                </h2>

                <p className="text-sm text-slate-500">
                  Chamados por técnico
                </p>
              </div>

            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left text-sm">

              <thead className="bg-slate-50">

                <tr>
                  <th className="px-5 py-3">
                    Técnico
                  </th>

                  <th className="px-5 py-3">
                    Total
                  </th>

                  <th className="px-5 py-3">
                    Finalizados
                  </th>
                </tr>

              </thead>

              <tbody className="divide-y">

                {tecnicos.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-5 py-8 text-center text-slate-500"
                    >
                      Nenhum técnico encontrado.
                    </td>
                  </tr>
                ) : (
                  tecnicos.map(
                    (tecnico) => (
                      <tr
                        key={tecnico.id}
                        className="hover:bg-slate-50"
                      >

                        <td className="px-5 py-4">

                          <div className="font-medium text-slate-800">
                            {tecnico.nome}
                          </div>

                          <div className="text-xs text-slate-500">
                            {tecnico.email}
                          </div>

                        </td>

                        <td className="px-5 py-4 font-semibold">
                          {tecnico.total}
                        </td>

                        <td className="px-5 py-4 font-semibold text-green-600">
                          {tecnico.finalizados}
                        </td>

                      </tr>
                    )
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

        <div className="rounded-xl border bg-white shadow-sm">

          <div className="border-b p-6">

            <div className="flex items-center gap-3">

              <div className="rounded-lg bg-slate-100 p-3">
                <Building2 className="h-5 w-5 text-slate-700" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Por secretaria
                </h2>

                <p className="text-sm text-slate-500">
                  Chamados por secretaria
                </p>
              </div>

            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left text-sm">

              <thead className="bg-slate-50">

                <tr>
                  <th className="px-5 py-3">
                    Secretaria
                  </th>

                  <th className="px-5 py-3">
                    Total
                  </th>

                  <th className="px-5 py-3">
                    Finalizados
                  </th>
                </tr>

              </thead>

              <tbody className="divide-y">

                {secretarias.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-5 py-8 text-center text-slate-500"
                    >
                      Nenhuma secretaria encontrada.
                    </td>
                  </tr>
                ) : (
                  secretarias.map(
                    (secretaria) => (
                      <tr
                        key={secretaria.id}
                        className="hover:bg-slate-50"
                      >

                        <td className="px-5 py-4">

                          <div className="font-medium text-slate-800">
                            {secretaria.nome}
                          </div>

                          <div className="text-xs text-slate-500">
                            {secretaria.sigla}
                          </div>

                        </td>

                        <td className="px-5 py-4 font-semibold">
                          {secretaria.total}
                        </td>

                        <td className="px-5 py-4 font-semibold text-green-600">
                          {secretaria.finalizados}
                        </td>

                      </tr>
                    )
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}
