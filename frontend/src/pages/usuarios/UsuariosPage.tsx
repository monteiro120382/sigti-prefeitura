import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";

import ListaUsuarios from "./ListaUsuarios";
import FormUsuario from "./components/FormUsuario";

import type { Usuario } from "@/types/usuario";

type TipoModal = "novo" | "editar" | null;

export default function UsuariosPage() {
  const [tipoModal, setTipoModal] =
    useState<TipoModal>(null);

  const [usuarioSelecionado, setUsuarioSelecionado] =
    useState<Usuario | null>(null);

  const [reload, setReload] = useState(0);

  function abrirNovo() {
    console.log("NOVO USUÁRIO");

    setUsuarioSelecionado(null);
    setTipoModal("novo");
  }

  function editar(usuario: Usuario) {
    console.log(
      "EDITAR USUÁRIO:",
      usuario
    );

    setUsuarioSelecionado(usuario);
    setTipoModal("editar");
  }

  function fecharModal() {
    setTipoModal(null);
    setUsuarioSelecionado(null);
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
            Usuários
          </h1>

          <p className="text-slate-500">
            Gerenciamento dos usuários do SIGTI
          </p>
        </div>

        <Button
          type="button"
          onClick={abrirNovo}
        >
          <Plus className="mr-2 h-4 w-4" />
          Novo Usuário
        </Button>

      </div>

      <ListaUsuarios
        reload={reload}
        onEditar={editar}
      />

      <Modal
        open={tipoModal !== null}
        title={
          tipoModal === "editar"
            ? "Editar Usuário"
            : "Novo Usuário"
        }
        onClose={fecharModal}
      >

        <FormUsuario
          usuario={usuarioSelecionado}
          onSuccess={atualizarLista}
        />

      </Modal>

    </div>
  );
}
