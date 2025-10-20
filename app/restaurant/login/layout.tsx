import { AlertProvider } from "@/context/alert/AlertContext";
import { AuthProvider } from "@/context/AuthContext";
import { ReactNode } from "react";

export default function SignupLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AlertProvider>{children}</AlertProvider>
    </AuthProvider>
  );
}
