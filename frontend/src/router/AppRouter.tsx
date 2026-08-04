import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import EquipamentosPage from "../pages/equipamentos/EquipamentosPage";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";

export default function AppRouter() {
  return (
    <Routes>

      <Route 
        path="/" 
        element={<LoginPage />} 
      />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >

        <Route 
          path="/dashboard" 
          element={<DashboardPage />} 
        />

        <Route 
          path="/equipamentos" 
          element={<EquipamentosPage />} 
        />

      </Route>

    </Routes>
  );
}