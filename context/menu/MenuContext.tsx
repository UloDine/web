"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import styles from "./style/index.module.css";
import { GeneralIcons } from "@/icons/general/icons";
import Image from "next/image";
import UloDineInput from "@/components/input/UloDineInput";
import UloDineSelect from "@/components/input/UloDineSelect";
import { categories } from "@/res/menu";
import UloDineEditor from "@/components/input/UloDineEditor";
import UloDIneButton from "@/components/button/UloDIneButton";

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);
  const [form, setForm] = useState<
    {
      title: string;
    } & Menu
  >({
    title: "Add New Menu Item",
    image: "",
    id: "",
    name: "",
    description: "",
    status: "Not Ready",
    category: "African",
    stockStatus: "Available",
    price: 0,
  });
  const [menuData, setMenuData] = useState<Partial<Menu>>({});

  function toggleModal() {
    setForm({ ...form, image: "/placeholder.png" });
    setOpen((prev) => !prev);
  }

  async function createMenu(menu: Menu) {
    try {
    } catch (err: any) {
      console.log(err.message);
    }
  }

  function editMenu(menu: Menu) {
    try {
      setMenuData({
        ...menu,
      });
      console.log(menuData);
      toggleModal();
    } catch (err: any) {
      console.log(err.message);
    }
  }

  async function updateMenu(menu: Menu) {
    try {
    } catch (err: any) {
      console.log(err.message);
    }
  }

  console.log(form.description);

  return (
    <MenuContext.Provider
      value={{ toggleModal, createMenu, editMenu, updateMenu }}
    >
      {children}
      {open && (
        <section className={styles.modal}>
          <div className={styles.form}>
            <div className={styles.header}>
              <p>{form.title}</p>
              <button onClick={toggleModal}>{GeneralIcons.closeBlack}</button>
            </div>
            <div className={styles.main}>
              <div className={styles.left}>
                <div>
                  <Image
                    src={menuData.image ?? ""}
                    width={100}
                    height={100}
                    alt='Image preview'
                    className={styles.product_image}
                  />
                </div>
                <button className={styles.left_button}>
                  <p>Upload image</p>
                  {GeneralIcons.fileUpload}
                </button>
              </div>
              <div className={styles.right}>
                <div className={styles.grid}>
                  <div>
                    <div className={styles.space}>
                      <UloDineInput
                        type='text'
                        value={menuData.name ?? ""}
                        label='Food Name'
                        placeholder='e.g jollof Rice...'
                        onChange={(e) => {}}
                      />
                    </div>
                    <div className={styles.space}>
                      <UloDineInput
                        type='text'
                        value={String(menuData.price ?? "")}
                        label='Price'
                        placeholder='₦0.00'
                        onChange={(e) => {}}
                      />
                    </div>
                    <div className={styles.space}>
                      <UloDineSelect
                        items={[
                          { label: "Ready", value: "ready" },
                          { label: "Not Ready", value: "not-ready" },
                          { label: "In Preparation", value: "in-preparation" },
                        ]}
                        label='Preparation Status'
                        placeholder='Select prep status'
                        defaultSelected={menuData.status ?? ""}
                        onChange={(e) => {}}
                      />
                    </div>
                  </div>
                  <div>
                    <div className={styles.space}>
                      <UloDineSelect
                        items={categories}
                        label='Category'
                        placeholder='Select category'
                        defaultSelected={menuData.category ?? ""}
                        onChange={(e) => {}}
                      />
                    </div>
                    <div className={styles.space}>
                      <UloDineSelect
                        items={[
                          { label: "Available", value: "available" },
                          { label: "Out of Stock", value: "out-of-stock" },
                        ]}
                        label='Stock Status'
                        placeholder='Select stock status'
                        defaultSelected={menuData.stockStatus ?? ""}
                        onChange={(e) => {}}
                      />
                    </div>
                    <div className={styles.space}>
                      <UloDineInput
                        type='text'
                        value={""}
                        label='Discount'
                        placeholder='0'
                        onChange={(e) => {}}
                      />
                    </div>
                  </div>
                </div>
                <UloDineEditor
                  placeholder='Write a short description about this menu item...'
                  value={menuData.description ?? ""}
                  onChange={(value) => {
                    setMenuData((prev) => ({ ...prev, description: value }));
                  }}
                />
                <div className={styles.bottom_actions}>
                  <UloDIneButton
                    type='primary'
                    color='green'
                    label='Save'
                    onClick={() => {}}
                    style={{ width: 70 }}
                  />
                  <UloDIneButton
                    type='primary'
                    color='light'
                    labelColor='red'
                    label='Save'
                    style={{ width: 70 }}
                    onClick={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </MenuContext.Provider>
  );
}

export function useMenuContext() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuContext must be used within an AlertProvider");
  }
  return context;
}
