import { EmailIcon, LinkExternalIcon, PhoneIcon } from "@/icons/customer";
import { HOME_ROUTES } from "@/routes/RoutePaths";
import Link from "next/link";
import React from "react";
import styles from "../../style/index.module.css";

function SupportAndHelp() {
  const externals = [
    {
      label: "FAQ",
      value: HOME_ROUTES.FAQ,
    },
  ];

  const contacts = [
    {
      label: "Email",
      value: HOME_ROUTES.CONTACT_EMAIL,
      icon: <EmailIcon color="var(--text)" />,
    },
    {
      label: "+2349063213825",
      value: HOME_ROUTES.CONTACT_PHONE,
      icon: <PhoneIcon color="var(--text)" />,
    },
  ];
  return (
    <section className={styles.support}>
      <div className={styles.header}>
        <h1>Support & Help</h1>
      </div>
      <div className={styles.help}>
        <h3>Help Center</h3>
        <div>
          {externals.map((link, i) => (
            <Link href={link.value} key={i}>
              <span>{link.label}</span>
              <LinkExternalIcon />
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.contact}>
        <h3>Contact Support </h3>
        <p>Request assistance from the UloDine team</p>
        <div>
          {contacts.map((contact, i) => (
            <Link href={contact.value} key={i}>
              {contact.icon}
              <span>{contact.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SupportAndHelp;
