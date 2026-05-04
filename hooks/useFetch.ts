import { AUTH_ROUTES } from "@/routes/RoutePaths";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

const STORAGE_USER_KEY = "user";

type FetchAccountType = "restaurant" | "customer";

interface UseFetchOptions {
  accountType?: FetchAccountType;
}

function getLoginRoute(accountType?: FetchAccountType, endpoint?: string) {
  if (accountType === "customer") {
    return AUTH_ROUTES.CUS_LOGIN;
  }

  if (accountType === "restaurant") {
    return AUTH_ROUTES.RES_LOGIN;
  }

  return endpoint?.includes("/customer/")
    ? AUTH_ROUTES.CUS_LOGIN
    : AUTH_ROUTES.RES_LOGIN;
}

function getStoredRestaurantId() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedUser = localStorage.getItem(STORAGE_USER_KEY);
    if (!storedUser) {
      return null;
    }

    const parsedUser = JSON.parse(storedUser);

    if (parsedUser?.accountType === "CUSTOMER") {
      return null;
    }

    if (parsedUser?.accountType === "RESTAURANT") {
      return parsedUser?.restaurant?.id ?? parsedUser?.id ?? null;
    }

    if (parsedUser?.role === "restaurant") {
      return parsedUser?.restaurant?.id ?? parsedUser?.id ?? null;
    }

    return parsedUser?.restaurant?.id ?? parsedUser?.id ?? null;
  } catch {
    alert("Something happened");
    return null;
  }
}

export function useFetch<T>(
  endpoint: string,
  initialValue: T,
  options?: UseFetchOptions,
) {
  const router = useRouter();
  const [data, setData] = useState<T>(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Ensure endpoint always goes through Next.js API proxy
  const resolvedEndpoint = endpoint.startsWith("/api/")
    ? endpoint
    : `/api${endpoint}`;

  // ✅ Check if endpoint has empty required parameters (e.g., restaurantId=)
  const hasEmptyParams =
    /[?&](?:restaurantId|id|customerId|menuId)=(?:&|$)/.test(resolvedEndpoint);

  useLayoutEffect(() => {
    if (!hasEmptyParams) {
      return;
    }

    const storedRestaurantId = getStoredRestaurantId();
    if (storedRestaurantId) {
      return;
    }

    router.replace(getLoginRoute(options?.accountType, resolvedEndpoint));
  }, [hasEmptyParams, options?.accountType, resolvedEndpoint, router]);

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
    // Skip fetching if required params are missing
    if (hasEmptyParams) {
      setLoading(false);
      setError(null);
      return;
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedEndpoint, hasEmptyParams, router]);

  return { data, loading, error, refetch: fetchData };
}
