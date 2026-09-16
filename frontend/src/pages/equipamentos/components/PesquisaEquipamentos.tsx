import { Search, X } from "lucide-react";

interface Props {
  pesquisa: string;
  setPesquisa: (texto: string) => void;
  placeholder?: string;
}

export default function PesquisaEquipamentos({
  pesquisa,
  setPesquisa,
  placeholder = "Pesquisar patrimônio, marca, modelo, funcionário...",
}: Props) {
  return (
    <div className="relative w-full">

      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={pesquisa}
        placeholder={placeholder}
        aria-label="Pesquisar equipamentos"
        onChange={(e) => setPesquisa(e.target.value)}
        className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-10 transition-colors focus:border-blue-500 focus:outline-none"
      />

      {pesquisa && (
        <button
          type="button"
          onClick={() => setPesquisa("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-700"
          aria-label="Limpar pesquisa"
        >
          <X size={16} />
        </button>
      )}

    </div>
  );
}