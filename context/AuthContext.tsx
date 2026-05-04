"use client";
import { usePost } from "@/hooks/usePost";
import { apiRoutes } from "@/lib/apiRoutes";
import { createContext, ReactNode, useContext, useState } from "react";
import { useAlert } from "./alert/AlertContext";
import { useRouter } from "next/navigation";
import {
  AUTH_ROUTES,
  RESTAURANT_MANAGEMENT_ROUTES,
  CUSTOMER_ROUTES,
} from "@/routes/RoutePaths";

const STORAGE_USER_KEY = "user";
const RESTAURANT_ACCOUNT_TYPE: AccountType = "RESTAURANT";
const CUSTOMER_ACCOUNT_TYPE: AccountType = "CUSTOMER";

function persistAuthUser<T extends object>(
  payload: T,
  accountType: AccountType,
) {
  localStorage.setItem(
    STORAGE_USER_KEY,
    JSON.stringify({ ...payload, accountType }),
  );
}

function getStoredAccountType() {
  try {
    const storedUser = localStorage.getItem(STORAGE_USER_KEY);
    if (!storedUser) return null;

    const parsedUser = JSON.parse(storedUser);

    if (parsedUser?.accountType === RESTAURANT_ACCOUNT_TYPE) {
      return RESTAURANT_ACCOUNT_TYPE;
    }

    if (parsedUser?.accountType === CUSTOMER_ACCOUNT_TYPE) {
      return CUSTOMER_ACCOUNT_TYPE;
    }

    if (parsedUser?.role === "restaurant") {
      return RESTAURANT_ACCOUNT_TYPE;
    }

    if (parsedUser?.role === "user") {
      return CUSTOMER_ACCOUNT_TYPE;
    }
  } catch {
    return null;
  }

  return null;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { addAlert } = useAlert();
  const router = useRouter();

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

  const [userSignup, setUserSignup] = useState<UserSignup>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    acceptedTerm: false,
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

  const [verifyEmail, setVerifyEmail] = useState<VerifyEmailPayload>({
    email: "",
    otp: "",
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
      persistAuthUser(res.data, RESTAURANT_ACCOUNT_TYPE);
      addAlert("success", res.message || "Login successful");
      router.push(RESTAURANT_MANAGEMENT_ROUTES.OVERVIEW);
    },
    onError: (err) => {
      addAlert("error", err.message || "Login failed");
    },
  });

  const { postData: postUserLogin } = usePost<
    UserLogin,
    BaseResponse<LoggedUser>
  >({
    endpoint: apiRoutes.customer.auth.login,
    onSuccess: (res) => {
      persistAuthUser(res.data, CUSTOMER_ACCOUNT_TYPE);
      addAlert("success", res.message || "Login successful");
      router.push(CUSTOMER_ROUTES.HOME);
    },
    onError: (err) => {
      addAlert("error", err.message || "Login failed");
    },
  });

  const { postData: postUserSignup } = usePost<
    {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      password: string;
    },
    BaseResponse<{
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      email_verified: boolean;
    }>
  >({
    endpoint: apiRoutes.customer.auth.register,
    onSuccess: (res) => {
      persistAuthUser(res.data!, CUSTOMER_ACCOUNT_TYPE);
      addAlert(
        "success",
        res.message || "Account created! Please verify your email.",
      );
      localStorage.setItem("email_to_verify", res.data!.email);
      router.push(AUTH_ROUTES.CUS_VERIFY_EMAIL);
    },
    onError: (err) => {
      addAlert("error", err.message || "Signup failed");
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
      persistAuthUser(res.data, RESTAURANT_ACCOUNT_TYPE);
      addAlert("success", res.message || "Signup successful");
      localStorage.removeItem("email_verified");
      router.push(RESTAURANT_MANAGEMENT_ROUTES.OVERVIEW);
    },
    onError: (err) => {
      addAlert("error", err.message || "Signup failed");
    },
  });

  const { postData: postVerifyOTP } = usePost<
    VerifyEmailPayload,
    BaseResponse<{ email_verified: boolean }>
  >({
    endpoint: apiRoutes.customer.auth.verify_otp,
    onSuccess: (res) => {
      updateEmailStatus(true);
      addAlert("success", res.message || "Email verified successfully!");
      router.push(CUSTOMER_ROUTES.HOME);
    },
    onError: (err) => {
      addAlert("error", err.message || "OTP verification failed");
    },
  });

  const { postData: postRequestOTP } = usePost<
    { email: string; accountType?: string; purpose?: string },
    BaseResponse<{ expiration: string; user_email: string }>
  >({
    endpoint: apiRoutes.customer.auth.request_otp,
    onSuccess: (res) => {
      addAlert("success", res.message || "OTP sent to your email");
    },
    onError: (err) => {
      addAlert("error", err.message || "Failed to send OTP");
    },
  });

  const { postData: postLogout } = usePost<{}, BaseResponse<null>>({
    endpoint: apiRoutes.customer.auth.logout,
    onSuccess: (res) => {
      // Logout endpoint will clear cookies on backend
      // Frontend clears localStorage in the logout function
    },
    onError: (err) => {
      // Even if logout request fails, still clear frontend state
      console.error("Logout error:", err.message);
    },
  });

  async function getMe(): Promise<MeResponsePayload> {
    const response = await fetch(apiRoutes.customer.auth.me, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });

    const json = (await response.json()) as BaseResponse<MeResponsePayload>;

    if (!response.ok) {
      throw new Error(json.message || "Failed to fetch auth state");
    }

    if (!json.data) {
      throw new Error("Failed to fetch auth state");
    }

    return json.data;
  }

  // ----- Auth Actions -----
  async function login(loginDetails: BusinessLogin | UserLogin) {
    setSending(true);
    await postLogin(loginDetails);
    setSending(false);
  }

  async function loginCustomer(userLoginDetails: UserLogin) {
    setSending(true);
    await postUserLogin(userLoginDetails);
    setSending(false);
  }

  async function handleUserSignup() {
    setSending(true);
    await postUserSignup({
      firstName: userSignup.firstName,
      lastName: userSignup.lastName,
      email: userSignup.email,
      phone: userSignup.phone,
      password: userSignup.password,
    });
    setSending(false);
  }

  async function handleVerifyEmail() {
    if (!verifyEmail.otp || verifyEmail.otp.length !== 6) {
      addAlert("error", "Please enter a valid 6-digit OTP");
      return;
    }
    setSending(true);
    const emailToVerify =
      localStorage.getItem("email_to_verify") || verifyEmail.email;
    await postVerifyOTP({
      email: emailToVerify,
      otp: verifyEmail.otp,
      purpose: verifyEmail.purpose || "account_verification",
    });
    setSending(false);
  }

  async function requestOTP(purpose: string = "account_verification") {
    const emailToVerify =
      localStorage.getItem("email_to_verify") || verifyEmail.email;

    if (!emailToVerify) {
      addAlert("error", "No email found. Please sign up again.");
      return;
    }

    setSending(true);
    await postRequestOTP({
      email: emailToVerify,
      accountType: "user",
      purpose,
    });
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
      const userAccountType = getStoredAccountType();

      // Call backend logout endpoint to clear cookies
      postLogout({});

      // Clear frontend state
      localStorage.removeItem(STORAGE_USER_KEY);
      localStorage.removeItem("email_verified");
      localStorage.removeItem("email_to_verify");
      addAlert("success", "Logged out successfully");

      // Route based on the stored account type on this device
      if (userAccountType === CUSTOMER_ACCOUNT_TYPE) {
        router.push(AUTH_ROUTES.CUS_LOGIN);
      } else {
        router.push(AUTH_ROUTES.RES_LOGIN);
      }
    } catch (error) {
      // If parsing fails, default to customer login
      localStorage.removeItem(STORAGE_USER_KEY);
      addAlert("success", "Logged out successfully");
      router.push(AUTH_ROUTES.CUS_LOGIN);
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
        loginCustomer,
        register,
        handleUserSignup,
        handleVerifyEmail,
        requestOTP,
        logout,
        step,
        setStep,
        emailVerified,
        updateEmailStatus,
        sending,
        userSignup,
        setUserSignup,
        verifyEmail,
        setVerifyEmail,
        getMe,
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
