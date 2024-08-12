"use client";
import React from "react";
import style from "./Container.module.css";
import { useTab } from "@/Context/AdminPanelTabSelectContext/TabSelectContext";
import dynamic from "next/dynamic";

const Overview = dynamic(
  () => import("@/components/AdminPanel/Tabs/Overview/Overview"),
  { ssr: false }
);

const Tables = dynamic(
  () => import("@/components/AdminPanel/Tabs/Tables/Tables"),
  { ssr: false }
);

export default function Container({
  table_name=["user", "vendor", "travelPackage"]
}) {
  const { tabsState } = useTab();

  console.log(Object.keys(tabsState));

  return (
    <div className={style["PageContainer"]}>
      {tabsState.overview && <Overview />}
      {table_name.map((table, index) => (
        tabsState[table] && <Tables key={index+table} table_name={table} />
      ))}
    </div>
  );
}
