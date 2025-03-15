interface Login {
  userLogin: UserLogin;
  businessLogin: BusinessLogin;
  setUserLogin: (details: UserLogin) => void;
  setBusinessLogin: (details: BusinessLogin) => void;
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
