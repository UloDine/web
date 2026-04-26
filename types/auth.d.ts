type Role = "user" | "restaurant" | "admin";

interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  complete: boolean;
}

interface BusinessDetails {
  businessName: string;
  businessAddress: string;
  state: string;
  postalCode: string;
  businessLogo?: File;
  complete: boolean;
}

interface AuthDetails {
  email: string;
  password: string;
  retypedpassword: string;
  complete: boolean;
}

interface UserSignup {
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  acceptedTerm: boolean;
}

interface UserLogin {
  email: string;
  password: string;
  role: Role;
}

interface BusinessLogin {
  email: string;
  password: string;
  pin?: string;
  role: Role;
}

interface LoggedUser {
  id: string;
  fullName: string;
  email: string;
  role: Role;
}

interface VerifyEmailPayload {
  email: string;
  otp: string;
}

interface BaseResponse<T> {
  status: string;
  message: string;
  data: T;
}

interface AuthContext {
  // Signup state
  personal: PersonalDetails;
  business: BusinessDetails;
  auth: AuthDetails;
  setPersonal: React.Dispatch<React.SetStateAction<PersonalDetails>>;
  setBusiness: React.Dispatch<React.SetStateAction<BusinessDetails>>;
  setAuth: React.Dispatch<React.SetStateAction<AuthDetails>>;
  userSignup: UserSignup;
  setUserSignup: React.Dispatch<React.SetStateAction<UserSignup>>;

  // Email verification state
  verifyEmail: VerifyEmailPayload;
  setVerifyEmail: React.Dispatch<React.SetStateAction<VerifyEmailPayload>>;

  // Login state
  userLogin: UserLogin;
  businessLogin: BusinessLogin;
  setUserLogin: React.Dispatch<React.SetStateAction<UserLogin>>;
  setBusinessLogin: React.Dispatch<React.SetStateAction<BusinessLogin>>;

  // Actions
  login: (loginDetails: BusinessLogin | UserLogin) => Promise<void>;
  register: () => Promise<void>;
  logout: () => void;

  // Shared
  step: number;
  setStep: (step: number) => void;
  emailVerified: any;
  updateEmailStatus: (payload: any) => void;
  sending: boolean;
}
