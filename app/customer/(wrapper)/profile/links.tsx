import {
  BellSmallIcon,
  BookMarkSmallIcon,
  CreditCardSmallIcon,
  GlobeIcon,
  HelpIcon,
  InfoCircleIcon,
  KeySmallIcon,
  LogoutIcon,
  MapIcon,
  OrderSmallIcon,
  ThemeIcon,
} from "@/icons/customer";

export const PROFILE_LINKS = [
  {
    id: "settings",
    label: "Settings",
    items: [
      {
        id: "notifications",
        label: "Notification Settings",
        link: "/customer/profile/notifications",
        icon: <BellSmallIcon />,
      },
      {
        id: "language",
        label: "Language Selection",
        link: "/customer/profile/language",
        icon: <GlobeIcon />,
      },
      {
        id: "theme",
        label: "Theme",
        link: "/customer/profile/theme",
        icon: <ThemeIcon />,
      },
      {
        id: "payment_methods",
        label: "Payment Methods",
        link: "/customer/profile/payment-methods",
        icon: <CreditCardSmallIcon />,
      },
      {
        id: "saved_addresses",
        label: "Saved Addresses",
        link: "/customer/profile/saved-addresses",
        icon: <MapIcon />,
      },
    ],
  },
  {
    id: "preferences",
    label: "Preferences",
    items: [
      {
        id: "order_history",
        label: "Order History",
        link: "/customer/orders",
        icon: <OrderSmallIcon />,
      },
      {
        id: "saved_favorites",
        label: "Saved Favorites",
        link: "/customer/saved-favorites",
        icon: <BookMarkSmallIcon />,
      },
    ],
  },
  {
    id: "help_support",
    label: "Help & Support",
    items: [
      {
        id: "help_center",
        label: "Help & Support",
        link: "/customer/help-center",
        icon: <HelpIcon />,
      },
      {
        id: "terms_privacy",
        label: "Terms & Privacy Policy",
        link: "/customer/profile/terms-privacy",
        icon: <InfoCircleIcon />,
      },
    ],
  },
  {
    id: "actions",
    label: "Actions",
    items: [
      {
        id: "change_password",
        label: "Change Password",
        link: "/customer/profile/change-password",
        icon: <KeySmallIcon />,
      },
      {
        id: "logout",
        label: "Logout",
        link: "/customer/profile/logout",
        icon: <LogoutIcon />,
      },
    ],
  },
];
