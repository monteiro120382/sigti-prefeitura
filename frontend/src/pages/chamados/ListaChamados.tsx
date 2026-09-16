import { useEffect, useMemo, useState } from "react";

import {
  listarChamados,
  excluirChamado,
  finalizarChamado,
} from "@/api/chamados";

import PesquisaChamados from "./components/PesquisaChamados";
import TabelaChamados from "./components/TabelaChamados";
import VisualizarChamado from "./components/VisualizarChamado";

import type { Chamado } from "@/types/chamado";

interface Props {
  reload: number;
  onEditar?: (chamado: Chamado) => void;
  somenteVisualizacao?: boolean;
}

export default function ListaChamados({
  reload,
  onEditar,
  somenteVisualizacao = false,
}: Props) {
  const [chamados, setChamados] = useState<Chamado[]>([]);

  const [pesquisa, setPesquisa] = useState("");

  const [loading, setLoading] = useState(true);

  const [chamadoVisualizado, setChamadoVisualizado] =
    useState<Chamado | null>(null);

  const [modalVisualizar, setModalVisualizar] = useState(false);

  const [excluindo, setExcluindo] = useState(false);

  const [finalizando, setFinalizando] = useState(false);

  async function carregar() {
    try {
      setLoading(true);

      const resposta = await listarChamados();

      setChamados(resposta.data.data ?? []);
    } catch (erro) {
      console.error(
        "Erro ao carregar chamados:",
        erro
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, [reload]);

  const chamadosFiltrados = useMemo(() => {
    const texto = pesquisa
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    if (!texto) {
      return chamados;
    }

    function normalizar(valor: unknown) {
      return String(valor ?? "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    }

    return chamados.filter((item) => {
      const campos = [
        item.id,
        item.protocolo,
        item.titulo,
        item.descricao,
        item.status,
        item.prioridade,
        item.funcionario?.nome,
        item.funcionario?.matricula,
        item.secretaria?.nome,
        item.secretaria?.sigla,
        item.setor?.nome,
        item.setor?.sigla,
        item.equipamento?.patrimonio,
        item.equipamento?.marca,
        item.equipamento?.modelo,
        item.solicitante?.nome,
        item.solicitante?.email,
        item.tecnico?.nome,
        item.tecnico?.email,
      ];

      return campos.some((campo) =>
        normalizar(campo).includes(texto)
      );
    });
  }, [chamados, pesquisa]);

  function visualizar(chamado: Chamado) {
    setChamadoVisualizado(chamado);
    setModalVisualizar(true);
  }

  function fecharVisualizacao() {
    setModalVisualizar(false);
    setChamadoVisualizado(null);
  }

  function editar(chamado: Chamado) {
    if (somenteVisualizacao) {
      return;
    }

    onEditar?.(chamado);
  }

  async function finalizar(chamado: Chamado) {
    if (somenteVisualizacao) {
      return;
    }

    if (!chamado.id) {
      alert("ID do chamado não informado.");
      return;
    }

    if (
      chamado.status === "FINALIZADO" ||
      chamado.status === "CANCELADO"
    ) {
      return;
    }

    const confirmar = window.confirm(
      `Deseja realmente finalizar o chamado ${
        chamado.protocolo ?? `#${chamado.id}`
      }?`
    );

    if (!confirmar) {
      return;
    }

    const observacao = window.prompt(
      "Informe a resolução do chamado:"
    );

    if (observacao === null) {
      return;
    }

    if (!observacao.trim()) {
      alert(
        "A resolução do chamado é obrigatória para finalizar."
      );
      return;
    }

    try {
      setFinalizando(true);

      await finalizarChamado(
        chamado.id,
        observacao.trim()
      );

      setChamados((listaAtual) =>
        listaAtual.map((item) =>
          item.id === chamado.id
            ? {
                ...item,
                status: "FINALIZADO",
              }
            : item
        )
      );

      alert("Chamado finalizado com sucesso.");
    } catch (erro: any) {
      console.error(
        "Erro ao finalizar chamado:",
        erro
      );

      alert(
        erro?.response?.data?.erro ??
          erro?.response?.data?.message ??
          "Erro ao finalizar chamado."
      );
    } finally {
      setFinalizando(false);
    }
  }

  async function excluir(id: number) {
    if (somenteVisualizacao) {
      return;
    }

    if (!id) {
      console.error(
        "ID do chamado não informado."
      );

      return;
    }

    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este chamado?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setExcluindo(true);

      await excluirChamado(id);

      setChamados((listaAtual) =>
        listaAtual.filter(
          (chamado) => chamado.id !== id
        )
      );

      alert(
        "Chamado excluído com sucesso."
      );
    } catch (erro: any) {
      console.error(
        "Erro ao excluir chamado:",
        erro
      );

      alert(
        erro?.response?.data?.erro ??
          erro?.response?.data?.message ??
          "Erro ao excluir chamado."
      );
    } finally {
      setExcluindo(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-lg bg-white p-8 text-center shadow">
        Carregando chamados...
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <PesquisaChamados
          pesquisa={pesquisa}
          setPesquisa={setPesquisa}
        />

        <TabelaChamados
          chamados={chamadosFiltrados}
          onVisualizar={visualizar}
          onEditar={
            somenteVisualizacao
              ? undefined
              : editar
          }
          onFinalizar={
            somenteVisualizacao || finalizando
              ? undefined
              : finalizar
          }
          onExcluir={
            somenteVisualizacao || excluindo
              ? undefined
              : excluir
          }
        />
      </div>

      {modalVisualizar && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              fecharVisualizacao();
            }
          }}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white shadow-2xl"
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-5">
              <h2 className="text-xl font-bold text-slate-800">
                Visualizar Chamado
              </h2>

              <button
                type="button"
                onClick={fecharVisualizacao}
                className="rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <VisualizarChamado
                chamado={chamadoVisualizado}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
