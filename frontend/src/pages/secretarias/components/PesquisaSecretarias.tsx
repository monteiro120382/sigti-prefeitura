import { Search } from "lucide-react";

interface Props {
  pesquisa: string;
  setPesquisa: (valor: string) => void;
}

export default function PesquisaSecretarias({
  pesquisa,
  setPesquisa,
}: Props) {
  return (
    <div className="rounded-lg bg-white p-4 shadow">

      <div className="relative">

        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={pesquisa}
          onChange={(event) =>
            setPesquisa(event.target.value)
          }
          placeholder="Pesquisar por nome ou sigla..."
          className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-4 outline-none focus:border-slate-500"
        />

      </div>

    </div>
  );
}
