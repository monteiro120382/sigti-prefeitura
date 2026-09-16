import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  listarSecretarias,
  excluirSecretaria,
} from "@/api/secretarias";

import PesquisaSecretarias from "./components/PesquisaSecretarias";
import TabelaSecretarias from "./components/TabelaSecretarias";

import type { Secretaria } from "@/types/secretaria";

interface Props {
  reload: number;
  onEditar: (secretaria: Secretaria) => void;
}

export default function ListaSecretarias({
  reload,
  onEditar,
}: Props) {

  const [secretarias, setSecretarias] =
    useState<Secretaria[]>([]);

  const [pesquisa, setPesquisa] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  async function carregar() {
    try {
      setLoading(true);

      const dados =
        await listarSecretarias();

      setSecretarias(dados ?? []);

    } catch (error) {

      console.error(
        "Erro ao carregar secretarias:",
        error
      );

      alert(
        "Erro ao carregar secretarias."
      );

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, [reload]);

  const secretariasFiltradas =
    useMemo(() => {

      const texto =
        pesquisa
          .toLowerCase()
          .trim();

      if (!texto) {
        return secretarias;
      }

      return secretarias.filter(
        (secretaria) =>
          secretaria.nome
            ?.toLowerCase()
            .includes(texto) ||
          secretaria.sigla
            ?.toLowerCase()
            .includes(texto)
      );

    }, [secretarias, pesquisa]);

  async function excluir(id: number) {

    const confirmar =
      window.confirm(
        "Deseja realmente excluir esta secretaria?"
      );

    if (!confirmar) {
      return;
    }

    try {

      await excluirSecretaria(id);

      await carregar();

      alert(
        "Secretaria excluída com sucesso."
      );

    } catch (error: any) {

      console.error(
        "Erro ao excluir secretaria:",
        error
      );

      console.error(
        "Resposta do servidor:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ??
        "Não foi possível excluir a secretaria."
      );
    }
  }

  if (loading) {
    return (
      <div className="rounded-lg bg-white p-8 text-center shadow">
        Carregando secretarias...
      </div>
    );
  }

  return (
    <div className="space-y-4">

      <PesquisaSecretarias
        pesquisa={pesquisa}
        setPesquisa={setPesquisa}
      />

      <TabelaSecretarias
        secretarias={secretariasFiltradas}
        onEditar={onEditar}
        onExcluir={excluir}
      />

    </div>
  );
}
