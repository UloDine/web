"use client";
import UloDIneButton from "@/components/button/UloDIneButton";
import { GeneralIcons } from "@/icons/general/icons";
import { SocialIcons } from "@/icons/socials/icons";
import StepIndicator from "@/layout/auth/signup/stepindicator";
import StepOne from "@/layout/auth/signup/stepone";
import React, { useEffect } from "react";
import styles from "@/styles/auth/Index.module.css";
import UloDineLink from "@/components/button/UloDineLink";
import { AUTH_ROUTES } from "@/routes/RoutePaths";
import StepTwo from "@/layout/auth/signup/steptwo";
import StepThree from "@/layout/auth/signup/stepthree";
import { useAuth } from "@/context/AuthContext";

function Page() {
  const {
    step,
    setStep,
    personal,
    setPersonal,
    business,
    setBusiness,
    auth,
    sending,
    emailVerified,
    register,
  } = useAuth();

  const next = step + 1;
  const prev = step <= 0 ? 0 : step - 1;

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
    const isComplete = Object.values(personal)
      .slice(0, -1)
      .every((value) => value !== "");
    if (step == 1 && personal.complete !== isComplete) {
      setPersonal({ ...personal, complete: isComplete });
    }
  }, [personal, setPersonal, step]);

  useEffect(() => {
    const isComplete = Object.values(business)
      .slice(0, -1)
      .every((value) => value !== "");
    if (step == 2 && business.complete !== isComplete) {
      setBusiness({ ...business, complete: isComplete });
    }
  }, [business, setBusiness, step]);
  return (
    <section className={styles.auth}>
      <div className={styles.auth_img_bg}>
        <div className={styles.auth_logo}>
          {GeneralIcons.logo} <h1>UloDine</h1>
        </div>
        <div className={styles.auth_center}>
          <h1>
            Join <span>UloDine</span> & Grow Your Restaurant Business!
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
          <h1>Sign Up</h1>
          <UloDineLink
            color="white"
            label="Login"
            path={AUTH_ROUTES.RES_LOGIN}
            type="main"
            key={"ewiuywie"}
          />
        </div>
        <div className={styles.auth_form_center}>
          <div>
            <StepIndicator step={step} />
          </div>
          <div>
            {step == 1 ? <StepOne /> : step == 2 ? <StepTwo /> : <StepThree />}
          </div>
        </div>
        <div className={styles.auth_form_bottom}>
          <UloDIneButton
            color="transparent"
            label="Prev"
            onClick={() => setStep(prev)}
            type="minor"
            disabled={step <= 1}
          />
          {step == 3 && emailVerified && emailVerified.status ? (
            <UloDIneButton
              color="green"
              label="Create account"
              onClick={register}
              type="primary"
              disabled={
                !personal.complete ||
                !business.complete ||
                auth.password !== auth.retypedpassword ||
                sending
              }
            />
          ) : step !== 3 ? (
            <UloDIneButton
              color="transparent"
              label="Next"
              onClick={() => {
                setStep(next);
                console.log(personal);
              }}
              type="minor"
              disabled={
                !personal.complete && step === 1
                  ? true
                  : !business.complete && step == 2
                  ? true
                  : !auth.complete && step == 3
                  ? true
                  : false
              }
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default Page;
