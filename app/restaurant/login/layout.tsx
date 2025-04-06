import { AlertProvider } from "@/context/alert/AlertContext";
import LoginProvider from "@/context/LoginContext";
import { ReactNode } from "react";

export default function SignupLayout({ children }: { children: ReactNode }) {
  return (
    <LoginProvider>
      <AlertProvider>{children}</AlertProvider>
    </LoginProvider>
  );
}
