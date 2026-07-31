"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "../styles/menu/index.module.css";
import { GeneralIcons } from "@/icons/general/icons";
import Image from "next/image";
import UloDineInput from "@/components/input/UloDineInput";
import UloDineSelect from "@/components/input/UloDineSelect";
import { categories } from "@/res/menu";
import UloDIneButton from "@/components/button/UloDIneButton";
import UloDineHybridEditor from "@/components/input/UloDineHybridEditor";
import { fileToDataURL } from "@/utils/helpers";
import { resolveAssetUrl, queryBuilder } from "@/utils/helpers";
import { useAlert } from "./AlertContext";
import { usePost } from "@/hooks/usePost";
import { useFetch } from "@/hooks/useFetch";
import { apiRoutes } from "@/lib/apiRoutes";
import { useProfile } from "./ProfileContext";
import { useApiService } from "./ApiServiceContext";
import UloDineModal from "@/components/modal/UloDineModal";
import { EmptyImagePlaceholder } from "@/components/abstracts";

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

const DEFAULT_MENU_FORM: MenuForm = {
  title: "Add New Menu Item",
  image: null,
  name: "",
  description: "",
  status: "not-ready",
  category: "African",
  stockStatus: "available",
  price: "",
  discount: "0",
  restaurantId: "",
};

function mapPrepStatusToApi(status: string): string {
  switch (status) {
    case "ready":
      return "Ready";
    case "in-preparation":
      return "Preparing";
    default:
      return "Not ready";
  }
}

function mapStockStatusToApi(status: string): string {
  return status === "out-of-stock" ? "Out of Stock" : "Available";
}

function mapApiPrepStatusToForm(status: string): string {
  const normalized = status?.toLowerCase?.() ?? "";
  if (normalized.includes("ready")) return "ready";
  if (normalized.includes("prepar")) return "in-preparation";
  return "not-ready";
}

function mapApiStockStatusToForm(status: string): string {
  const normalized = status?.toLowerCase?.() ?? "";
  return normalized.includes("out") ? "out-of-stock" : "available";
}

function buildMenuFormData(menu: MenuForm): FormData {
  const formData = new FormData();

  formData.append("name", menu.name);
  formData.append("category", menu.category);
  formData.append("restaurantId", menu.restaurantId);
  formData.append("price", menu.price);
  formData.append("description", menu.description);
  formData.append("prepStatus", mapPrepStatusToApi(menu.status));
  formData.append("stockStatus", mapStockStatusToApi(menu.stockStatus));
  formData.append("discount", menu.discount || "0");
  if (menu.modifiers) {
    formData.append(
      "modifiers",
      typeof menu.modifiers === "string"
        ? menu.modifiers
        : JSON.stringify(menu.modifiers),
    );
  }

  if (menu.image instanceof File) {
    formData.append("image", menu.image);
  }

  return formData;
}

export function MenuProvider({ children }: { children: ReactNode }) {
  const { addAlert } = useAlert();
  const api = useApiService();
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
    ...DEFAULT_MENU_FORM,
    restaurantId: restaurant?.id || "",
    modifiers: [],
  });
  const [selectedMenuId, setSelectedMenuId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    menuId: string;
    restaurantId: string;
  } | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [previewLoaded, setPreviewLoaded] = useState<boolean>(false);
  const skipImageEffectRef = useRef(false);

  function resetForm() {
    setForm({
      ...DEFAULT_MENU_FORM,
      restaurantId: restaurant?.id || "",
      modifiers: [],
    });
    setPreviewUrl("");
    setPreviewLoaded(false);
    setSelectedMenuId(null);
  }

  function closeModal() {
    setOpen(false);
    resetForm();
  }

  function openCreateModal() {
    resetForm();
    setOpen(true);
  }

  function editMenu(menu: MenuEditDraft) {
    setSelectedMenuId(menu.id);

    let parsedModifiers: ModifierGroup[] = [];
    if (menu.modifiers) {
      if (Array.isArray(menu.modifiers)) {
        parsedModifiers = menu.modifiers;
      } else if (typeof menu.modifiers === "string") {
        try {
          parsedModifiers = JSON.parse(menu.modifiers);
        } catch {
          parsedModifiers = [];
        }
      }
    }

    setForm({
      title: "Edit Menu Item",
      image: null,
      name: menu.item_name,
      description: menu.item_description,
      status: mapApiPrepStatusToForm(menu.prep_status),
      category: menu.category,
      stockStatus: mapApiStockStatusToForm(menu.stock_status),
      price: String(menu.price),
      discount: String(menu.discount ?? 0),
      restaurantId: menu.restaurant_id,
      modifiers: parsedModifiers,
    });
    setPreviewUrl(resolveAssetUrl(menu.menu_image) || "");
    setPreviewLoaded(false);
    setOpen(true);
  }

  // Fetch menu data with filters
  const id = restaurant?.id || "";
  const { data, loading, error, refetch } = useFetch<ListData<MenuData> | null>(
    queryBuilder(apiRoutes.restaurant.menu.fetchAll(id), {
      search: keyword,
      sortBy: sortBy,
      sortOrder: sortOrder,
      page: page,
      limit: limit,
      stock: stockStatus,
      status: itemStatus,
    }),
    null,
    { accountType: "restaurant" },
  );

  function toggleModal() {
    if (open) {
      closeModal();
      return;
    }

    openCreateModal();
  }

  const { postData: postMenu, loading: createLoading } = usePost<MenuForm>({
    endpoint: apiRoutes.restaurant.menu.create,
    onError: (err) => {
      addAlert("error", err.message);
    },
    onSuccess: () => {
      closeModal();
      addAlert("success", "Menu item created successfully.");
      refetch();
    },
  });

  async function createMenu() {
    try {
      const formData = buildMenuFormData(form);
      await postMenu(formData as any);
    } catch (err: any) {
      addAlert("error", "Failed to create menu item.");
    }
  }

  async function updateMenu() {
    try {
      if (!selectedMenuId) {
        addAlert("error", "Missing menu item to update.");
        return;
      }

      const formData = buildMenuFormData(form);
      const endpoint = apiRoutes.restaurant.menu.update(
        selectedMenuId,
        form.restaurantId,
      );
      const response = await api.put(endpoint, formData);

      if (response.status === "success") {
        addAlert("success", "Menu item updated successfully.");
        closeModal();
        refetch();
        return;
      }

      addAlert("error", response.message || "Failed to update menu item.");
    } catch (err: any) {
      addAlert("error", "Failed to update menu item.");
    }
  }

  async function deleteMenu(menuId: string, restaurantId: string) {
    setDeleteTarget({ menuId, restaurantId });
    setDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    if (deleteLoading) {
      return;
    }

    setDeleteModalOpen(false);
    setDeleteTarget(null);
  }

  async function confirmDeleteMenu() {
    if (!deleteTarget) {
      return;
    }

    try {
      setDeleteLoading(true);

      const endpoint = apiRoutes.restaurant.menu.delete(
        deleteTarget.menuId,
        deleteTarget.restaurantId,
      );
      const response = await api.del(endpoint);

      if (response.status === "success") {
        addAlert("success", "Menu item deleted successfully.");
        setDeleteModalOpen(false);
        setDeleteTarget(null);
        refetch();
        return;
      }

      addAlert("error", response.message || "Failed to delete menu item.");
    } catch {
      addAlert("error", "Failed to delete menu item.");
    } finally {
      setDeleteLoading(false);
    }
  }

  async function updateMenuStatus(
    menuId: string,
    restaurantId: string,
    status: string,
  ) {
    try {
      const endpoint = apiRoutes.restaurant.menu.updateStatus(
        menuId,
        restaurantId,
        status,
      );
      const response = await api.put(endpoint, { status });

      if (response.status === "success") {
        addAlert("success", "Menu status updated successfully.");
        refetch();
        return;
      }

      addAlert("error", response.message || "Failed to update menu status.");
    } catch (err: any) {
      addAlert("error", "Failed to update menu status.");
    }
  }

  async function updateMenuStockStatus(
    menuId: string,
    restaurantId: string,
    status: string,
  ) {
    try {
      const endpoint = apiRoutes.restaurant.menu.updateStockStatus(
        menuId,
        restaurantId,
        status,
      );
      const response = await api.put(endpoint, { status });

      if (response.status === "success") {
        addAlert("success", "Stock status updated successfully.");
        refetch();
        return;
      }

      addAlert("error", response.message || "Failed to update stock status.");
    } catch (err: any) {
      addAlert("error", "Failed to update stock status.");
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
      } else if (!selectedMenuId) {
        setPreviewUrl("");
      }
    };

    loadImage();
  }, [form?.image, selectedMenuId]);

  useEffect(() => {
    setPreviewLoaded(false);
  }, [previewUrl]);

  const currentModifiers: ModifierGroup[] = Array.isArray(form.modifiers)
    ? form.modifiers
    : [];

  const addModifierGroup = () => {
    const newGroup: ModifierGroup = {
      id: `mod_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      title: "Choice of Side / Extra",
      required: false,
      min_selection: 0,
      max_selection: 1,
      options: [
        { id: `opt_${Date.now()}_1`, name: "Default Option", price: 0 },
      ],
    };
    setForm((prev) => ({
      ...prev,
      modifiers: [...currentModifiers, newGroup],
    }));
  };

  const removeModifierGroup = (groupId: string) => {
    setForm((prev) => ({
      ...prev,
      modifiers: currentModifiers.filter((g) => g.id !== groupId),
    }));
  };

  const updateModifierGroup = (groupId: string, updates: Partial<ModifierGroup>) => {
    setForm((prev) => ({
      ...prev,
      modifiers: currentModifiers.map((g) => (g.id === groupId ? { ...g, ...updates } : g)),
    }));
  };

  const addOptionToGroup = (groupId: string) => {
    setForm((prev) => ({
      ...prev,
      modifiers: currentModifiers.map((g) => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          options: [
            ...g.options,
            {
              id: `opt_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
              name: "",
              price: 0,
            },
          ],
        };
      }),
    }));
  };

  const updateOptionInGroup = (
    groupId: string,
    optionId: string,
    updates: Partial<ModifierOption>,
  ) => {
    setForm((prev) => ({
      ...prev,
      modifiers: currentModifiers.map((g) => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          options: g.options.map((o) => (o.id === optionId ? { ...o, ...updates } : o)),
        };
      }),
    }));
  };

  const removeOptionFromGroup = (groupId: string, optionId: string) => {
    setForm((prev) => ({
      ...prev,
      modifiers: currentModifiers.map((g) => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          options: g.options.filter((o) => o.id !== optionId),
        };
      }),
    }));
  };

  return (
    <MenuContext.Provider
      value={{
        toggleModal,
        createMenu,
        updateMenu,
        editMenu,
        deleteMenu,
        updateMenuStatus,
        updateMenuStockStatus,
        data,
        loading: loading || createLoading,
        error,
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
      <UloDineModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        title="Delete item?"
        size="sm"
        showActions={true}
        closeOnOverlayClick={!deleteLoading}
        closeOnEsc={!deleteLoading}
        cancelButtonText="No, Cancel"
        actionButtonText="yes, Delete"
        onAction={confirmDeleteMenu}
        cancelButtonDisabled={deleteLoading}
        actionButtonDisabled={deleteLoading}
        actionButtonLoading={deleteLoading}
      >
        <p
          style={{
            margin: 0,
            color: "#6b6a6a",
            fontSize: "0.95rem",
            lineHeight: 1.5,
          }}
        >
          Are you sure you want to delete this item? Kindly note that this
          action cannot be undone, so be very sure that you want to perform this
          action. Goodluck!
        </p>
      </UloDineModal>
      {open && (
        <section className={styles.modal}>
          <div className={styles.form}>
            <div className={styles.header}>
              <h4>{form.title}</h4>
              <button onClick={toggleModal}>{GeneralIcons.closeBlack}</button>
            </div>
            <div className={styles.main}>
              <div className={styles.left}>
                <div className={styles.image_wrapper}>
                  {/* {!previewLoaded && <div className={styles.image_skeleton} />} */}
                  {!previewUrl ? (
                    <div style={{ height: "15rem" }}>
                      <EmptyImagePlaceholder width={40} height={40} />
                    </div>
                  ) : (
                    <Image
                      src={previewUrl}
                      width={100}
                      height={100}
                      alt="Image preview"
                      unoptimized
                      priority
                      className={`${styles.product_image} ${
                        previewLoaded ? styles.product_image_loaded : ""
                      }`}
                      onLoad={() => setPreviewLoaded(true)}
                      placeholder="blur"
                      blurDataURL="/placeholder.png"
                    />
                  )}
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
                        searchable
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

                {/* ===== MODIFIERS BUILDER SECTION ===== */}
                <div style={{ marginTop: "1.5rem", borderTop: "1px solid #e2e8f0", paddingTop: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#0f172a" }}>
                        Customization Option Groups
                      </h4>
                      <small style={{ color: "#64748b" }}>
                        Add options like Protein choices, Extra sides, Toppings, or Spice levels.
                      </small>
                    </div>
                    <button
                      type="button"
                      onClick={addModifierGroup}
                      style={{
                        backgroundColor: "#f0fdf4",
                        color: "#16a34a",
                        border: "1px solid #16a34a",
                        padding: "0.5rem 1rem",
                        borderRadius: "6px",
                        fontWeight: 600,
                        cursor: "pointer",
                        fontSize: "0.9rem",
                      }}
                    >
                      + Add Option Group
                    </button>
                  </div>

                  {currentModifiers.length === 0 ? (
                    <div style={{ padding: "1rem", backgroundColor: "#f8fafc", borderRadius: "6px", textAlign: "center", color: "#94a3b8", fontSize: "0.9rem" }}>
                      No option groups added yet. Click <strong>+ Add Option Group</strong> to add choices for your customers.
                    </div>
                  ) : (
                    currentModifiers.map((group) => (
                      <div
                        key={group.id}
                        style={{
                          border: "1px solid #cbd5e1",
                          borderRadius: "8px",
                          padding: "1rem",
                          marginBottom: "1rem",
                          backgroundColor: "#f8fafc",
                        }}
                      >
                        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.8rem" }}>
                          <input
                            type="text"
                            value={group.title}
                            placeholder="Group Title (e.g., Choose Protein)"
                            onChange={(e) => updateModifierGroup(group.id, { title: e.target.value })}
                            style={{
                              flex: 1,
                              padding: "0.5rem 0.8rem",
                              borderRadius: "6px",
                              border: "1px solid #cbd5e1",
                              fontWeight: 600,
                            }}
                          />
                          <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.9rem", cursor: "pointer" }}>
                            <input
                              type="checkbox"
                              checked={group.required}
                              onChange={(e) => updateModifierGroup(group.id, { required: e.target.checked })}
                            />
                            Required Choice
                          </label>
                          <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.9rem", cursor: "pointer" }}>
                            Selection:
                            <select
                              value={group.max_selection}
                              onChange={(e) => updateModifierGroup(group.id, { max_selection: Number(e.target.value) })}
                              style={{ padding: "0.3rem", borderRadius: "4px", border: "1px solid #cbd5e1" }}
                            >
                              <option value={1}>Single Choice (Radio)</option>
                              <option value={5}>Multi Choice (Checkboxes)</option>
                            </select>
                          </label>
                          <button
                            type="button"
                            onClick={() => removeModifierGroup(group.id)}
                            style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontWeight: "bold" }}
                          >
                            ✕
                          </button>
                        </div>

                        {/* Options in group */}
                        <div style={{ paddingLeft: "1rem", borderLeft: "2px solid #cbd5e1" }}>
                          {group.options.map((opt) => (
                            <div key={opt.id} style={{ display: "flex", gap: "0.6rem", alignItems: "center", marginBottom: "0.5rem" }}>
                              <input
                                type="text"
                                value={opt.name}
                                placeholder="Option Name (e.g., Fried Chicken)"
                                onChange={(e) => updateOptionInGroup(group.id, opt.id, { name: e.target.value })}
                                style={{ flex: 2, padding: "0.4rem", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                              />
                              <input
                                type="number"
                                value={opt.price}
                                placeholder="Extra Price (₦)"
                                onChange={(e) => updateOptionInGroup(group.id, opt.id, { price: Number(e.target.value) || 0 })}
                                style={{ width: "120px", padding: "0.4rem", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                              />
                              <button
                                type="button"
                                onClick={() => removeOptionFromGroup(group.id, opt.id)}
                                style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => addOptionToGroup(group.id)}
                            style={{ color: "#16a34a", background: "none", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600, marginTop: "0.3rem" }}
                          >
                            + Add Option Item
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className={styles.bottom_actions}>
                  <UloDIneButton
                    type="primary"
                    color="green"
                    label={selectedMenuId ? "Update" : "Save"}
                    onClick={() => {
                      if (selectedMenuId) {
                        updateMenu();
                        return;
                      }

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
                    onClick={closeModal}
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
