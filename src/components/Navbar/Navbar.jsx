"use client";
import style from "./Navbar.module.css";
import MoreNav from "./MoreNav.jsx";
import NavButton from "./NavButton.jsx";
import InfoIcon from "@mui/icons-material/Info";
import ContactlessIcon from "@mui/icons-material/Contactless";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LoginIcon from "@mui/icons-material/Login";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function MainNavbar({
  link1 = "Home",
  link2 = "About",
  link3 = "Contact",
  link4 = "Dashboard",
}) {
  const { data: session, status } = useSession();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session){
      setIsAuthenticated(true);
    }else{
      setIsAuthenticated(false);
    }
  })

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
            {!isAuthenticated ? (
              <li>
                <NavButton route="/login" icon={LoginIcon}>
                  Sign In
                </NavButton>
              </li>
            ) : (
              <li>
                <NavButton
                  customClass={style["responsive-btn"]}
                  route="/dashboard"
                  icon={DashboardIcon}
                >
                  {link4}
                </NavButton>
              </li>
            )}
          </MoreNav>
        </li>
      </ul>
    </nav>
  );
}
