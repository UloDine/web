"use client";

import React from "react";
import styles from "./styles/styles.module.css";
import UloDIneButton from "@/components/button/UloDIneButton";
import UloDineInput from "@/components/input/UloDineInput";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { AUTH_ROUTES } from "@/routes/RoutePaths";
import Link from "next/link";

function RecoverPassword() {
  const router = useRouter();
  const { verifyEmail, setVerifyEmail } = useAuth();
  const params = new URLSearchParams({
    from: AUTH_ROUTES.CUS_RECOVER_PASSWORD,
    to: AUTH_ROUTES.CUS_NEW_PASSWORD,
  });
  return (
    <section className={styles.recover_password}>
      <h1>
        Recover Your <br /> Password
      </h1>
      <p>
        Enter your registered email or phone number to receive a reset code.
      </p>
      <div className={styles.input}>
        <UloDineInput
          value={verifyEmail.email}
          onChange={(e) => {
            setVerifyEmail({ ...verifyEmail, email: e.target.value });
          }}
          type="email"
          label="Email"
          placeholder="e.g john.doe@example.com"
          strict
          errorMessage="Please enter a valid email address"
        />
      </div>
      <UloDIneButton
        color="green"
        label="Get Code"
        onClick={() =>
          router.push(`${AUTH_ROUTES.CUS_VERIFY_EMAIL}?${params.toString()}`)
        }
        type="primary"
        disabled={!verifyEmail.email}
        style={{ width: "100%", height: "4rem" }}
      />
      <div className={styles.link}>
        <Link href={AUTH_ROUTES.CUS_LOGIN}>Back to login</Link>
      </div>
      <p className={styles.link}>
        Don't have an account?{" "}
        <Link href={AUTH_ROUTES.CUS_SIGNUP}>Create one</Link>
      </p>
    </section>
  );
}

export default RecoverPassword;
