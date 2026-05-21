import React from "react";
import { ImagePlaceholder } from "../placeholder";
import UploadFileButton from "../uploadButton";
import styles from "../../style/index.module.css";
import EditPen from "../editPen";
import Section from "../section";
import { GeneralIcons } from "@/icons/general/icons";
import { useProfile } from "@/context/ProfileContext";
import { useAlert } from "@/context/AlertContext";
import { apiRoutes } from "@/lib/apiRoutes";
import { useFetch } from "@/hooks/useFetch";
import { usePatch } from "@/hooks/usePatch";
import { resolveAssetUrl } from "@/utils/helpers";
import Image from "next/image";

const EMPTY_DRAFTS: DraftSettings = {
  business_name: "",
  business_description: "",
  business_email: "",
  business_phone: "",
  business_address: "",
  business_state: "",
  business_postal_code: "",
};

function buildDrafts(settings: RestaurantSettingsData): DraftSettings {
  return {
    business_name: settings.business_name ?? "",
    business_description: settings.business_description ?? "",
    business_email: settings.business_email ?? "",
    business_phone: settings.business_phone ?? "",
    business_address: settings.business_address ?? "",
    business_state: settings.business_state ?? "",
    business_postal_code: settings.business_postal_code ?? "",
  };
}

function General() {
  const { restaurant, refreshRestaurantProfile } = useProfile();
  const { addAlert } = useAlert();
  const restaurantId = restaurant?.id;
  const settingsEndpoint = restaurantId
    ? apiRoutes.restaurant.settings.account.fetch(restaurantId)
    : "";
  const {
    data: settings,
    loading: loadingSettings,
    refetch: refetchSettings,
  } = useFetch<RestaurantSettingsData | null>(settingsEndpoint, null, {
    accountType: "restaurant",
    enabled: Boolean(restaurantId),
  });
  const accountSettingsUpdateEndpoint = restaurantId
    ? apiRoutes.restaurant.settings.account.update(restaurantId)
    : "";
  const { patchData: patchSettings, loading: patchingSettings } = usePatch<
    FormData,
    BaseResponse<RestaurantSettingsData>
  >({
    endpoint: accountSettingsUpdateEndpoint,
  });
  const [drafts, setDrafts] = React.useState<DraftSettings>(EMPTY_DRAFTS);
  const [editingField, setEditingField] = React.useState<EditableField | null>(
    null,
  );
  const [savingField, setSavingField] = React.useState<EditableField | null>(
    null,
  );
  const [uploadingField, setUploadingField] =
    React.useState<UploadField | null>(null);

  const nameInputRef = React.useRef<HTMLInputElement>(null);
  const descTextareaRef = React.useRef<HTMLTextAreaElement>(null);
  const bannerInputRef = React.useRef<HTMLInputElement>(null);
  const logoInputRef = React.useRef<HTMLInputElement>(null);

  const fieldLabels: Record<EditableField | UploadField, string> = {
    business_name: "Restaurant name",
    business_description: "Description",
    business_email: "Email",
    business_phone: "Phone",
    business_address: "Address",
    business_state: "State",
    business_postal_code: "Postal code",
    banner: "Banner",
    business_logo: "Logo",
  };

  React.useEffect(() => {
    if (!restaurantId) {
      setDrafts(EMPTY_DRAFTS);
      return;
    }

    if (settings) {
      setDrafts(buildDrafts(settings));
    }
  }, [restaurantId, settings]);

  React.useEffect(() => {
    if (editingField === "business_name" && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [editingField]);

  React.useEffect(() => {
    if (editingField === "business_description" && descTextareaRef.current) {
      descTextareaRef.current.focus();
      descTextareaRef.current.select();
    }
  }, [editingField]);

  const syncSettings = React.useCallback(
    (nextSettings: RestaurantSettingsData) => {
      setDrafts(buildDrafts(nextSettings));
      void refetchSettings();
    },
    [refetchSettings],
  );

  async function saveField(field: EditableField) {
    if (!restaurantId) return;

    setSavingField(field);
    try {
      const payload = new FormData();
      payload.append("field", field);
      payload.append("value", drafts[field]);

      const json = await patchSettings(payload);

      if (!json || json.status !== "success" || !json.data) {
        throw new Error(json?.message || "Failed to update restaurant setting");
      }

      syncSettings(json.data);
      await refreshRestaurantProfile(restaurantId);
      setEditingField(null);
      addAlert("success", `${fieldLabels[field]} updated successfully`);
    } catch (error) {
      console.error(`Failed to update ${field}:`, error);
      addAlert("error", `Failed to update ${fieldLabels[field]}`);
    } finally {
      setSavingField(null);
    }
  }

  async function uploadField(field: UploadField, file: File) {
    if (!restaurantId) return;

    setUploadingField(field);
    try {
      const payload = new FormData();
      payload.append("field", field);
      payload.append("file", file);

      const json = await patchSettings(payload);

      if (!json || json.status !== "success" || !json.data) {
        throw new Error(json?.message || "Failed to upload restaurant asset");
      }

      syncSettings(json.data);
      await refreshRestaurantProfile(restaurantId);
      addAlert("success", `${fieldLabels[field]} uploaded successfully`);
    } catch (error) {
      console.error(`Failed to upload ${field}:`, error);
      addAlert("error", `Failed to upload ${fieldLabels[field]}`);
    } finally {
      setUploadingField(null);
    }
  }

  function handleFileChange(
    field: UploadField,
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    if (uploadingField === field) {
      event.currentTarget.value = "";
      return;
    }

    const file = event.currentTarget.files?.[0];
    if (file) {
      void uploadField(field, file);
    }
    event.currentTarget.value = "";
  }

  if (!restaurant || loadingSettings || !settings) {
    return (
      <section className={styles.general} aria-busy="true" aria-live="polite">
        <div className={styles.general_skeleton_banner}>
          <div className={styles.general_skeleton_banner_overlay} />
          <div className={styles.general_skeleton_profile_image} />
          <div className={styles.general_skeleton_upload} />
          <div className={styles.general_skeleton_upload_primary} />
        </div>

        <div className={styles.general_skeleton_name_row}>
          <div className={styles.general_skeleton_name} />
          <div className={styles.general_skeleton_edit} />
        </div>

        <div className={styles.general_skeleton_desc}>
          <div className={styles.general_skeleton_desc_line} />
          <div className={styles.general_skeleton_desc_line} />
        </div>

        <section className={styles.section}>
          <p className={styles.section_title}>
            <span className={styles.general_skeleton_section_title} />
          </p>
          <div className={styles.section_wrapper}>
            {[0, 1].map((item) => (
              <div key={item} className={styles.general_skeleton_section_row}>
                <div className={styles.general_skeleton_section_icon} />
                <div className={styles.general_skeleton_section_text} />
                <div className={styles.general_skeleton_section_action} />
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <p className={styles.section_title}>
            <span className={styles.general_skeleton_section_title} />
          </p>
          <div className={styles.section_wrapper}>
            {[0, 1, 2].map((item) => (
              <div key={item} className={styles.general_skeleton_section_row}>
                <div className={styles.general_skeleton_section_icon} />
                <div className={styles.general_skeleton_section_text_long} />
                <div className={styles.general_skeleton_section_action} />
              </div>
            ))}
          </div>
        </section>
      </section>
    );
  }

  const bannerStyle = settings.banner
    ? {
        backgroundImage: `url(${settings.banner})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }
    : undefined;

  const editableTextStyle = (isEditing: boolean): React.CSSProperties => ({
    display: "inline-block",
    flex: 1,
    border: isEditing ? "0.1rem solid #bafff1" : "0.1rem solid transparent",
    borderRadius: "0.5rem",
    outline: "none",
    padding: "0.2rem 0.5rem",
    minWidth: "8rem",
  });

  const renderSavingField = (className?: string, width?: string) => (
    <span
      className={`${styles.general_field_skeleton_text}${className ? ` ${className}` : ""}`}
      style={width ? { width } : undefined}
      aria-hidden="true"
    />
  );

  function handleEditPenAction(field: EditableField) {
    if (editingField === field && savingField !== field) {
      void saveField(field);
    }
  }

  return (
    <section
      className={styles.general}
      aria-busy={
        savingField !== null || uploadingField !== null || patchingSettings
      }
    >
      <input
        ref={bannerInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(event) => handleFileChange("banner", event)}
      />
      <input
        ref={logoInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(event) => handleFileChange("business_logo", event)}
      />

      <div className={styles.banner_area} style={bannerStyle}>
        {uploadingField === "banner" ? (
          <div className={styles.general_skeleton_banner} aria-hidden="true">
            <div className={styles.general_skeleton_banner_overlay} />
          </div>
        ) : !settings.banner ? (
          <ImagePlaceholder />
        ) : (
          <Image
            src={resolveAssetUrl(settings.banner) || settings.banner}
            alt="Restaurant banner"
            fill
            style={{ objectFit: "cover", borderRadius: "1rem" }}
          />
        )}
        <div className={styles.profile_image}>
          {uploadingField === "business_logo" ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                border: "0.5rem solid #ffffff",
                background: "#e2e2e2",
                position: "relative",
                overflow: "hidden",
              }}
              aria-hidden="true"
            >
              <div
                style={{
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  transform: "translateX(-100%)",
                  background:
                    "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%)",
                  animation: "generalShimmer 1.4s infinite",
                }}
              />
            </div>
          ) : settings.business_logo ? (
            <Image
              src={
                resolveAssetUrl(settings.business_logo) ||
                settings.business_logo
              }
              width={150}
              height={150}
              alt={`${drafts.business_name} logo`}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <ImagePlaceholder className={styles.placeholder} />
          )}
          <UploadFileButton
            className={styles.upload_btn}
            onClick={() => {
              if (uploadingField === "business_logo") return;
              logoInputRef.current?.click();
            }}
          />
        </div>
        <div className={styles.uploadButtonContainer}>
          <UploadFileButton
            onClick={() => {
              if (uploadingField === "banner") return;
              bannerInputRef.current?.click();
            }}
          />
        </div>
      </div>

      <div className={styles.restaurant_name}>
        {savingField === "business_name" ? (
          renderSavingField(styles.general_field_skeleton_name, "50%")
        ) : editingField === "business_name" ? (
          <input
            ref={nameInputRef}
            type="text"
            value={drafts.business_name}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setDrafts((current) => ({
                ...current,
                business_name: value,
              }));
            }}
            onBlur={() => {
              void saveField("business_name");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.currentTarget.blur();
              }
            }}
            style={editableTextStyle(true)}
            placeholder="Enter Restaurant Name"
          />
        ) : (
          <h1
            className={styles.display_name}
            data-placeholder="Enter Restaurant Name"
          >
            {drafts.business_name}
          </h1>
        )}
        <div className={styles.edit_pen_container}>
          <EditPen
            loading={savingField === "business_name"}
            editing={editingField === "business_name"}
            setEditing={(next) =>
              setEditingField(next ? "business_name" : null)
            }
            value={drafts.business_name}
            onEdit={() => handleEditPenAction("business_name")}
          />
        </div>
      </div>

      <div className={styles.restaurant_desc}>
        {savingField === "business_description" ? (
          <div
            className={styles.general_field_skeleton_desc}
            aria-hidden="true"
          >
            {renderSavingField(undefined, "100%")}
            {renderSavingField(undefined, "78%")}
          </div>
        ) : editingField === "business_description" ? (
          <textarea
            ref={descTextareaRef}
            value={drafts.business_description}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setDrafts((current) => ({
                ...current,
                business_description: value,
              }));
            }}
            onBlur={() => {
              void saveField("business_description");
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.currentTarget.blur();
              }
            }}
            style={{
              ...editableTextStyle(true),
              minHeight: "6rem",
              fontFamily: "inherit",
              fontSize: "inherit",
              lineHeight: "1.5",
            }}
            placeholder="Edit description..."
          />
        ) : (
          <p
            className={styles.display_desc}
            data-placeholder="Edit description..."
          >
            {drafts.business_description}
          </p>
        )}
        <div className={styles.edit_pen_container}>
          <EditPen
            loading={savingField === "business_description"}
            editing={editingField === "business_description"}
            setEditing={(next) =>
              setEditingField(next ? "business_description" : null)
            }
            value={drafts.business_description}
            onEdit={() => handleEditPenAction("business_description")}
          />
        </div>
      </div>

      <Section title="Contact details">
        {[
          {
            icon: GeneralIcons.phone_out_line,
            field: "business_phone" as const,
            value: drafts.business_phone,
            placeholder: "Edit business phone",
          },
          {
            icon: GeneralIcons.envelope_outline,
            field: "business_email" as const,
            value: drafts.business_email,
            placeholder: "Edit business email",
          },
        ].map((contact) => (
          <div key={contact.field} className={styles.section_edits_wrapper}>
            <div className={styles.inner_wrapper}>
              <span className={styles.icon}>{contact.icon}</span>
              {savingField === contact.field ? (
                renderSavingField(undefined, "70%")
              ) : editingField === contact.field ? (
                <input
                  type="text"
                  value={contact.value}
                  onChange={(e) => {
                    const value = e.currentTarget.value;
                    setDrafts((current) => ({
                      ...current,
                      [contact.field]: value,
                    }));
                  }}
                  onBlur={() => {
                    void saveField(contact.field);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.currentTarget.blur();
                    }
                  }}
                  autoFocus
                  style={editableTextStyle(true)}
                  placeholder={contact.placeholder}
                />
              ) : (
                <span
                  className={styles.display_text}
                  data-placeholder={contact.placeholder}
                >
                  {contact.value}
                </span>
              )}
            </div>
            <div className={styles.edit_pen_container}>
              <EditPen
                loading={savingField === contact.field}
                editing={editingField === contact.field}
                setEditing={(next) =>
                  setEditingField(next ? contact.field : null)
                }
                value={contact.value}
                onEdit={() => handleEditPenAction(contact.field)}
              />
            </div>
          </div>
        ))}
      </Section>

      <Section title="Address">
        {[
          {
            icon: GeneralIcons.location_outline,
            field: "business_address" as const,
            label: "Address",
            value: drafts.business_address,
            placeholder: "Edit business address",
          },
          {
            icon: GeneralIcons.location_outline,
            field: "business_state" as const,
            label: "State",
            value: drafts.business_state,
            placeholder: "Edit business state",
          },
          {
            icon: GeneralIcons.location_outline,
            field: "business_postal_code" as const,
            label: "Postal code",
            value: drafts.business_postal_code,
            placeholder: "Edit postal code",
          },
        ].map((item) => (
          <div key={item.field} className={styles.section_edits_wrapper}>
            <div className={styles.inner_wrapper}>
              <span className={styles.icon}>{item.icon}</span>
              {savingField === item.field ? (
                renderSavingField(undefined, "70%")
              ) : editingField === item.field ? (
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) => {
                    const value = e.currentTarget.value;
                    setDrafts((current) => ({
                      ...current,
                      [item.field]: value,
                    }));
                  }}
                  onBlur={() => {
                    void saveField(item.field);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.currentTarget.blur();
                    }
                  }}
                  autoFocus
                  style={editableTextStyle(true)}
                  placeholder={item.placeholder}
                />
              ) : (
                <span
                  className={styles.display_text}
                  data-placeholder={item.placeholder}
                >
                  {item.value || item.placeholder}
                </span>
              )}
            </div>
            <div className={styles.edit_pen_container}>
              <EditPen
                loading={savingField === item.field}
                editing={editingField === item.field}
                setEditing={(next) => setEditingField(next ? item.field : null)}
                value={item.value}
                onEdit={() => handleEditPenAction(item.field)}
              />
            </div>
          </div>
        ))}
      </Section>
    </section>
  );
}

export default General;
