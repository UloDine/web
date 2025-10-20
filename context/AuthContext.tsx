"use client";
import { usePost } from "@/hooks/usePost";
import { apiRoutes } from "@/lib/apiRoutes";
import { createContext, ReactNode, useContext, useState } from "react";
import { useAlert } from "./alert/AlertContext";

const AuthContext = createContext<AuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { addAlert } = useAlert();

  const [personal, setPersonal] = useState<PersonalDetails>({
    firstName: "",
    lastName: "",
    email: "",
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

  const [userLogin, setUserLogin] = useState<UserLogin>({
    email: "",
    password: "",
    role: "user",
  });

  const [businessLogin, setBusinessLogin] = useState<BusinessLogin>({
    email: "",
    password: "",
    pin: "",
    role: "restaurant",
  });

  const [step, setStep] = useState<number>(1);
  // const [emailVerified, setEmailVerified] = useState<any>(
  //   JSON.parse(localStorage.getItem("email_verified") ?? "{}")
  // );
  const [emailVerified, setEmailVerified] = useState<any>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("email_verified");
        return stored ? JSON.parse(stored) : false;
      } catch {
        return false;
      }
    }
    return false;
  });

  const [sending, setSending] = useState<boolean>(false);

  // ----- Helpers -----
  function updateEmailStatus(payload: any) {
    localStorage.setItem("email_verified", JSON.stringify(payload));
    setEmailVerified(payload);
  }

  // ----- API Hooks -----
  const { postData: postLogin } = usePost<
    BusinessLogin | UserLogin,
    BaseResponse<LoggedUser>
  >({
    endpoint: apiRoutes.restaurant.auth.login,
    onSuccess: (res) => {
      localStorage.setItem("user", JSON.stringify(res.data));
      addAlert("success", res.message || "Login successful");
    },
    onError: (err) => {
      addAlert("error", err.message || "Login failed");
    },
  });

  const { postData: postRegister } = usePost<
    {
      personal: PersonalDetails & { password: string };
      business: BusinessDetails;
    },
    BaseResponse<LoggedUser>
  >({
    endpoint: apiRoutes.restaurant.auth.register,
    onSuccess: (res) => {
      localStorage.setItem("user", JSON.stringify(res.data));
      addAlert("success", res.message || "Signup successful");
      location.href = "/restaurant/management/overview";
    },
    onError: (err) => {
      addAlert("error", err.message || "Signup failed");
    },
  });

  // ----- Auth Actions -----
  async function login(loginDetails: BusinessLogin | UserLogin) {
    setSending(true);
    await postLogin(loginDetails);
    setSending(false);
  }

  async function register() {
    setSending(true);
    await postRegister({
      personal: {
        password: auth.password,
        ...personal,
      },
      business,
    });
    setSending(false);
  }

  function logout() {
    try {
      localStorage.removeItem("user");
    } finally {
      window.location.href = "/restaurant/login";
    }
  }

  return (
    <AuthContext.Provider
      value={{
        personal,
        business,
        auth,
        setPersonal,
        setBusiness,
        setAuth,
        userLogin,
        setUserLogin,
        businessLogin,
        setBusinessLogin,
        login,
        register,
        logout,
        step,
        setStep,
        emailVerified,
        updateEmailStatus,
        sending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ----- Hook -----
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
