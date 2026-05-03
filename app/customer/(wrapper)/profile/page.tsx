"use client";

import UloDIneButton from "@/components/button/UloDIneButton";
import { ChevronRightIcon, EditIcon, ProfileIcon } from "@/icons/customer";
import React from "react";
import { PROFILE_LINKS } from "./links";
import styles from "./styles/style.module.css";
import UloDineModal from "@/components/modal/UloDineModal";

// Note: Metadata must be exported from server component. Create a layout file for static metadata.

function Profile() {
  const [open, setOpen] = React.useState(false);

  function handleClose() {
    setOpen(false);
  }
  return (
    <section className={styles.profile}>
      <div className={styles.header}>
        <h2>My Profile</h2>
      </div>
      <div className={styles.body}>
        <div className={styles.wrapper}>
          <div className={styles.user_icon}>
            <ProfileIcon color="#B2B2B2" />
          </div>
          <b>John Doe</b>
          <div className={styles.contact}>
            <small>john.doe@example.com</small>
            <span>•</span>
            <small>+1 234 567 890</small>
          </div>
          <UloDIneButton
            type="secondary"
            color="light"
            onClick={() => {}}
            label="Edit Profile"
            icon={<EditIcon />}
            style={{ width: "100%", height: "4rem" }}
            labelColor="green"
          />
        </div>
        {PROFILE_LINKS.map((link) => (
          <div key={link.id} className={styles.wrapper}>
            {/* <h3>{link.label}</h3> */}
            <ul>
              {link.items.map((item) => (
                <li key={item.id}>
                  <a href={item.link}>
                    <div>
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <ChevronRightIcon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
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

export default Profile;
