import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";

import ListaSecretarias from "./ListaSecretarias";
import FormSecretaria from "./components/FormSecretaria";

import type { Secretaria } from "@/types/secretaria";

type TipoModal = "novo" | "editar" | null;

export default function SecretariasPage() {
  const [tipoModal, setTipoModal] =
    useState<TipoModal>(null);

  const [secretariaSelecionada, setSecretariaSelecionada] =
    useState<Secretaria | null>(null);

  const [reload, setReload] = useState(0);

  function abrirNova() {
    console.log("NOVA SECRETARIA");

    setSecretariaSelecionada(null);
    setTipoModal("novo");
  }

  function editar(secretaria: Secretaria) {
    console.log(
      "EDITAR SECRETARIA:",
      secretaria
    );

    setSecretariaSelecionada(secretaria);
    setTipoModal("editar");
  }

  function fecharModal() {
    setTipoModal(null);
    setSecretariaSelecionada(null);
  }

  function atualizarLista() {
    setReload((valor) => valor + 1);
    fecharModal();
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Secretarias
          </h1>

          <p className="text-slate-500">
            Gerenciamento das secretarias
          </p>
        </div>

        <Button
          type="button"
          onClick={abrirNova}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nova Secretaria
        </Button>

      </div>

      <ListaSecretarias
        reload={reload}
        onEditar={editar}
      />

      <Modal
        open={tipoModal !== null}
        title={
          tipoModal === "editar"
            ? "Editar Secretaria"
            : "Nova Secretaria"
        }
        onClose={fecharModal}
      >

        <FormSecretaria
          secretaria={secretariaSelecionada}
          onSuccess={atualizarLista}
        />

      </Modal>

    </div>
  );
}
