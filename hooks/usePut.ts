"use client";

import { useState } from "react";

interface UsePutOptions<TBody, TResponse> {
  endpoint: string;
  onSuccess?: (data: TResponse) => void;
  onError?: (error: Error) => void;
}

export function usePut<TBody = any, TResponse = any>({
  endpoint,
  onSuccess,
  onError,
}: UsePutOptions<TBody, TResponse>) {
  const [data, setData] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function putData(
    body: TBody,
    endpointOverride?: string,
  ): Promise<TResponse | null> {
    setLoading(true);
    setError(null);

    try {
      const isFormData = body instanceof FormData;

      const target = endpointOverride ?? endpoint;

      const res = await fetch(`${target}`, {
        method: "PUT",
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

  return { data, loading, error, putData };
}
