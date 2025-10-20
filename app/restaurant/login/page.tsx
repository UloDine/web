"use client";
import UloDIneButton from "@/components/button/UloDIneButton";
import { GeneralIcons } from "@/icons/general/icons";
import { SocialIcons } from "@/icons/socials/icons";
import React from "react";
import styles from "@/styles/auth/Index.module.css";
import UloDineLink from "@/components/button/UloDineLink";
import { AUTH_ROUTES } from "@/routes/RoutePaths";
import UloDineInput from "@/components/input/UloDineInput";
import { isStrongPassword } from "@/utils/helpers";
import { useAuth } from "@/context/AuthContext";

function page() {
  const { businessLogin, setBusinessLogin, login, sending } = useAuth();
  const socials = [
    {
      icon: SocialIcons.x,
      link: "",
    },
    {
      icon: SocialIcons.instagram,
      link: "",
    },
    {
      icon: SocialIcons.facebook,
      link: "",
    },
    {
      icon: SocialIcons.linkedin,
      link: "",
    },
  ];

  return (
    <section className={`${styles.auth} ${styles.login}`}>
      <div className={styles.auth_img_bg_login}>
        <div className={styles.auth_logo}>
          {GeneralIcons.logo} <h1>UloDine</h1>
        </div>
        <div className={styles.auth_center}>
          <h1>
            Welcome Back to <span>UloDine</span> Manage Your Restaurant with
            Ease.
          </h1>
        </div>
        <div className={styles.auth_bottom}>
          <div className={styles.auth_bottom_socials}>
            {socials.map((social, i) => (
              <a href={social.link} key={i}>
                {social.icon}
              </a>
            ))}
          </div>
          <p style={{ color: "#6B6A6A" }}>
            &copy; {new Date().getFullYear()} UloDine. All rights reserved.
            UloDine is a trusted platform for restaurant management and online
            ordering.
          </p>
        </div>
      </div>
      <div className={styles.auth_form}>
        <div className={styles.auth_form_header}>
          <h1>Login</h1>
          <UloDineLink
            color="green"
            label="Signup"
            path={AUTH_ROUTES.RES_SIGNUP}
            type="main"
            key={"jkfhuewr"}
          />
        </div>
        <div className={styles.auth_form_login}>
          <div style={{ margin: "1rem 0" }}>
            <UloDineInput
              type="email"
              value={businessLogin.email}
              label="Email"
              onChange={(e) => {
                setBusinessLogin((prev) => ({
                  ...prev,
                  email: e.target.value,
                }));
              }}
            />
          </div>
          <div style={{ margin: "1rem 0" }}>
            <UloDineInput
              type="password"
              value={businessLogin.password}
              label="Password"
              onChange={(e) => {
                setBusinessLogin((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
            />
          </div>
          <div style={{ marginTop: 30 }}>
            <UloDIneButton
              type="primary"
              label="Login"
              color="green"
              onClick={async () => {
                login(businessLogin);
              }}
              style={{ width: 150, height: 40 }}
              disabled={
                businessLogin.email === "" ||
                businessLogin.password === "" ||
                !isStrongPassword(businessLogin.password)
              }
              loading={sending}
            />
          </div>
        </div>
        <div className={styles.auth_form_bottom}>
          <UloDineLink
            label="Forgot Password?"
            color="green"
            path=""
            type="outline"
            labelColor="green"
          />
        </div>
      </div>
    </section>
  );
}

export default page;
