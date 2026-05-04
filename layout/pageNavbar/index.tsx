"use client";
import UloDineLink from "@/components/button/UloDineLink";
import UloDineSearch from "@/components/input/UloDineSearch";
import { GeneralIcons } from "@/icons/general/icons";
import { AUTH_ROUTES, HOME_ROUTES } from "@/routes/RoutePaths";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./style/index.module.css";

function HeaderNavLayout() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(0);
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

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          width={
            width > 500 && width < 800 ? "70%" : width > 800 ? "60%" : "22rem"
          }
        />
      </div>

      <nav>
        <div
          className={`${styles.menu} ${!open && width < 790 ? styles.close : ""}`}
          onClick={() => setOpen((pr) => !pr)}
        >
          <ul>
            {navList.map((nav, i) => {
              return (
                <li key={i}>
                  <Link
                    href={nav.path}
                    className={nav.path == pathname ? styles.active : ""}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {nav.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div
            className={styles.action_buttons}
            onClick={(e) => e.stopPropagation()}
          >
            <UloDineLink
              color="green"
              label="Login"
              path={AUTH_ROUTES.RES_LOGIN}
              underline={false}
              type="main"
              labelColor="green"
              style={{
                background: "#f5f5f5",
                borderRadius: "2rem",
                height: "3rem",
                padding: "0 2rem",
              }}
              className={styles.extended}
            />

            <UloDineLink
              color="white"
              label="Create Store"
              path={AUTH_ROUTES.RES_SIGNUP}
              underline={false}
              type="main"
              style={{
                borderRadius: "2rem",
                height: "3rem",
                padding: "0 2rem",
              }}
              className={styles.extended}
            />
          </div>
        </div>
        {width < 790 && (
          <button onClick={() => setOpen((pr) => !pr)}>
            <span />
            <span />
            <span />
          </button>
        )}
      </nav>
    </header>
  );
}

export default HeaderNavLayout;
