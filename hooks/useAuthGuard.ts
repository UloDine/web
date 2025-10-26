// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { AUTH_ROUTES } from "@/routes/RoutePaths";

// export function useAuthGuard() {
//   const router = useRouter();

//   useEffect(() => {
//     // Get user data from localStorage
//     const user = localStorage.getItem("user");

//     if (!user) {
//       router.replace(AUTH_ROUTES.RES_LOGIN); // redirect immediately
//     }
//   }, [router]);
// }
