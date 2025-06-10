"use client";

import { createContext, useContext } from "react";

interface AuthContextType {
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

// External logout logic
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const logout = async () => {
    try {
      await fetch("https://api.example.com/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      // Redirect regardless of whether logout succeeded
      window.location.href = " /restaurant/login";
    }
  };

  return (
    <AuthContext.Provider value={{ logout }}>{children}</AuthContext.Provider>
  );
};
