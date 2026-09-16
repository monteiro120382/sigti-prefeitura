import { Routes, Route } from "react-router-dom";
import NovoChamadoPage from "../pages/chamados/NovoChamadoPage";


import LoginPage from "../pages/auth/LoginPage";
import CadastroSolicitantePage from "../pages/auth/CadastroSolicitantePage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import EquipamentosPage from "../pages/equipamentos/EquipamentosPage";
import ChamadosPage from "../pages/chamados/ChamadosPage";
import UsuariosPage from "../pages/usuarios/UsuariosPage";
import SecretariasPage from "../pages/secretarias/SecretariasPage";
import RelatoriosPage from "../pages/relatorios/RelatoriosPage";
import ConfiguracoesPage from "../pages/configuracoes/ConfiguracoesPage";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import RoleRoute from "../components/auth/RoleRoute";

export default function AppRouter() {
  return (
    <Routes>

      {/* Login */}
      <Route
        path="/"
        element={<LoginPage />}
      />

      <Route
        path="/cadastro-solicitante"
        element={<CadastroSolicitantePage />}
      />

      {/* Rotas protegidas */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <RoleRoute perfis={["ADMIN", "TECNICO", "ESTAGIARIO"]}>
              <DashboardPage />
            </RoleRoute>
          }
        />

        {/* Equipamentos */}
        <Route
          path="/equipamentos"
          element={
            <RoleRoute perfis={["ADMIN", "TECNICO", "SOLICITANTE", "ESTAGIARIO"]}>
              <EquipamentosPage />
            </RoleRoute>
          }
        />

        {/* Chamados - gerenciamento */}
        <Route
          path="/chamados"
          element={
            <RoleRoute perfis={["ADMIN", "TECNICO", "SOLICITANTE", "ESTAGIARIO"]}>
              <ChamadosPage />
            </RoleRoute>
          }
        />

        {/* Novo Chamado - acesso do SOLICITANTE */}
        <Route
  path="/chamados/novo"
  element={
    <RoleRoute perfis={["ADMIN", "TECNICO", "SOLICITANTE", "ESTAGIARIO"]}>
      <NovoChamadoPage />
    </RoleRoute>
  }
/>

        {/* Secretarias */}
        <Route
          path="/secretarias"
          element={
            <RoleRoute perfis={["ADMIN"]}>
              <SecretariasPage />
            </RoleRoute>
          }
        />

        {/* Usuários */}
        <Route
          path="/usuarios"
          element={
            <RoleRoute perfis={["ADMIN"]}>
              <UsuariosPage />
            </RoleRoute>
          }
        />

        {/* Relatórios */}
        <Route
          path="/relatorios"
          element={
            <RoleRoute perfis={["ADMIN", "TECNICO"]}>
              <RelatoriosPage />
            </RoleRoute>
          }
        />

        {/* Configurações */}
        <Route
          path="/configuracoes"
          element={
            <RoleRoute perfis={["ADMIN"]}>
              <ConfiguracoesPage />
            </RoleRoute>
          }
        />

      </Route>

    </Routes>
  );
}
