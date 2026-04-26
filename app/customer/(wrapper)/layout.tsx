import CustomerBottomBar from "@/layout/wrapper/containers/CustomerBottomBar";
import React from "react";

function CustomerApp({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        width: "100%",
      }}
    >
      <div style={{ flex: 1, width: "100%", minHeight: 0 }}>{children}</div>
      <CustomerBottomBar />
    </div>
  );
}

export default CustomerApp;
