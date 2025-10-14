"use client";
import UloDineInput from "@/components/input/UloDineInput";
import React, { useEffect, useState } from "react";
import styles from "@/styles/layout/Index.module.css";
import { useSignUpContext } from "@/context/SignupContext";
import { useApiService } from "@/context/ApiServiceContext";
import { apiRoutes } from "@/lib/apiRoutes";
import { useAlert } from "@/context/alert/AlertContext";

function StepThree() {
  const api = useApiService();
  const alert = useAlert();
  const { business, auth, setAuth, personal, emailVerified, setEmailVerified } =
    useSignUpContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [verifying, setVerifying] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");

  function verifyEmail(otp: number) {
    setLoading(true);
    api
      .post<any>(apiRoutes.restaurant.auth.verify_otp, {
        email: personal.email,
        accountType: "restaurant",
        otp: otp,
      })
      .then((response) => {
        if (response.status === "success") {
          setEmailVerified((prev) => !prev);
          setLoading(false);
          alert.addAlert("success", response.message);
        } else {
          setLoading(false);
          alert.addAlert("error", response.message);
        }
      });
  }

  useEffect(() => {
    if (personal.email) {
      setEmail(personal.email);
      if (!emailVerified) {
        setLoading(true);
        api
          .post<OTPRequestResponse>(apiRoutes.restaurant.auth.request_otp, {
            email: personal.email,
            accountType: "restaurant",
          })
          .then((response) => {
            if (response.status === "success") {
              setLoading(false);
              alert.addAlert("success", response.message);
            } else {
              setLoading(false);
              alert.addAlert("error", response.message);
            }
          })
          .catch((error) => {
            setLoading(false);
            alert.addAlert(
              "error",
              "Failed to request OTP. Please try again. " + error.message
            );
          });
      }
    }
  }, [personal.email]);

  return (
    <div className={styles.step_one}>
      <div className={styles.input}>
        <UloDineInput
          value={email}
          onChange={(e) => {
            // setBusiness({ ...business, businessName: e.target.value });
          }}
          type="email"
          label="Email"
          placeholder="Email"
          strict
          disabled
        />
      </div>
      {emailVerified ? (
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
              // errorMessage={errMessage}
              // invalid={invalid}
            />
          </div>
        </div>
      ) : (
        <>
          {loading && <p>Requesting OTP from UloDine...</p>}
          <div className={styles.input}>
            <UloDineInput
              value={business.businessAddress}
              onChange={(e) => {}}
              type="otp"
              sending={loading}
              otpLoading={verifying}
              onComplete={(otp) => {
                setVerifying(true);
                verifyEmail(Number(otp.join("")));
                // setLoading(true);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default StepThree;
