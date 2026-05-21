import { BankAccountProvider } from "@/context/BankAccountContext";
import React from "react";

function BillingLayout({ children }: { children: React.ReactNode }) {
  return <BankAccountProvider>{children}</BankAccountProvider>;
}

export default BillingLayout;
