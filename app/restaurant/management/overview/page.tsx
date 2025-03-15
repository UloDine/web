"use client";
import PageTitleBar from "@/components/title";
import { GeneralIcons } from "@/icons/general/icons";
import styles from "./style/index.module.css";

export default function Overview() {
  const actions = [
    {
      label: "Generate QR",
      icon: GeneralIcons.plus,
      action: () => {},
    },
    {
      label: "Add New Item",
      icon: GeneralIcons.plus,
      action: () => {},
    },
    {
      label: "Manage Orders",
      icon: GeneralIcons.plus,
      action: () => {},
    },
  ];
  return (
    <section className={styles.overview}>
      <PageTitleBar
        title='Overview'
        rightContent={
          <div className={styles.action_buttons}>
            {actions.map((action, i) => (
              <button key={i} onClick={action.action}>
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>
        }
      />
    </section>
  );
}
