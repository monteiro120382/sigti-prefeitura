import { Search } from "lucide-react";

interface Props {
  pesquisa: string;
  setPesquisa: (texto: string) => void;
}

export default function PesquisaChamados({
  pesquisa,
  setPesquisa,
}: Props) {
  return (
    <div className="relative">

      <Search
        size={18}
        className="absolute left-3 top-3 text-slate-400"
      />

      <input
        type="text"
        value={pesquisa}
       placeholder="Pesquisar por ID, protocolo, título, descrição, status ou prioridade..."
        onChange={(e) => setPesquisa(e.target.value)}
        className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
      />

    </div>
  );
}