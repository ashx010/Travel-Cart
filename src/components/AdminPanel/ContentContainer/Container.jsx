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

export default function Container() {
  const { tabsState } = useTab();

  return (
    <div className={style["PageContainer"]}>
      {tabsState.overview && <Overview />}
      {tabsState.User && <Tables table_name="user" />}
      {tabsState.Vendors && <Tables table_name="vendor" />}
      {tabsState.Packages && <Tables table_name="travelPackage" />}
    </div>
  );
}
