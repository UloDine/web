"use client";
import React, { createContext } from "react";

const NavigationContext = createContext({
  currentPath: "/",
  setCurrentPath: (path: string) => {},
  openSidebar: false,
  setOpenSidebar: (open: boolean) => {},
});

function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [currentPath, setCurrentPath] = React.useState("/");
  const [openSidebar, setOpenSidebar] = React.useState(false);

  return (
    <NavigationContext.Provider
      value={{
        currentPath,
        setCurrentPath,
        openSidebar,
        setOpenSidebar,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

function useCustomNavigation() {
  const context = React.useContext(NavigationContext);
  if (!context) {
    throw new Error(
      "useCustomNavigation must be used within a NavigationProvider",
    );
  }
  return context;
}

export { NavigationContext, NavigationProvider, useCustomNavigation };
