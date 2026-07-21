import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList, AlertTriangle, CheckCircle2, Monitor } from "lucide-react";

const cards = [
  {
    title: "Chamados",
    value: 125,
    icon: ClipboardList,
  },
  {
    title: "Abertos",
    value: 18,
    icon: AlertTriangle,
  },
  {
    title: "Concluídos",
    value: 107,
    icon: CheckCircle2,
  },
  {
    title: "Equipamentos",
    value: 842,
    icon: Monitor,
  },
];

export default function DashboardCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card key={card.title}>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-slate-500">{card.title}</p>

                <h2 className="text-3xl font-bold">
                  {card.value}
                </h2>
              </div>

              <Icon size={38} className="text-blue-700" />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}