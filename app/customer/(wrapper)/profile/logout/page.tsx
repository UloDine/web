"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function LogoutPage() {
  const { logout } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      logout();
    }, 500);

    return () => clearTimeout(timer);
  }, [logout]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: "16px",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          border: "4px solid #e5e7eb",
          borderTop: "4px solid #3b82f6",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <p style={{ fontSize: "16px", color: "#6b7280" }}>Logging you out...</p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
