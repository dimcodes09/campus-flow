import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  const linkClass =
    "text-gray-300 hover:text-white transition";

  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b border-white/10">
      <h1 className="text-xl font-semibold text-blue-400">
        Campus Flow
      </h1>

      <div className="flex items-center gap-6">
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>

        <NavLink to="/transport" className={linkClass}>
          Transport
        </NavLink>

        <NavLink to="/placements" className={linkClass}>
          Placements
        </NavLink>

        <NavLink to="/attendance" className={linkClass}>
          Attendance
        </NavLink>
        
<NavLink to="/canteen" className={linkClass}>
  Canteen
</NavLink>

        <NavLink to="/campus-map" className={linkClass}>
          Campus Map
        </NavLink>

        {user?.role === "admin" && (
          <NavLink to="/admin" className={linkClass}>
            Admin
          </NavLink>
        )}

        {!user && (
          <NavLink to="/login" className={linkClass}>
            Login
          </NavLink>
        )}

        {user && (
          <button
            onClick={logout}
            className="text-sm px-3 py-1 rounded bg-red-600 hover:bg-red-700 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
