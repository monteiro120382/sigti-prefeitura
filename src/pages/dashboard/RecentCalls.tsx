import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecentCalls() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Últimos Chamados</CardTitle>
      </CardHeader>

      <CardContent>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Número</th>
              <th className="text-left">Solicitante</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-3">0001</td>
              <td>Secretaria de Saúde</td>
              <td>Aberto</td>
            </tr>

            <tr className="border-b">
              <td className="py-3">0002</td>
              <td>Educação</td>
              <td>Em andamento</td>
            </tr>

            <tr>
              <td className="py-3">0003</td>
              <td>Administração</td>
              <td>Concluído</td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}