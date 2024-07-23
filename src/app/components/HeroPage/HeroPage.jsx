"use client";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import style from "./HeroPage.module.css";
import Ncard from "../Card/Ncard";
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { canada, font2, font3 } from "../../fonts.js" 
import classNames from "classnames";
import { ButtonStyle1, ButtonStyle2 } from "../all/styledButtons";

export default function HeroPage({
  titleName = "Scripet",
  heroPageTitle = "TCART",
  heroPageSubTitle = `"Explore the World's Wonders - Tailored Just for You"`,
  imgSrcList = [
    {
      itemNo: 1,
      name: "USA",
      city: "New York",
      src: "/home_carousel/usa_newyork.jpeg",
      color: "#A8DADC",
      textColor: "black",
    },
    {
      itemNo: 2,
      name: "China",
      city: "Shanghai",
      src: "/home_carousel/china_shanghai.jpeg",
      color: "#457B9D",
      textColor: "black",
    },
    {
      itemNo: 3,
      name: "Japan",
      city: "Tokyo",
      src: "/home_carousel/Japan_tokyo.jpeg",
      color: "#1D3557",
      textColor: "white",
    },
  ],
}) {
  const [currImgSrcList, setCurrImgSrcList] = useState(imgSrcList);
  const [translateXProp, setTranslateXProp] = useState("translateX(0)");
  const [translateMainProp, setTranslateMainProp] = useState("translate(0,0)");
  const [translateYProp, setTranslateYProp] = useState("translate(0%, 0%)");
  const [cardTwoStyleHover, setTwoCardStyleHover] =
    useState("translate(3%, -6%)");
  const [responsiveCond, setResponsiveCond] = useState(false);

  useEffect(() => {
    setResponsiveCond(window.innerWidth > 850);
    let newList = [];
    const intervalId = setInterval(() => {
      //set transition for hero cards
      setTranslateXProp("translateX(-10%)");
      setTranslateYProp(
        `${
          window.innerWidth <= 850
            ? "translate(-10%, -5%)"
            : "translate(-15%, 0%)"
        }`
      );
      setTranslateMainProp("translate(2%, 0%)");

      setTimeout(() => {
        newList = [...currImgSrcList];
        newList.push(newList.shift());
        setCurrImgSrcList(newList);
        setTranslateXProp("translateX(0)");
        setTranslateYProp("translate(0%, 0%)");
        setTranslateMainProp("translate(0, 0)");
      }, 1000);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [imgSrcList]);

  useEffect(() => {
    setResponsiveCond(window.innerWidth > 850);
    if (responsiveCond) {
      const hoverCard = () => {
        setTranslateYProp("translate(6%, -230%)");
        setTwoCardStyleHover("translate(6%, -120%)");
      };
      const unhoverCard = () => {
        setTranslateYProp("translate(0%, 0%)");
        setTwoCardStyleHover("translate(3%, -6%)");
      };
      const placeListContainer = document.getElementById(
        "placeListViewContainer"
      );
      placeListContainer.addEventListener("mouseover", hoverCard);
      placeListContainer.addEventListener("mouseout", unhoverCard);

      return () => {
        placeListContainer.removeEventListener("mouseover", hoverCard);
        placeListContainer.removeEventListener("mouseout", unhoverCard);
      };
    }
  });

  return (
    <div className={style["hero-container"]}>
      <div className={classNames(style["title"], font2.className)}>{titleName}</div>
      <div className={classNames(style["text-container"], font3.className)}>
        {currImgSrcList[0].name}
        <div className={style["city"]}>
          <ButtonStyle2
            variant="contained"
            size="small"
            endIcon={<TravelExploreIcon />}
          >
            {currImgSrcList[0].city}
          </ButtonStyle2>
        </div>
      </div>
      <div
        className={style["image-container"]}
        style={{
          background: `url(${currImgSrcList[0].src}) no-repeat center / cover`,
          transform: !responsiveCond ? translateMainProp : "none",
        }}
      >
        {responsiveCond && (
          <div
            className={style["place-list-view-container"]}
            id="placeListViewContainer"
          >
            <Ncard
              imgSrc={currImgSrcList[0].src}
              imgAlt={currImgSrcList[0].name}
              cardBodyHeading={currImgSrcList[0].name}
              cardContainerClass={style["card-place-container-hero"]}
              cardImageClass={style["card-place-image-hero"]}
              cardBodyHeaderClass={classNames(style["card-place-heading-hero"], font2.className)}
              cardContainerStyle={{
                backgroundColor: currImgSrcList[0].color,
                transform: "translate(6%, -12%)",
              }}
              cardBodyHeaderStyle={{ color: currImgSrcList[0].textColor }}
            />
            <Ncard
              imgSrc={currImgSrcList[2].src}
              imgAlt={currImgSrcList[2].name}
              cardBodyHeading={currImgSrcList[2].name}
              cardContainerClass={style["card-place-container-hero"]}
              cardImageClass={style["card-place-image-hero"]}
              cardBodyHeaderClass={classNames(style["card-place-heading-hero"], font2.className)}
              cardContainerStyle={{
                backgroundColor: currImgSrcList[2].color,
                transform: cardTwoStyleHover,
              }}
              cardBodyHeaderStyle={{ color: currImgSrcList[2].textColor }}
            />
            <Ncard
              imgSrc={currImgSrcList[1].src}
              imgAlt={currImgSrcList[1].name}
              cardBodyHeading={currImgSrcList[1].name}
              cardContainerClass={style["card-place-container-hero"]}
              cardImageClass={style["card-place-image-hero"]}
              cardBodyHeaderClass={classNames(style["card-place-heading-hero"], font2.className)}
              cardContainerStyle={{
                backgroundColor: currImgSrcList[1].color,
                transform: translateYProp,
              }}
              cardBodyHeaderStyle={{ color: currImgSrcList[1].textColor }}
            />
          </div>
        )}
      </div>

      {!responsiveCond && (
        <div className={style["place-list-view-container"]} id="placeListViewContainer">
          <Ncard
            imgSrc={currImgSrcList[1].src}
            imgAlt={currImgSrcList[1].name}
            cardContainerClass={style["card-place-container-hero"]}
            cardImageClass={style["card-place-image-hero"]}
            cardContainerStyle={{
              backgroundColor: currImgSrcList[1].color,
              transform: translateYProp,
            }}
          />
          <Ncard
            imgSrc={currImgSrcList[2].src}
            imgAlt={currImgSrcList[2].name}
            cardContainerClass={style["card-place-container-hero"]}
            cardImageClass={style["card-place-image-hero"]}
            cardContainerStyle={{
              backgroundColor: currImgSrcList[2].color,
              transform: translateXProp,
            }}
          />
          <Ncard
            imgSrc={currImgSrcList[0].src}
            imgAlt={currImgSrcList[0].name}
            cardContainerClass={style["card-place-container-hero"]}
            cardImageClass={style["card-place-image-hero"]}
            cardContainerStyle={{
              backgroundColor: currImgSrcList[0].color,
              transform: translateXProp,
            }}
          />
        </div>
      )}
      {heroPageTitle && (
        <div className={style["text-container-main"]}>
          <h1 className={classNames(style["heading-hero"], font2.className)}>{heroPageTitle}</h1>
          {heroPageSubTitle && (
            <p className={classNames(style["sub-heading-hero"], canada.className)}>{heroPageSubTitle}</p>
          )}
          <div className={style["subscribe-container-hero-main"]}>
            <input
              type="text"
              name="email-hero-subscriber"
              className={style["subscribe-input-hero"]}
              placeholder="Enter Destination"
            />
            <ButtonStyle1
              variant="contained"
              size="medium"
              endIcon={<ModeOfTravelIcon />}
            >
              Search
            </ButtonStyle1>
          </div>
        </div>
      )}
    </div>
  );
}

HeroPage.propTypes = {
  titleName: PropTypes.string,
  heroPageTitle: PropTypes.string,
  heroPageSubTitle: PropTypes.string,
  imgSrcList: PropTypes.array,
};