import { useNavigate } from "react-router-dom";

import FormChamado from "./components/FormChamado";

export default function NovoChamadoPage() {
  const navigate = useNavigate();

  function sucesso() {
    navigate("/chamados");
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Novo Chamado
        </h1>

        <p className="text-slate-500">
          Abra um chamado para a equipe de TI.
        </p>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <FormChamado onSuccess={sucesso} />
      </div>
    </div>
  );
}
