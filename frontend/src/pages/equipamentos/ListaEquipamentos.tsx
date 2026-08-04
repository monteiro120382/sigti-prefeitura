import { useEffect, useMemo, useState } from "react";

import { listarEquipamentos } from "@/api/equipamentos";

import PesquisaEquipamentos from "./components/PesquisaEquipamentos";
import TabelaEquipamentos from "./components/TabelaEquipamentos";

import type { Equipamento } from "@/types/equipamento";

interface Props {
  reload: number;
}

export default function ListaEquipamentos({
  reload,
}: Props) {

  const [equipamentos, setEquipamentos] =
    useState<Equipamento[]>([]);

  const [pesquisa, setPesquisa] =
    useState("");

  const [loading, setLoading] =
    useState(true);


  async function carregar() {

    try {

      setLoading(true);

      const resposta =
        await listarEquipamentos();

      setEquipamentos(
        resposta.data.data ?? []
      );


    } catch (erro) {

      console.error(
        "Erro ao carregar equipamentos:",
        erro
      );

    } finally {

      setLoading(false);

    }

  }


  useEffect(() => {

    carregar();

  }, [reload]);



  const equipamentosFiltrados =
    useMemo(() => {

      const texto =
        pesquisa.toLowerCase();


      return equipamentos.filter(
        (item) => {

          return (

            item.patrimonio
              ?.toLowerCase()
              .includes(texto)

            ||

            item.tipo
              ?.toLowerCase()
              .includes(texto)

            ||

            item.marca
              ?.toLowerCase()
              .includes(texto)

            ||

            item.modelo
              ?.toLowerCase()
              .includes(texto)

          );

        }
      );


    }, [
      equipamentos,
      pesquisa
    ]);



  function visualizar(
    equipamento: Equipamento
  ) {

    console.log(
      "Visualizar",
      equipamento
    );

  }



  function editar(
    equipamento: Equipamento
  ) {

    console.log(
      "Editar",
      equipamento
    );

  }



  async function excluir(
    id: number
  ) {

    console.log(
      "Excluir",
      id
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


      <PesquisaEquipamentos

        pesquisa={pesquisa}

        setPesquisa={setPesquisa}

      />


      <TabelaEquipamentos

        equipamentos={
          equipamentosFiltrados
        }

        onVisualizar={
          visualizar
        }

        onEditar={
          editar
        }

        onExcluir={
          excluir
        }

      />


    </div>

  );

}
