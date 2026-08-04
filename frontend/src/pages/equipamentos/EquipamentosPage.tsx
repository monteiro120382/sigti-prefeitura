import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";

import ListaEquipamentos from "./ListaEquipamentos";
import FormEquipamento from "./components/FormEquipamento";

export default function EquipamentosPage() {
  const [modalAberto, setModalAberto] = useState(false);
  const [reload, setReload] = useState(0);

  function abrirModal() {
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
  }

  function atualizarLista() {
    setReload((valor) => valor + 1);
    setModalAberto(false);
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Equipamentos
          </h1>

          <p className="text-slate-500">
            Gerenciamento do patrimônio de TI
          </p>
        </div>

        <Button onClick={abrirModal}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Equipamento
        </Button>

      </div>

      <ListaEquipamentos reload={reload} />

      <Modal
        open={modalAberto}
        title="Novo Equipamento"
        onClose={fecharModal}
      >
        <FormEquipamento
          onSuccess={atualizarLista}
        />
      </Modal>

    </div>
  );
}