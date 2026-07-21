import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chamados por mês</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex h-80 items-center justify-center rounded-lg border-2 border-dashed text-slate-400">
          Gráfico (Recharts)
        </div>
      </CardContent>
    </Card>
  );
}