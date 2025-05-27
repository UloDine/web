import React from "react";
import styles from "../../style/index.module.css";
import UloDIneButton from "@/components/button/UloDIneButton";

function AccountAndSecurity() {
  const actions = [
    {
      title: "Change Password",
      description: "Update login credentials securely.",
      action: () => {
        // Logic to change password
      },
    },
    // {
    //   title: "Two-Factor Authentication",
    //   description: "Enable 2FA for added security.",
    //   action: () => {
    //     // Logic to enable 2FA
    //   },
    // },
    {
      title: "Modify account contact details",
      description: "Enable 2FA for added security.",
      action: () => {
        // Logic to enable 2FA
      },
    },
    // {
    //   title: "Manage Devices",
    //   description: "View and manage devices connected to your account.",
    //   action: () => {
    //     // Logic to manage devices
    //   },
    // },
    {
      title: "Deactivate Account",
      description: "Temporarily disable or delete account.",
      action: () => {
        // Logic to manage devices
      },
    },
  ];
  return (
    <section className={styles.account_and_security}>
      {actions.map((action, index) => (
        <div key={index} className={styles.action_item}>
          <h3 className={styles.action_title}>{action.title}</h3>
          <p className={styles.action_description}>{action.description}</p>
          <div className={styles.action_button}>
            <UloDIneButton
              type='primary'
              color='green'
              label='Begin Process'
              onClick={action.action}
            />
          </div>
        </div>
      ))}
    </section>
  );
}

export default AccountAndSecurity;
