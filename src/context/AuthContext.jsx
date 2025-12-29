import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Google OAuth login (MVP)
  // Any Google login = Student (hackathon-safe)
  const loginWithGoogle = () => {
    setUser({
      role: "student",
      provider: "google",
      isAuthenticated: true,
    });
  };

  // ✅ Demo Admin login
  const loginAsAdmin = () => {
    setUser({
      role: "admin",
      provider: "demo",
      isAuthenticated: true,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithGoogle,
        loginAsAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
