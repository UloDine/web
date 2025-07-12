"use client";

import { apiRoutes } from "@/lib/apiRoutes";
import { createContext, ReactNode, useContext, useState } from "react";
import { useApiService } from "./ApiServiceContext";
import { useAlert } from "./alert/AlertContext";

const LoginContext = createContext<Login | undefined>(undefined);

export default function LoginProvider({ children }: { children: ReactNode }) {
  const { addAlert } = useAlert();
  const api = useApiService();
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
  const [sending, setSending] = useState(false);

  async function handleLogin(loginDetails: BusinessLogin) {
    setSending(true);
    api
      .post<LoggedUser>(apiRoutes.restaurant.auth.login, loginDetails)
      .then((response) => {
        const data = response.data;
        localStorage.setItem("restaurant_acc", JSON.stringify(data));
        addAlert("success", response.message);
      })
      .finally(() => {
        setSending(false);
      });
  }
  return (
    <LoginContext.Provider
      value={{
        userLogin,
        setUserLogin,
        businessLogin,
        setBusinessLogin,
        handleLogin,
        sending,
        setSending,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export function useLoginContext() {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("Context needs to be in a provider");
  }
  return context;
}
