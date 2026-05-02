"use client";
import React from "react";
import styles from "./styles/style.module.css";
import ChevronLeft from "@/icons/customer/ChevronLeft";
import { useRouter } from "next/navigation";
import UloDIneButton from "@/components/button/UloDIneButton";
import { TrashIcon } from "@/icons/customer";
import UloDineModal from "@/components/modal/UloDineModal";
import { SEEDED_SAVED_FAVORITES } from "./favorites";
import Image from "next/image";
import { formatCurrency } from "@/utils/helpers";

interface SavedAddress {
  label: string;
  name: string;
  action: () => void;
  zip: string;
  city: string;
  state: string;
}

function Notifications() {
  const router = useRouter();
  const [addresses, setAddresses] = React.useState<SavedAddress[]>([]);
  const [activeEditing, setActiveEditing] = React.useState<
    Omit<SavedAddress, "action" | "name">
  >({
    label: "",
    zip: "",
    city: "",
    state: "",
  });
  const [open, setOpen] = React.useState(false);

  function handledDelete(index: number) {
    setOpen(true);
    const newList = addresses.filter((_, i) => i !== index);
    setAddresses(newList);
  }

  function handleSave() {
    setAddresses((prev) => [
      ...prev,
      {
        ...activeEditing,
        label: activeEditing.label,
        zip: activeEditing.zip,
        city: activeEditing.city,
        state: activeEditing.state,
        name: `address`,
        action: () => {},
      },
    ]);
    setActiveEditing({
      label: "",
      zip: "",
      city: "",
      state: "",
    });
    setOpen(false);
  }

  function handleClose() {
    setActiveEditing({
      label: "",
      zip: "",
      city: "",
      state: "",
    });
    setOpen(false);
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <button onClick={() => router.back()}>
          <ChevronLeft />
        </button>
        <h2>My Favorites</h2>
      </div>
      <div className={styles.body}>
        <div className={styles.favorites}>
          {SEEDED_SAVED_FAVORITES.length > 0 ? (
            SEEDED_SAVED_FAVORITES.map((a, i) => (
              <div key={i} className={styles.favorite_card}>
                <Image
                  className={styles.menu_image}
                  src={a.image}
                  alt={a.name}
                  width={300}
                  height={250}
                />
                <p className={styles.menu_name}>{a.name}</p>
                <small className={styles.menu_price}>
                  {formatCurrency(a.price)}
                </small>
                <div className={styles.bottom}>
                  <div className={styles.restaurant}>
                    <Image
                      src={a.restaurant.logo}
                      alt={a.restaurant.name}
                      width={100}
                      height={100}
                    />
                    <b>{a.restaurant.name}</b>
                  </div>
                  <div className={styles.actions}>
                    <UloDIneButton
                      type="primary"
                      color="green"
                      onClick={() => {}}
                      label="Order again"
                      style={{ width: "100%", height: "3rem" }}
                    />
                    <button
                      className={styles.delete}
                      onClick={() => handledDelete(i)}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No saved addresses yet</p>
          )}
        </div>
      </div>
      <UloDineModal
        isOpen={open}
        onClose={handleClose}
        title="Remove item?"
        actionButtonText="Yes, Remove"
        cancelButtonText="No, Cancel"
        onAction={handleSave}
      >
        <p>
          Are you sure you want to remove this item from favorites? <br />
          You can always add new items to favorites
        </p>
      </UloDineModal>
    </section>
  );
}

export default Notifications;
