import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Computer,
  Users,
  Building2,
  FileBarChart2,
  Settings,
} from "lucide-react";

const menu = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: ClipboardList, label: "Chamados", path: "/chamados" },
  { icon: Computer, label: "Equipamentos", path: "/equipamentos" },
  { icon: Users, label: "Usuários", path: "/usuarios" },
  { icon: Building2, label: "Secretarias", path: "/secretarias" },
  { icon: FileBarChart2, label: "Relatórios", path: "/relatorios" },
  { icon: Settings, label: "Configurações", path: "/configuracoes" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="border-b border-slate-700 p-6">
        <h1 className="text-2xl font-bold">SIGTI</h1>
        <p className="text-sm text-slate-400">
          Sistema Integrado de Gestão de TI
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}