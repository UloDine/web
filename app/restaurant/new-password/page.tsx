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
import { useAuth } from "@/context/AuthContext";
import { useAlert } from "@/context/alert/AlertContext";

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { businessPasswordReset, setBusinessPasswordReset, sending } =
    useAuth();
  const { addAlert } = useAlert();
  const [loading, setLoading] = useState(false);

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

  const handleSetPassword = async () => {
    if (!businessPasswordReset.newPassword) {
      addAlert("error", "Please enter a new password");
      return;
    }

    if (
      businessPasswordReset.newPassword !==
      businessPasswordReset.confirmPassword
    ) {
      addAlert("error", "Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const email =
        localStorage.getItem("email_to_verify_business") ||
        businessPasswordReset.email;

      if (!email) {
        addAlert("error", "Email not found. Please start over.");
        return;
      }

      // Fetch restaurant by email to get the ID
      const response = await fetch(
        `/api/restaurants/email/${encodeURIComponent(email)}`
      );
      const result = await response.json();

      if (!response.ok || !result.data?.id) {
        addAlert("error", "Failed to find restaurant account");
        return;
      }

      // Set password for the restaurant
      const passwordResponse = await fetch(
        `/api/restaurants/${result.data.id}/password`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPassword: businessPasswordReset.newPassword,
          }),
        }
      );

      const passwordResult = await passwordResponse.json();

      if (!passwordResponse.ok) {
        addAlert(
          "error",
          passwordResult.message || "Failed to update password"
        );
        return;
      }

      addAlert("success", "Password updated successfully");
      localStorage.removeItem("email_to_verify_business");
      setBusinessPasswordReset({
        email: "",
        otp: "",
        newPassword: "",
        confirmPassword: "",
      });
      router.push(AUTH_ROUTES.RES_LOGIN);
    } catch (error) {
      console.error("Error setting password:", error);
      addAlert("error", "Failed to update password");
    } finally {
      setLoading(false);
    }
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
          <h1>Set a New Password</h1>
        </div>
        <div className={styles.auth_form_login}>
          <p>Please create a new strong password.</p>
          <div style={{ margin: "1rem 0" }}>
            <UloDineInput
              type="password"
              value={businessPasswordReset.newPassword}
              label="Password"
              placeholder="Enter new password"
              onChange={(e) => {
                setBusinessPasswordReset({
                  ...businessPasswordReset,
                  newPassword: e.target.value,
                });
              }}
            />
          </div>
          <div style={{ margin: "1rem 0" }}>
            <UloDineInput
              type="password"
              value={businessPasswordReset.confirmPassword}
              label="Confirm Password"
              placeholder="Confirm your new password"
              onChange={(e) => {
                setBusinessPasswordReset({
                  ...businessPasswordReset,
                  confirmPassword: e.target.value,
                });
              }}
            />
          </div>

          <div style={{ marginTop: 30 }}>
            <UloDIneButton
              type="primary"
              label="Set new password"
              color="green"
              onClick={handleSetPassword}
              style={{ width: 200, height: 40 }}
              disabled={
                !businessPasswordReset.newPassword ||
                !businessPasswordReset.confirmPassword ||
                businessPasswordReset.newPassword !==
                  businessPasswordReset.confirmPassword ||
                sending ||
                loading
              }
              loading={sending || loading}
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
