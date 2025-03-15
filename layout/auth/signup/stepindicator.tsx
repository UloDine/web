import { GeneralIcons } from "@/icons/general/icons";
import React from "react";
import styles from "@/styles/layout/Index.module.css";

function StepIndicator({ step }: { step: number }) {
  const steps = [
    {
      icon: GeneralIcons.stepIcon,
      title: "Personal Details",
      activeIcon: GeneralIcons.stepIconActive,
    },
    {
      icon: GeneralIcons.stepIcon,
      title: "Business Details",
      activeIcon: GeneralIcons.stepIconActive,
    },
    {
      icon: GeneralIcons.stepIcon,
      title: "Auth Credential",
      activeIcon: GeneralIcons.stepIconActive,
    },
  ];
  return (
    <div className={styles.step_indicator}>
      {steps.map((s, i) => (
        <div
          key={i}
          className={`${styles.step} ${step >= i + 1 ? styles.active : ""}`}
        >
          {step >= i + 1 ? s.activeIcon : s.icon}
          <p>{s.title}</p>
        </div>
      ))}
    </div>
  );
}

export default StepIndicator;
