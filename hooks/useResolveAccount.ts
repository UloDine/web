import { useState } from "react";
import { apiRoutes } from "@/lib/apiRoutes";

export function useResolveAccount() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function resolve(accountNumber: string, bankCode: string) {
    setError(null);
    setLoading(true);
    try {
      const url = apiRoutes.payments.resolve.fetch(accountNumber, bankCode);
      const res = await fetch(url, { method: "GET", credentials: "include" });
      const json = await res.json();
      if (res.ok && json.status === "success") {
        return json.data;
      }
      setError(json.message || "Failed to resolve account");
      return null;
    } catch (err: any) {
      setError(err.message || "Network error");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { resolve, loading, error };
}
