"use client";

import styles from "./styles/styles.module.css";
import UloDIneButton from "@/components/button/UloDIneButton";
import UloDineInput from "@/components/input/UloDineInput";

import { useRouter } from "next/navigation";
import { AUTH_ROUTES } from "@/routes/RoutePaths";
import Link from "next/link";
import { useState } from "react";

function NewPassword() {
  const router = useRouter();
  const [password, setPassword] = useState<{
    newPassword: string;
    confirmNewPassword: string;
  }>({ newPassword: "", confirmNewPassword: "" });
  const params = new URLSearchParams({
    from: AUTH_ROUTES.CUS_RECOVER_PASSWORD,
    to: AUTH_ROUTES.CUS_NEW_PASSWORD,
  });
  return (
    <section className={styles.new_password}>
      <h1>Set a New Password</h1>
      <p>Please create a new strong password.</p>
      <div className={styles.inputs}>
        <div className={styles.input}>
          <UloDineInput
            value={password.newPassword}
            onChange={(e) => {
              setPassword({ ...password, newPassword: e.target.value });
            }}
            type="password"
            label="Password"
            placeholder="Enter new password"
            strict
          />
        </div>
        <div className={styles.input}>
          <UloDineInput
            value={password.confirmNewPassword}
            onChange={(e) => {
              setPassword({ ...password, confirmNewPassword: e.target.value });
            }}
            type="password"
            label="Confirm Password"
            placeholder="Enter new password again"
            strict
          />
        </div>
      </div>
      <UloDIneButton
        color="green"
        label="Set Password"
        onClick={() =>
          router.push(`${AUTH_ROUTES.CUS_VERIFY_EMAIL}?${params.toString()}`)
        }
        type="primary"
        disabled={
          !password.newPassword ||
          !password.confirmNewPassword ||
          password.newPassword !== password.confirmNewPassword
        }
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

export default NewPassword;
