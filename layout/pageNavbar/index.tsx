"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UloDineLink from "@/components/button/UloDineLink";
import UloDineSearch from "@/components/input/UloDineSearch";
import { GeneralIcons } from "@/icons/general/icons";
import { AUTH_ROUTES } from "@/routes/RoutePaths";
import styles from "./style/index.module.css";

interface MegaMenuSubItem {
  title: string;
  desc: string;
  path: string;
  icon: React.ReactNode;
}

export default function HeaderNavLayout() {
  const pathname = usePathname();
  const [openMobile, setOpenMobile] = useState(false);
  const [width, setWidth] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const restaurantMenu: MegaMenuSubItem[] = [
    {
      title: "Restaurant Directory",
      desc: "Browse local food spots, view digital menus, and order direct.",
      path: "/restaurants",
      icon: GeneralIcons.search,
    },
    {
      title: "QR Code Dine-In",
      desc: "Instant contactless table menus with zero app downloads required.",
      path: "/features#qr",
      icon: GeneralIcons.qr_code,
    },
    {
      title: "Kitchen Display (KDS)",
      desc: "Real-time 3-column prep tickets with Web Audio chime alerts.",
      path: "/features#kds",
      icon: GeneralIcons.orders,
    },
    {
      title: "Menu Modifiers",
      desc: "Define required and optional add-ons, extras, and spice levels.",
      path: "/features#modifiers",
      icon: GeneralIcons.edit,
    },
  ];

  const dinersMenu: MegaMenuSubItem[] = [
    {
      title: "Discover Local Spots",
      desc: "Browse top local restaurants, explore digital menus, and order direct.",
      path: "/restaurants",
      icon: GeneralIcons.search,
    },
    {
      title: "App-Free QR Ordering",
      desc: "Scan table QR codes with your smartphone camera to order instantly.",
      path: "/for-diners",
      icon: GeneralIcons.qr_code,
    },
    {
      title: "1-Tap Waiter Call",
      desc: "Request table assistance, extra cutlery, or refills with one tap.",
      path: "/for-diners",
      icon: GeneralIcons.settings,
    },
    {
      title: "Secure Direct Checkout",
      desc: "Pay via Paystack cards, bank transfers, or USSD with instant receipts.",
      path: "/for-diners",
      icon: GeneralIcons.check,
    },
  ];

  const companyMenu: MegaMenuSubItem[] = [
    {
      title: "Our 0% Mission",
      desc: "Why we built a 100% commission-free platform for local venues.",
      path: "/about-us",
      icon: GeneralIcons.check,
    },
    {
      title: "Help Center & FAQ",
      desc: "Instant answers to setup, hardware, and Paystack payout questions.",
      path: "/faq",
      icon: GeneralIcons.error_circle,
    },
    {
      title: "Contact & Support",
      desc: "Reach out to our dedicated merchant onboarding & sales team.",
      path: "/contact",
      icon: GeneralIcons.settings,
    },
  ];

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
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
          placeholder="Search restaurants..."
          onSearchChange={() => {}}
          width="100%"
        />
      </div>

      <nav>
        <div
          className={`${styles.menu} ${!openMobile && width < 850 ? styles.close : ""}`}
          onClick={() => setOpenMobile(false)}
        >
          <ul className={styles.nav_list}>
            {/* 1. Home */}
            <li>
              <Link
                href="/"
                className={pathname === "/" ? styles.active : ""}
                onClick={(e) => e.stopPropagation()}
              >
                Home
              </Link>
            </li>

            {/* 2. For Restaurants Mega-Menu Dropdown */}
            <li
              className={styles.dropdown_parent}
              onMouseEnter={() => setActiveDropdown("restaurants")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`${styles.dropdown_btn} ${(pathname || "").startsWith("/restaurants") || (pathname || "").startsWith("/features") ? styles.active : ""}`}>
                For Restaurants <span className={styles.arrow_down}>▾</span>
              </button>

              {activeDropdown === "restaurants" && (
                <div className={`${styles.mega_card_overlay} ${styles.company_card_overlay}`} onClick={(e) => e.stopPropagation()}>
                  <div className={styles.mega_card_header}>
                    <span>RESTAURANT SOLUTIONS</span>
                    <small>0% Commission Tools</small>
                  </div>
                  <div className={styles.mega_grid_single}>
                    {restaurantMenu.map((sub, i) => (
                      <Link key={i} href={sub.path} className={styles.mega_item}>
                        <div className={styles.sub_icon_wrap}>{sub.icon}</div>
                        <div className={styles.sub_text_wrap}>
                          <strong>{sub.title}</strong>
                          <p>{sub.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>

            {/* 3. For Diners Dropdown */}
            <li
              className={styles.dropdown_parent}
              onMouseEnter={() => setActiveDropdown("diners")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`${styles.dropdown_btn} ${(pathname || "") === "/for-diners" ? styles.active : ""}`}>
                For Diners <span className={styles.arrow_down}>▾</span>
              </button>

              {activeDropdown === "diners" && (
                <div className={`${styles.mega_card_overlay} ${styles.company_card_overlay}`} onClick={(e) => e.stopPropagation()}>
                  <div className={styles.mega_card_header}>
                    <span>FOR EVERYDAY DINERS</span>
                    <small>App-Free Dining</small>
                  </div>
                  <div className={styles.mega_grid_single}>
                    {dinersMenu.map((sub, i) => (
                      <Link key={i} href={sub.path} className={styles.mega_item}>
                        <div className={styles.sub_icon_wrap}>{sub.icon}</div>
                        <div className={styles.sub_text_wrap}>
                          <strong>{sub.title}</strong>
                          <p>{sub.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>

            {/* 3. Pricing */}
            <li>
              <Link
                href="/pricing"
                className={pathname === "/pricing" ? styles.active : ""}
                onClick={(e) => e.stopPropagation()}
              >
                Pricing
              </Link>
            </li>

            {/* 4. Company Dropdown */}
            <li
              className={styles.dropdown_parent}
              onMouseEnter={() => setActiveDropdown("company")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`${styles.dropdown_btn} ${pathname === "/about-us" || pathname === "/faq" || pathname === "/contact" ? styles.active : ""}`}>
                Company <span className={styles.arrow_down}>▾</span>
              </button>

              {activeDropdown === "company" && (
                <div className={`${styles.mega_card_overlay} ${styles.company_card_overlay}`} onClick={(e) => e.stopPropagation()}>
                  <div className={styles.mega_card_header}>
                    <span>ULODINE PLATFORM</span>
                    <small>Support & Mission</small>
                  </div>
                  <div className={styles.mega_grid_single}>
                    {companyMenu.map((sub, i) => (
                      <Link key={i} href={sub.path} className={styles.mega_item}>
                        <div className={styles.sub_icon_wrap}>{sub.icon}</div>
                        <div className={styles.sub_text_wrap}>
                          <strong>{sub.title}</strong>
                          <p>{sub.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          </ul>

          <div className={styles.action_buttons} onClick={(e) => e.stopPropagation()}>
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
                padding: "0 1.8rem",
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
                padding: "0 1.8rem",
              }}
              className={styles.extended}
            />
          </div>
        </div>

        {width < 850 && (
          <button className={styles.hamburger_btn} onClick={() => setOpenMobile((pr) => !pr)}>
            <span />
            <span />
            <span />
          </button>
        )}
      </nav>
    </header>
  );
}
