"use client";

import React from "react";
import styles from "./styles/style.module.css";
import { useRouter } from "next/navigation";
import {
  ChatIcon,
  ChevronLeftIcon,
  EmailIcon,
  PhoneIcon,
} from "@/icons/customer";
import UloDineModal from "@/components/modal/UloDineModal";

// Note: Metadata must be exported from server component. Create a layout file for static metadata.

function HelpCenter() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const CONTACTS = [
    {
      label: "contact@ulodine.com",
      link: "mailto:contact@ulodine.com",
      icon: <EmailIcon color="#B2B2B2" />,
    },
    {
      label: "+234 90 6321 3825",
      link: "tel:+2349063213825",
      icon: <PhoneIcon color="#B2B2B2" />,
    },
    {
      label: "Contact Support",
      link: "https://ulodine.com/support",
      icon: <ChatIcon />,
    },
  ];

  function handleClose() {
    setOpen(false);
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <button onClick={() => router.back()}>
          <ChevronLeftIcon />
        </button>
        <h2>Help & Support</h2>
      </div>
      <div className={styles.body}>
        <div className={styles.wrapper}>
          {CONTACTS.map((link, i) => (
            <a
              key={i}
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.icon}
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
      <UloDineModal
        isOpen={open}
        onClose={handleClose}
        title="Log Out?"
        actionButtonText="Yes, Log me out"
        cancelButtonText="No, Cancel"
        onAction={() => {}}
      >
        <p>Are you sure you want to log out?</p>
      </UloDineModal>
    </section>
  );
}

export default HelpCenter;
