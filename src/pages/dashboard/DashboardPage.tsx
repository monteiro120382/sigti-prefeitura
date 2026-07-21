import DashboardCards from "./DashboardCards";
import DashboardChart from "./DashboardChart";
import RecentCalls from "./RecentCalls";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-slate-500">
          Bem-vindo ao Sistema Integrado de Gestão de TI.
        </p>
      </div>

      <DashboardCards />

      <DashboardChart />

      <RecentCalls />
    </div>
  );
}