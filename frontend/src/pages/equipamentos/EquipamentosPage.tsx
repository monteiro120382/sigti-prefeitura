import { useState } from "react";
import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import ListaEquipamentos from "./ListaEquipamentos";
import FormEquipamento from "./components/FormEquipamento";
import VisualizarEquipamento from "./components/VisualizarEquipamento";

import type { Equipamento } from "@/types/equipamento";

type TipoModal = "novo" | "editar" | "visualizar" | null;

export default function EquipamentosPage() {
  const [tipoModal, setTipoModal] = useState<TipoModal>(null);

  const [equipamentoSelecionado, setEquipamentoSelecionado] =
    useState<Equipamento | null>(null);

  const [reload, setReload] = useState(0);

  function abrirNovo() {
    setEquipamentoSelecionado(null);
    setTipoModal("novo");
  }

  function visualizar(equipamento: Equipamento) {
    setEquipamentoSelecionado(equipamento);
    setTipoModal("visualizar");
  }

  function editar(equipamento: Equipamento) {
    setEquipamentoSelecionado(equipamento);
    setTipoModal("editar");
  }

  function fecharModal() {
    setTipoModal(null);
    setEquipamentoSelecionado(null);
  }

  function atualizarLista() {
    setReload((valor) => valor + 1);
    fecharModal();
  }

  function atualizarPagina() {
    setReload((valor) => valor + 1);
  }

  function tituloModal() {
    if (tipoModal === "novo") {
      return "Novo Equipamento";
    }

    if (tipoModal === "editar") {
      return "Editar Equipamento";
    }

    if (tipoModal === "visualizar") {
      return "Visualizar Equipamento";
    }

    return "";
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Equipamentos
          </h1>

          <p className="text-slate-500">
            Gerenciamento do patrimônio de TI
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={atualizarPagina}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Atualizar
          </button>

          <Button
            type="button"
            onClick={abrirNovo}
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Equipamento
          </Button>
        </div>
      </div>

      <ListaEquipamentos
        reload={reload}
        onVisualizar={visualizar}
        onEditar={editar}
      />

      {tipoModal !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(evento) => {
            if (evento.target === evento.currentTarget) {
              fecharModal();
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b p-5">
              <h2 className="text-xl font-bold text-slate-800">
                {tituloModal()}
              </h2>

              <button
                type="button"
                onClick={fecharModal}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                aria-label="Fechar"
              >
                <X size={22} />
              </button>
            </div>

            <div className="p-6">
              {tipoModal === "novo" && (
                <FormEquipamento
                  onSuccess={atualizarLista}
                />
              )}

              {tipoModal === "editar" &&
                equipamentoSelecionado && (
                  <FormEquipamento
                    equipamento={equipamentoSelecionado}
                    onSuccess={atualizarLista}
                  />
                )}

              {tipoModal === "visualizar" &&
                equipamentoSelecionado && (
                  <VisualizarEquipamento
                    equipamento={equipamentoSelecionado}
                  />
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
