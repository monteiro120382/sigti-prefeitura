import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  HardDrive,
  Package,
  UserCheck,
  Wrench,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import type { Chamado } from "@/types/chamado";
import type { Equipamento } from "@/types/equipamento";

interface Props {
  chamados: Chamado[];
  equipamentos: Equipamento[];
}

export default function DashboardCards({
  chamados,
  equipamentos,
}: Props) {
  const totalChamados = chamados.length;

  const chamadosAbertos = chamados.filter(
    (chamado) => chamado.status === "ABERTO"
  ).length;

  const chamadosEmAtendimento = chamados.filter(
    (chamado) => chamado.status === "EM_ATENDIMENTO"
  ).length;

  const chamadosFinalizados = chamados.filter(
    (chamado) => chamado.status === "FINALIZADO"
  ).length;

  const totalEquipamentos = equipamentos.length;

  const equipamentosEmUso = equipamentos.filter(
    (equipamento) => equipamento.status === "EM_USO"
  ).length;

  const equipamentosEstoque = equipamentos.filter(
    (equipamento) => equipamento.status === "ESTOQUE"
  ).length;

  const equipamentosManutencao = equipamentos.filter(
    (equipamento) => equipamento.status === "MANUTENCAO"
  ).length;

  const cards = [
    {
      title: "Total de Chamados",
      value: totalChamados,
      icon: ClipboardList,
      descricao: "Todos os chamados",
    },
    {
      title: "Chamados Abertos",
      value: chamadosAbertos,
      icon: AlertTriangle,
      descricao: "Aguardando atendimento",
    },
    {
      title: "Em Atendimento",
      value: chamadosEmAtendimento,
      icon: UserCheck,
      descricao: "Em atendimento técnico",
    },
    {
      title: "Finalizados",
      value: chamadosFinalizados,
      icon: CheckCircle2,
      descricao: "Chamados concluídos",
    },
    {
      title: "Equipamentos",
      value: totalEquipamentos,
      icon: HardDrive,
      descricao: "Total cadastrado",
    },
    {
      title: "Em Uso",
      value: equipamentosEmUso,
      icon: UserCheck,
      descricao: "Em utilização",
    },
    {
      title: "Em Estoque",
      value: equipamentosEstoque,
      icon: Package,
      descricao: "Disponíveis",
    },
    {
      title: "Em Manutenção",
      value: equipamentosManutencao,
      icon: Wrench,
      descricao: "Em manutenção",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card
            key={card.title}
            className="transition-shadow hover:shadow-md"
          >
            <CardContent className="flex items-center justify-between p-5">
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-1 text-3xl font-bold text-slate-800">
                  {card.value}
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  {card.descricao}
                </p>
              </div>

              <div className="ml-4 shrink-0 rounded-xl bg-blue-50 p-3">
                <Icon
                  size={30}
                  className="text-blue-700"
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
