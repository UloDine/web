"use client";

import UloDIneButton from "@/components/button/UloDIneButton";
import React, { useEffect, useState } from "react";
import styles from "./styles/styles.module.css";
import Link from "next/link";
import UloDineInput from "@/components/input/UloDineInput";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { AUTH_ROUTES } from "@/routes/RoutePaths";

function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [disabled, setDisabled] = useState<boolean>(true);
  const { verifyEmail, setVerifyEmail } = useAuth();
  const destination = searchParams?.get("to") || AUTH_ROUTES.CUS_NEW_PASSWORD;

  useEffect(() => {
    if (verifyEmail.otp.length === 6) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [verifyEmail.otp]);
  return (
    <section className={styles.customer_signup}>
      <h1>Verify Your Email!</h1>
      <p>
        You need to verify that you own this email address before you can finish
        the process. enter the OTP sent to you here.
      </p>

      <UloDineInput
        type="otp"
        value={verifyEmail.otp}
        otpChange={(value) => setVerifyEmail({ ...verifyEmail, otp: value })}
        onComplete={() => {
          router.push(destination);
        }}
      />

      <UloDIneButton
        color="green"
        label="Verify"
        onClick={() => {}}
        type="primary"
        disabled={disabled}
        style={{ width: "100%", height: "4rem" }}
      />
      <p>
        Already have an account? <Link href={""}>Login here!</Link>
      </p>
    </section>
  );
}

export default VerifyEmail;
