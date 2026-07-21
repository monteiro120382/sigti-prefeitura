import { Bell, UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <p className="text-sm text-slate-500">
          Sistema Integrado de Gestão de TI
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Bell className="cursor-pointer" />
        <UserCircle size={34} />
      </div>
    </header>
  );
}