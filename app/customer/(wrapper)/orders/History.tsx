import { OrderCard } from "@/components/cards";
import React from "react";
import styles from "./styles/styles.module.css";
import { sample } from "./seed";

function History() {
  return (
    <div className={styles.active_orders}>
      {sample.map((order) => (
        <OrderCard key={order.id} {...order} />
      ))}
    </div>
  );
}

export default History;
