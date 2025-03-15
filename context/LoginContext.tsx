"use client";

import { createContext, ReactNode, useState } from "react";

export const LoginContext = createContext<Login | null>(null);

export default function LoginProvider({ children }: { children: ReactNode }) {
  const [userLogin, setUserLogin] = useState<UserLogin>({
    email: "",
    password: "",
    role: "user",
  });
  const [businessLogin, setBusinessLogin] = useState<BusinessLogin>({
    email: "",
    password: "",
    role: "restaurant",
    pin: "",
  });
  return (
    <LoginContext.Provider
      value={{
        userLogin,
        setUserLogin,
        businessLogin,
        setBusinessLogin,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
