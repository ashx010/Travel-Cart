import React from "react";
import style from "./Featured.module.css";
import Ncard from "../Card/Ncard";
import { dummy_data } from "./featured_dummy_data.js";
import Rating from "@mui/material/Rating";
import SendIcon from "@mui/icons-material/Send";
import { font2, LTR } from "../../fonts.js";
import classNames from "classnames";
import { ButtonStyle1 } from "../all/styledButtons.jsx";

export default function Featured() {
  return (
    <div className={classNames(style["featured-container"], font2.variable)}>
      <h2 className={style["title-featured"]}>Featured</h2>
      {dummy_data.map((data) => (
        <Ncard
          key={data.package_id}
          cardContainerClass={style["card-container-featured"]}
          cardHeaderClass={style["card-header-featured"]}
          cardImageClass={style["card-image-featured"]}
          cardBodyHeaderClass={style["card-body-heading-featured"]}
          cardBodyDescClass={style["card-body-desc-featured"]}
          apply3dEffect = {true}
          applyTorchEffect = {true}
          cardContainerStyle={{
            transition: "0s",
            overflow: "hidden",
          }}
          cardHeaderStyle={{
            background: `url(${data.image_url}) center center / cover`,
          }}
          cardBodyDesc={
            <>
              <p className={style["card-body-item1"]}>{data.title}</p>
              <div className={style[("card-body-dsc-infoot", "sub-heading")]}>
                <p className={style["card-body-item2"]}>{data.destination}</p>
                <p className={style["card-body-item3"]}>{data.duration}</p>
              </div>
              <p className={style["card-body-item4"]}>{data.description}</p>
              <p className={style["card-body-item5"]}>{data.vendor.name}</p>
              <p className={style["card-body-item6"]}>{data.vendor.contact}</p>
              <div className={style["card-body-dsc-infoot"]}>
                <p className={style["card-body-item7"]}>
                  <ButtonStyle1
                    className={LTR.className}
                    variant="contained"
                    size="small"
                    endIcon={<SendIcon />}
                  >
                    {data.cost}
                  </ButtonStyle1>
                </p>
                <p className={style["card-body-item8"]}>
                  {data.rating}{" "}
                  <Rating
                    name="read-only"
                    value={data.rating}
                    precision={0.2}
                    size="small"
                    readOnly
                  />
                </p>
              </div>
            </>
          }
        />
      ))}
    </div>
  );
}
