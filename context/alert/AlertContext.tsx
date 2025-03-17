"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import styles from "./style/index.module.css";

interface AlertProps {
  id: number;
  type: "success" | "error" | "warning";
  message: string;
}

interface AlertContextType {
  addAlert: (type: AlertProps["type"], message: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<AlertProps[]>([]);

  function addAlert(type: AlertProps["type"], message: string) {
    const id = Date.now();
    setAlerts((prevAlerts) => [...prevAlerts, { id, type, message }]);

    setTimeout(() => {
      setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
    }, 3000);
  }

  return (
    <AlertContext.Provider value={{ addAlert }}>
      {children}
      <div className={styles.alertContainer}>
        {alerts.map(({ id, type, message }) => (
          <div key={id} className={`${styles.alert} ${styles[type]}`}>
            <span>{message}</span>
            <button
              onClick={() =>
                setAlerts((prev) => prev.filter((alert) => alert.id !== id))
              }
              className={styles.close}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
}
