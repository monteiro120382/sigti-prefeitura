import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import {
  criarEquipamento,
  atualizarEquipamento,
} from "@/api/equipamentos";

import { listarSecretarias } from "@/api/secretarias";
import { listarSetores } from "@/api/setores";
import { listarFuncionarios } from "@/api/funcionarios";

import type { Equipamento } from "@/types/equipamento";

interface FormEquipamentoProps {
  equipamento?: Equipamento;
  onSuccess: () => void;
}

interface Secretaria {
  id: number;
  nome: string;
}

interface Setor {
  id: number;
  nome: string;
  secretariaId: number;
}

interface Funcionario {
  id: number;
  nome: string;
  setorId: number;
}

interface FormularioEquipamento {
  patrimonio: string;
  tombamento: string;
  tipo: string;
  categoria: string;
  marca: string;
  fabricante: string;
  modelo: string;
  numeroSerie: string;
  valorAquisicao: string;
  secretariaId: string;
  setorId: string;
  funcionarioId: string;
  status: string;
  estado: string;
  observacao: string;
}

function criarFormularioVazio(): FormularioEquipamento {
  return {
    patrimonio: "",
    tombamento: "",
    tipo: "",
    categoria: "",
    marca: "",
    fabricante: "",
    modelo: "",
    numeroSerie: "",
    valorAquisicao: "",
    secretariaId: "",
    setorId: "",
    funcionarioId: "",
    status: "ESTOQUE",
    estado: "BOM",
    observacao: "",
  };
}

export default function FormEquipamento({
  equipamento,
  onSuccess,
}: FormEquipamentoProps) {
  const [form, setForm] =
    useState<FormularioEquipamento>(
      criarFormularioVazio()
    );

  const [secretarias, setSecretarias] =
    useState<Secretaria[]>([]);

  const [setores, setSetores] =
    useState<Setor[]>([]);

  const [funcionarios, setFuncionarios] =
    useState<Funcionario[]>([]);

  const [salvando, setSalvando] =
    useState(false);

  useEffect(() => {
    async function carregarSecretarias() {
      try {
        const dados = await listarSecretarias();
        setSecretarias(dados ?? []);
      } catch (error) {
        console.error(
          "Erro ao carregar secretarias:",
          error
        );
      }
    }

    carregarSecretarias();
  }, []);

  useEffect(() => {
    if (!equipamento) {
      setForm(criarFormularioVazio());
      setSetores([]);
      setFuncionarios([]);
      return;
    }

    setForm({
      patrimonio: equipamento.patrimonio ?? "",
      tombamento: equipamento.tombamento ?? "",
      tipo: equipamento.tipo ?? "",
      categoria: equipamento.categoria ?? "",
      marca: equipamento.marca ?? "",
      fabricante: equipamento.fabricante ?? "",
      modelo: equipamento.modelo ?? "",
      numeroSerie: equipamento.numeroSerie ?? "",

      valorAquisicao:
        equipamento.valorAquisicao !== null &&
        equipamento.valorAquisicao !== undefined
          ? String(equipamento.valorAquisicao)
          : "",

      secretariaId:
        equipamento.secretariaId
          ? String(equipamento.secretariaId)
          : "",

      setorId:
        equipamento.setorId
          ? String(equipamento.setorId)
          : "",

      funcionarioId:
        equipamento.funcionarioId
          ? String(equipamento.funcionarioId)
          : "",

      status:
        equipamento.status ?? "ESTOQUE",

      estado:
        equipamento.estado ?? "BOM",

      observacao:
        equipamento.observacao ?? "",
    });

    carregarSetores(equipamento.secretariaId);
    carregarFuncionarios(equipamento.setorId);
  }, [equipamento]);

  async function carregarSetores(
    secretariaId: number
  ) {
    if (!secretariaId) {
      setSetores([]);
      return;
    }

    try {
      const dados = await listarSetores();

      const filtrados =
        (dados ?? []).filter(
          (item: Setor) =>
            item.secretariaId === secretariaId
        );

      setSetores(filtrados);
    } catch (error) {
      console.error(
        "Erro ao carregar setores:",
        error
      );

      setSetores([]);
    }
  }

  async function carregarFuncionarios(
    setorId: number
  ) {
    if (!setorId) {
      setFuncionarios([]);
      return;
    }

    try {
      const dados =
        await listarFuncionarios();

      const filtrados =
        (dados ?? []).filter(
          (item: Funcionario) =>
            item.setorId === setorId
        );

      setFuncionarios(filtrados);
    } catch (error) {
      console.error(
        "Erro ao carregar funcionários:",
        error
      );

      setFuncionarios([]);
    }
  }

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

    if (name === "secretariaId") {
      setForm((anterior) => ({
        ...anterior,
        secretariaId: value,
        setorId: "",
        funcionarioId: "",
      }));

      setFuncionarios([]);

      if (value) {
        carregarSetores(Number(value));
      } else {
        setSetores([]);
      }

      return;
    }

    if (name === "setorId") {
      setForm((anterior) => ({
        ...anterior,
        setorId: value,
        funcionarioId: "",
      }));

      if (value) {
        carregarFuncionarios(Number(value));
      } else {
        setFuncionarios([]);
      }

      return;
    }

    setForm((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  async function salvar(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!form.patrimonio.trim()) {
      alert("Informe o patrimônio.");
      return;
    }

    if (!form.tipo.trim()) {
      alert("Informe o tipo do equipamento.");
      return;
    }

    if (!form.categoria.trim()) {
      alert("Informe a categoria.");
      return;
    }

    if (!form.marca.trim()) {
      alert("Informe a marca.");
      return;
    }

    if (!form.modelo.trim()) {
      alert("Informe o modelo.");
      return;
    }

    if (!form.secretariaId) {
      alert("Selecione a secretaria.");
      return;
    }

    if (!form.setorId) {
      alert("Selecione o setor.");
      return;
    }

    const valorAquisicao =
      form.valorAquisicao.trim()
        ? Number(
            form.valorAquisicao.replace(",", ".")
          )
        : null;

    if (
      valorAquisicao !== null &&
      Number.isNaN(valorAquisicao)
    ) {
      alert(
        "Informe um valor de aquisição válido."
      );
      return;
    }

    const dados: Equipamento = {
      patrimonio:
        form.patrimonio.trim(),

      tombamento:
        form.tombamento.trim() || undefined,

      tipo:
        form.tipo.trim(),

      categoria:
        form.categoria.trim(),

      marca:
        form.marca.trim(),

      fabricante:
        form.fabricante.trim() || undefined,

      modelo:
        form.modelo.trim(),

      numeroSerie:
        form.numeroSerie.trim() || undefined,

      valorAquisicao,

      secretariaId:
        Number(form.secretariaId),

      setorId:
        Number(form.setorId),

      funcionarioId:
        form.funcionarioId
          ? Number(form.funcionarioId)
          : null,

      status:
        form.status,

      estado:
        form.estado,

      observacao:
        form.observacao.trim() || undefined,
    };

    try {
      setSalvando(true);

      if (equipamento?.id) {
        await atualizarEquipamento(
          equipamento.id,
          dados
        );

        alert(
          "Equipamento atualizado com sucesso."
        );
      } else {
        await criarEquipamento(dados);

        alert(
          "Equipamento cadastrado com sucesso."
        );
      }

      onSuccess();
    } catch (error: any) {
      console.error(
        "Erro ao salvar equipamento:",
        error
      );

      console.error(
        "Resposta do backend:",
        error?.response?.data
      );

      alert(
        error?.response?.data?.erro ||
        error?.response?.data?.message ||
        "Erro ao salvar equipamento."
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

        <div>
          <label className="mb-1 block font-medium">
            Patrimônio *
          </label>

          <input
            name="patrimonio"
            value={form.patrimonio}
            onChange={alterarCampo}
            className="w-full rounded border p-2"
            required
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Tombamento
          </label>

          <input
            name="tombamento"
            value={form.tombamento}
            onChange={alterarCampo}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Tipo *
          </label>

          <input
            name="tipo"
            value={form.tipo}
            onChange={alterarCampo}
            className="w-full rounded border p-2"
            required
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Categoria *
          </label>

          <input
            name="categoria"
            value={form.categoria}
            onChange={alterarCampo}
            className="w-full rounded border p-2"
            required
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Marca *
          </label>

          <input
            name="marca"
            value={form.marca}
            onChange={alterarCampo}
            className="w-full rounded border p-2"
            required
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Fabricante
          </label>

          <input
            name="fabricante"
            value={form.fabricante}
            onChange={alterarCampo}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Modelo *
          </label>

          <input
            name="modelo"
            value={form.modelo}
            onChange={alterarCampo}
            className="w-full rounded border p-2"
            required
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Número de Série
          </label>

          <input
            name="numeroSerie"
            value={form.numeroSerie}
            onChange={alterarCampo}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Valor de Aquisição
          </label>

          <input
            name="valorAquisicao"
            type="text"
            inputMode="decimal"
            value={form.valorAquisicao}
            onChange={alterarCampo}
            placeholder="Ex.: 2500,00"
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Secretaria *
          </label>

          <select
            name="secretariaId"
            value={form.secretariaId}
            onChange={alterarCampo}
            className="w-full rounded border p-2"
            required
          >
            <option value="">
              Selecione uma secretaria
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

        <div>
          <label className="mb-1 block font-medium">
            Setor *
          </label>

          <select
            name="setorId"
            value={form.setorId}
            onChange={alterarCampo}
            className="w-full rounded border p-2"
            disabled={!form.secretariaId}
            required
          >
            <option value="">
              Selecione um setor
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

        <div>
          <label className="mb-1 block font-medium">
            Funcionário
          </label>

          <select
            name="funcionarioId"
            value={form.funcionarioId}
            onChange={alterarCampo}
            className="w-full rounded border p-2"
            disabled={!form.setorId}
          >
            <option value="">
              Nenhum funcionário
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

        <div>
          <label className="mb-1 block font-medium">
            Status *
          </label>

          <select
            name="status"
            value={form.status}
            onChange={alterarCampo}
            className="w-full rounded border p-2"
            required
          >
            <option value="EM_USO">
              Em uso
            </option>

            <option value="ESTOQUE">
              Estoque
            </option>

            <option value="MANUTENCAO">
              Manutenção
            </option>

            <option value="BAIXADO">
              Baixado
            </option>
          </select>
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Estado *
          </label>

          <select
            name="estado"
            value={form.estado}
            onChange={alterarCampo}
            className="w-full rounded border p-2"
            required
          >
            <option value="BOM">
              Bom
            </option>

            <option value="REGULAR">
              Regular
            </option>

            <option value="RUIM">
              Ruim
            </option>

            <option value="INUTILIZAVEL">
              Inutilizável
            </option>
          </select>
        </div>

      </div>

      <div>
        <label className="mb-1 block font-medium">
          Observação
        </label>

        <textarea
          name="observacao"
          value={form.observacao}
          onChange={alterarCampo}
          className="w-full rounded border p-2"
          rows={4}
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="submit"
          disabled={salvando}
        >
          {salvando
            ? "Salvando..."
            : equipamento?.id
              ? "Atualizar Equipamento"
              : "Salvar Equipamento"}
        </Button>
      </div>
    </form>
  );
}
