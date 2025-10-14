"use client";
import React, { createContext, useContext } from "react";
import { useWindow } from "./useWindow";
import { useNetwork } from "./useNetwork";
import { useTheme } from "./useTheme";
import OfflineAlert from "../alert/AlertWindow";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const windowSize = useWindow();
  const isOnline = useNetwork();
  const theme = useTheme();

  return (
    <AppContext.Provider value={{ windowSize, isOnline, theme }}>
      {/* {!isOnline && <OfflineAlert />} */}
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
