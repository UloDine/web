type EditableField =
  | "business_name"
  | "business_description"
  | "business_email"
  | "business_phone"
  | "business_address"
  | "business_state"
  | "business_postal_code";

type UploadField = "banner" | "business_logo";

interface NotificationPreferences {
  sms: boolean;
  email: boolean;
  in_app: boolean;
}

interface RestaurantPreferences {
  notifications?: NotificationPreferences;
  [key: string]: unknown;
}

interface RestaurantSettingsData {
  id: string;
  business_name: string;
  business_description: string | null;
  business_email: string | null;
  business_phone: string | null;
  business_address: string;
  business_state: string;
  business_postal_code: string;
  business_plan: string;
  banner: string | null;
  business_logo: string | null;
  preferences?: RestaurantPreferences | null;
}

interface RestaurantNotificationSettingsData {
  id: string;
  preferences: NotificationPreferences;
}

interface DraftSettings {
  business_name: string;
  business_description: string;
  business_email: string;
  business_phone: string;
  business_address: string;
  business_state: string;
  business_postal_code: string;
}

interface NotificationPreferences {
  sms: boolean;
  email: boolean;
  in_app: boolean;
}

interface NotificationSettingsData {
  id: string;
  preferences: NotificationPreferences;
}
