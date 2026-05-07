"use client";
import { usePost } from "@/hooks/usePost";
import { apiRoutes } from "@/lib/apiRoutes";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { useAlert } from "./alert/AlertContext";
import { usePathname, useRouter } from "next/navigation";
import {
  AUTH_ROUTES,
  RESTAURANT_MANAGEMENT_ROUTES,
  CUSTOMER_ROUTES,
} from "@/routes/RoutePaths";

const STORAGE_USER_KEY = "user";
const RESTAURANT_ACCOUNT_TYPE: AccountType = "RESTAURANT";
const CUSTOMER_ACCOUNT_TYPE: AccountType = "CUSTOMER";

function persistAuthUser(payload: object | null, accountType: AccountType) {
  if (!payload) {
    return;
  }

  localStorage.setItem(
    STORAGE_USER_KEY,
    JSON.stringify({ ...(payload as Record<string, unknown>), accountType }),
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
  const pathname = usePathname();

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
    purpose: "",
  });

  const [businessPasswordReset, setBusinessPasswordReset] = useState<{
    email: string;
    otp: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
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
  const [meCache, setMeCache] = useState<MeResponsePayload | null>(null);
  const [isMeFetching, setIsMeFetching] = useState<boolean>(false);
  const meFetchedRef = useRef<boolean>(false);

  // ----- Initialize Me cache on mount -----
  useEffect(() => {
    if (meFetchedRef.current) return;
    if (!pathname?.startsWith("/customer")) return;

    async function initializeMeCache() {
      if (typeof document === "undefined") return;

      try {
        setIsMeFetching(true);
        const response = await fetch(apiRoutes.customer.auth.me, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        });

        const json = (await response.json()) as BaseResponse<MeResponsePayload>;

        if (response.ok && json.data) {
          setMeCache(json.data);
        }
      } catch (error) {
        console.error("Failed to initialize Me cache:", error);
      } finally {
        setIsMeFetching(false);
        meFetchedRef.current = true;
      }
    }

    initializeMeCache();
  }, [pathname]);

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
      if (!res.data) {
        addAlert("error", "Login failed");
        return;
      }

      persistAuthUser(res.data, RESTAURANT_ACCOUNT_TYPE);
      // Clear Me cache on login so it gets refreshed
      setMeCache(null);
      meFetchedRef.current = false;
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
      if (!res.data) {
        addAlert("error", "Login failed");
        return;
      }

      persistAuthUser(res.data, CUSTOMER_ACCOUNT_TYPE);
      // Clear Me cache on login so it gets refreshed
      setMeCache(null);
      meFetchedRef.current = false;
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
      if (!res.data) {
        addAlert("error", "Signup failed");
        return;
      }

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

  const { postData: postRequestOTPBusiness } = usePost<
    { email: string; accountType?: string; purpose?: string },
    BaseResponse<{ expiration: string; user_email: string }>
  >({
    endpoint: apiRoutes.restaurant.auth.request_otp,
    onSuccess: (res) => {
      addAlert("success", res.message || "OTP sent to your email");
      localStorage.setItem("email_to_verify_business", businessPasswordReset.email);
    },
    onError: (err) => {
      addAlert("error", err.message || "Failed to send OTP");
    },
  });

  const { postData: postVerifyOTPBusiness } = usePost<
    { email: string; otp: string; purpose?: string },
    BaseResponse<{ email: string }>
  >({
    endpoint: apiRoutes.restaurant.auth.verify_otp,
    onSuccess: (res) => {
      addAlert("success", res.message || "OTP verified successfully");
      router.push(AUTH_ROUTES.RES_NEW_PASSWORD);
    },
    onError: (err) => {
      addAlert("error", err.message || "OTP verification failed");
    },
  });

  async function getMe(): Promise<MeResponsePayload> {
    // Return cached value if available
    if (meCache) {
      return meCache;
    }

    // If currently fetching, wait for cache to be populated
    if (isMeFetching) {
      // Wait up to 5 seconds for cache to be populated
      for (let i = 0; i < 50; i++) {
        if (meCache) {
          return meCache;
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      throw new Error("Failed to fetch auth state");
    }

    // If not cached and not fetching, fetch and cache
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

    setMeCache(json.data);
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

  async function requestOTPBusiness(email: string) {
    if (!email) {
      addAlert("error", "Please enter your email");
      return;
    }

    setSending(true);
    setBusinessPasswordReset((prev) => ({ ...prev, email }));
    await postRequestOTPBusiness({
      email,
      accountType: "restaurant",
      purpose: "password_reset",
    });
    setSending(false);
  }

  async function handleVerifyEmailBusiness() {
    if (!businessPasswordReset.otp || businessPasswordReset.otp.length !== 6) {
      addAlert("error", "Please enter a valid 6-digit OTP");
      return;
    }

    setSending(true);
    const emailToVerify =
      localStorage.getItem("email_to_verify_business") ||
      businessPasswordReset.email;
    await postVerifyOTPBusiness({
      email: emailToVerify,
      otp: businessPasswordReset.otp,
      purpose: "password_reset",
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

      // Clear Me cache and reset fetch flag
      setMeCache(null);
      meFetchedRef.current = false;

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
        businessPasswordReset,
        setBusinessPasswordReset,
        login,
        loginCustomer,
        register,
        handleUserSignup,
        handleVerifyEmail,
        requestOTP,
        requestOTPBusiness,
        handleVerifyEmailBusiness,
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
