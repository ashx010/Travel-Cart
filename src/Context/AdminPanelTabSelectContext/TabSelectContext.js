"use client";
import React, { createContext, useContext, useState } from "react";

const TabContext = createContext();

export function useTab() {
  return useContext(TabContext);
}

export function TabProvider({ children }) {
  const [tabsState, setTabsState] = useState({
    overview: true,
    User: false,
    Vendors: false,
    Packages: false,
  });

  return (
    <TabContext.Provider value={{ tabsState, setTabsState }}>
      {children}
    </TabContext.Provider>
  );
}