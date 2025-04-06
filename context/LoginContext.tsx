"use client";

import { RESTAURANT_API_ROUTES } from "@/routes/RoutePaths";
import { POST } from "@/utils/request";
import { createContext, ReactNode, useContext, useState } from "react";

const LoginContext = createContext<Login | undefined>(undefined);

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
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(
    loginDetails: BusinessLogin
  ): Promise<LoginResponse> {
    try {
      setSending(true);
      const data: LoginResponse = await POST<LoginResponse>(
        loginDetails,
        `http://localhost:5000${RESTAURANT_API_ROUTES.LOGIN}`
      );
      if (!data) {
        setSending(false);
        return {
          message: "Login failed. Please try again.",
          user: { id: "", fullName: "", email: "" },
          status: "fail",
        };
      }
      if (data.status === "success") {
        console.log(data);
      }
      setSending(false);
      return data;
    } catch (err) {
      console.error(err);
      setSending(false);
      return {
        message: "An error occurred while processing your request.",
        user: { id: "", fullName: "", email: "" },
        status: "fail",
      };
    }
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
