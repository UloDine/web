import React from "react";
import Section from "../wrapper/containers/section";
import Image from "next/image";
import UloDineLink from "@/components/button/UloDineLink";
import { AUTH_ROUTES } from "@/routes/RoutePaths";
import styles from "./style/index.module.css";
import SectionTitle from "../wrapper/containers/SectionTitle";
import { pricing } from "@/res/pricing";
import { formatCurrency } from "@/utils/helpers";

function Hero() {
  const whyData: WhyData[] = [
    {
      image: "/apps.png",
      title: "Native & Web Apps",
      description: "Let customers order from anywhere, anytime.",
    },
    {
      image: "/rms.png",
      title: "Restaurant Dashboard (RMS)",
      description:
        "Manage menus, track orders, and monitor performance with ease.",
    },
    {
      image: "/commission.png",
      title: "Commission-Free",
      description: "Keep your earnings — we never take a cut from your orders.",
    },
    {
      image: "/local.png",
      title: "Made for Local",
      description:
        "Simple, affordable, and customizable for local food businesses.",
    },
  ];
  const howData: HowData[] = [
    {
      image: "/create.png",
      title: "Create Your Restaurant Profile",
      description:
        "Sign up with your email and instantly set up your restaurant’s profile. Add your business name, address, logo, and contact details — no technical skills needed.",
      step: "01",
    },
    {
      image: "/upload.png",
      title: "Upload Your Menu",
      description:
        "Add categories, dishes, prices, images, and descriptions — all from your RMS dashboard. Organize your menu for both mobile and web users with ease.",
      step: "02",
    },
    {
      image: "/start.png",
      title: "Start Taking Orders",
      description:
        "Start receiving real-time orders from your customers via the native app or web portal. View, accept, and track every order with instant notifications.",
      step: "03",
    },
  ];
  return (
    <>
      <Section className={styles.hero}>
        <div className={styles.inner_wrapper}>
          <h1>
            Empower Your <em>Restaurant.</em>
          </h1>
          <h1>
            Delight Your <em>Customers.</em>
          </h1>
          <p>
            A modern, commission-free order-taking system for local restaurants
            — built for emerging markets.
          </p>

          <div className={styles.inner_actions}>
            <UloDineLink
              path={AUTH_ROUTES.RES_SIGNUP}
              color="green"
              label="Get Started Free"
              labelColor="white"
              underline={false}
              style={{ borderRadius: "2rem", width: "15rem", height: "4rem" }}
              type="main"
              className={styles.extended}
            />
            <UloDineLink
              path={AUTH_ROUTES.CUS_SIGNUP}
              color="green"
              label="Find your favorite restaurant"
              labelColor="green"
              underline={false}
              type="outline"
              style={{ width: "15rem", height: "4rem" }}
              className={styles.extended}
            />
          </div>
        </div>
        <div className={styles.hero_png}>
          <Image
            src={"/hero.png"}
            fill
            quality={100}
            alt={"Hero image illustration of UloDine RMS and mobile app."}
            className={styles.image}
          />
        </div>
      </Section>
      <Section className={styles.about}>
        <SectionTitle
          title={"About UloDine"}
          subtitle={"Built for Local Restaurants.\n Designed for Growth."
            .split("\n")
            .map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
        />
        <div className={styles.about_grid}>
          <div className={styles.about_img_wrapper}>
            <Image
              fill
              quality={100}
              alt="UloDine restaurant showcase"
              src={"/about.png"}
              className={styles.about_png}
            />
          </div>
          <div className={styles.right}>
            <p>
              UloDine is more than just software — it's a movement to help small
              and medium-sized restaurants step into the digital era without the
              overwhelm. Born out of the need for a simple, affordable, and
              scalable solution, UloDine empowers food businesses to manage
              orders, serve customers, and grow with confidence.
            </p>
            <p>
              Our platform combines the ease of a native and web customer app
              with the power of a web-based RMS (Restaurant Management System)
              tailored for emerging markets. We understand the challenges of
              running a food business, especially in competitive and evolving
              local markets — that's why UloDine was built to remove the
              friction, reduce costs, and put restaurants back in control.
            </p>
            <p>
              Whether you're a family-run kitchen, a growing food truck, or a
              multi-branch bistro, UloDine gives you the tools to succeed — with
              zero commissions, flexible pricing, and a product that scales with
              you.
            </p>
            <div className={styles.special}>
              <strong>Our Promise:</strong>
              <p>
                To stay local, stay simple, and always support the heartbeat of
                the food world — you.
              </p>
            </div>
            <UloDineLink
              color="green"
              label="Get Started Free"
              path={AUTH_ROUTES.RES_SIGNUP}
              underline={false}
              type="outline"
              labelColor="green"
              style={{ width: "fit-content", padding: "1.5rem" }}
            />
          </div>
        </div>
      </Section>
      <Section className={styles.why}>
        <SectionTitle title={"Key Features"} subtitle={"Why Choose UloDine?"} />
        <div className={styles.why_cards}>
          {whyData.map((data, i) => (
            <div key={i} className={styles.why_card}>
              <div className={styles.why_image_wrapper}>
                <Image
                  src={data.image}
                  fill
                  quality={100}
                  alt={data.title + " Image"}
                  className={styles.why_image}
                />
              </div>
              <strong>{data.title}</strong>
              <p>{data.description}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section className={styles.how_it_works}>
        <SectionTitle
          title={"How It Works"}
          subtitle={"Fast Setup. Full Control."}
        />
        <div className={styles.how_cards}>
          {howData.map((data, i) => (
            <div key={i} className={styles.how_card}>
              <div className={styles.how_image_wrapper}>
                <Image
                  src={data.image}
                  fill
                  quality={100}
                  alt={data.title + " Image"}
                  className={styles.how_image}
                />
              </div>
              <div className={styles.how_right}>
                <h2>{data.step}</h2>
                <strong>{data.title}</strong>
                <p>{data.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section className={styles.pricing}>
        <SectionTitle
          title={"Pricing"}
          subtitle={"Simple Pricing \n That Scales With You"
            .split("\n")
            .map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
        />
        <div className={styles.pricing_wrapper}>
          {pricing.map((data, i) => (
            <div
              key={i}
              className={
                i === 2 ? styles.pricing_card_differ : styles.pricing_card
              }
            >
              {i === 2 && (
                <span className={styles.recommended}>RECOMMENDED</span>
              )}
              <div className={styles.pricing_card_inner_details_wrapper}>
                <h2>
                  {formatCurrency(data.price, "USD", "en-US").split(".")[0]}
                </h2>
                <span>{data.plan}</span>
              </div>
              <ul>
                {data.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
              <div className={styles.action_button}>
                <UloDineLink
                  path={AUTH_ROUTES.RES_SIGNUP}
                  color={i === 2 ? "white" : "green"}
                  underline={false}
                  label={"Get Started"}
                  type={i === 2 ? "outline" : "main"}
                  style={{
                    borderRadius: "0.5rem",
                    height: "4rem",
                    marginTop: "auto",
                    borderColor: "white",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

export default Hero;
