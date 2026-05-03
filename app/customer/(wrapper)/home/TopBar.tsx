"use client";
import { BellIcon, ScanIcon } from "@/icons/customer";
import { GeneralIcons } from "@/icons/general/icons";
import { DateUtils } from "@/utils/date";
import React, { useEffect } from "react";
import styles from "./styles/home.module.css";
import UloDineSearch from "@/components/input/UloDineSearch";
import { useAuth } from "@/context/AuthContext";
import UloDineLink from "@/components/button/UloDineLink";
import { AUTH_ROUTES } from "@/routes/RoutePaths";

function TopBar() {
  const { getMe } = useAuth();
  const [user, setUser] = React.useState<MeResponsePayload | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getMe();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUser();
  }, [getMe]);
  return (
    <div className={styles.top_bar}>
      <div className={styles.inner}>
        <div className={styles.left}>
          {GeneralIcons.logo}
          {user ? (
            <div>
              <small>{DateUtils.greetBasedOnTime(new Date())}</small>
              <strong>{user.user?.fullName}</strong>
            </div>
          ) : (
            <h2>UloDine</h2>
          )}
        </div>
        <div className={styles.right}>
          <button>
            <ScanIcon />
          </button>
          {user ? (
            <button>
              <BellIcon />
            </button>
          ) : (
            <UloDineLink
              path={AUTH_ROUTES.CUS_LOGIN}
              color="green"
              label="Login"
              type="main"
              underline={false}
              style={{ borderRadius: "5rem" }}
            />
          )}
        </div>
      </div>
      <UloDineSearch
        onSearchChange={() => {}}
        placeholder="Search for restaurants or meals…"
        type="normal"
        width={"100%"}
      />
    </div>
  );
}

export default TopBar;
