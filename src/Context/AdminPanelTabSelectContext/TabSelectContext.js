"use client";
import React, { createContext, useContext, useState } from "react";

const TabContext = createContext();

export function useTab() {
  return useContext(TabContext);
}

export function TabProvider({ table_name={} ,children }) {
  const [tabsState, setTabsState] = useState(table_name);

  return (
    <TabContext.Provider value={{ tabsState, setTabsState }}>
      {children}
    </TabContext.Provider>
  );
}