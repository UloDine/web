import UloDineCheckbox from "@/components/input/UloDineCheckbox";
import { InfoCircleIcon } from "@/icons/customer";
import React from "react";
import styles from "../../style/index.module.css";

function NotificationsAndAlerts() {
  const options = [
    {
      label: "SMS",
      checked: true,
    },
    {
      label: "Email",
      checked: false,
    },
    {
      label: "In App",
      checked: true,
    },
  ];
  return (
    <section className={styles.notification_alerts}>
      <div className={styles.header}>
        <h1>Notifications & Alerts</h1>
        <p>Choose how you receive order updates</p>
      </div>
      <ul>
        {options.map((o) => (
          <li key={o.label}>
            <p>{o.label}</p>
            <UloDineCheckbox onChange={() => {}} checked={o.checked} />
          </li>
        ))}
      </ul>
      <div className={styles.banner}>
        <InfoCircleIcon color="#0092C3" />
        <small>
          While email updates are free, sms updates may incur additional
          charges.
        </small>
      </div>
    </section>
  );
}

export default NotificationsAndAlerts;
