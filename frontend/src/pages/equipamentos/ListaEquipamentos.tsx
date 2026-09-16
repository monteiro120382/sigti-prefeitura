import { useEffect, useMemo, useRef, useState } from "react";
import * as XLSX from "xlsx";

import {
  listarEquipamentos,
  excluirEquipamento,
  importarEquipamentos,
} from "@/api/equipamentos";

import PesquisaEquipamentos from "./components/PesquisaEquipamentos";
import TabelaEquipamentos from "./components/TabelaEquipamentos";

import type { Equipamento } from "@/types/equipamento";

interface Props {
  reload: number;
  onVisualizar?: (equipamento: Equipamento) => void;
  onEditar?: (equipamento: Equipamento) => void;
}

const COLUNAS_ESPERADAS = [
  "Patrimônio",
  "Tombamento",
  "Tipo",
  "Categoria",
  "Marca",
  "Fabricante",
  "Modelo",
  "Número de Série",
  "Valor de Aquisição",
  "Secretaria",
  "Setor",
  "Funcionário",
  "Status",
  "Estado",
  "Observação",
];

export default function ListaEquipamentos({
  reload,
  onVisualizar,
  onEditar,
}: Props) {
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([]);
  const [pesquisa, setPesquisa] = useState("");
  const [loading, setLoading] = useState(true);
  const [importando, setImportando] = useState(false);

  const inputArquivoRef = useRef<HTMLInputElement | null>(null);

  async function carregar() {
    try {
      setLoading(true);

      const resposta = await listarEquipamentos();

      setEquipamentos(resposta.data.data ?? []);
    } catch (erro) {
      console.error("Erro ao carregar equipamentos:", erro);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, [reload]);

  const equipamentosFiltrados = useMemo(() => {
    const texto = pesquisa.toLowerCase();

    return equipamentos.filter((item) => {
      return (
        item.patrimonio?.toLowerCase().includes(texto) ||
        item.tipo?.toLowerCase().includes(texto) ||
        item.marca?.toLowerCase().includes(texto) ||
        item.modelo?.toLowerCase().includes(texto) ||
        item.funcionario?.nome?.toLowerCase().includes(texto) ||
        item.secretaria?.nome?.toLowerCase().includes(texto) ||
        item.setor?.nome?.toLowerCase().includes(texto)
      );
    });
  }, [equipamentos, pesquisa]);

  async function excluir(id: number) {
    const confirmar = window.confirm(
      "Deseja realmente excluir este equipamento?"
    );

    if (!confirmar) {
      return;
    }

    try {
      await excluirEquipamento(id);

      await carregar();

      alert("Equipamento excluído com sucesso.");
    } catch (erro) {
      console.error("Erro ao excluir equipamento:", erro);

      alert("Erro ao excluir equipamento.");
    }
  }

  function abrirImportacao() {
    inputArquivoRef.current?.click();
  }

  function converterValor(valor: unknown): number | null {
    if (
      valor === null ||
      valor === undefined ||
      String(valor).trim() === ""
    ) {
      return null;
    }

    if (typeof valor === "number") {
      return Number.isFinite(valor) ? valor : null;
    }

    const texto = String(valor)
      .trim()
      .replace(/\./g, "")
      .replace(",", ".");

    const numero = Number(texto);

    return Number.isFinite(numero) ? numero : null;
  }

  async function importarArquivo(
    evento: React.ChangeEvent<HTMLInputElement>
  ) {
    const arquivo = evento.target.files?.[0];

    if (!arquivo) {
      return;
    }

    try {
      setImportando(true);

      const dados = await arquivo.arrayBuffer();

      const workbook = XLSX.read(dados, {
        type: "array",
      });

      if (workbook.SheetNames.length === 0) {
        alert("A planilha não possui nenhuma aba.");
        return;
      }

      const nomePrimeiraAba = workbook.SheetNames[0];

      const planilha = workbook.Sheets[nomePrimeiraAba];

      const linhas = XLSX.utils.sheet_to_json<any>(
        planilha,
        {
          defval: "",
          raw: true,
        }
      );

      if (linhas.length === 0) {
        alert("A planilha não possui registros.");
        return;
      }

      const colunasEncontradas = Object.keys(linhas[0]);

      const colunasAusentes = COLUNAS_ESPERADAS.filter(
        (coluna) => !colunasEncontradas.includes(coluna)
      );

      if (colunasAusentes.length > 0) {
        alert(
          "A planilha não corresponde ao modelo de Equipamentos do SIGTI.\n\n" +
          "Colunas ausentes:\n" +
          colunasAusentes.join("\n")
        );

        return;
      }

      const registros = linhas.map((linha) => ({
        patrimonio: String(
          linha["Patrimônio"] ?? ""
        ).trim(),

        tombamento: String(
          linha["Tombamento"] ?? ""
        ).trim(),

        tipo: String(
          linha["Tipo"] ?? ""
        ).trim(),

        categoria: String(
          linha["Categoria"] ?? ""
        ).trim(),

        marca: String(
          linha["Marca"] ?? ""
        ).trim(),

        fabricante: String(
          linha["Fabricante"] ?? ""
        ).trim(),

        modelo: String(
          linha["Modelo"] ?? ""
        ).trim(),

        numeroSerie: String(
          linha["Número de Série"] ?? ""
        ).trim(),

        valorAquisicao: converterValor(
          linha["Valor de Aquisição"]
        ),

        secretaria: String(
          linha["Secretaria"] ?? ""
        ).trim(),

        setor: String(
          linha["Setor"] ?? ""
        ).trim(),

        funcionario: String(
          linha["Funcionário"] ?? ""
        ).trim(),

        status: String(
          linha["Status"] ?? ""
        ).trim(),

        estado: String(
          linha["Estado"] ?? ""
        ).trim(),

        observacao: String(
          linha["Observação"] ?? ""
        ).trim(),
      }));

      const confirmar = window.confirm(
        `A planilha possui ${registros.length} registro(s).\n\n` +
        "Deseja iniciar a importação?"
      );

      if (!confirmar) {
        return;
      }

      const resposta = await importarEquipamentos(
        registros
      );

      const resultado = resposta.data.data;

      const total = resultado?.total ?? 0;
      const importados = resultado?.importados ?? 0;
      const erros = resultado?.erros ?? 0;

      let mensagem =
        "Importação concluída.\n\n" +
        `Total de registros: ${total}\n` +
        `Importados: ${importados}\n` +
        `Erros: ${erros}`;

      if (erros > 0) {
        const listaErros = (resultado?.resultados ?? [])
          .filter(
            (item: any) => item.status === "ERRO"
          )
          .map(
            (item: any) =>
              `Linha ${item.linha} - Patrimônio: ${
                item.patrimonio || "(vazio)"
              }\n${item.mensagem}`
          )
          .join("\n\n");

        mensagem +=
          "\n\nERROS ENCONTRADOS:\n\n" +
          listaErros;
      }

      alert(mensagem);

      await carregar();
    } catch (erro: any) {
      console.error(
        "Erro ao importar equipamentos:",
        erro
      );

      const mensagem =
        erro?.response?.data?.message ||
        "Erro ao importar a planilha.";

      alert(mensagem);
    } finally {
      setImportando(false);

      if (inputArquivoRef.current) {
        inputArquivoRef.current.value = "";
      }
    }
  }

  function exportarExcel() {
    if (equipamentosFiltrados.length === 0) {
      alert("Não há equipamentos para exportar.");
      return;
    }

    const dados = equipamentosFiltrados.map((equipamento) => ({
      Patrimônio: equipamento.patrimonio ?? "",
      Tombamento: equipamento.tombamento ?? "",
      Tipo: equipamento.tipo ?? "",
      Categoria: equipamento.categoria ?? "",
      Marca: equipamento.marca ?? "",
      Fabricante: equipamento.fabricante ?? "",
      Modelo: equipamento.modelo ?? "",
      "Número de Série": equipamento.numeroSerie ?? "",
      "Valor de Aquisição":
        equipamento.valorAquisicao ?? "",
      Secretaria: equipamento.secretaria?.nome ?? "",
      Setor: equipamento.setor?.nome ?? "",
      Funcionário:
        equipamento.funcionario?.nome ?? "",
      Status: equipamento.status ?? "",
      Estado: equipamento.estado ?? "",
      Observação:
        equipamento.observacao ?? "",
    }));

    const planilha = XLSX.utils.json_to_sheet(
      dados
    );

    planilha["!cols"] = [
      { wch: 15 },
      { wch: 15 },
      { wch: 18 },
      { wch: 18 },
      { wch: 18 },
      { wch: 20 },
      { wch: 20 },
      { wch: 22 },
      { wch: 18 },
      { wch: 30 },
      { wch: 25 },
      { wch: 30 },
      { wch: 18 },
      { wch: 18 },
      { wch: 40 },
    ];

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      planilha,
      "Equipamentos"
    );

    const data = new Date()
      .toISOString()
      .slice(0, 10);

    XLSX.writeFile(
      workbook,
      `equipamentos_${data}.xlsx`
    );
  }

  if (loading) {
    return (
      <div className="rounded-lg bg-white p-8 text-center shadow">
        Carregando equipamentos...
      </div>
    );
  }

  return (
    <div className="space-y-4">

      <input
        ref={inputArquivoRef}
        type="file"
        accept=".xlsx,.xls"
        onChange={importarArquivo}
        className="hidden"
      />

      <div className="flex items-center justify-between gap-4">

        <div className="flex-1">
          <PesquisaEquipamentos
            pesquisa={pesquisa}
            setPesquisa={setPesquisa}
          />
        </div>

        <div className="flex gap-2">

          <button
            type="button"
            onClick={abrirImportacao}
            disabled={importando}
            className="whitespace-nowrap rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {importando
              ? "Importando..."
              : "Importar Excel"}
          </button>

          <button
            type="button"
            onClick={exportarExcel}
            className="whitespace-nowrap rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-100"
          >
            Exportar Excel
          </button>

        </div>

      </div>

      <TabelaEquipamentos
        equipamentos={equipamentosFiltrados}
        onVisualizar={onVisualizar}
        onEditar={onEditar}
        onExcluir={excluir}
      />

    </div>
  );
}
