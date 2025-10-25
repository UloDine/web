"use client";
import React, { createContext, useContext, useState } from "react";
import { useWindow } from "./useWindow";
import { useNetwork } from "./useNetwork";
import { useTheme } from "./useTheme";
// import OfflineAlert from "../alert/AlertWindow";

const AppContext = createContext<AppContextType | undefined>(undefined);

function AppProvider({ children }: { children: React.ReactNode }) {
  const windowSize = useWindow();
  const isOnline = useNetwork();
  const theme = useTheme();
  const [type, setType] = useState<AppType>("restaurant");

  return (
    <AppContext.Provider value={{ windowSize, isOnline, theme, type, setType }}>
      {/* {!isOnline && <OfflineAlert />} */}
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
