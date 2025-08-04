import { useApiService } from "@/context/ApiServiceContext";
import { useEffect, useState } from "react";

export function useFetch<T>(endpoint: string, initialValue: T) {
  const api = useApiService();
  const [data, setData] = useState<T>(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function fetchData() {
    setError(null);
    setLoading(true);
    try {
      const res = await api.get<T>(endpoint);
      if (res.data) {
        setData(res.data);
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      setError(null);
      setLoading(true);
      try {
        const res = await api.get<T>(endpoint);
        if (res.data && isMounted) {
          setData(res.data);
        }
      } catch (error: any) {
        if (isMounted) setError(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  return { loading, data, refetch: fetchData, error };
}
