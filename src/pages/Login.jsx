import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function Login() {
  const { user, loginAsStudent, loginAsAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else if (user?.role === "student") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">

      <div
        className="w-96 bg-black/50 backdrop-blur
                   border border-cyan-400/20
                   rounded-xl p-6 space-y-5"
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-cyan-400">
            Campus Flow
          </h2>
          <p className="text-sm text-white/60">
            Choose how you want to continue
          </p>
        </div>

        {/* Student Login */}
        <button
          onClick={() => {
            loginAsStudent();
            navigate("/");
          }}
          className="w-full py-2 rounded-lg
                     bg-cyan-500/90 hover:bg-cyan-500
                     text-black font-medium transition"
        >
          Login as Student
        </button>

        {/* Admin Login */}
        <button
          onClick={() => {
            loginAsAdmin();
            navigate("/admin");
          }}
          className="w-full py-2 rounded-lg
                     bg-emerald-500/90 hover:bg-emerald-500
                     text-black font-medium transition"
        >
          Login as Admin
        </button>

        <p className="text-xs text-center text-white/40 pt-2">
          Demo login. No credentials required.
        </p>
      </div>
    </div>
  );
}
