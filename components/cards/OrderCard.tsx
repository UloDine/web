"use client";
import { CopyIcon } from "@/icons/customer";
import { capitalizeWord, formatCurrency, formatTime } from "@/utils/helpers";
import React from "react";
import { DashedLine } from "../abstracts";
import Image from "next/image";
import styles from "./styles/styles.module.css";
import { useAlert } from "@/context/alert/AlertContext";
import { useRouter } from "next/navigation";

function OrderCard({
  id,
  order_number,
  price,
  items,
  restaurant_name,
  created_at,
  status,
}: CustomerOrder) {
  const router = useRouter();
  const { addAlert } = useAlert();
  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(order_number).then(
      () => {
        addAlert("success", "Order number copied!");
      },
      (err) => {
        addAlert("error", "Failed to copy order number: " + err);
      },
    );
  };
  return (
    <div
      className={styles.customer_order_card}
      key={id}
      onClick={() => router.push(`/customer/orders/${id}`)}
    >
      <div className={styles.header}>
        <h3>#{order_number}</h3>
        <button onClick={handleCopy}>
          <CopyIcon />
        </button>
      </div>
      <p className={styles.restaurant_name}>
        Order in <span>{restaurant_name}</span>
      </p>
      <span
        className={styles.status}
        style={
          {
            "--bg":
              status === "cancelled"
                ? "#ffdcdc"
                : status === "done"
                  ? "#f5f5f5"
                  : status === "pending"
                    ? "#FFF3E0"
                    : status === "preparing"
                      ? "#ddddff"
                      : "#E8FFFA",
            "--color":
              status === "cancelled"
                ? "#c70000"
                : status === "done"
                  ? "#b2b2b2"
                  : status === "pending"
                    ? "#FF9C00"
                    : status === "preparing"
                      ? "#0000bc"
                      : "#00bb95",
          } as React.CSSProperties
        }
      >
        {capitalizeWord(status)}
      </span>
      <DashedLine />
      <div className={styles.items}>
        {items.map((item) => (
          <div className={styles.item} key={item.id}>
            <div>
              <Image src={item.media} alt={item.name} width={50} height={50} />
              <p>{item.name}</p>
            </div>
            <p>{item.quantity}</p>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <small>{formatTime(created_at)}</small>
        <p>{formatCurrency(price)}</p>
      </div>
    </div>
  );
}

export default OrderCard;
