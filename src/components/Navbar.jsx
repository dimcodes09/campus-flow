import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  const linkClass =
    "relative text-sm text-white/70 transition hover:text-cyan-300";

  const activeClass =
    "text-cyan-400 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-cyan-400";

  return (
    <nav className="flex justify-between items-center px-8 py-4 
                    bg-black/60 backdrop-blur-md
                    border-b border-cyan-400/20">

      {/* LOGO */}
      <h1 className="text-xl font-semibold tracking-wide
                     text-cyan-300 hover:text-cyan-400 transition">
        Campus Flow
      </h1>

      {/* LINKS */}
      <div className="flex items-center gap-6">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/transport"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Transport
        </NavLink>

        <NavLink
          to="/placements"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Placements
        </NavLink>

        <NavLink
          to="/attendance"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Attendance
        </NavLink>

        <NavLink
          to="/canteen"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Canteen
        </NavLink>

        <NavLink
          to="/campus-map"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Campus Map
        </NavLink>

        {user?.role === "admin" && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Admin
          </NavLink>
        )}

        {!user && (
          <NavLink
            to="/login"
            className="ml-2 text-sm px-4 py-1.5 rounded-lg
                       border border-cyan-400/40
                       text-cyan-300
                       hover:bg-cyan-400/10
                       transition"
          >
            Login
          </NavLink>
        )}

        {user && (
          <button
            onClick={logout}
            className="text-sm px-3 py-1 rounded
                       bg-red-600/80 hover:bg-red-700 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
