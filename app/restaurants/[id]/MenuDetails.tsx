"use client";

import { formatCurrency } from "@/utils/helpers";
import Image from "next/image";
import React, { useRef, useState } from "react";
import styles from "./styles/style.module.css";
import UloDIneButton from "@/components/button/UloDIneButton";
import { BookmarkIcon } from "@/icons/customer";
import { useCart } from "@/context/CartContext";

function MenuDetails({
  id,
  item_name,
  item_description,
  price,
  menu_image,
  restaurant_id,
  setSelectedMenu,
  ...rest
}: MenuData & {
  setSelectedMenu: React.Dispatch<React.SetStateAction<MenuData | null>>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
  const [qty, setQty] = useState<number>(1);
  const disabled = qty < 1;
  const handleQtyChange = (direction: "down" | "up") => {
    if (direction === "down" && qty > 0) {
      setQty((prev) => prev - 1);
    } else if (direction === "up") {
      setQty((prev) => prev + 1);
    }
  };

  const handleClose = () => {
    setSelectedMenu(null);
  };

  return (
    <section className={styles.menu_details} ref={containerRef}>
      <div className={styles.menu_details_wrapper}>
        <button className={styles.close_btn} onClick={handleClose}></button>
        <Image src={menu_image} alt={item_name} width={500} height={500} />
        <h4>{item_name}</h4>
        <p>{item_description}</p>
        <b>{formatCurrency(parseFloat(price))}</b>
        <div className={styles.row}>
          <p>Quantity:</p>
          <div>
            <button onClick={() => handleQtyChange("down")}>-</button>
            <span>{qty}</span>
            <button onClick={() => handleQtyChange("up")}>+</button>
          </div>
        </div>
        <div className={styles.btn_row}>
          <UloDIneButton
            color="green"
            label="Add to Cart"
            onClick={() => {
              setSelectedMenu(null);
              addItem(
                restaurant_id,
                {
                  id,
                  item_name,
                  item_description,
                  price,
                  menu_image,
                  restaurant_id,
                  ...rest,
                },
                qty,
              );
            }}
            type="primary"
            style={{ flex: "1", height: "4rem" }}
            disabled={disabled}
          />
          <button className={styles.bookmark_btn}>
            <BookmarkIcon />
          </button>
        </div>
      </div>
    </section>
  );
}

export default MenuDetails;
