import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import { useAuth } from "./context/AuthContext";
import Canteen from "./pages/Canteen";
import AdminServices from "./pages/AdminServices";
import AdminServicesAdmin from "./modules/admin-services/AdminServicesAdmin";

/* Modules */
import Transport from "./modules/transport/Transport";
import Placements from "./pages/Placements";
import Attendance from "./pages/Attendance";
import CampusMap from "./pages/CampusMap";

export default function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Login */}
        <Route
          path="/login"
          element={
            user
              ? user.role === "admin"
                ? <Navigate to="/admin" replace />
                : <Navigate to="/dashboard" replace />
              : <Login />
          }
        />

        {/* Public */}
        <Route path="/transport" element={<Transport />} />
        <Route path="/placements" element={<Placements />} />
        <Route path="/campus-map" element={<CampusMap />} />
        <Route path="/canteen" element={<Canteen />} />
        <Route path="/attendance" element={<Attendance />} />

        {/* Student Admin Services */}
        <Route
          path="/admin-services"
          element={
            user?.role === "student"
              ? <AdminServices />
              : <Navigate to="/login" replace />
          }
        />

        {/* Admin Admin Services */}
        <Route
          path="/admin-services-admin"
          element={
            user?.role === "admin"
              ? <AdminServicesAdmin />
              : <Navigate to="/login" replace />
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            user?.role === "student"
              ? <Dashboard />
              : <Navigate to="/login" replace />
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            user?.role === "admin"
              ? <AdminPanel />
              : <Navigate to="/login" replace />
          }
        />

        {/* Catch */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}