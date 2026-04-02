"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./style/index.module.css";
import { GeneralIcons } from "@/icons/general/icons";
import Image from "next/image";
import UloDineInput from "@/components/input/UloDineInput";
import UloDineSelect from "@/components/input/UloDineSelect";
import { categories } from "@/res/menu";
import UloDIneButton from "@/components/button/UloDIneButton";
import UloDineHybridEditor from "@/components/input/UloDineHybridEditor";
import { fileToDataURL, isAllNullOrUndefined } from "@/utils/helpers";
import { markUsed } from "@/utils/markUsed";
import { useAlert } from "../alert/AlertContext";
import { usePost } from "@/hooks/usePost";
import { useFetch } from "@/hooks/useFetch";
import { apiRoutes } from "@/lib/apiRoutes";
import { useProfile } from "../ProfileContext";
import { queryBuilder } from "@/utils/helpers";

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export function MenuProvider({ children }: { children: ReactNode }) {
  const { addAlert } = useAlert();
  const { restaurant } = useProfile();

  // Filter states
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("date");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");
  const [limit, setLimit] = useState<number>(20);
  const [stockStatus, setStockStatus] = useState<string>("");
  const [itemStatus, setItemStatus] = useState<string>("");

  // Modal state
  const [open, setOpen] = useState<boolean>(false);
  const [form, setForm] = useState<MenuForm>({
    title: "Add New Menu Item",
    image: null,
    name: "",
    description: "",
    status: "Not Ready",
    category: "African",
    stockStatus: "Available",
    price: "",
    discount: "0",
    restaurantId: restaurant?.id || "",
  });
  const [previewUrl, setPreviewUrl] = useState<string>("/placeholder.png");
  const skipImageEffectRef = useRef(false);

  // Fetch menu data with filters
  const id = restaurant?.id || "";
  const { data, loading, refetch } = useFetch<ListData<MenuData> | null>(
    queryBuilder(apiRoutes.restaurant.menu.fetchAll(id), {
      search: keyword,
      sortBy: sortBy,
      sortOrder: sortOrder,
      page: page,
      limit: limit,
      stockStatus: stockStatus,
      itemStatus: itemStatus,
    }),
    null
  );

  function toggleModal() {
    setForm({
      title: "Add New Menu Item",
      image: null,
      name: "",
      description: "",
      status: "Not Ready",
      category: "African",
      stockStatus: "Available",
      price: "",
      discount: "0",
      restaurantId: restaurant?.id || "",
    });
    setPreviewUrl("/placeholder.png");
    setOpen((prev) => !prev);
  }

  const { postData: postMenu, loading: createLoading } = usePost<MenuForm>({
    endpoint: apiRoutes.restaurant.menu.create,
    onError: (err) => {
      addAlert("error", err.message);
    },
    onSuccess: (data) => {
      console.log(data);
      toggleModal();
      addAlert("success", "Menu item created successfully.");
      refetch();
    },
  });

  async function createMenu() {
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key !== "image" && key !== "title") {
          formData.append(key, value ?? "");
        }
      });

      if (form.image) {
        formData.append("image", form.image);
      }

      await postMenu(formData as any);
    } catch (err: any) {
      addAlert("error", "Failed to create menu item.");
      console.log(err.message);
    }
  }

  markUsed(isAllNullOrUndefined);

  async function updateMenu(menu: MenuForm) {
    try {
      setForm({ ...menu });
      toggleModal();
      // TODO: Implement actual update API call here
      // After successful update, call refetch()
    } catch (err: any) {
      addAlert("error", "Failed to update menu item.");
      console.log(err.message);
    }
  }

  function selectImage() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        skipImageEffectRef.current = true;
        setPreviewUrl(dataUrl);
        setForm((prev) => ({ ...prev, image: file }));
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }

  useEffect(() => {
    if (skipImageEffectRef.current) {
      skipImageEffectRef.current = false;
      return;
    }
    const loadImage = async () => {
      if (form?.image instanceof File) {
        const dataUrl = await fileToDataURL(form.image);
        setPreviewUrl(dataUrl);
      } else {
        setPreviewUrl("/placeholder.png");
      }
    };

    loadImage();
  }, [form?.image]);

  return (
    <MenuContext.Provider
      value={{
        toggleModal,
        createMenu,
        updateMenu,
        data,
        loading: loading || createLoading,
        refetch,
        keyword,
        setKeyword,
        page,
        setPage,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        limit,
        setLimit,
        stockStatus,
        setStockStatus,
        itemStatus,
        setItemStatus,
        openFilter,
        setOpenFilter,
      }}
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
                    src={previewUrl}
                    width={100}
                    height={100}
                    alt="Image preview"
                    unoptimized
                    priority
                    className={styles.product_image}
                    placeholder="blur"
                    blurDataURL="/placeholder.png"
                  />
                </div>
                <button className={styles.left_button} onClick={selectImage}>
                  <p>Upload image</p>
                  {GeneralIcons.fileUpload}
                </button>
              </div>
              <div className={styles.right}>
                <div className={styles.grid}>
                  <div>
                    <div className={styles.space}>
                      <UloDineInput
                        type="text"
                        value={form.name}
                        label="Food Name"
                        placeholder="e.g jollof Rice..."
                        onChange={(e) => {
                          setForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className={styles.space}>
                      <UloDineInput
                        type="text"
                        value={String(form.price)}
                        label="Price"
                        placeholder="₦0.00"
                        onChange={(e) => {
                          setForm((prev) => ({
                            ...prev,
                            price: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className={styles.space}>
                      <UloDineSelect
                        items={[
                          { label: "Ready", value: "ready" },
                          { label: "Not Ready", value: "not-ready" },
                          { label: "In Preparation", value: "in-preparation" },
                        ]}
                        label="Preparation Status"
                        placeholder="Select prep status"
                        defaultSelected={form.status}
                        onChange={(e) => {
                          setForm((prev) => ({
                            ...prev,
                            status: e.value,
                          }));
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className={styles.space}>
                      <UloDineSelect
                        items={categories.sort()}
                        label="Category"
                        placeholder="Select category"
                        defaultSelected={form.category}
                        onChange={(e) => {
                          setForm((prev) => ({
                            ...prev,
                            category: e.value,
                          }));
                        }}
                      />
                    </div>
                    <div className={styles.space}>
                      <UloDineSelect
                        items={[
                          { label: "Available", value: "available" },
                          { label: "Out of Stock", value: "out-of-stock" },
                        ]}
                        label="Stock Status"
                        placeholder="Select stock status"
                        defaultSelected={form.stockStatus}
                        onChange={(e) => {
                          setForm((prev) => ({
                            ...prev,
                            stockStatus: e.value,
                          }));
                        }}
                      />
                    </div>
                    <div className={styles.space}>
                      <UloDineInput
                        type="text"
                        value={form.discount}
                        label="Discount"
                        placeholder="0"
                        onChange={(e) => {
                          setForm((prev) => ({
                            ...prev,
                            discount: e.target.value,
                          }));
                        }}
                      />
                    </div>
                  </div>
                </div>
                <UloDineHybridEditor
                  markdown={form.description}
                  onChange={(val) =>
                    setForm((prev) => ({ ...prev, description: val }))
                  }
                  placeholder="Craft a perfect description for your menu 😌"
                />
                <div className={styles.bottom_actions}>
                  <UloDIneButton
                    type="primary"
                    color="green"
                    label="Save"
                    onClick={() => {
                      console.log(form);
                      createMenu();
                    }}
                    style={{ width: 70 }}
                    loading={createLoading}
                  />
                  <UloDIneButton
                    type="primary"
                    color="light"
                    labelColor="red"
                    label="Cancel"
                    style={{ width: 70 }}
                    onClick={() => {
                      setOpen(false);
                    }}
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
    throw new Error("useMenuContext must be used within a MenuProvider");
  }
  return context;
}
