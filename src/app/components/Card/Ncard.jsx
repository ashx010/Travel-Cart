"use client";
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import style from "./Ncard.module.css";
import { useEffect, useRef } from "react";
import { LTR, canada} from "../../fonts.js";

export default function Ncard({
  imgSrc = "",
  imgAlt = "",
  cardBodyHeading = "",
  cardBodyDesc = "",
  cardFooter = "",
  cardContainerClass = "",
  cardHeaderClass = "",
  cardImageClass = "",
  cardBodyHeaderClass = "",
  cardBodyDescClass = "",
  cardFooterClass = "",
  cardContainerStyle = {},
  cardHeaderStyle = {},
  cardImageStyle = {},
  cardBodyHeaderStyle = {},
  cardBodyDescStyle = {},
  cardFooterStyle = {},
  cardContainerId = "",
  apply3dEffect = false,
  applyTorchEffect = false
}) {
  const cref = useRef(null);
  const torchRef = useRef(null);

  useEffect(() => {
    if (!apply3dEffect || !applyTorchEffect) {
      return;
    }

    const handleMouseMove = (e) => {
      if (apply3dEffect && cref.current) {
        const cardRect = cref.current.getBoundingClientRect();
        const x = e.clientX - (cardRect.left + cardRect.width / 2);
        const y = e.clientY - (cardRect.top + cardRect.height / 2);
        const rotateX = y / (cardRect.height/2) * 5;
        const rotateY = x / (cardRect.width/2) * 10;
        cref.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) perspective(700px)`;
      }
      if(applyTorchEffect && torchRef.current){
        const torchRect = cref.current.getBoundingClientRect();
        const x = e.clientX - torchRect.left;
        const y = e.clientY - torchRect.top;
        torchRef.current.style.top = `${y}px`;
        torchRef.current.style.left = `${x}px`;    
      }
    };
    const handleMouseLeave = () => {
      if(apply3dEffect){
        cref.current.style.transform = `rotateX(0deg) rotateY(0deg) perspective(700px)`;
      }
      if(applyTorchEffect){
        torchRef.current.style.opacity = "0";
      }
    };

    const handleMouseEnter = () => {
      if(applyTorchEffect && torchRef.current){
        torchRef.current.style.opacity = '1';
      }
    };

    if (cref.current) {
      cref.current.addEventListener("mouseenter", handleMouseEnter);
      cref.current.addEventListener("mousemove", handleMouseMove);
      cref.current.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (cref.current) {
        cref.current.removeEventListener('mouseenter', handleMouseEnter);
        cref.current.removeEventListener("mousemove", handleMouseMove);
        cref.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [apply3dEffect, applyTorchEffect]);

  return (
    <div
      ref={cref}
      id={cardContainerId}
      style={{ ...cardContainerStyle}}
      className={classNames(style["cardParent"], cardContainerClass)}
    >
      {(cardHeaderClass || cardHeaderStyle || imgSrc) && (
        <div
          style={cardHeaderStyle}
          className={classNames(style["cardHeader"], cardHeaderClass)}
        >
          {imgSrc && (
            <img
              className={classNames(style["cardHeaderImg"], cardImageClass)}
              style={cardImageStyle}
              src={imgSrc}
              alt={imgAlt}
            />
          )}
        </div>
      )}
      {cardBodyHeading && (
        <div
          style={cardBodyHeaderStyle}
          className={classNames(style["cardBodyHeader"], canada.className, cardBodyHeaderClass)}
        >
          {cardBodyHeading}
        </div>
      )}
      {cardBodyDesc && (
        <div
          style={cardBodyDescStyle}
          className={classNames(style["cardBodyDesc"], LTR.className, cardBodyDescClass)}
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
            position: 'absolute',
            width: '150px',
            height: '150px',
            // background: 'radial-gradient(circle, #457B9Daa 0%, rgba(255,255,255,0) 100%)',
            background: "radial-gradient(circle, rgba(69,123,157,0.7), rgba(69,123,157,0) 80%)",
            pointerEvents: 'none',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.3s',
            opacity: 0,
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
  cardBodyDesc: PropTypes.node || PropTypes.string,
  cardFooter: PropTypes.node || PropTypes.string,
  cardContainerClass: PropTypes.string || PropTypes.arrayOf(PropTypes.string),
  cardHeaderClass: PropTypes.string || PropTypes.arrayOf(PropTypes.string),
  cardImageClass: PropTypes.string || PropTypes.arrayOf(PropTypes.string),
  cardBodyHeaderClass: PropTypes.string || PropTypes.arrayOf(PropTypes.string),
  cardBodyDescClass: PropTypes.string || PropTypes.arrayOf(PropTypes.string),
  cardFooterClass: PropTypes.string || PropTypes.arrayOf(PropTypes.string),
  cardContainerStyle: PropTypes.object,
  cardHeaderStyle: PropTypes.object,
  cardImageStyle: PropTypes.object,
  cardBodyHeaderStyle: PropTypes.object,
  cardBodyDescStyle: PropTypes.object,
  cardFooterStyle: PropTypes.object,
};
