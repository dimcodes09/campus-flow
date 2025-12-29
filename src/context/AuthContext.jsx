import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Google OAuth login (MVP)
  // For now, Google login = Student
  const loginAsStudent = () => {
    setUser({
      role: "student",
      provider: "google",
    });
  };

  // ✅ Demo admin login (used for dashboard showcase)
  const loginAsAdmin = () => {
    setUser({
      role: "admin",
      provider: "demo",
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginAsStudent,
        loginAsAdmin,
        logout,
        setUser, // exposed for future extension
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
