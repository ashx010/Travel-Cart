"use client";
import React from "react";
import style from "./Container.module.css";
import { useTab } from "@/Context/AdminPanelTabSelectContext/TabSelectContext";
import dynamic from "next/dynamic";

const Overview = dynamic(
  () => import("@/components/AdminPanel/Tabs/Overview/Overview"),
  { ssr: false }
);

export default function Container() {
  const { tabsState } = useTab();

  console.log(tabsState);
  return (
    <div className={style["PageContainer"]}>
      {tabsState.overview && <Overview />}
      {tabsState.User && <h1>User</h1>}
      {tabsState.Vendors && <h1>Vendors</h1>}
      {tabsState.Packages && <h1>Packages</h1>}
    </div>
  );
}
