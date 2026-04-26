import { OrdersIcon } from "@/icons/customer";
import React from "react";
import styles from "./styles/styles.module.css";

function EmptyList({ message }: { message: string | React.ReactNode }) {
  return (
    <div className={styles.empty}>
      <OrdersIcon />
      {message}
    </div>
  );
}

export default EmptyList;
