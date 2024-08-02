"use client";
import style from "./Navbar.module.css";
import MoreNav from "./MoreNav.jsx";
import NavButton from "./NavButton.jsx";
import InfoIcon from "@mui/icons-material/Info";
import ContactlessIcon from "@mui/icons-material/Contactless";
import HomeIcon from "@mui/icons-material/Home";

export default function MainNavbar({styleChange=false}) {
  return (
    <nav className={style["navbar-c"]}>
      <ul className={style["navbar-links-c"]}>
        <li>
          <NavButton
            customClass={style["responsive-btn"]}
            style1={styleChange ? false : true}
            route="/"
            icon={HomeIcon}
          >
            Home
          </NavButton>
        </li>
        <li>
          <MoreNav styleCustom={styleChange}>
            <li>
              <NavButton style1={styleChange ? true : false} route="/about" icon={InfoIcon}>
                About
              </NavButton>
            </li>
            <li>
              <NavButton style1={styleChange ? true : false} route="/contact" icon={ContactlessIcon}>
                Contact
              </NavButton>
            </li>
          </MoreNav>
        </li>
      </ul>
    </nav>
  );
}
