"use client";

import { DashedLine } from "@/components/abstracts";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/utils/helpers";
import { useSearchParams } from "next/navigation";
import React from "react";
import styles from "../styles/style.module.css";
import { CopyIcon, ShareIcon } from "@/icons/customer";
import UloDIneButton from "@/components/button/UloDIneButton";

function PaymentSuccess() {
  const params = useSearchParams();
  const { selectedItems, calculateTotal } = useCart();

  const id = (params?.get("restaurant_id") as string) || "";

  const items = selectedItems[id] ?? [];
  const discount = items.reduce(
    (sum, item) => sum + (item.discount || 0) * item.quantity,
    0,
  );

  const summary = [
    { label: "Total items(s)", value: items.length },
    {
      label: "Discount",
      value: discount,
    },
    {
      label: "Total",
      value: formatCurrency(calculateTotal(items)),
    },
  ];

  return (
    <section className={styles.success}>
      <div className={styles.body}>
        <div className={styles.marker_wrapper}>
          <div>
            <span></span>
          </div>
        </div>
        <b className={styles.title}>
          <span>🎉</span>
          <span>Successful!</span>
        </b>
        <p className={styles.paragraph}>
          Thank you for ordering from <strong>Mama Nkechi’s Kitchen!</strong>{" "}
          Your delicious meal is being prepared and will be ready soon. You’ll
          receive updates on your order status. Enjoy your meal! 🍽️
        </p>
        <DashedLine />
        <div className={styles.wrapper}>
          <p>Order Summary</p>
          <ul>
            {summary.map((s, i) => (
              <li key={i}>
                <span>{s.label}</span>
                <b>{s.value}</b>
              </li>
            ))}
          </ul>
        </div>
        <DashedLine />
        <div className={styles.restaurant}>
          <p>Restaurant</p>
          <h1>Mama Nkechi’s Kitchen</h1>
        </div>
        <DashedLine />
        <div className={styles.order_reference}>
          <p>Order Reference</p>
          <h1>
            <span>#317834646374</span>
            <CopyIcon />
          </h1>
        </div>
      </div>
      <div className={styles.buttons}>
        <UloDIneButton
          label="Download Receipt"
          onClick={() => {}}
          type="primary"
          color="green"
          style={{ width: "100%", height: "4rem" }}
        />
        <button className={styles.share}>
          <ShareIcon />
        </button>
      </div>
    </section>
  );
}

export default PaymentSuccess;
