interface Login {
  userLogin: UserLogin;
  businessLogin: BusinessLogin;
  setUserLogin: React.Dispatch<React.SetStateAction<UserLogin>>;
  setBusinessLogin: React.Dispatch<React.SetStateAction<BusinessLogin>>;
  handleLogin: (loginDetails: BusinessLogin) => void;
  sending: boolean;
  setSending: React.Dispatch<React.SetStateAction<boolean>>;
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

type Role = "user" | "restaurant" | "admin";

interface Business {
  id: string;
  fullName: string;
  email: string;
}

interface LoginSuccess {
  message: string;
  user: Business;
  status: string;
}

interface LoginFailure {
  status: string;
  message: string;
}

type LoginResponse = LoginSuccess | LoginFailure;
