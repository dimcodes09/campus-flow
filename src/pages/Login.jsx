import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function Login() {
  const { user, loginAsStudent, loginAsAdmin } = useAuth();
  const navigate = useNavigate();

  // 🔒 Prevent logged-in users from seeing login page
  useEffect(() => {
    if (user?.role === "student") {
      navigate("/dashboard");
    } else if (user?.role === "admin") {
      navigate("/admin");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-zinc-900 p-6 rounded-xl w-80 space-y-4">
        <h2 className="text-xl font-semibold text-center">Login</h2>

        <button
          onClick={() => {
            loginAsStudent();
            navigate("/dashboard");
          }}
          className="w-full py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Login as Student
        </button>

        <button
          onClick={() => {
            loginAsAdmin();
            navigate("/admin");
          }}
          className="w-full py-2 bg-emerald-600 rounded-lg hover:bg-emerald-700 transition"
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
}
