"use client";
import React from "react";
import style from "./Overview.module.css";
import { useState } from "react";
import useSWR from "swr";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { LTR, font2 } from "@/app/fonts";
import classNames from "classnames";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const fetcher = async () => {
  const { handleOverviewData } = await import("@/lib/action");
  return handleOverviewData();
};

export default function Overview() {
  const [infoCard, setInfoCard] = useState([
    {
      title: "Users",
      key: "UsersCount",
      bkclr: "#219ebc",
      color: "#fff",
    },
    {
      title: "Vendors",
      key: "VendorsCount",
      bkclr: "#457b9d",
      color: "#fff",
    },
    {
      title: "Packages",
      key: "PackagesCount",
      bkclr: "#264653",
      color: "#fff",
    },
    {
      title: "Orders",
      key: "OrdersCount",
      bkclr: "#1d3557",
      color: "#fff",
    },
    {
      title: "Revenue",
      key: "Revenue",
      bkclr: "#2a9d8f",
      color: "#000",
    },
    {
      title: "Reviews",
      key: "ReviewsCount",
      bkclr: "#f4a261",
      color: "#000",
    },
    {
      title: "Ratings",
      key: "RatingsCount",
      bkclr: "#e9c46a",
      color: "#000",
    },
    {
      title: "Complaints",
      key: "ComplaintsCount",
      bkclr: "#fcbf49",
      color: "#000",
    },
    {
      title: "Queries",
      key: "QueriesCount",
      bkclr: "#e76f51",
      color: "#000",
    },
    {
      title: "Feedbacks",
      key: "FeedbacksCount",
      bkclr: "#a8dadc",
      color: "#000",
    },
    {
      title: "Suggestions",
      key: "SuggestionsCount",
      bkclr: "#eae2b7",
      color: "#000",
    },
  ]);

  const { data, error, isLoading } = useSWR("overviewData", fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 60000,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error)
    return <div>Error loading overview data. Please try again later.</div>;

  return (
    <div className={style.container}>
      <div
        className={classNames(style["OverviewInfoContainer"], LTR.className)}
      >
        {infoCard.map((card, index) => (
          <div
            style={{ backgroundColor: card.bkclr, color: card.color }}
            className={style["OverviewInfoCard"]}
            key={index}
          >
            <div className={style["OverviewInfoCardHeader"]}>
              <p
                className={classNames(
                  style["OverviewInfoCardTitle"],
                  font2.className
                )}
              >
                {card.title}
              </p>
              <AnalyticsIcon />
            </div>
            <div className={style["OverviewInfoCardData"]}>
              <h1>{data["current" + card.key]}</h1>
            </div>
            <div className={style["OverviewInfoCardDataFooter"]}>
              <h1>
                {data["percentThis" + card.key] >= 0 ? (
                  <>
                    <span style={{ color: "#80ed99" }}>
                      {data["percentThis" + card.key]}%
                    </span>
                    <TrendingUpIcon sx={{ color: "#80ed99", fontSize: "12px" }} />
                  </>
                ) : (
                  <>
                    <span style={{ color: "#e63946" }}>
                      {data["percentThis" + card.key]}%
                    </span>
                    <TrendingDownIcon sx={{ color: "#e63946", fontSize: "12px" }} />
                  </>
                )}{" "}
                [ {data["thisMonth" + card.key]} ] over this month.
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
