"use client";
import UloDineInput from "@/components/input/UloDineInput";
import React, { useEffect, useState } from "react";
import styles from "@/styles/layout/Index.module.css";
import { apiRoutes } from "@/lib/apiRoutes";
import { useAlert } from "@/context/alert/AlertContext";
import { useAuth } from "@/context/AuthContext";
import { isStrongPassword } from "@/utils/helpers";

function StepThree() {
  const alert = useAlert();
  const {
    business,
    auth,
    setAuth,
    personal,
    emailVerified,
    updateEmailStatus,
  } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [verifying, setVerifying] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");

  async function verifyEmail(otp: string) {
    try {
      setVerifying(true);

      const res = await fetch(apiRoutes.restaurant.auth.verify_otp, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: personal.email,
          accountType: "restaurant",
          otp,
        }),
      });

      const response = (await res.json()) as BaseResponse<{ email: string }>;

      if (response.status === "success") {
        updateEmailStatus({ email: response.data?.email, status: true });
        alert.addAlert("success", response.message);
      } else {
        alert.addAlert("error", response.message);
      }
    } catch (error: any) {
      alert.addAlert("error", "Verification failed. " + error.message);
    } finally {
      setVerifying(false);
    }
  }

  async function requestOTP() {
    try {
      setLoading(true);
      const res = await fetch(apiRoutes.restaurant.auth.request_otp, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: personal.email,
          accountType: "restaurant",
        }),
      });

      const response = (await res.json()) as BaseResponse<OTPRequestResponse>;

      if (response.status === "success") {
        alert.addAlert("success", response.message);
      } else {
        alert.addAlert("error", response.message);
      }
    } catch (error: any) {
      alert.addAlert(
        "error",
        "Failed to request OTP. Please try again. " + error.message,
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (personal.email) {
      setEmail(personal.email);
      if (
        !emailVerified ||
        !emailVerified.status ||
        emailVerified.email !== personal.email
      ) {
        requestOTP();
      }
    }
  }, [personal.email]);

  return (
    <div className={styles.step_one}>
      <div className={styles.input}>
        <UloDineInput
          value={email}
          onChange={() => {
            // setBusiness({ ...business, businessName: e.target.value });
          }}
          type="email"
          label="Email"
          placeholder="Email"
          strict
          disabled
        />
      </div>
      {emailVerified &&
      emailVerified.email === personal.email &&
      emailVerified.status ? (
        <div>
          <div className={styles.input}>
            <UloDineInput
              value={auth.password}
              onChange={(e) => {
                setAuth({ ...auth, password: e.target.value });
              }}
              type="password"
              label="Password"
              placeholder="Choose a strong alphanumeric password"
              strict
              errorMessage={
                !isStrongPassword(auth.password) ? "Password is too weak" : ""
              }
              invalid={!isStrongPassword(auth.password)}
            />
          </div>
          <div className={styles.input}>
            <UloDineInput
              value={auth.retypedpassword}
              onChange={(e) => {
                setAuth({ ...auth, retypedpassword: e.target.value });
              }}
              type="password"
              label="Retype your password"
              placeholder="Choose a strong alphanumeric password"
              strict
              errorMessage={
                !isStrongPassword(auth.password) ? "Password is too weak" : ""
              }
              invalid={!isStrongPassword(auth.retypedpassword)}
            />
          </div>
        </div>
      ) : (
        <>
          {loading ? (
            <p style={{ color: "green", fontSize: "1rem" }}>
              Requesting OTP from UloDine...
            </p>
          ) : (
            <div className={styles.input}>
              <UloDineInput
                value={business.businessAddress}
                onChange={() => {}}
                type="otp"
                sending={loading}
                otpLoading={verifying}
                onComplete={(otp) => {
                  verifyEmail(otp.join(""));
                  // setLoading(true);
                }}
                onResend={() => {
                  requestOTP();
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default StepThree;
