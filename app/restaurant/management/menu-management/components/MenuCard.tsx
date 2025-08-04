import { RestaurantIcons } from "@/icons/restaurant/icons";
import React, { useState } from "react";
import styles from "./style/index.module.css";
import { GeneralIcons } from "@/icons/general/icons";
import Image from "next/image";
import { formatCurrency } from "@/utils/helpers";
import FormatStatus from "./FormatStatus";
import { useMenuContext } from "@/context/menu/MenuContext";

function MenuCard({
  image,
  id,
  name,
  description,
  status,
  category,
  stockStatus,
  price,
}: Menu) {
  const { editMenu } = useMenuContext();
  const [imgSrcs, setImgSrcs] = useState(image);
  const [contextOpen, setContextOpen] = useState<boolean>(false);

  const contextOptions = [
    {
      icon: RestaurantIcons.edit,
      label: "Edit Details",
      action: () => {
        setContextOpen((prev) => !prev);
        editMenu({
          image,
          id,
          name,
          description,
          status,
          category,
          stockStatus,
          price,
        });
      },
    },
    {
      icon:
        stockStatus == "Available"
          ? RestaurantIcons.umark
          : RestaurantIcons.mark,
      label: stockStatus == "Available" ? "Mark Unavailable" : "Mark Available",
      action: () => {},
    },
    {
      icon: status == "Ready" ? RestaurantIcons.umark : RestaurantIcons.mark,
      label: status == "Ready" ? "Mark Not Ready" : "Mark Ready",
      action: () => {},
    },
    {
      icon: RestaurantIcons.trash,
      label: "Delete Product",
      action: () => {},
    },
  ];

  function handleImageError() {
    setImgSrcs((prev) => (prev = "/food.png"));
  }
  return (
    <div className={styles.menu_card}>
      <Image
        src={imgSrcs}
        width={40}
        height={40}
        alt="Customer image"
        className={styles.menu_card_image}
        onError={() => handleImageError()}
      />

      <div className={styles.menu_card_name}>
        <p>{name}</p>
      </div>
      <div className={styles.menu_card_category}>
        <span>#{category}</span>
      </div>
      <div className={styles.menu_card_status}>
        <FormatStatus status={status} stockStatus={stockStatus} />
      </div>
      <div className={styles.menu_card_price}>
        <b>{formatCurrency(price, "ngn")}</b>
        <div className={styles.menu_card_price_right}>
          <button
            className={styles.button}
            onClick={() => setContextOpen((prev) => !prev)}
          >
            {GeneralIcons.ellipsis}
          </button>
          {contextOpen && (
            <div className={styles.menu_card_price_right_context_container}>
              {contextOptions.map((item, i) => (
                <button key={i} onClick={item.action}>
                  {item.icon} <p>{item.label}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuCard;
