"use client";

import { createContext, ReactNode, useContext, useState } from "react";

const SignupContext = createContext<Signup | null>(null);

export default function SignupProvider({ children }: { children: ReactNode }) {
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
  const [step, setStep] = useState<number>(3);
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
