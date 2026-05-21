interface BillingStat {
  title: string;
  value: number | string;
  action?: {
    label: string;
    action: () => void;
  };
  sub?: string;
  icon: React.ReactNode;
}

interface CollactionAction {
  bank_name: string;
  account_name: string;
  account_number: string;
}

interface Transaction {
  id: string;
  title: string;
  amount: number;
  status: number;
  created_at: string;
  type: "order" | "subscription";
}

interface BankAccountPayload {
  restaurantId: string;
  businessName: string;
  bankName: string;
  bankCode: string;
  bankAccountNumber: string;
  nameOnAccount: string;
  percentageCharge?: number;
  description?: string;
  primaryContactEmail?: string;
  primaryContactPhone?: string;
}

interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

interface BankAccountContextType {
  account: BankAccount | null;
  fetchAccount: (restaurantId: string) => Promise<BankAccount | null>;
  createAccount: (payload: BankAccountPayload) => Promise<BankAccount | null>;
  updateAccount: (
    restaurantId: string,
    payload: Partial<BankAccountPayload>,
  ) => Promise<BankAccount | null>;
}

interface Bank {
  name: string;
  code: string;
  countryCode: string;
  currency: string;
}
