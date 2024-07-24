"use client";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import style from "./HeroPage.module.css";
import Ncard from "../Card/Ncard";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { canada, font2, font3 } from "../../fonts.js";
import classNames from "classnames";
import { ButtonStyle1, ButtonStyle2 } from "../all/styledButtons";
import Image from "next/image";

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
  const [currZIndexList, setCurrZIndexList] = useState([3, 2, 1]);
  const [translateList, setTranslateList] = useState({
    main: "translate(0,0)",
    responsive: ["translateX(600%)", "translateX(0%)", "translateX(0%)"],
    cardStyle: [
      "translate(6%, -12%",
      "translate(3%, -6%)",
      "translate(0%, 0%)",
    ],
  });
  const [responsiveCond, setResponsiveCond] = useState(false);

  useEffect(() => {
    setResponsiveCond(window.innerWidth > 850);
    let newZIndexList = currZIndexList;
    let newHoverCard = translateList["cardStyle"];
    let newResponsiveCard = translateList["responsive"];

    const intervalId = setInterval(() => {
      //set transition for hero cards
      newHoverCard[newHoverCard.indexOf("translate(0%, 0%)")] = "translate(-15%, 0%)";
      setTranslateList({
        ...translateList,
        cardStyle: newHoverCard,
      });

      setTimeout(() => {
        //set new z-index for hero cards
        newZIndexList.push(newZIndexList.shift());
        setCurrZIndexList(newZIndexList);

        newHoverCard[newHoverCard.indexOf("translate(-15%, 0%)")] = "translate(0%, 0%)";
        newHoverCard.push(newHoverCard.shift());

        newResponsiveCard.push(newResponsiveCard.shift());

        setTranslateList({
          ...translateList,
          responsive: newResponsiveCard,
          cardStyle: newHoverCard,
        });
      }, 1000);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [translateList, currZIndexList]);

  useEffect(() => {
    setResponsiveCond(window.innerWidth > 850);
    let newHoverCard = translateList["cardStyle"];
    if (responsiveCond) {
      const hoverCard = () => {
        newHoverCard[newHoverCard.indexOf("translate(0%, 0%)")] = "translate(6%, -230%)";
        newHoverCard[newHoverCard.indexOf("translate(3%, -6%)")] = "translate(6%, -120%)";

        setTranslateList({
          ...translateList,
          cardStyle: newHoverCard,
        });
      };
      const unhoverCard = () => {
        newHoverCard[newHoverCard.indexOf("translate(6%, -230%)")] = "translate(0%, 0%)";
        newHoverCard[newHoverCard.indexOf("translate(6%, -120%)")] = "translate(3%, -6%)";
        setTranslateList({
          ...translateList,
          cardStyle: newHoverCard,
        });
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
      <div className={classNames(style["title"], font2.className)}>
        {titleName}
      </div>
      <div className={classNames(style["text-container"], font3.className)}>
        {imgSrcList[currZIndexList.indexOf(3)].name}
        <div className={style["city"]}>
          <ButtonStyle2
            variant="contained"
            size="small"
            endIcon={<TravelExploreIcon />}
          >
            {imgSrcList[currZIndexList.indexOf(3)].city}
          </ButtonStyle2>
        </div>
      </div>
      <div
        className={style["image-container"]}
        style={{
          transform: !responsiveCond ? translateList["main"] : "translate(0,0)",
        }}
      >
        {imgSrcList.map((item, index) => (
          <Image
            key={index}
            src={item.src}
            alt={item.name}
            fill={true}
            sizes="90vw"
            style={{
              objectFit: "cover",
              objectPosition: "center",
              zIndex: currZIndexList[index],
            }}
            priority={true}
          />
        ))}

        <div
          className={style["place-list-view-container"]}
          id="placeListViewContainer"
        >
          {imgSrcList.map((item, index) => (
            <Ncard
              key={index}
              imgSrc={item.src}
              imgAlt={item.name}
              cardBodyHeading={responsiveCond ? item.name : ""}
              cardContainerClass={style["card-place-container-hero"]}
              cardHeaderClass={style["card-place-image-hero"]}
              cardImageSizes="20vw"
              cardBodyHeaderClass={
                responsiveCond
                  ? classNames(
                      style["card-place-heading-hero"],
                      font2.className
                    )
                  : ""
              }
              cardContainerStyle={{
                backgroundColor: item.color,
                transform: responsiveCond
                  ? translateList["cardStyle"][index]
                  : translateList["responsive"][index],
                zIndex: 100-currZIndexList[index],
              }}
              cardBodyHeaderStyle={
                responsiveCond ? { color: item.textColor } : {}
              }
            />
          ))}
        </div>
      </div>

      {heroPageTitle && (
        <div className={style["text-container-main"]}>
          <h1 className={classNames(style["heading-hero"], font2.className)}>
            {heroPageTitle}
          </h1>
          {heroPageSubTitle && (
            <p
              className={classNames(
                style["sub-heading-hero"],
                canada.className
              )}
            >
              {heroPageSubTitle}
            </p>
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
