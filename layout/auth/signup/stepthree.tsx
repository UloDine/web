"use client";
import UloDineInput from "@/components/input/UloDineInput";
import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/layout/Index.module.css";
import { useSignUpContext } from "@/context/SignupContext";

function StepThree() {
  const {
    business,
    setBusiness,
    auth,
    setAuth,
    personal,
    emailVerified,
    setEmailVerified,
  } = useSignUpContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [verifying, setVerifying] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>("Value cannot be empty");
  const [invalid, setInvalid] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (personal.email) {
      setEmail(personal.email);
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
          type='email'
          label='Email'
          placeholder='Email'
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
              type='password'
              label='Password'
              placeholder='Choose a strong alphanumeric password'
              strict
            />
          </div>
          <div className={styles.input}>
            <UloDineInput
              value={auth.retypedpassword}
              onChange={(e) => {
                // if (auth.password !== e.target.value) {
                //   setErrMessage("Password does not match!");
                //   setInvalid(true);
                // } else {
                //   setInvalid(false);
                //   setErrMessage("");
                // }
                setAuth({ ...auth, retypedpassword: e.target.value });
              }}
              type='password'
              label='Retype your password'
              placeholder='Choose a strong alphanumeric password'
              strict
              // errorMessage={errMessage}
              // invalid={invalid}
            />
          </div>
        </div>
      ) : (
        <div className={styles.input}>
          <UloDineInput
            value={business.businessAddress}
            onChange={(e) => {}}
            type='otp'
            label='Business address'
            placeholder='e.g abc road, 123 ave.'
            sending={loading}
            otpLoading={verifying}
            onComplete={() => {
              setVerifying(true);
              // setLoading(true);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default StepThree;
