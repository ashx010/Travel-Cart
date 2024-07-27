"use client";
import style from "./Navbar.module.css";
import MoreNav from "./MoreNav.jsx";
import AuthButton from "./AuthButton.jsx";
import NavButton from "./NavButton.jsx";
import InfoIcon from "@mui/icons-material/Info";
import ContactlessIcon from "@mui/icons-material/Contactless";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { SessionWrapper } from "../SessionWrapper.jsx";

export default function MainNavbar({
  link1 = "Home",
  link2 = "About",
  link3 = "Contact",
  link4 = "Dashboard",
}) {
  return (
    <nav className={style["navbar-c"]}>
      <ul className={style["navbar-links-c"]}>
        <li>
          <NavButton
            customClass={style["responsive-btn"]}
            style1={true}
            route="/"
            icon={HomeIcon}
          >
            {link1}
          </NavButton>
        </li>
        <li>
          <NavButton
            customClass={style["responsive-btn"]}
            style1={true}
            route="/dashboard"
            icon={DashboardIcon}
          >
            {link4}
          </NavButton>
        </li>
        <li>
          <MoreNav>
            <li>
              <NavButton route="/about" icon={InfoIcon}>
                {link2}
              </NavButton>
            </li>
            <li>
              <NavButton route="/contact" icon={ContactlessIcon}>
                {link3}
              </NavButton>
            </li>
            <SessionWrapper>
              <AuthButton />
            </SessionWrapper>
          </MoreNav>
        </li>
      </ul>
    </nav>
  );
}
