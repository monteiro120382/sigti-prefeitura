
import { useEffect, useState } from "react";

import type { Chamado } from "@/types/chamado";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  criarChamado,
  atualizarChamado,
} from "@/api/chamados";

import { listarSecretarias } from "@/api/secretarias";
import { listarSetores } from "@/api/setores";
import { listarFuncionarios } from "@/api/funcionarios";
import { listarEquipamentos } from "@/api/equipamentos";

interface Props {
  onSuccess: () => void;
  chamado?: Chamado | null;
}

export default function FormChamado({
  onSuccess,
  chamado,
}: Props) {
  const { usuario } = useAuth();
  const [secretarias, setSecretarias] =
    useState<any[]>([]);

  const [setores, setSetores] =
    useState<any[]>([]);

  const [funcionarios, setFuncionarios] =
    useState<any[]>([]);

  const [equipamentos, setEquipamentos] =
    useState<any[]>([]);

  const [salvando, setSalvando] =
    useState(false);

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    prioridade: "MEDIA",
    secretariaId: "",
    setorId: "",
    funcionarioId: "",
    equipamentoId: "",
  });

  /*
   * Preenche o formulário quando estiver editando
   */
  useEffect(() => {

    if (chamado) {

      setForm({

        titulo:
          chamado.titulo ?? "",

        descricao:
          chamado.descricao ?? "",

        prioridade:
          chamado.prioridade ?? "MEDIA",

        secretariaId:
          chamado.secretariaId
            ? String(chamado.secretariaId)
            : "",

        setorId:
          chamado.setorId
            ? String(chamado.setorId)
            : "",

        funcionarioId:
          chamado.funcionarioId
            ? String(chamado.funcionarioId)
            : "",

        equipamentoId:
          chamado.equipamentoId
            ? String(chamado.equipamentoId)
            : "",

      });

    } else {

      /*
       * Limpa o formulário quando for
       * um novo chamado
       */
      setForm({
        titulo: "",
        descricao: "",
        prioridade: "MEDIA",
        secretariaId: "",
        setorId: "",
        funcionarioId: "",
        equipamentoId: "",
      });

    }

  }, [chamado]);

  /*
   * Carrega os dados dos selects
   */
  useEffect(() => {

    carregarDados();

  }, []);

  async function carregarDados() {

    try {

      const [
        listaSecretarias,
        listaSetores,
        listaFuncionarios,
        listaEquipamentos,
      ] = await Promise.all([

        listarSecretarias(),

        listarSetores(),

        listarFuncionarios(),

        listarEquipamentos(),

      ]);

      setSecretarias(
        listaSecretarias ?? []
      );

      setSetores(
        listaSetores ?? []
      );

      setFuncionarios(
        listaFuncionarios ?? []
      );

      setEquipamentos(
        listaEquipamentos.data.data ?? []
      );

    } catch (error) {

      console.error(
        "Erro ao carregar dados do formulário:",
        error
      );

    }

  }

  /*
   * Altera os campos do formulário
   */
  function alterarCampo(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) {

    const {
      name,
      value,
    } = e.target;

    setForm(
      (formAnterior) => ({
        ...formAnterior,
        [name]: value,
      })
    );

  }

  /*
   * Salva ou atualiza o chamado
   */
  async function salvar(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setSalvando(true);

      const dados = {

        titulo:
          form.titulo,

        descricao:
          form.descricao,

        prioridade:
          form.prioridade as any,

        secretariaId:
          Number(form.secretariaId),

        setorId:
          Number(form.setorId),

        funcionarioId:
          Number(form.funcionarioId),

        equipamentoId:
          form.equipamentoId.trim() !== ""
            ? Number(form.equipamentoId)
            : null,

      };

      console.log(
        chamado
          ? "PAYLOAD EDITAR:"
          : "PAYLOAD CRIAR:",
        dados
      );

      /*
       * EDIÇÃO
       */
      if (chamado) {

        if (!chamado.id) {

          throw new Error(
            "Chamado sem ID para atualização."
          );

        }

        await atualizarChamado(
          Number(chamado.id),
          dados
        );

        alert(
          "Chamado atualizado com sucesso."
        );

      }

      /*
       * CRIAÇÃO
       */
      else {

        await criarChamado(
          dados as any
        );

        alert(
          "Chamado criado com sucesso."
        );

      }

      /*
       * Avisa a página pai para
       * atualizar a lista e fechar o modal
       */
      onSuccess();

    } catch (error: any) {

      console.error(
        "Erro ao salvar chamado:",
        error
      );

      console.error(
        "Resposta do servidor:",
        error.response?.data
      );

      alert(

        error.response?.data?.erro ??

        error.response?.data?.message ??

        "Erro ao salvar chamado."

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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

        {/* TÍTULO */}

        <div className="md:col-span-2">

          <label className="mb-1 block font-medium">
            Título
          </label>

          <input
            type="text"
            name="titulo"
            value={form.titulo}
            onChange={alterarCampo}
            required
            className="w-full rounded border p-2"
          />

        </div>

        {/* DESCRIÇÃO */}

        <div className="md:col-span-2">

          <label className="mb-1 block font-medium">
            Descrição
          </label>

          <textarea
            name="descricao"
            value={form.descricao}
            onChange={alterarCampo}
            rows={5}
            required
            className="w-full rounded border p-2"
          />

        </div>

        {/* PRIORIDADE */}
{usuario?.perfil !== "SOLICITANTE" && (
  <div>
    <label>Prioridade</label>

    <select
      name="prioridade"
      value={form.prioridade}
      onChange={alterarCampo}
    >
      <option value="BAIXA">Baixa</option>
      <option value="MEDIA">Média</option>
      <option value="ALTA">Alta</option>
    </select>
  </div>
)}

        {/* SECRETARIA */}

        <div>

          <label className="mb-1 block font-medium">
            Secretaria
          </label>

          <select
            name="secretariaId"
            value={form.secretariaId}
            onChange={alterarCampo}
            required
            className="w-full rounded border p-2"
          >

            <option value="">
              Selecione...
            </option>

            {secretarias.map(
              (secretaria) => (

                <option
                  key={secretaria.id}
                  value={secretaria.id}
                >
                  {secretaria.nome}
                </option>

              )
            )}

          </select>

        </div>

        {/* SETOR */}

        <div>

          <label className="mb-1 block font-medium">
            Setor
          </label>

          <select
            name="setorId"
            value={form.setorId}
            onChange={alterarCampo}
            required
            className="w-full rounded border p-2"
          >

            <option value="">
              Selecione...
            </option>

            {setores.map(
              (setor) => (

                <option
                  key={setor.id}
                  value={setor.id}
                >
                  {setor.nome}
                </option>

              )
            )}

          </select>

        </div>

        {/* FUNCIONÁRIO */}

        <div>

          <label className="mb-1 block font-medium">
            Funcionário
          </label>

          <select
            name="funcionarioId"
            value={form.funcionarioId}
            onChange={alterarCampo}
            required
            className="w-full rounded border p-2"
          >

            <option value="">
              Selecione...
            </option>

            {funcionarios.map(
              (funcionario) => (

                <option
                  key={funcionario.id}
                  value={funcionario.id}
                >
                  {funcionario.nome}
                </option>

              )
            )}

          </select>

        </div>

        {/* EQUIPAMENTO */}

        <div>

          <label className="mb-1 block font-medium">
            Equipamento
          </label>

          <select
            name="equipamentoId"
            value={form.equipamentoId}
            onChange={alterarCampo}
            className="w-full rounded border p-2"
          >

            <option value="">
              Nenhum equipamento
            </option>

            {equipamentos.map(
              (equipamento) => (

                <option
                  key={equipamento.id}
                  value={equipamento.id}
                >

                  {equipamento.patrimonio}

                  {" - "}

                  {equipamento.marca ?? ""}

                  {" "}

                  {equipamento.modelo ?? ""}

                </option>

              )
            )}

          </select>

        </div>

      </div>

      {/* BOTÕES */}

      <div className="flex justify-end gap-3 border-t pt-4">

        <Button
          type="submit"
          disabled={salvando}
        >

          {salvando
            ? "Salvando..."
            : chamado
              ? "Atualizar Chamado"
              : "Salvar Chamado"}

        </Button>

      </div>

    </form>

  );

}
