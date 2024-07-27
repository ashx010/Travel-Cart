"use client";
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import style from "./Ncard.module.css";
import { useState, useEffect, useRef } from "react";
import { LTR, canada } from "@/app/fonts.js";
import Image from "next/image";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

export default function Ncard({
  imgSrc = "",
  imgAlt = "",
  cardBodyHeading = "",
  cardBodyDesc = "",
  cardFooter = "",
  cardContainerClass = "",
  cardHeaderClass = "",
  cardBodyHeaderClass = "",
  cardBodyDescClass = "",
  cardFooterClass = "",
  cardContainerStyle = {},
  cardHeaderStyle = {},
  cardImageClass = "",
  cardBodyHeaderStyle = {},
  cardBodyDescStyle = {},
  cardFooterStyle = {},
  cardContainerId = "",
  cardImageSizes = "33vw",
  apply3dEffect = false,
  applyTorchEffect = false,
  applyImgHover1Class = "",
  applyImgHover2Class = "",
  applyImgHover1ImgSrc = "",
  applyImgHover2ImgSrc = "",
  applyImgHover1Sizes = "33vw",
  applyImgHover2Sizes = "33vw",
  applyHeaderFullWidth = false,
}) {
  const cref = useRef(null);
  const torchRef = useRef(null);
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [fullWidthActive, setFullWidthActive] = useState("");
  const [isResposive, setIsResponsive] = useState(false);

  const handleHeaderFullWidth = () => {
    setIsFullWidth(!isFullWidth);
    if (!fullWidthActive) {
      setFullWidthActive(style["active-full-width"]);
    } else {
      setFullWidthActive("");
    }
  };

  useEffect(() => {
    if(window.innerWidth <= 500) {
      setIsResponsive(true);
    }else {
      setIsResponsive(false);
    }
  }, [isResposive]);

  useEffect(() => {
    if (!apply3dEffect || !applyTorchEffect) {
      return;
    }

    const handleMouseMove = (e) => {
      if (apply3dEffect && cref.current) {
        const cardRect = cref.current.getBoundingClientRect();
        const x = e.clientX - (cardRect.left + cardRect.width / 2);
        const y = e.clientY - (cardRect.top + cardRect.height / 2);
        const rotateX = (y / (cardRect.height / 2)) * 5;
        const rotateY = (x / (cardRect.width / 2)) * 10;
        cref.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) perspective(700px)`;
      }
      if (applyTorchEffect && torchRef.current) {
        const torchRect = cref.current.getBoundingClientRect();
        const x = e.clientX - torchRect.left;
        const y = e.clientY - torchRect.top;
        torchRef.current.style.top = `${y}px`;
        torchRef.current.style.left = `${x}px`;
      }
    };
    const handleMouseLeave = () => {
      if (apply3dEffect) {
        cref.current.style.transform = `rotateX(0deg) rotateY(0deg) perspective(700px)`;
      }
      if (applyTorchEffect) {
        torchRef.current.style.opacity = "0";
      }
    };

    const handleMouseEnter = () => {
      if (applyTorchEffect && torchRef.current) {
        torchRef.current.style.opacity = "1";
      }
    };

    if (cref.current) {
      if(torchRef.current) {
        cref.current.addEventListener("mouseenter", handleMouseEnter);
      }
      cref.current.addEventListener("mousemove", handleMouseMove);
      cref.current.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (cref.current) {
        if(torchRef.current) {
          cref.current.removeEventListener("mouseenter", handleMouseEnter);
        }
        cref.current.removeEventListener("mousemove", handleMouseMove);
        cref.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [apply3dEffect, applyTorchEffect]);

  return (
    <div
      ref={cref}
      id={cardContainerId}
      style={{ ...cardContainerStyle }}
      className={classNames(style["cardParent"], cardContainerClass)}
    >
      {(cardHeaderClass || cardHeaderStyle || imgSrc) && (
        <div
          style={cardHeaderStyle}
          className={classNames(style["cardHeader"], fullWidthActive, cardHeaderClass)}
        >
          {!isResposive && applyHeaderFullWidth && (
            !isFullWidth ? (
              <FullscreenIcon
                style={{
                  position: "absolute",
                  top: "0.5rem",
                  right: "0.5rem",
                  cursor: "pointer",
                  zIndex: 150,
                }}
                onClick={handleHeaderFullWidth}
                size="small"
              />
            ) : (
              <FullscreenExitIcon
                style={{
                  position: "absolute",
                  top: "0.5rem",
                  right: "0.5rem",
                  cursor: "pointer",
                  zIndex: 150,
                }}
                onClick={handleHeaderFullWidth}
                size="small"
              />
            )
          )}

          {applyImgHover1Class && (
            <div className={classNames(style["imgHoverEffect1"], ...applyImgHover1Class)}>
              <Image
                src={applyImgHover1ImgSrc}
                alt="image-hover-1"
                fill={true}
                style={{objectFit: "cover", objectPosition: "center"}}
                sizes={applyImgHover1Sizes}
                priority={false}
              />
            </div>
          )}
          {imgSrc && (
            <Image
              src={imgSrc}
              alt={imgAlt}
              fill={true}
              sizes={cardImageSizes}
              style={{objectFit: "cover", objectPosition: "center", cursor: !isResposive && applyHeaderFullWidth ? "pointer" : "default"}}
              className={classNames(style["cardImage"], cardImageClass)}
              priority={true}
              onClick={!isResposive && applyHeaderFullWidth ? handleHeaderFullWidth : null}
            />
          )}
          {applyImgHover2Class && (
            <div className={classNames(style["imgHoverEffect2"], applyImgHover2Class)}>
              <Image
                src={applyImgHover2ImgSrc}
                alt="image-hover-2"
                fill={true}
                sizes={applyImgHover2Sizes}
                style={{objectFit: "cover", objectPosition: "center"}}
                priority={false}
              />
            </div>
          )}
        </div>
      )}
      {cardBodyHeading && (
        <div
          style={cardBodyHeaderStyle}
          className={classNames(
            style["cardBodyHeader"],
            canada.className,
            cardBodyHeaderClass
          )}
        >
          {cardBodyHeading}
        </div>
      )}
      {cardBodyDesc && (
        <div
          style={cardBodyDescStyle}
          className={classNames(
            style["cardBodyDesc"],
            LTR.className,
            cardBodyDescClass
          )}
        >
          {cardBodyDesc}
        </div>
      )}
      {cardFooter && (
        <div
          style={cardFooterStyle}
          className={classNames(style["cardFooter"], cardFooterClass)}
        >
          {cardFooter}
        </div>
      )}
      {applyTorchEffect && (
        <div
          ref={torchRef}
          style={{
            position: "absolute",
            width: "100%",
            aspectRatio: 1,
            background:
              "radial-gradient(circle, rgba(168, 218, 220, 0.7) 0%, rgba(168, 218, 220, 0) 70%)",
            pointerEvents: "none",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            transition: "opacity 0.3s",
            opacity: 0,
            zIndex: -1,
          }}
        />
      )}
    </div>
  );
}

Ncard.propTypes = {
  cardContainerWidth: PropTypes.string,
  imgSrc: PropTypes.string,
  imgAlt: PropTypes.string,
  cardBodyHeading: PropTypes.node || PropTypes.string,
  cardBodyDesc: PropTypes.any,
  cardFooter: PropTypes.node || PropTypes.string,
  cardContainerClass: PropTypes.string || PropTypes.arrayOf(PropTypes.string),
  cardHeaderClass: PropTypes.string || PropTypes.arrayOf(PropTypes.string),
  cardBodyHeaderClass: PropTypes.string || PropTypes.arrayOf(PropTypes.string),
  cardBodyDescClass: PropTypes.string || PropTypes.arrayOf(PropTypes.string),
  cardFooterClass: PropTypes.string || PropTypes.arrayOf(PropTypes.string),
  cardContainerStyle: PropTypes.object,
  cardHeaderStyle: PropTypes.object,
  cardBodyHeaderStyle: PropTypes.object,
  cardImageClass: PropTypes.string || PropTypes.arrayOf(PropTypes.string),
  cardBodyDescStyle: PropTypes.object,
  cardFooterStyle: PropTypes.object,
  cardContainerId: PropTypes.string,
  apply3dEffect: PropTypes.bool,
  applyTorchEffect: PropTypes.bool,
  applyImgHover1Class: PropTypes.string || PropTypes.arrayOf(PropTypes.string),
  applyImgHover2Class: PropTypes.string || PropTypes.arrayOf(PropTypes.string),
  applyImgHover1ImgSrc: PropTypes.string,
  applyImgHover2ImgSrc: PropTypes.string,
};
