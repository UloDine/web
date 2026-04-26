import { OrderCard } from "@/components/cards";
import React from "react";
import styles from "./styles/styles.module.css";
import { sample } from "./seed";

function History({
  filters,
}: {
  filters?: { status?: string; search?: string };
}) {
  return (
    <div className={styles.active_orders}>
      {sample.map((order) => (
        <OrderCard key={order.id} {...order} />
      ))}
    </div>
  );
}

export default History;
