import { ReactNode } from "react";

declare global {
  interface InputError {
    message: string;
    icon: ReactNode;
  }
}

export {};
