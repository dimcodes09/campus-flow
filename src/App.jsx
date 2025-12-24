import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import { useAuth } from "./context/AuthContext";
import Canteen from "./pages/Canteen";

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
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/transport" element={<Transport />} />
        <Route path="/placements" element={<Placements />} />
        <Route path="/campus-map" element={<CampusMap />} />
        <Route path="/canteen" element={<Canteen />} />

        {/* Attendance (single clean flow) */}
        <Route path="/attendance" element={<Attendance />} />

        {/* Student */}
        <Route
          path="/dashboard"
          element={
            user?.role === "student" ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            user?.role === "admin" ? (
              <AdminPanel />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
}
// deploy-test
