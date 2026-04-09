import { RestaurantIcons } from "@/icons/restaurant/icons";
import React, { useEffect, useState } from "react";
import styles from "./style/index.module.css";
import { GeneralIcons } from "@/icons/general/icons";
import Image from "next/image";
import { formatCurrency } from "@/utils/helpers";
import FormatStatus from "./FormatStatus";
import { resolveAssetUrl } from "@/utils/helpers";
import { useMenuContext } from "@/context/menu/MenuContext";

function getSafeImageSrc(path?: string | null, fallback = "/food.png") {
  if (!path || !String(path).trim()) {
    return fallback;
  }

  const resolved = resolveAssetUrl(path);
  return resolved && resolved.trim() ? resolved : fallback;
}

function MenuCard({
  menu_image,
  id,
  item_name,
  item_description,
  restaurant_id,
  stock_status,
  category,
  prep_status,
  price,
}: MenuData) {
  const { editMenu, deleteMenu, updateMenuStatus, updateMenuStockStatus } =
    useMenuContext();
  const [imgSrcs, setImgSrcs] = useState(getSafeImageSrc(menu_image));
  const [imageLoaded, setImageLoaded] = useState(false);
  const [contextOpen, setContextOpen] = useState<boolean>(false);

  useEffect(() => {
    setImgSrcs(getSafeImageSrc(menu_image));
    setImageLoaded(false);
  }, [menu_image]);

  const contextOptions = [
    {
      icon: RestaurantIcons.edit,
      label: "Edit Details",
      action: () => {
        setContextOpen(false);
        editMenu({
          restaurant_id,
          id,
          menu_image: imgSrcs,
          item_name,
          item_description,
          category,
          stock_status,
          prep_status,
          price: String(price),
          discount: 0,
        });
      },
    },
    {
      icon:
        stock_status == "Available"
          ? RestaurantIcons.umark
          : RestaurantIcons.mark,
      label:
        stock_status == "Available" ? "Mark Unavailable" : "Mark Available",
      action: () => {
        setContextOpen(false);
        updateMenuStockStatus(
          id,
          restaurant_id,
          stock_status == "Available" ? "Out of Stock" : "Available",
        );
      },
    },
    {
      icon:
        prep_status == "Ready" ? RestaurantIcons.umark : RestaurantIcons.mark,
      label: prep_status == "Ready" ? "Mark Not Ready" : "Mark Ready",
      action: () => {
        setContextOpen(false);
        updateMenuStatus(
          id,
          restaurant_id,
          prep_status == "Ready" ? "Not ready" : "Ready",
        );
      },
    },
    {
      icon: RestaurantIcons.trash,
      label: "Delete Product",
      action: () => {
        setContextOpen(false);
        deleteMenu(id, restaurant_id);
      },
    },
  ];

  function handleImageError() {
    // replace the image source directly when an image fails to load
    setImgSrcs("/food.png");
    setImageLoaded(false);
  }

  useEffect(() => {
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.menu_card_price_right}`)) {
        setContextOpen(false);
      }
    });
  }, []);

  return (
    <div className={styles.menu_card}>
      <div className={styles.menu_card_image_wrapper}>
        {!imageLoaded && <div className={styles.menu_card_image_skeleton} />}
        <Image
          src={getSafeImageSrc(imgSrcs)}
          width={1200}
          height={800}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          alt={item_name || "Menu item image"}
          className={`${styles.menu_card_image} ${
            imageLoaded ? styles.menu_card_image_loaded : ""
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => handleImageError()}
          quality={100}
        />
      </div>

      <div className={styles.menu_card_name}>
        <h3>{item_name}</h3>
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
            type="button"
            className={styles.button}
            onClick={() => setContextOpen((prev) => !prev)}
          >
            {GeneralIcons.ellipsis}
          </button>
          {contextOpen && (
            <div className={styles.menu_card_price_right_context_container}>
              {contextOptions.map((item, i) => (
                <button key={i} type="button" onClick={item.action}>
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
