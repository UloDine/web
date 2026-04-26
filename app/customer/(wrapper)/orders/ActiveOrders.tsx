import { OrderCard } from "@/components/cards";
import React, { useState } from "react";
import styles from "./styles/styles.module.css";
import EmptyList from "./EmptyList";

function ActiveOrders({
  filters,
}: {
  filters?: { status?: string; search?: string };
}) {
  const [data, setData] = useState<CustomerOrder[]>([]);
  return (
    <div className={styles.active_orders}>
      {data.length === 0 ? (
        <EmptyList
          message={
            <p>
              You have no active orders. <br />
              Time to treat yourself? 🍽️
            </p>
          }
        />
      ) : (
        data.map((order) => <OrderCard key={order.id} {...order} />)
      )}
    </div>
  );
}

export default ActiveOrders;
