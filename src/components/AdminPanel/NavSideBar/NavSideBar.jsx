"use client";
import React from "react";
import style from "./navsidebar.module.css";
import Image from "next/image";
import classNames from "classnames";
import { canada, font2 } from "@/app/fonts";
import { useTab } from "@/Context/AdminPanelTabSelectContext/TabSelectContext";

export default function NavSideBar({
  tablesList = ["User", "Vendors", "Packages"],
}) {
  const { tabsState, setTabsState } = useTab();
  const handleTabState = (e) => {
    const data = e.target.getAttribute("data");
    const newTabsState = { ...tabsState };
    for (let key in newTabsState) {
      newTabsState[key] = false;
    }
    newTabsState[data] = true;
    setTabsState(newTabsState);
  };
  return (
    <div className={style["container-custom"]}>
      <div className={style.profileIconContainer}>
        <div className={classNames(style.profileName, canada.className)}>
          <p>Admin</p>
        </div>
        <div className={style.profileIcon}>
          <Image
            src="/register_login/scripetLogoTCART.png"
            alt="Profile"
            fill={true}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "50%",
            }}
            sizes="100px"
          />
        </div>
      </div>
      <ul className={style.CustomList}>
        <li
          onClick={handleTabState}
          data="overview"
          className={classNames(
            style.CustomListItem,
            tabsState.overview && style.active
          )}
        >
          Overview
        </li>
      </ul>
      <ul className={style.TablesList}>
        <li
          className={classNames(
            style.TablesListItem,
            style.heading,
            font2.className
          )}
        >
          Tables
        </li>
        {tablesList.map((table_name, index) => (
          <li
            key={index}
            className={classNames(
              style.TablesListItem,
              tabsState[table_name] && style.active
            )}
          >
            <p
              data={table_name}
              onClick={handleTabState}
              className={style.TablesListItemSpan}
            >
              {table_name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
