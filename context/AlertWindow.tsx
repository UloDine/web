import React from "react";

const OfflineAlert: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: "#f44336",
        color: "#fff",
        padding: "10px",
        textAlign: "center",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      You are offline. Some features may not work.
    </div>
  );
};

export default OfflineAlert;
