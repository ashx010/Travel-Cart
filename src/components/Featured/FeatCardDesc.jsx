import React from "react";
import { ButtonStyle1 } from "../all/styledButtons.jsx";
import style from "./Featured.module.css";
import Rating from "@mui/material/Rating";
import SendIcon from "@mui/icons-material/Send";
import { LTR } from "@/app/fonts.js";

export default function FeatCardDesc({
  title = "",
  destination = "",
  duration = "",
  description = "",
  vendor = {
    name: "",
    contact: "",
  },
  cost = "",
  rating = 0,
}) {
  return (
    <>
      <p className={style["card-body-item1"]}>{title}</p>
      <div className={style[("card-body-dsc-infoot", "sub-heading")]}>
        <p className={style["card-body-item2"]}>{destination}</p>
        <p className={style["card-body-item3"]}>{duration}</p>
      </div>
      <p className={style["card-body-item4"]}>{description}</p>
      <p className={style["card-body-item5"]}>{vendor["name"]}</p>
      <p className={style["card-body-item6"]}>{vendor["contact"]}</p>
      <div className={style["card-body-dsc-infoot"]}>
        <p className={style["card-body-item7"]}>
          <ButtonStyle1
            className={LTR.className}
            variant="contained"
            size="small"
            endIcon={<SendIcon />}
          >
            {cost}
          </ButtonStyle1>
        </p>
        <p className={style["card-body-item8"]}>
          {rating}{" "}
          <Rating
            name="read-only"
            value={rating}
            precision={0.2}
            size="small"
            readOnly
          />
        </p>
      </div>
    </>
  );
}
