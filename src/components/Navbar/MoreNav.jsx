import React, { useEffect, useRef } from "react";
import { ButtonStyle3 } from "../all/styledButtons.jsx";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import style from "./Navbar.module.css";

export default function MoreNav({ children }) {
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const handleMenuBtn = () => {
    dropdownRef.current.classList.toggle(style["show"]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        dropdownRef.current.classList.remove(style["show"]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <ButtonStyle3 
        onClick={handleMenuBtn} 
        endIcon={<UnfoldMoreIcon />}
        className={style["responsive-btn"]}
        ref={buttonRef}
      >
        Menu
      </ButtonStyle3>
      <div className={style["more-dropdown"]} ref={dropdownRef}>
        <ul>{children}</ul>
      </div>
    </>
  );
}