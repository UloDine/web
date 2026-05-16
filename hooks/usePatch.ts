"use client";

import { useState } from "react";

interface UsePatchOptions<TBody, TResponse> {
  endpoint: string;
  onSuccess?: (data: TResponse) => void;
  onError?: (error: Error) => void;
}

export function usePatch<TBody = any, TResponse = any>({
  endpoint,
  onSuccess,
  onError,
}: UsePatchOptions<TBody, TResponse>) {
  const [data, setData] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function patchData(body: TBody): Promise<TResponse | null> {
    setLoading(true);
    setError(null);

    try {
      const isFormData = body instanceof FormData;

      const res = await fetch(`${endpoint}`, {
        method: "PATCH",
        headers: isFormData ? {} : { "Content-Type": "application/json" },
        credentials: "include",
        body: isFormData ? (body as FormData) : JSON.stringify(body),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        const message = errBody.message || res.statusText;
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

  return { data, loading, error, patchData };
}
