"use client";

import {
  ChevronLeftIcon,
  CopyIcon,
  CreditCardIcon,
  MapMarkerIcon,
} from "@/icons/customer";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { sample } from "../seed";
import {
  calculateDiscountedPrice,
  formatCurrency,
  formatTime,
} from "@/utils/helpers";
import { DashedLine } from "@/components/abstracts";
import Image from "next/image";
import OrderProgress from "../OrderProgress";
import UloDineCheckbox from "@/components/input/UloDineCheckbox";
import styles from "../styles/styles.module.css";

function OrderDetails() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname?.split("/").pop() ?? "";
  const order = sample.find((o) => o.id === id);
  return (
    <section className={styles.order_details}>
      <div className={styles.header}>
        <button onClick={() => router.back()}>
          <ChevronLeftIcon />
        </button>
        <h2>Track My Order</h2>
      </div>
      <div className={styles.content}>
        <div className={styles.order_number}>
          <h3>#{order?.order_number ?? "--"}</h3>
          <button>
            <CopyIcon />
          </button>
        </div>
        <small className={styles.timestamp}>
          {order?.created_at ? formatTime(order?.created_at) : "--"}
        </small>
        <p className={styles.restaurant_name}>
          Order in <span>{order?.restaurant_name ?? "--"}</span>
        </p>
        <DashedLine />
        <div className={styles.items}>
          {order &&
            order.items.map((item, index) => (
              <div key={index} className={styles.item}>
                <div>
                  <Image
                    src={item.media}
                    alt={item.name}
                    width={50}
                    height={50}
                  />
                  <p>{item.name}</p>
                </div>
                <p>
                  {formatCurrency(item.price)} x {item.quantity}
                </p>
              </div>
            ))}
        </div>
        <div className={styles.meta}>
          <div className={styles.row}>
            <p>Total</p>
            <p>{formatCurrency(order?.price ?? 0)}</p>
          </div>
          <div className={styles.row}>
            <p>Discount</p>
            <p className={styles.value}>
              {order?.discount && (
                <span className={styles.discount}>-{order.discount}%</span>
              )}{" "}
              <span className={styles.discount_amount}>
                {calculateDiscountedPrice(order?.price ?? 0, order?.discount)}
              </span>
            </p>
          </div>
          <div className={styles.row}>
            <p>Final</p>
            <p className={styles.value}>
              <span>
                {formatCurrency(
                  order?.price ??
                    0 -
                      calculateDiscountedPrice(
                        order?.price ?? 0,
                        order?.discount,
                      ),
                )}
              </span>
              <span className={styles.final_discount_amount}>
                -{calculateDiscountedPrice(order?.price ?? 0, order?.discount)}
              </span>
            </p>
          </div>
        </div>
        <DashedLine />
        <OrderProgress status={order?.status} />
        <DashedLine />
        <div className={styles.location}>
          <div className={styles.left}>
            <MapMarkerIcon />
            <p>Pickup at Restaurant</p>
          </div>
          <UloDineCheckbox onChange={() => {}} checked disabled />
        </div>
        <DashedLine />
        <div className={styles.payment}>
          <div className={styles.left}>
            <CreditCardIcon />
            <p>Bank Transfer</p>
          </div>
          <UloDineCheckbox onChange={() => {}} checked disabled />
        </div>
      </div>
    </section>
  );
}

export default OrderDetails;
