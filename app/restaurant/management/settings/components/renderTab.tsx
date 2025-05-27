import React from "react";
import General from "./pages/general";
import AccountAndSecurity from "./pages/account_and_security";
import OrderAndMenuPreferences from "./pages/order_and_menu_preferences";
import PaymentAndBilling from "./pages/payment_and_billing";
import NotificationsAndAlerts from "./pages/notification_alerts";
import SupportAndHelp from "./pages/support_and_help";

function RenderTab({ tab }: { tab: string }) {
  switch (tab) {
    case "general":
      return <General />;
    case "account-and-security":
      return <AccountAndSecurity />;
    case "order-and-menu-preferences":
      return <OrderAndMenuPreferences />;
    case "payment-and-billing":
      return <PaymentAndBilling />;
    case "notifications-and-alerts":
      return <NotificationsAndAlerts />;
    case "support-and-help":
      return <SupportAndHelp />;

    default:
      <General />;
  }
}

export default RenderTab;
