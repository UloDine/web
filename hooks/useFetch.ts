import { useEffect, useState } from "react";

export function useFetch<T>(endpoint: string, initialValue: T) {
  const [data, setData] = useState<T>(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Ensure endpoint always goes through Next.js API proxy
  const resolvedEndpoint = endpoint.startsWith("/api/")
    ? endpoint
    : `/api${endpoint}`;

  async function fetchData() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(resolvedEndpoint, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const json: BaseResponse<T> = await res.json();

      if (res.ok && json.status === "success") {
        setData(json.data ?? initialValue);
      } else {
        setError(json.message || "Failed to fetch data");
      }
    } catch (err: any) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedEndpoint]);

  return { data, loading, error, refetch: fetchData };
}
