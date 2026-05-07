"use client";
import UloDIneButton from "@/components/button/UloDIneButton";
import { GeneralIcons } from "@/icons/general/icons";
import { SocialIcons } from "@/icons/socials/icons";
import { AUTH_ROUTES } from "@/routes/RoutePaths";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "@/styles/auth/Index.module.css";
import UloDineLink from "@/components/button/UloDineLink";
import UloDineInput from "@/components/input/UloDineInput";
import { isValidEmail } from "@/utils/helpers";
import { useAuth } from "@/context/AuthContext";

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { requestOTPBusiness, sending } = useAuth();
  const [email, setEmail] = useState("");
  
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

  useEffect(() => {
    if (searchParams?.get("forced") !== "true") {
      return;
    }

    // Clear the forced-login cookie
    document.cookie = "forced-login=; path=/; max-age=0";

    router.replace(AUTH_ROUTES.RES_LOGIN);
  }, [router, searchParams]);

  const handleContinue = async () => {
    if (!email || !isValidEmail(email)) {
      return;
    }
    const ok = await requestOTPBusiness(email);
    if (!ok) return;
    // After OTP is sent, navigate to verify-email page
    const params = new URLSearchParams({
      from: AUTH_ROUTES.RES_RECOVER_PASSWORD,
      to: AUTH_ROUTES.RES_NEW_PASSWORD,
    });
    router.push(`${AUTH_ROUTES.RES_VERIFY_EMAIL}?${params.toString()}`);
  };

  return (
    <section className={`${styles.auth} ${styles.login}`}>
      <div className={styles.auth_img_bg_login}>
        <div className={styles.auth_logo}>
          {GeneralIcons.logo} <h1>UloDine</h1>
        </div>
        <div className={styles.auth_center}>
          <h1>
            Reset Your <br />
            <span>Password</span> <br /> to Get Back in
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
          <h1>Recover password</h1>
        </div>
        <div className={styles.auth_form_login}>
          <p>Enter the email you used to signup to continue</p>
          <div style={{ margin: "1rem 0" }}>
            <UloDineInput
              type="email"
              value={email}
              label="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div style={{ marginTop: 30 }}>
            <UloDIneButton
              type="primary"
              label="Continue"
              color="green"
              onClick={handleContinue}
              style={{ width: 150, height: 40 }}
              disabled={email === "" || !isValidEmail(email) || sending}
              loading={sending}
            />
          </div>
        </div>
        <div className={styles.auth_form_bottom}>
          <UloDineLink
            label="Back to Login"
            color="green"
            path={AUTH_ROUTES.RES_LOGIN}
            type="text"
            labelColor="green"
          />
        </div>
      </div>
    </section>
  );
}

export default Page;
