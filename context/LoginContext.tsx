"use client";

import { apiRoutes } from "@/lib/apiRoutes";
import { createContext, ReactNode, useContext, useState } from "react";
import { useAlert } from "./alert/AlertContext";
import { usePost } from "@/hooks/usePost";

const LoginContext = createContext<Login | undefined>(undefined);

export default function LoginProvider({ children }: { children: ReactNode }) {
  const { addAlert } = useAlert();

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

  // ✅ Use the hook to handle restaurant login via Next.js API route
  const {
    // data: loginData,
    loading: sending,
    // error,
    postData: loginRestaurant,
  } = usePost<BusinessLogin, BaseResponse<LoggedUser>>({
    endpoint: apiRoutes.restaurant.auth.login, // e.g. "/api/restaurant/auth/login"
    onSuccess: (response) => {
      localStorage.setItem("restaurant", JSON.stringify(response.data));
      addAlert("success", response.message || "Login successful");
      console.log(response);
    },
    onError: (err) => {
      addAlert("error", err.message || "Login failed");
    },
  });

  // ✅ Wrap the hook function in a cleaner interface for components
  async function handleLogin(loginDetails: BusinessLogin) {
    await loginRestaurant(loginDetails);
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
        setSending: () => {}, // no-op (hook manages this)
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export function useLoginContext() {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLoginContext must be used within a LoginProvider");
  }
  return context;
}
