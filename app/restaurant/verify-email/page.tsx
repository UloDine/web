"use client";
import { GeneralIcons } from "@/icons/general/icons";
import { SocialIcons } from "@/icons/socials/icons";
import { AUTH_ROUTES } from "@/routes/RoutePaths";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "@/styles/auth/Index.module.css";
import UloDineLink from "@/components/button/UloDineLink";
import UloDineInput from "@/components/input/UloDineInput";
import { useAuth } from "@/context/AuthContext";

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    businessPasswordReset,
    setBusinessPasswordReset,
    handleVerifyEmailBusiness,
    requestOTPBusiness,
    sending,
  } = useAuth();
  const [otpRequested, setOtpRequested] = useState<boolean>(false);

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

  useEffect(() => {
    if (businessPasswordReset.otp.length === 6) {
    } else {
    }
  }, [businessPasswordReset.otp]);

  useEffect(() => {
    // Auto-request OTP when page loads
    if (!otpRequested && businessPasswordReset.email) {
      requestOTPBusiness(businessPasswordReset.email);
      setOtpRequested(true);
    }
  }, [otpRequested, businessPasswordReset.email, requestOTPBusiness]);

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
          <h1>Verify your email</h1>
        </div>
        <div className={styles.auth_form_login}>
          <p>
            You need to verify that you own this email address before you can
            reset your password. Enter the OTP sent to you here.
          </p>
          <div style={{ margin: "1rem 0", maxWidth: "40rem" }}>
            <UloDineInput
              type="otp"
              value={businessPasswordReset.otp}
              otpChange={(value) =>
                setBusinessPasswordReset({
                  ...businessPasswordReset,
                  otp: value,
                })
              }
              onComplete={handleVerifyEmailBusiness}
              onResend={() => {
                requestOTPBusiness(businessPasswordReset.email);
                setOtpRequested(true);
              }}
            />
          </div>
          {sending ? (
            <p style={{ fontSize: "1.5rem", color: "#22c55e" }}>
              Verifying Email...
            </p>
          ) : (
            <p style={{ marginTop: "1rem" }}>
              Didn&apos;t receive OTP?{" "}
              <button
                onClick={() => requestOTPBusiness(businessPasswordReset.email)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#22c55e",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontSize: "inherit",
                }}
                disabled={sending}
              >
                Resend OTP
              </button>
            </p>
          )}
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
