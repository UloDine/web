"use client";

import { useState } from "react";

interface UsePostOptions<TBody, TResponse> {
  endpoint: string; // e.g. "/auth/restaurant/login" (relative to /api)
  onSuccess?: (data: TResponse) => void;
  onError?: (error: Error) => void;
}

export function usePost<TBody = any, TResponse = any>({
  endpoint,
  onSuccess,
  onError,
}: UsePostOptions<TBody, TResponse>) {
  const [data, setData] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function postData(body: TBody): Promise<TResponse | null> {
    setLoading(true);
    setError(null);

    try {
      // ✅ Always hit Next.js API route
      const res = await fetch(`${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // important for JWT cookie passing
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        const message = errBody.message || res.statusText;
        console.log(`HTTP ${res.status}: ${message}`);
        throw new Error(`${message}`);
      }

      const json = (await res.json()) as TResponse;
      setData(json);
      onSuccess?.(json);
      return json;
    } catch (err: any) {
      const e = err instanceof Error ? err : new Error(String(err));
      setError(e);
      onError?.(e);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, postData };
}
