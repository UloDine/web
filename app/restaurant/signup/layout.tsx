import SignupProvider from "@/context/SignupContext";
import { ReactNode } from "react";

export default function SignupLayout({ children }: { children: ReactNode }) {
  return <SignupProvider>{children}</SignupProvider>;
}
