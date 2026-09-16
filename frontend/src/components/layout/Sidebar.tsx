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

import { useAuth } from "@/contexts/AuthContext";

interface MenuItem {
  icon: typeof LayoutDashboard;
  label: string;
  path: string;
  perfis: string[];
}

const menu: MenuItem[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/dashboard",
    perfis: ["ADMIN", "TECNICO", "ESTAGIARIO"],
  },
  {
    icon: ClipboardList,
    label: "Chamados",
    path: "/chamados",
    perfis: ["ADMIN", "TECNICO", "SOLICITANTE", "ESTAGIARIO"],
  },
  {
    icon: Computer,
    label: "Equipamentos",
    path: "/equipamentos",
    perfis: ["ADMIN", "TECNICO", "ESTAGIARIO"],
  },
  {
    icon: Users,
    label: "Usuários",
    path: "/usuarios",
    perfis: ["ADMIN"],
  },
  {
    icon: Building2,
    label: "Secretarias",
    path: "/secretarias",
    perfis: ["ADMIN"],
  },
  {
    icon: FileBarChart2,
    label: "Relatórios",
    path: "/relatorios",
    perfis: ["ADMIN", "TECNICO"],
  },
  {
    icon: Settings,
    label: "Configurações",
    path: "/configuracoes",
    perfis: ["ADMIN"],
  },
];

export default function Sidebar() {
  const { usuario } = useAuth();

  const perfil = usuario?.perfil;

  const menuPermitido = menu.filter((item) =>
    perfil
      ? item.perfis.includes(perfil)
      : false
  );

  return (
    <aside className="flex w-64 flex-col bg-slate-900 text-white">

      <div className="border-b border-slate-700 p-6">

        <h1 className="text-2xl font-bold">
          SIGTI
        </h1>

        <p className="text-sm text-slate-400">
          Sistema Integrado de Gestão de TI
        </p>

      </div>

      <nav className="flex-1 space-y-2 p-4">

        {menuPermitido.map((item) => {

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
