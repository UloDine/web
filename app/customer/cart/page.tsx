"use client";

import React from "react";
import { SEEDED_RESTAURANTS_WITH_FULL_DETAILS } from "../(wrapper)/home/seed";
import { useRouter, useSearchParams } from "next/navigation";
import ChevronLeft from "@/icons/customer/ChevronLeft";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/utils/helpers";
import styles from "./styles/style.module.css";
import Image from "next/image";
import UloDineCheckbox from "@/components/input/UloDineCheckbox";
import { TrashIcon } from "@/icons/customer";
import UloDIneButton from "@/components/button/UloDIneButton";
import { CUSTOMER_ROUTES } from "@/routes/RoutePaths";

function Cart() {
  const router = useRouter();
  const param = useSearchParams();
  const id = param.get("restaurant_id") as string;
  const {
    cart,
    incrementQty,
    decrementQty,
    removeItem,
    selectItem,
    selectedItems,
    total,
    calculateTotal,
  } = useCart();
  const query = new URLSearchParams({
    restaurant_id: id,
  });
  const restaurant = SEEDED_RESTAURANTS_WITH_FULL_DETAILS.find(
    (r) => r.id === id,
  );
  const subtotal = id ? total(id) : 0;
  const restaurantSelectedItems = id ? (selectedItems[id] ?? []) : [];
  return id && restaurant ? (
    <section className={styles.cart}>
      <div className={styles.header}>
        <button onClick={() => router.back()}>
          <ChevronLeft />
        </button>
        <h2>{restaurant.name}'s Cart</h2>
      </div>
      <div className={styles.list}>
        {cart[id] && cart[id].length > 0 ? (
          cart[id].map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.left}>
                <Image
                  src={item.menu_image}
                  alt={item.item_name}
                  width={100}
                  height={100}
                />

                <div>
                  <p>{item.item_name}</p>
                  <strong>{formatCurrency(parseFloat(item.price))}</strong>
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.flex}>
                  <UloDineCheckbox
                    checked={restaurantSelectedItems.some(
                      (selectedItem) => selectedItem.id === item.id,
                    )}
                    onChange={() => selectItem(id, item)}
                  />
                  <button onClick={() => removeItem(id, item.id)}>
                    <TrashIcon />
                  </button>
                </div>
                <div className={styles.actions}>
                  <button onClick={() => decrementQty(id, item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementQty(id, item.id)}>+</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <div className={styles.checkout_btn}>
        <UloDIneButton
          type="primary"
          color="green"
          onClick={() => router.push(`${CUSTOMER_ROUTES.CHECKOUT}?${query}`)}
          label={
            restaurantSelectedItems.length > 0
              ? `Check Out (${formatCurrency(calculateTotal(restaurantSelectedItems))})`
              : "Select items to Check Out"
          }
          style={{ width: "100%", height: "4rem" }}
          disabled={restaurantSelectedItems.length === 0}
        />
      </div>
    </section>
  ) : (
    <></>
  );
}

export default Cart;
