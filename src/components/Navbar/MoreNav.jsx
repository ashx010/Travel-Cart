"use client";
import React, { useEffect, useRef } from "react";
import { ButtonStyle3, ButtonStyle4 } from "../all/styledButtons.jsx";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import style from "./Navbar.module.css";
import NavButton from "./NavButton.jsx";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function MoreNav({ styleCustom=false, children }) {
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const handleMenuBtn = () => {
    dropdownRef.current.classList.toggle(style["show"]);
    document.getElementById("navbar-c").classList.toggle(style["navbar-c-show"]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        dropdownRef.current.classList.remove(style["show"]);
        document.getElementById("navbar-c").classList.remove(style["navbar-c-show"]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const ButtonCustom = styleCustom ? ButtonStyle4 : ButtonStyle3;

  return (
    <>
      <ButtonCustom
        onClick={handleMenuBtn}
        endIcon={<UnfoldMoreIcon />}
        className={style["responsive-btn"]}
        ref={buttonRef}
      >
        Menu
      </ButtonCustom>
      <div className={ !styleCustom ? style["more-dropdown"] : style["more-dropdown-custom"]} ref={dropdownRef}>
        <ul>
          {children}
          <li>
            <NavButton style1={!styleCustom ? false : true} route="/dashboard" icon={AccountCircleIcon}>
              Profile
            </NavButton>
          </li>
        </ul>
      </div>
    </>
  );
}
