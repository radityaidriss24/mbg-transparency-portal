import ProtectedRoute from "./components/ProtectedRoute";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AuditSosial from "./pages/AuditSosial";
import PetaDistribusi from "./pages/PetaDistribusi";
import LaporanWarga from "./pages/LaporanWarga";

const AppRouter = () => {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={[
                "admin",
              ]}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/audit-sosial"
          element={
            <ProtectedRoute
              allowedRoles={[
                "admin",
                "petugas",
                "masyarakat",
              ]}
            >
              <AuditSosial />
            </ProtectedRoute>
          }
        />

        <Route
          path="/peta-distribusi"
          element={
            <ProtectedRoute
              allowedRoles={[
                "admin",
                "petugas",
                "masyarakat",
              ]}
            >
              <PetaDistribusi />
            </ProtectedRoute>
          }
        />

        <Route
          path="/laporan-warga"
          element={
            <ProtectedRoute
              allowedRoles={[
                "admin",
                "masyarakat",
              ]}
            >
              <LaporanWarga />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-[#07111F] text-white text-3xl font-bold">
              404 | Halaman Tidak Ditemukan
            </div>
          }
        />

      </Routes>

    </BrowserRouter>
  );
};

export default AppRouter;