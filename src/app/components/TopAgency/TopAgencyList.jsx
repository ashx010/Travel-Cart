import React from "react";
import classNames from "classnames";
import style from "./TopAgencyList.module.css";
import { font2 } from "../../fonts.js";

export default function TopAgencyList({
	title = "Top Agencies",
}) {
  return (
    <div className={style["top-agency-container"]}>
      <h2
        className={classNames(style["title-topAgency"], font2.className)}
      >
				{title}
			</h2>
    </div>
  );
}
