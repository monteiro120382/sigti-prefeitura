import { useEffect, useState } from "react";

import {
  criarSecretaria,
  atualizarSecretaria,
} from "@/api/secretarias";

import { Button } from "@/components/ui/button";

import type { Secretaria } from "@/types/secretaria";

interface Props {
  secretaria?: Secretaria | null;
  onSuccess: () => void;
}

export default function FormSecretaria({
  secretaria,
  onSuccess,
}: Props) {

  const [nome, setNome] =
    useState("");

  const [sigla, setSigla] =
    useState("");

  const [salvando, setSalvando] =
    useState(false);

  useEffect(() => {

    if (secretaria) {

      setNome(
        secretaria.nome ?? ""
      );

      setSigla(
        secretaria.sigla ?? ""
      );

    } else {

      setNome("");
      setSigla("");

    }

  }, [secretaria]);

  async function salvar(
    event: React.FormEvent
  ) {

    event.preventDefault();

    if (!nome.trim()) {
      alert(
        "Informe o nome da secretaria."
      );
      return;
    }

    if (!sigla.trim()) {
      alert(
        "Informe a sigla da secretaria."
      );
      return;
    }

    try {

      setSalvando(true);

      const dados = {
        nome: nome.trim(),
        sigla: sigla.trim().toUpperCase(),
      };

      console.log(
        secretaria
          ? "ATUALIZANDO SECRETARIA:"
          : "CRIANDO SECRETARIA:",
        dados
      );

      if (secretaria) {

        await atualizarSecretaria(
          secretaria.id,
          dados
        );

        alert(
          "Secretaria atualizada com sucesso."
        );

      } else {

        await criarSecretaria(
          dados
        );

        alert(
          "Secretaria criada com sucesso."
        );
      }

      onSuccess();

    } catch (error: any) {

      console.error(
        "Erro ao salvar secretaria:",
        error
      );

      console.error(
        "Resposta do servidor:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ??
        error.response?.data?.erro ??
        "Erro ao salvar secretaria."
      );

    } finally {

      setSalvando(false);

    }
  }

  return (
    <form
      onSubmit={salvar}
      className="space-y-5"
    >

      <div>

        <label className="mb-1 block font-medium text-slate-700">
          Nome da Secretaria *
        </label>

        <input
          type="text"
          value={nome}
          onChange={(event) =>
            setNome(event.target.value)
          }
          placeholder="Ex.: Secretaria de Administração"
          maxLength={150}
          required
          disabled={salvando}
          className="w-full rounded-lg border border-slate-300 p-2.5 outline-none focus:border-slate-500 disabled:bg-slate-100"
        />

      </div>

      <div>

        <label className="mb-1 block font-medium text-slate-700">
          Sigla *
        </label>

        <input
          type="text"
          value={sigla}
          onChange={(event) =>
            setSigla(
              event.target.value.toUpperCase()
            )
          }
          placeholder="Ex.: ADM"
          maxLength={10}
          required
          disabled={salvando}
          className="w-full rounded-lg border border-slate-300 p-2.5 uppercase outline-none focus:border-slate-500 disabled:bg-slate-100"
        />

      </div>

      <div className="flex justify-end gap-3 border-t pt-5">

        <Button
          type="submit"
          disabled={salvando}
        >
          {salvando
            ? "Salvando..."
            : secretaria
              ? "Atualizar Secretaria"
              : "Cadastrar Secretaria"}
        </Button>

      </div>

    </form>
  );
}
