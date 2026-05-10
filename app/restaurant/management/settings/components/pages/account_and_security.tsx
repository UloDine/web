import React from "react";
import styles from "../../style/index.module.css";
import UloDIneButton from "@/components/button/UloDIneButton";
import { useRouter } from "next/navigation";
import { AUTH_ROUTES } from "@/routes/RoutePaths";
import UloDineModal from "@/components/modal/UloDineModal";
import { useProfile } from "@/context/ProfileContext";
import { useAlert } from "@/context/alert/AlertContext";
import { apiRoutes } from "@/lib/apiRoutes";

function AccountAndSecurity() {
  const router = useRouter();
  const { restaurant, setRestaurant, setUser } = useProfile();
  const { addAlert } = useAlert();
  const [openDeactivate, setOpenDeactivate] = React.useState(false);
  const [deactivationInput, setDeactivationInput] = React.useState("");
  const [deactivating, setDeactivating] = React.useState(false);
  const handleCloseDeactivate = React.useCallback(() => {
    if (deactivating) return;
    setOpenDeactivate(false);
    setDeactivationInput("");
  }, [deactivating]);

  const handleDeactivateAccount = React.useCallback(async () => {
    const restaurantId = restaurant?.id;
    if (!restaurantId) {
      addAlert("error", "Restaurant profile is missing. Please log in again.");
      return;
    }

    try {
      setDeactivating(true);
      const response = await fetch(
        apiRoutes.restaurant.deleteAccount(restaurantId),
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const result = await response.json();
      if (!response.ok || result.status !== "success") {
        throw new Error(result.message || "Failed to deactivate account");
      }

      // Best-effort logout and local session cleanup
      await fetch("/api/auth/user/logout", {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("user");
      localStorage.removeItem("email_verified");
      localStorage.removeItem("email_to_verify");
      localStorage.removeItem("email_to_verify_business");

      setUser(null);
      setRestaurant(null);

      addAlert("success", "Account deleted successfully");
      router.replace(AUTH_ROUTES.RES_LOGIN);
    } catch (error: unknown) {
      addAlert(
        "error",
        error instanceof Error ? error.message : "Failed to deactivate account",
      );
    } finally {
      setDeactivating(false);
      setOpenDeactivate(false);
      setDeactivationInput("");
    }
  }, [restaurant?.id, addAlert, router, setRestaurant, setUser]);
  const actions = [
    {
      title: "Change Password",
      description: "Update login credentials securely.",
      action: () => router.push(AUTH_ROUTES.RES_RECOVER_PASSWORD),
    },
    // {
    //   title: "Two-Factor Authentication",
    //   description: "Enable 2FA for added security.",
    //   action: () => {
    //     // Logic to enable 2FA
    //   },
    // },
    // {
    //   title: "Modify account contact details",
    //   description: "Enable 2FA for added security.",
    //   action: () => {
    //     // Logic to enable 2FA
    //   },
    // },
    // {
    //   title: "Manage Devices",
    //   description: "View and manage devices connected to your account.",
    //   action: () => {
    //     // Logic to manage devices
    //   },
    // },
    {
      title: "Deactivate Account",
      description: "Temporarily disable or delete account.",
      action: () => {
        setOpenDeactivate(true);
      },
    },
  ];

  return (
    <section className={styles.account_and_security}>
      {actions.map((action, index) => (
        <div key={index} className={styles.action_item}>
          <h3 className={styles.action_title}>{action.title}</h3>
          <p className={styles.action_description}>{action.description}</p>
          <div className={styles.action_button}>
            <UloDIneButton
              type="primary"
              color="green"
              label="Begin Process"
              onClick={action.action}
            />
          </div>
        </div>
      ))}
      <UloDineModal
        isOpen={openDeactivate}
        onClose={handleCloseDeactivate}
        title="Deactivate Account"
        onAction={handleDeactivateAccount}
        actionButtonDisabled={
          deactivationInput !== "permanently delete my account" || deactivating
        }
        actionButtonLoading={deactivating}
      >
        <p>
          Are you sure you want to deactivate your account? This action is
          irreversible.
        </p>
        <div className={styles.statement_input}>
          <p>
            Enter the statement{" "}
            <strong>&quot;permanently delete my account&quot;</strong> to
            continue
          </p>
          <input
            type="text"
            placeholder="Type here..."
            value={deactivationInput}
            onChange={(e) => setDeactivationInput(e.target.value)}
          />
        </div>
      </UloDineModal>
    </section>
  );
}

export default AccountAndSecurity;
