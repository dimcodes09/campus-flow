import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const { user, loginWithGoogle, loginAsAdmin } = useAuth();
  const navigate = useNavigate();

  // ✅ Redirect AFTER auth state changes
  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else if (user?.role === "student") {
      navigate("/dashboard");
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
            Secure login with Google
          </p>
        </div>

        {/* ✅ Google Login → Student */}
        <GoogleLogin
          onSuccess={() => {
            // IMPORTANT: use the correct function
            loginWithGoogle();
          }}
          onError={() => {
            console.log("Google Login Failed");
          }}
        />

        {/* Divider */}
        <div className="text-center text-xs text-white/40">
          Demo access
        </div>

        {/* Demo Admin Login */}
        <button
          onClick={loginAsAdmin}
          className="w-full py-2 rounded-lg
                     bg-emerald-500/90 hover:bg-emerald-500
                     text-black font-medium transition"
        >
          Demo Admin Login
        </button>

        <p className="text-xs text-center text-white/40 pt-2">
          Google OAuth used for identity verification (MVP)
        </p>
      </div>
    </div>
  );
}
