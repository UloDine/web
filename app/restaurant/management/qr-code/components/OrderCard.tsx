import { RestaurantIcons } from "@/icons/restaurant/icons";
import React, { useState } from "react";
import styles from "./style/index.module.css";
import { GeneralIcons } from "@/icons/general/icons";
import Image from "next/image";
import { formatCurrency, formatTime } from "@/utils/helpers";
import FormatStatus from "./FormatStatus";
import { useAlert } from "@/context/alert/AlertContext";
import { markUsed } from "@/utils/markUsed";

function OrderCard({
  customer,
  id,
  menuList,
  reference,
  status,
  totalPrice,
  discount,
}: Order) {
  const { addAlert } = useAlert();
  // make sure unused destructured props don't break production lint
  markUsed(id, discount);
  const [imgSrcs, setImgSrcs] = useState(
    menuList.map((menu) => menu.image) // Initialize state with menu images
  );

  function handleImageError(index: number) {
    setImgSrcs(
      (prev) => prev.map((src, i) => (i === index ? "/food.png" : src)) // Replace only the failed image
    );
  }
  function copy() {
    if (navigator.clipboard) {
      try {
        navigator.clipboard.writeText(reference.toUpperCase());
        addAlert("success", "Copied!");
      } catch (err: unknown) {
        if (err instanceof Error) alert(err.message);
        else alert(String(err));
      }
    } else {
      alert("Clipboard not available!");
    }
  }
  return (
    <div className={styles.order_card}>
      <div className={styles.order_card_head}>
        <span>{RestaurantIcons.orderIndicator}</span>
        <strong onClick={copy}>
          {reference.toUpperCase()} <small>{GeneralIcons.copy}</small>
        </strong>
      </div>
      <div className={styles.order_card_customer}>
        <Image
          src={customer.image}
          width={40}
          height={40}
          alt="Customer image"
          className={styles.profile}
        />{" "}
        <p>
          {customer.firstName} {customer.lastName.charAt(0)}.
        </p>
      </div>
      <div className={styles.order_card_menu}>
        <ul>
          {menuList.map((menu, i) => (
            <li key={i}>
              <Image
                src={imgSrcs[i]}
                onError={() => handleImageError(i)}
                width={40}
                height={40}
                alt="Menu image"
                className={styles.img}
              />
              <p>
                {menu.quantity}x {menu.name}
              </p>
            </li>
          ))}
        </ul>
        {menuList.length > 2 ? <button>Expand</button> : null}
      </div>
      <div className={styles.order_card_price}>
        <b>{formatCurrency(totalPrice, "ngn")}</b>
        <small>{formatTime(new Date(), "short")}</small>
      </div>
      <div className={styles.order_card_status}>
        <FormatStatus status={status} />
        <button>
          {GeneralIcons.ellipsis}
          <div></div>
        </button>
      </div>
    </div>
  );
}

export default OrderCard;
