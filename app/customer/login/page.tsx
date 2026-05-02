"use client";
import UloDineInput from "@/components/input/UloDineInput";
import { useAuth } from "@/context/AuthContext";
import { GeneralIcons } from "@/icons/general/icons";
import Link from "next/link";
import React from "react";
import styles from "./styles/styles.module.css";
import UloDIneButton from "@/components/button/UloDIneButton";
import { AUTH_ROUTES } from "@/routes/RoutePaths";

function Login() {
  const { userLogin, setUserLogin } = useAuth();
  const disabled = Object.values(userLogin).every((val) => val !== "");
  return (
    <section className={styles.customer_signup}>
      <div>
        <Link href={""}>{GeneralIcons.logo}</Link>
      </div>
      <h1>
        Welcome Back to <br />
        <span>UloDine!</span>
      </h1>
      <div className={styles.inputs}>
        <div className={styles.input}>
          <UloDineInput
            value={userLogin.email}
            onChange={(e) => {
              setUserLogin({ ...userLogin, email: e.target.value });
            }}
            type="email"
            label="Email"
            placeholder="e.g john.doe@example.com"
            strict
          />
        </div>

        <div className={styles.input}>
          <UloDineInput
            value={userLogin.password}
            onChange={(e) => {
              setUserLogin({ ...userLogin, password: e.target.value });
            }}
            type="password"
            label="Password"
            placeholder="Enter your password"
            strict
          />
        </div>
      </div>

      <p className={styles.recover}>
        Forgot password?{" "}
        <Link href={AUTH_ROUTES.CUS_RECOVER_PASSWORD}>Recover password</Link>
      </p>
      <UloDIneButton
        color="green"
        label="Login"
        onClick={() => {}}
        type="primary"
        disabled={!disabled}
        style={{ width: "100%", height: "4rem" }}
      />
      <p>
        Don&apos;t have an account?{" "}
        <Link href={AUTH_ROUTES.CUS_SIGNUP}>Signup here!</Link>
      </p>
    </section>
  );
}

export default Login;
