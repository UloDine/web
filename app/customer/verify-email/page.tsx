"use client";

import UloDIneButton from "@/components/button/UloDIneButton";
import React, { useEffect, useState } from "react";
import styles from "./styles/styles.module.css";
import Link from "next/link";
import UloDineInput from "@/components/input/UloDineInput";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";
import { AUTH_ROUTES } from "@/routes/RoutePaths";

function VerifyEmail() {
  // const router = useRouter();
  const searchParams = useSearchParams();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [otpRequested, setOtpRequested] = useState<boolean>(false);
  const {
    verifyEmail,
    setVerifyEmail,
    handleVerifyEmail,
    requestOTP,
    sending,
  } = useAuth();

  useEffect(() => {
    if (verifyEmail.otp.length === 6) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [verifyEmail.otp]);

  useEffect(() => {
    // Auto-request OTP when page loads
    if (!otpRequested) {
      const from = searchParams?.get("from");
      if (from === AUTH_ROUTES.CUS_RECOVER_PASSWORD) {
        setVerifyEmail({ ...verifyEmail, purpose: "password_reset" });
        requestOTP("password_reset");
      } else {
        setVerifyEmail({ ...verifyEmail, purpose: "account_verification" });
        requestOTP();
      }
      setOtpRequested(true);
    }
  }, [otpRequested, requestOTP, searchParams, verifyEmail, setVerifyEmail]);

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
        onComplete={() => {}}
      />

      <UloDIneButton
        color="green"
        label="Verify"
        onClick={handleVerifyEmail}
        type="primary"
        disabled={disabled || sending}
        loading={sending}
        style={{ width: "100%", height: "4rem" }}
      />

      <p>
        Didn&apos;t receive OTP?{" "}
        <button
          onClick={() => requestOTP()}
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

      <p>
        Already have an account?{" "}
        <Link href={AUTH_ROUTES.CUS_LOGIN}>Login here!</Link>
      </p>
    </section>
  );
}

export default VerifyEmail;
