"use client";
import UloDineInput from "@/components/input/UloDineInput";
import { useAuth } from "@/context/AuthContext";
import { GeneralIcons } from "@/icons/general/icons";
import Link from "next/link";
import React from "react";
import styles from "./styles/styles.module.css";
import UloDineCheckbox from "@/components/input/UloDineCheckbox";
import UloDIneButton from "@/components/button/UloDIneButton";
import { AUTH_ROUTES } from "@/routes/RoutePaths";

function Signup() {
  const { userSignup, setUserSignup } = useAuth();
  const disabled =
    Object.values(userSignup).every((val) => val !== "") &&
    userSignup.password === userSignup.confirmPassword &&
    userSignup.acceptedTerm;
  return (
    <section className={styles.customer_signup}>
      <div>
        <Link href={""}>{GeneralIcons.logo}</Link>
      </div>
      <h1>
        Join <span>UloDine</span> <br />& Start Ordering!
      </h1>
      <div className={styles.inputs}>
        <div className={styles.input}>
          <UloDineInput
            value={userSignup.firstName}
            onChange={(e) => {
              setUserSignup({ ...userSignup, firstName: e.target.value });
            }}
            type="text"
            label="First name"
            placeholder="e.g John"
            strict
          />
        </div>
        <div className={styles.input}>
          <UloDineInput
            value={userSignup.lastName}
            onChange={(e) => {
              setUserSignup({ ...userSignup, lastName: e.target.value });
            }}
            type="text"
            label="Last name"
            placeholder="e.g Doe"
            strict
          />
        </div>
        <div className={styles.input}>
          <UloDineInput
            value={userSignup.email}
            onChange={(e) => {
              setUserSignup({ ...userSignup, email: e.target.value });
            }}
            type="email"
            label="Email"
            placeholder="e.g john.doe@example.com"
            strict
          />
        </div>
        <div className={styles.input}>
          <UloDineInput
            value={userSignup.phone ?? ""}
            onChange={(e) => {
              setUserSignup({ ...userSignup, phone: e.target.value });
            }}
            type="phone"
            label="Phone"
            placeholder="e.g 90 123 456 7890"
            // strict
          />
        </div>
        <div className={styles.input}>
          <UloDineInput
            value={userSignup.password}
            onChange={(e) => {
              setUserSignup({ ...userSignup, password: e.target.value });
            }}
            type="password"
            label="Password"
            placeholder="Choose a strong password"
            // strict
          />
        </div>
        <div className={styles.input}>
          <UloDineInput
            value={userSignup.confirmPassword}
            onChange={(e) => {
              setUserSignup({ ...userSignup, confirmPassword: e.target.value });
            }}
            type="password"
            label="Confirm password"
            placeholder="Confirm your password"
            // strict
          />
        </div>
      </div>
      <UloDineCheckbox
        onChange={(val) =>
          setUserSignup((prev) => ({ ...prev, acceptedTerm: val }))
        }
        label={
          <p>
            I agree to UloDine’s <Link href={""}>Terms & Privacy Policy</Link>
          </p>
        }
      />
      <UloDIneButton
        color="green"
        label="Signup"
        onClick={() => {}}
        type="primary"
        disabled={!disabled}
        style={{ width: "100%", height: "4rem" }}
      />
      <p>
        Already have an account?{" "}
        <Link href={AUTH_ROUTES.CUS_LOGIN}>Login here!</Link>
      </p>
    </section>
  );
}

export default Signup;
