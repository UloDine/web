"use client";

import UloDineRadioButton from "@/components/input/UloDineRadioButton";
import { useCart } from "@/context/CartContext";
import ChevronLeft from "@/icons/customer/ChevronLeft";
import { formatCurrency } from "@/utils/helpers";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "../styles/style.module.css";
import UloDIneButton from "@/components/button/UloDIneButton";
import UloDineInput from "@/components/input/UloDineInput";
import { CUSTOMER_ROUTES } from "@/routes/RoutePaths";

function Checkout() {
  const router = useRouter();
  const params = useSearchParams();
  const [deliveryMethod, setDeliveryMethod] = useState<"PICKUP" | "HOME">(
    "PICKUP",
  );
  const [deliveryPayload, setDeliveryPayload] = useState<{
    address: string;
    phone: string;
  }>({
    address: "",
    phone: "",
  });
  const { selectedItems, calculateTotal } = useCart();
  const id = params.get("restaurant_id") as string;

  //   console.log(selectedItems[id]);
  const query = new URLSearchParams({
    restaurant_id: id,
  });

  const items = selectedItems[id];
  const discount = items.reduce(
    (sum, item) => sum + item.discount * item.quantity,
    0,
  );

  const summary = [
    {
      label: "Total items(s)",
      value: items.length,
    },
    {
      label: "Discount",
      value: discount,
    },
    {
      label: "Total",
      value: formatCurrency(calculateTotal(items)),
    },
  ];

  const delivery = [
    {
      label: "Home delivery",
      key: "HOME",
    },
    {
      label: "Pickup from restaurant",
      key: "PICKUP",
    },
  ];

  //   const payment = []
  return (
    <section className={styles.checkout}>
      <div className={styles.header}>
        <button onClick={() => router.back()}>
          <ChevronLeft />
        </button>
        <h2>Checkout</h2>
      </div>
      <div className={styles.body}>
        <h1>{formatCurrency(calculateTotal(selectedItems[id] ?? []))}</h1>
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
        <div className={styles.wrapper}>
          <p>Delivery/Pickup Option</p>
          <ul>
            {delivery.map((d, i) => (
              <li key={i}>
                <span>{d.label}</span>
                <UloDineRadioButton
                  name="delivery"
                  onChange={() => setDeliveryMethod(d.key as "PICKUP" | "HOME")}
                  selected={deliveryMethod === d.key}
                />
              </li>
            ))}
          </ul>
        </div>
        {deliveryMethod === "HOME" && (
          <div className={styles.inputs}>
            <div className={styles.input}>
              <UloDineInput
                type="text"
                label="Home address"
                placeholder="Enter destination"
                onChange={(val) =>
                  setDeliveryPayload((prev) => ({
                    ...prev,
                    address: val.target.value,
                  }))
                }
                value={deliveryPayload.address}
              />
            </div>
            <div className={styles.input}>
              <UloDineInput
                type="phone"
                label="Phone (WhatsApp preferrable)"
                placeholder="Enter a number to reach you with"
                onChange={(val) =>
                  setDeliveryPayload((prev) => ({
                    ...prev,
                    phone: val.target.value,
                  }))
                }
                value={deliveryPayload.phone}
              />
            </div>
          </div>
        )}
        <UloDIneButton
          color="green"
          type="primary"
          label="Place Order"
          onClick={() => router.push(CUSTOMER_ROUTES.PAYMENT_SUCCESS)}
          style={{ width: "100%", height: "4rem", marginTop: "2rem" }}
          // loading
        />
      </div>
    </section>
  );
}

export default Checkout;
