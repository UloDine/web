"use client";

import React, { createContext, useContext, useState } from "react";
import { useToast } from "./ToastContext";
import { apiRoutes } from "@/lib/apiRoutes";
import { useFetch } from "@/hooks/useFetch";
import { usePost } from "@/hooks/usePost";
import { usePut } from "@/hooks/usePut";

const BankAccountContext = createContext<BankAccountContextType | undefined>(
  undefined,
);

export const useBankAccount = () => {
  const ctx = useContext(BankAccountContext);
  if (!ctx)
    throw new Error("useBankAccount must be used within BankAccountProvider");
  return ctx;
};

export const BankAccountProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { showToast } = useToast();
  const [account, setAccount] = useState<BankAccount | null>(null);

  // fetch flow using useFetch — endpoint changes when restaurantId changes
  const [fetchRestaurantId, setFetchRestaurantId] = useState<string | null>(
    null,
  );

  const fetchEndpoint = fetchRestaurantId
    ? apiRoutes.payments.subaccount.fetch(fetchRestaurantId)
    : apiRoutes.payments.subaccount.create; // will be ignored by useFetch when disabled

  const {
    data: fetchedData,
    loading: _loading,
    error: _error,
    refetch,
  } = useFetch<any>(fetchEndpoint, null, {
    enabled: Boolean(fetchRestaurantId),
  });

  async function fetchAccount(restaurantId: string) {
    try {
      setFetchRestaurantId(restaurantId);
      // wait for refetch to complete
      const result = await refetch();
      // useFetch stores result in its internal state; read from fetchedData after refetch
      const d = (result as any) ?? fetchedData;
      setAccount((d as BankAccount) ?? null);
      return (d as BankAccount) ?? null;
    } catch (err: any) {
      showToast(err?.message || "Failed to fetch account", "error");
      setAccount(null);
      return null;
    }
  }

  // create using usePost
  const { postData: postCreate } = usePost<BankAccountPayload, any>({
    endpoint: apiRoutes.payments.subaccount.create,
    onSuccess: (res) => {
      const data = (res as any).data;
      setAccount((data?.orderAccount ?? data ?? null) as BankAccount | null);
      showToast(res.message || "Bank account created", "success");
    },
    onError: (err) => {
      showToast(err.message || "Failed to create account", "error");
    },
  });

  async function createAccount(payload: BankAccountPayload) {
    const res = await postCreate(payload);
    return res;
  }

  const { putData: putUpdate } = usePut<Partial<BankAccountPayload>, any>({
    endpoint: apiRoutes.payments.subaccount.create,
    onSuccess: (res: any) => {
      const data = (res as any).data;
      setAccount((data?.orderAccount ?? data ?? null) as BankAccount | null);
      showToast(res.message || "Bank account updated", "success");
    },
    onError: (err: any) => {
      showToast(err.message || "Failed to update account", "error");
    },
  });

  async function updateAccount(
    restaurantId: string,
    payload: Partial<BankAccountPayload>,
  ) {
    const res = await putUpdate(
      payload as any,
      apiRoutes.payments.subaccount.update(restaurantId),
    );
    return res;
  }

  return (
    <BankAccountContext.Provider
      value={{ account, fetchAccount, createAccount, updateAccount }}
    >
      {children}
    </BankAccountContext.Provider>
  );
};

export default BankAccountContext;
