import { useState } from "react";
import { Plus } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import type { Chamado } from "@/types/chamado";

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";

import ListaChamados from "./ListaChamados";
import FormChamado from "./components/FormChamado";

export default function ChamadosPage() {
  const { usuario } = useAuth();

  const ehSolicitante =
    usuario?.perfil === "SOLICITANTE";

  const [modalAberto, setModalAberto] = useState(false);

  const [reload, setReload] = useState(0);

  const [chamadoSelecionado, setChamadoSelecionado] =
    useState<Chamado | null>(null);

  function abrirNovoChamado() {
    setChamadoSelecionado(null);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setChamadoSelecionado(null);
  }

  function atualizarLista() {
    setReload((valor) => valor + 1);

    setModalAberto(false);
    setChamadoSelecionado(null);
  }

  function atualizarPagina() {
    setReload((valor) => valor + 1);
  }

  function editar(chamado: Chamado) {
    setChamadoSelecionado(chamado);
    setModalAberto(true);
  }

  const modoEdicao =
    chamadoSelecionado !== null;

  return (
    <div className="space-y-6">

      <div className="flex flex-wrap items-center justify-between gap-3">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            {ehSolicitante
              ? "Meus Chamados"
              : "Chamados"}
          </h1>

          <p className="text-slate-500">
            {ehSolicitante
              ? "Acompanhe seus chamados e o status do atendimento"
              : "Gerenciamento dos chamados técnicos"}
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

          <Button onClick={abrirNovoChamado}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Chamado
          </Button>

        </div>

      </div>

      <ListaChamados
        reload={reload}
        onEditar={ehSolicitante ? undefined : editar}
        somenteVisualizacao={ehSolicitante}
      />

      {!ehSolicitante && (
        <Modal
          open={modalAberto}
          title={
            modoEdicao
              ? "Editar Chamado"
              : "Novo Chamado"
          }
          onClose={fecharModal}
        >
          <FormChamado
            chamado={chamadoSelecionado}
            onSuccess={atualizarLista}
          />
        </Modal>
      )}

      {ehSolicitante && (
        <Modal
          open={modalAberto}
          title="Novo Chamado"
          onClose={fecharModal}
        >
          <FormChamado
            chamado={null}
            onSuccess={atualizarLista}
          />
        </Modal>
      )}

    </div>
  );
}
