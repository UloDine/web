"use client";

import UloDineCheckbox from "@/components/input/UloDineCheckbox";
import { useAlert } from "@/context/AlertContext";
import { useProfile } from "@/context/ProfileContext";
import { InfoCircleIcon } from "@/icons/customer";
import { apiRoutes } from "@/lib/apiRoutes";
import { useFetch } from "@/hooks/useFetch";
import { usePatch } from "@/hooks/usePatch";
import React from "react";
import styles from "../../style/index.module.css";
import Spinner from "@/components/loaders/Spinner";

const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  sms: true,
  email: false,
  in_app: true,
};

function NotificationsAndAlerts() {
  const { restaurant } = useProfile();
  const { addAlert } = useAlert();
  const restaurantId = restaurant?.id ?? "";

  const settingsEndpoint = restaurantId
    ? apiRoutes.restaurant.settings.notifications.fetch(restaurantId)
    : "";

  const { data, loading, refetch } = useFetch<NotificationSettingsData | null>(
    settingsEndpoint,
    null,
    {
      accountType: "restaurant",
      enabled: Boolean(restaurantId),
    },
  );

  const accountNotificationsUpdateEndpoint = restaurantId
    ? apiRoutes.restaurant.settings.notifications.update(restaurantId)
    : "";
  const { patchData: patchPreferences } = usePatch<
    { preferences: NotificationPreferences },
    BaseResponse<NotificationSettingsData>
  >({
    endpoint: accountNotificationsUpdateEndpoint,
  });

  const [preferences, setPreferences] = React.useState<NotificationPreferences>(
    DEFAULT_NOTIFICATION_PREFERENCES,
  );
  const [savingKey, setSavingKey] = React.useState<
    keyof NotificationPreferences | null
  >(null);

  React.useEffect(() => {
    if (!data?.preferences) return;

    setPreferences({
      sms:
        typeof data.preferences.sms === "boolean"
          ? data.preferences.sms
          : DEFAULT_NOTIFICATION_PREFERENCES.sms,
      email:
        typeof data.preferences.email === "boolean"
          ? data.preferences.email
          : DEFAULT_NOTIFICATION_PREFERENCES.email,
      in_app:
        typeof data.preferences.in_app === "boolean"
          ? data.preferences.in_app
          : DEFAULT_NOTIFICATION_PREFERENCES.in_app,
    });
  }, [data]);

  async function savePreferences(nextPreferences: NotificationPreferences) {
    if (!restaurantId) return;

    setSavingKey(
      Object.keys(nextPreferences).find(
        (key) =>
          nextPreferences[key as keyof NotificationPreferences] !==
          preferences[key as keyof NotificationPreferences],
      ) as keyof NotificationPreferences | null,
    );

    try {
      const json = await patchPreferences({ preferences: nextPreferences });

      if (!json || json.status !== "success" || !json.data) {
        throw new Error(json?.message || "Failed to update preferences");
      }

      setPreferences(json.data.preferences ?? nextPreferences);
      await refetch();
      addAlert("success", "Notification preferences updated successfully");
    } catch (error) {
      console.error("Failed to update notification preferences:", error);
      addAlert("error", "Failed to update notification preferences");
    } finally {
      setSavingKey(null);
    }
  }

  const options = [
    { label: "SMS", key: "sms" as const, checked: preferences.sms },
    { label: "Email", key: "email" as const, checked: preferences.email },
    { label: "In App", key: "in_app" as const, checked: preferences.in_app },
  ];

  return (
    <section className={styles.notification_alerts}>
      <div className={styles.header}>
        <h1>Notifications & Alerts</h1>
        <p>Choose how you receive order updates</p>
      </div>
      <ul>
        {options.map((o) => (
          <li key={o.label}>
            <p>{o.label}</p>
            {savingKey === o.key ? (
              <Spinner size={20} />
            ) : (
              <UloDineCheckbox
                checked={o.checked}
                disabled={loading || savingKey !== null}
                onChange={(nextChecked) => {
                  const nextPreferences = {
                    ...preferences,
                    [o.key]: nextChecked,
                  };
                  void savePreferences(nextPreferences);
                }}
              />
            )}
          </li>
        ))}
      </ul>
      <div className={styles.banner}>
        <InfoCircleIcon color="#0092C3" />
        <small>
          While email updates are free, sms updates may incur additional
          charges.
        </small>
      </div>
    </section>
  );
}

export default NotificationsAndAlerts;
