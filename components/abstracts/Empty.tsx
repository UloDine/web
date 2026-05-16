import {
  HistoryBoldIcon,
  MenuBoldIcon,
  OrderBoldIcon,
  RestaurantBoldIcon,
} from "@/icons/customer";
import React from "react";

function Empty({
  icon = "order",
  title = "No Data",
  desc = "There is no data to display.",
  className,
  action,
  actionLabel,
}: {
  icon: "order" | "menu" | "history" | "restaurant";
  title: string;
  desc: string;
  className?: string;
  action?: () => void;
  actionLabel?: string;
}) {
  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "20rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        {icon === "order" ? (
          <OrderBoldIcon />
        ) : icon === "menu" ? (
          <MenuBoldIcon />
        ) : icon === "history" ? (
          <HistoryBoldIcon />
        ) : (
          <RestaurantBoldIcon />
        )}
      </div>
      <h3 style={{ textAlign: "center" }}>{title}</h3>
      <p style={{ textAlign: "center" }}>{desc}</p>
      {action && actionLabel && (
        <button
          onClick={action}
          style={{
            padding: "0.7rem 2rem",
            background: "#00bb95",
            borderRadius: "5rem",
            color: "#fff",
            border: "none",
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default Empty;
