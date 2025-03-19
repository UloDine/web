declare global {
  interface Signup {
    personal: PersonalDetails;
    business: BusinessDetails;
    auth: AuthDetails;
    setPersonal: (details: PersonalDetails) => void;
    setBusiness: (details: BusinessDetails) => void;
    setAuth: (details: AuthDetails) => void;
    step: number;
    setStep: (step: number) => void;
  }

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
}

export {};
