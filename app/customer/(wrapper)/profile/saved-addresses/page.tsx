"use client";
import React from "react";
import styles from "../styles/style.module.css";
import ChevronLeft from "@/icons/customer/ChevronLeft";
import { useRouter } from "next/navigation";
import UloDineRadioButton from "@/components/input/UloDineRadioButton";
import UloDIneButton from "@/components/button/UloDIneButton";
import { EditIcon, TrashIcon } from "@/icons/customer";
import UloDineModal from "@/components/modal/UloDineModal";
import UloDineInput from "@/components/input/UloDineInput";

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
    const newList = addresses.filter((_, i) => i !== index);
    setAddresses(newList);
  }

  function handleEdit(index: number) {
    const address = addresses[index];
    setActiveEditing({
      label: address.label,
      zip: address.zip,
      city: address.city,
      state: address.state,
    });
    setOpen(true);
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
        <h2>Saved Addresses</h2>
      </div>
      <div className={styles.body}>
        <div className={styles.actions}>
          {addresses.length > 0 ? (
            addresses.map((a, i) => (
              <div key={i} className={styles.action_card}>
                <p>{a.label}</p>
                <p>{a.zip}</p>
                <p>
                  {a.city}, {a.state}
                </p>
                <div className={styles.bottom}>
                  <div className={styles.left}>
                    <button onClick={() => handleEdit(i)}>
                      <EditIcon color="#959595" />
                    </button>
                    <button onClick={() => handledDelete(i)}>
                      <TrashIcon />
                    </button>
                  </div>
                  <div className={styles.right}>
                    <p>Set as Default</p>
                    <UloDineRadioButton onChange={(val) => {}} name={a.name} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No saved addresses yet</p>
          )}
        </div>
        <div className={styles.add_new}>
          <UloDIneButton
            type="primary"
            color="green"
            onClick={() => setOpen(true)}
            label="Add New"
            style={{ width: "100%", height: "4rem" }}
          />
        </div>
      </div>
      <UloDineModal
        isOpen={open}
        onClose={handleClose}
        title="Add new address"
        actionButtonText="Save"
        onAction={handleSave}
      >
        <div className={styles.modal_wrapper}>
          <div className={styles.input_wrapper}>
            <UloDineInput
              type="text"
              value={activeEditing.label}
              onChange={(val) =>
                setActiveEditing((prev) => ({
                  ...prev,
                  label: val.target.value,
                }))
              }
              placeholder="123 Ave. Abc city."
              label="Street/Apt./Suite"
            />
          </div>
          <div className={styles.input_wrapper}>
            <UloDineInput
              type="text"
              value={activeEditing.zip}
              onChange={(val) =>
                setActiveEditing((prev) => ({ ...prev, zip: val.target.value }))
              }
              placeholder="26264"
              label="ZIP/Postal code"
            />
          </div>
          <div className={styles.input_wrapper}>
            <UloDineInput
              type="text"
              value={activeEditing.city}
              onChange={(val) =>
                setActiveEditing((prev) => ({
                  ...prev,
                  city: val.target.value,
                }))
              }
              placeholder="Abc city"
              label="City"
            />
          </div>
          <div className={styles.input_wrapper}>
            <UloDineInput
              type="text"
              value={activeEditing.state}
              onChange={(val) =>
                setActiveEditing((prev) => ({
                  ...prev,
                  state: val.target.value,
                }))
              }
              placeholder="Abc state"
              label="State"
            />
          </div>
        </div>
      </UloDineModal>
    </section>
  );
}

export default Notifications;
