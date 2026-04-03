"use client";
import UloDineLink from "@/components/button/UloDineLink";
import UloDineSearch from "@/components/input/UloDineSearch";
import { GeneralIcons } from "@/icons/general/icons";
import { AUTH_ROUTES, HOME_ROUTES } from "@/routes/RoutePaths";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import styles from "./style/index.module.css";

function HeaderNavLayout() {
  const pathname = usePathname();
  const navList: NavElement[] = [
    {
      label: "Home",
      path: HOME_ROUTES.HOME,
    },
    {
      label: "Find Restaurants",
      path: HOME_ROUTES.RESTAURANTS,
    },
    {
      label: "Pricing",
      path: HOME_ROUTES.PRICING,
    },
  ];
  return (
    <header className={styles.header_nav}>
      <div className={styles.home_left}>
        <Link href={"/"} className={styles.home_logo}>
          {GeneralIcons.logo} <h1>UloDIne</h1>
        </Link>
        <UloDineSearch
          type="home-page"
          placeholder="Search something"
          onSearchChange={() => {}}
          width={"25rem"}
        />
      </div>

      <nav>
        <ul>
          {navList.map((nav, i) => {
            return (
              <li key={i}>
                <Link
                  href={nav.path}
                  className={nav.path == pathname ? styles.active : ""}
                >
                  {nav.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className={styles.action_buttons}>
          <UloDineLink
            color="green"
            label="Login"
            path={AUTH_ROUTES.RES_LOGIN}
            underline={false}
            type="main"
            labelColor="green"
            style={{ background: "#f5f5f5", borderRadius: "2rem" }}
          />

          <UloDineLink
            color="white"
            label="Signup"
            path={AUTH_ROUTES.RES_SIGNUP}
            underline={false}
            type="main"
            style={{ borderRadius: "2rem" }}
          />
        </div>
      </nav>
    </header>
  );
}

export default HeaderNavLayout;
