"use client";

import { useEffect } from "react";
import { useApiService } from "./contexts/ApiServiceContext";
import { apiRoutes } from "./lib/apiRoutes";

export default function UserListPage() {
  const api = useApiService();

  useEffect(() => {
    api
      .post(apiRoutes.user.login, {
        user_email: "superadmin@dispa8ch.com",
        user_password: "SUPERstrongp#ssword1223",
      })
      .then((res) => {
        if (res.status) {
          console.log("Users:", res.data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err.message);
      });
  }, []);
}
