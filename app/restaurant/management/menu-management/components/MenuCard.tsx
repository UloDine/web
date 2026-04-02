import { RestaurantIcons } from "@/icons/restaurant/icons";
import React, { useState } from "react";
import { markUsed } from "@/utils/markUsed";
import styles from "./style/index.module.css";
import { GeneralIcons } from "@/icons/general/icons";
import Image from "next/image";
import { formatCurrency } from "@/utils/helpers";
import FormatStatus from "./FormatStatus";
// import { useMenuContext } from "@/context/menu/MenuContext";

function MenuCard({
  menu_image,
  id,
  item_name,
  item_description,
  stock_status,
  category,
  prep_status,
  price,
}: MenuData) {
  // const { editMenu } = useMenuContext();
  const [imgSrcs, setImgSrcs] = useState(menu_image);
  const [contextOpen, setContextOpen] = useState<boolean>(false);

  // Some props (id, description) are intentionally used only when editing.
  // Mark them as used so production lint doesn't fail.
  markUsed(id, item_description);

  const contextOptions = [
    {
      icon: RestaurantIcons.edit,
      label: "Edit Details",
      action: () => {
        setContextOpen((prev) => !prev);
        // editMenu({
        //   image,
        //   id,
        //   name,
        //   description,
        //   status,
        //   category,
        //   stockStatus,
        //   price,
        // });
      },
    },
    {
      icon:
        stock_status == "Available"
          ? RestaurantIcons.umark
          : RestaurantIcons.mark,
      label:
        stock_status == "Available" ? "Mark Unavailable" : "Mark Available",
      action: () => {},
    },
    {
      icon:
        prep_status == "Ready" ? RestaurantIcons.umark : RestaurantIcons.mark,
      label: prep_status == "Ready" ? "Mark Not Ready" : "Mark Ready",
      action: () => {},
    },
    {
      icon: RestaurantIcons.trash,
      label: "Delete Product",
      action: () => {},
    },
  ];

  function handleImageError() {
    // replace the image source directly when an image fails to load
    setImgSrcs("/food.png");
  }
  return (
    <div className={styles.menu_card}>
      <Image
        src={process.env.NEXT_PUBLIC_API_URL + imgSrcs}
        width={40}
        height={40}
        alt="Customer image"
        className={styles.menu_card_image}
        onError={() => handleImageError()}
      />

      <div className={styles.menu_card_name}>
        <p>{item_name}</p>
      </div>
      <div className={styles.menu_card_category}>
        <span>#{category}</span>
      </div>
      <div className={styles.menu_card_status}>
        <FormatStatus status={prep_status} stockStatus={stock_status} />
      </div>
      <div className={styles.menu_card_price}>
        <b>{formatCurrency(Number(price), "ngn")}</b>
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
