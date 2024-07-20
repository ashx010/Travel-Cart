"use client"; 
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import "./HeroPage.css";
import Ncard from "../Card/Ncard";

export default function HeroPage({
  heroPageTitle = "TBOOK",
  heroPageSubTitle = `"Explore the World's Wonders - Tailored Just for You"`,
  imgSrcList = [
    {
      itemNo: 1,
      name: "USA",
      city: "New York",
      src: "/usa_newyork.jpeg",
      color: "#A8DADC",
      textColor: "black",
    },
    {
      itemNo: 2,
      name: "China",
      city: "Shanghai",
      src: "/china_shanghai.jpeg",
      color: "#457B9D",
      textColor: "black",
    },
    {
      itemNo: 3,
      name: "Japan",
      city: "Tokyo",
      src: "/Japan_tokyo.jpeg",
      color: "#1D3557",
      textColor: "white",
    },
  ],
}) {
  const [currImgSrcList, setCurrImgSrcList] = useState(imgSrcList);
  const [translateXProp, setTranslateXProp] = useState("translateX(0)");
  const [translateMainProp, setTranslateMainProp] = useState("translate(0,0)");
  const [translateYProp, setTranslateYProp] = useState("translate(0%, 0%)");
  const [cardTwoStyleHover, setTwoCardStyleHover] = useState("translate(3%, -6%)");
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
    <div className="hero-container">
      <div className="text-container">
        {currImgSrcList[0].name}
        <div className="city">
          <button className="explore-button">{currImgSrcList[0].city}</button>
        </div>
      </div>
      <div
        className="image-container"
        style={{
          background: `url(${currImgSrcList[0].src}) no-repeat center / cover`,
          transform: !responsiveCond ? translateMainProp : "none",
        }}
      >
        {responsiveCond && (
          <div
            className="place-list-view-container"
            id="placeListViewContainer"
          >
            <Ncard
              imgSrc={currImgSrcList[0].src}
              imgAlt={currImgSrcList[0].name}
              cardBodyHeading={currImgSrcList[0].name}
              cardContainerClass={["card-place-container-hero"]}
              cardImageClass={["card-place-image-hero"]}
              cardBodyHeaderClass={["card-place-heading-hero"]}
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
              cardContainerClass={["card-place-container-hero"]}
              cardImageClass={["card-place-image-hero"]}
              cardBodyHeaderClass={["card-place-heading-hero"]}
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
              cardContainerClass={["card-place-container-hero"]}
              cardImageClass={["card-place-image-hero"]}
              cardBodyHeaderClass={["card-place-heading-hero"]}
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
        <div className="place-list-view-container" id="placeListViewContainer">
          <Ncard
            imgSrc={currImgSrcList[1].src}
            imgAlt={currImgSrcList[1].name}
            cardContainerClass={["card-place-container-hero"]}
            cardImageClass={["card-place-image-hero"]}
            cardContainerStyle={{
              backgroundColor: currImgSrcList[1].color,
              transform: translateYProp,
            }}
          />
          <Ncard
            imgSrc={currImgSrcList[2].src}
            imgAlt={currImgSrcList[2].name}
            cardContainerClass={["card-place-container-hero"]}
            cardImageClass={["card-place-image-hero"]}
            cardContainerStyle={{
              backgroundColor: currImgSrcList[2].color,
              transform: translateXProp,
            }}
          />
          <Ncard
            imgSrc={currImgSrcList[0].src}
            imgAlt={currImgSrcList[0].name}
            cardContainerClass={["card-place-container-hero"]}
            cardImageClass={["card-place-image-hero"]}
            cardContainerStyle={{
              backgroundColor: currImgSrcList[0].color,
              transform: translateXProp,
            }}
          />
        </div>
      )}
      {heroPageTitle && (
        <div className="text-container-main">
          <h1 className="heading-hero">{heroPageTitle}</h1>
          {heroPageSubTitle && (
            <p className="sub-heading-hero">{heroPageSubTitle}</p>
          )}
          <div className="subscribe-container-hero-main">
            <input
              type="text"
              name="email-hero-subscriber"
              className="subscribe-input-hero"
              placeholder="Enter your email address"
            />
            <button className="subscribe-button-hero">Newsletter</button>
          </div>
        </div>
      )}
    </div>
  );
}
