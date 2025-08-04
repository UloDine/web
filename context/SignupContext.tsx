"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { useApiService } from "./ApiServiceContext";
import { apiRoutes } from "@/lib/apiRoutes";

const SignupContext = createContext<Signup | null>(null);

export default function SignupProvider({ children }: { children: ReactNode }) {
  const api = useApiService();
  const [personal, setPersonal] = useState<PersonalDetails>({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    complete: false,
  });
  const [business, setBusiness] = useState<BusinessDetails>({
    businessName: "",
    businessAddress: "",
    postalCode: "",
    state: "",
    complete: false,
  });
  const [auth, setAuth] = useState<AuthDetails>({
    email: "",
    password: "",
    retypedpassword: "",
    complete: false,
  });

  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [sending, setSending] = useState(false);

  async function register() {
    setSending(true);

    api
      .post<RegisterResponse>(apiRoutes.restaurant.auth.register, {
        personal,
        business,
        auth,
      })
      .then((response) => {
        const { data } = response;
        console.log(data);
      })
      .finally(() => {
        setSending(false);
      });
  }
  return (
    <SignupContext.Provider
      value={{
        personal,
        setPersonal,
        business,
        setBusiness,
        auth,
        setAuth,
        step,
        setStep,
        emailVerified,
        setEmailVerified,
        register,
        sending,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
}

export function useSignUpContext() {
  const context = useContext(SignupContext);

  if (!context) {
    throw new Error("Please use this in signup context");
  }
  return context;
}
