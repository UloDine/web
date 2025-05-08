import React from "react";
import Section from "../wrapper/containers/section";
import Image from "next/image";
import UloDineLink from "@/components/button/UloDineLink";
import { AUTH_ROUTES } from "@/routes/RoutePaths";
import styles from "./style/index.module.css";

function Hero() {
  return (
    <Section className={styles.hero}>
      <div className={styles.inner_wrapper}>
        <h1>
          Empower Your <em>Restaurant.</em>
        </h1>
        <h1>
          Delight Your <em>Customers.</em>
        </h1>
        <p>
          A modern, commission-free order-taking system for local restaurants —
          built for emerging markets.
        </p>

        <div className={styles.inner_actions}>
          <UloDineLink
            path={AUTH_ROUTES.RES_SIGNUP}
            color='green'
            label='Get Started Free'
            labelColor='white'
            underline={false}
            style={{ borderRadius: "2rem", width: "15rem", height: "4rem" }}
            type='main'
          />
          <UloDineLink
            path={AUTH_ROUTES.RES_SIGNUP}
            color='green'
            label='Watch Demo'
            labelColor='green'
            underline={false}
            type='outline'
            style={{ width: "15rem", height: "4rem" }}
          />
        </div>
      </div>
      <Image
        src={"/hero.png"}
        width={200}
        height={200}
        alt={"Hero image illustration of UloDine RMS and mobile app."}
        className={styles.image}
      />
    </Section>
  );
}

export default Hero;
