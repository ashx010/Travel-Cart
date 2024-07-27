import React from "react";
import style from "./Featured.module.css";
import Ncard from "../Card/Ncard";
import { dummy_data } from "./featured_dummy_data.js";
import { font2 } from "@/app/fonts.js";
import classNames from "classnames";
import FeatCardDesc from "./FeatCardDesc";

export default function Featured() {
  return (
    <div className={classNames(style["featured-container"], font2.variable)}>
      <h2 className={style["title-featured"]}>Featured</h2>
      {dummy_data.map((data, index) => (
        <Ncard
          key={index}
          imgSrc={data.image_url}
          imgAlt={data.title}
          cardContainerClass={style["card-container-featured"]}
          cardHeaderClass={style["card-header-featured"]}
          cardBodyDescClass={style["card-body-desc-featured"]}
          apply3dEffect = {true}
          applyTorchEffect = {true}
          cardContainerStyle={{
            transition: "0s",
            overflow: "hidden",
          }}
          cardBodyDesc={<FeatCardDesc
            title={data.title}
            destination={data.destination}
            duration={data.duration}
            description={data.description}
            vendor={data.vendor}
            cost={data.cost}
            rating={data.rating}
          />}
          applyHeaderFullWidth={true}
        />
      ))}
    </div>
  );
}
