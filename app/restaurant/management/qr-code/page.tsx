"use client";
import React from "react";
import styles from "./style/index.module.css";
import PageTitleBar from "@/components/title";
import Image from "next/image";
import UloDIneButton from "@/components/button/UloDIneButton";
import UloDineCopyText from "@/components/button/UloDineCopyText";
import { GeneralIcons } from "@/icons/general/icons";

function QrManagement() {
  return (
    <section className={styles.qr_code}>
      <PageTitleBar title="QR Code" />
      <p>
        Let your customers easily access your menu and place orders by scanning
        this QR code.
      </p>
      <div className={styles.top}>
        <Image
          src={"/file.svg"}
          width={100}
          height={100}
          alt=""
          quality={100}
        />
        <div className={styles.right}>
          <div className={styles.inner_left}>
            <p>Restaurant name: Mama Nkechi’s Kitchen</p>
            <p>ID: #0243</p>
            <UloDineCopyText
              text={"Url: https://ulodine.com/restaurants/0243"}
              textToCopy="https://ulodine.com/restaurants/0243"
            />
          </div>
          <div className={styles.inner_right}>
            <small>Download as:</small>
            <div className={styles.buttons}>
              <UloDIneButton
                color="green"
                label="PDF"
                onClick={() => {}}
                type="secondary"
              />
              <UloDIneButton
                color="green"
                label="PNG"
                onClick={() => {}}
                type="secondary"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <Image
          src={"/file.svg"}
          width={100}
          height={100}
          alt=""
          quality={100}
        />
        <div className={styles.overlay}>
          <div className={styles.wrapper}>
            <p>
              <strong>Tip:</strong> Display this QR code in your restaurant to
              allow customers to scan and access your menu instantly.
            </p>
          </div>
          <UloDIneButton
            color="green"
            label="Download poster"
            onClick={() => {}}
            type="primary"
            icon={GeneralIcons.download_white}
            style={{ padding: "2rem" }}
          />
        </div>
      </div>
    </section>
  );
}

export default QrManagement;
