import { useState } from "react";
import { Button } from "@/components/ui/button";
interface FormEquipamentoProps {
  onSuccess: () => void;
}

export default function FormEquipamento({
  onSuccess,
}: FormEquipamentoProps) {
  const [form, setForm] = useState({
    patrimonio: "",
    tombamento: "",
    tipo: "",
    categoria: "",
    marca: "",
    fabricante: "",
    modelo: "",
    numeroSerie: "",
    valorAquisicao: "",
    status: "ESTOQUE",
    estado: "BOM",
    observacao: "",
  });

  function alterarCampo(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function salvar(e: React.FormEvent) {
  e.preventDefault();

  console.log(form);

  // Temporário até integrar a API
  onSuccess();
}

  return (
    <form
      onSubmit={salvar}
      className="rounded-lg bg-white p-6 shadow space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="block mb-1 font-medium">
            Patrimônio
          </label>

          <input
            name="patrimonio"
            value={form.patrimonio}
            onChange={alterarCampo}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
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
          <label className="block mb-1 font-medium">
            Tipo
          </label>

          <input
            name="tipo"
            value={form.tipo}
            onChange={alterarCampo}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Categoria
          </label>

          <input
            name="categoria"
            value={form.categoria}
            onChange={alterarCampo}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Marca
          </label>

          <input
            name="marca"
            value={form.marca}
            onChange={alterarCampo}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Modelo
          </label>

          <input
            name="modelo"
            value={form.modelo}
            onChange={alterarCampo}
            className="w-full rounded border p-2"
          />
        </div>

      </div>

      <div>
        <label className="block mb-1 font-medium">
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

      <div className="flex justify-end">
        <Button type="submit">
          Salvar Equipamento
        </Button>
      </div>
    </form>
  );
}
