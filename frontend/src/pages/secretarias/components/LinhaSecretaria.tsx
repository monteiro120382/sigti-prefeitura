import type { Secretaria } from "@/types/secretaria";

interface Props {
  secretaria: Secretaria;
  onEditar: (secretaria: Secretaria) => void;
  onExcluir: (id: number) => void;
}

export default function LinhaSecretaria({
  secretaria,
  onEditar,
  onExcluir,
}: Props) {
  return (
    <tr
      key={secretaria.id}
      className="border-t"
    >
      <td className="px-4 py-3">
        {secretaria.nome}
      </td>

      <td className="px-4 py-3">
        {secretaria.sigla}
      </td>

      <td className="px-4 py-3">
        <span
          className={
            secretaria.ativa
              ? "rounded bg-green-100 px-2 py-1 text-sm text-green-700"
              : "rounded bg-red-100 px-2 py-1 text-sm text-red-700"
          }
        >
          {secretaria.ativa ? "Ativa" : "Inativa"}
        </span>
      </td>

      <td className="px-4 py-3">
        <div className="flex justify-end gap-2">

          <button
            type="button"
            onClick={() => onEditar(secretaria)}
            className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
          >
            Editar
          </button>

          <button
            type="button"
            onClick={() => onExcluir(secretaria.id)}
            className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
          >
            Excluir
          </button>

        </div>
      </td>
    </tr>
  );
}
