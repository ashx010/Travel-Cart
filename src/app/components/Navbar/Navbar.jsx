"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import style from "./Navbar.module.css";
import MoreNav from "./MoreNav.jsx";
import DesktopNavLinks from "./DesktopNavLinks.jsx";
import MobileNavLinks from "./MobileNavLinks.jsx";
import AuthButton from "./AuthButton.jsx";
import NavButton from "./NavButton.jsx";
import InfoIcon from "@mui/icons-material/Info";
import ContactlessIcon from "@mui/icons-material/Contactless";

export default function MainNavbar({
  link1 = "Home",
  link2 = "About",
  link3 = "Contact",
  link4 = "Dashboard",
}) {
  const [isResponsive, setIsResponsive] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const navbar = document.querySelector(`.${style["navbar-c"]}`);
    navbar.style.opacity = status === "loading" ? 0 : 1;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth <= 850);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className={style["navbar-c"]}>
      <ul className={style["navbar-links-c"]}>
        {!isResponsive && <DesktopNavLinks link1={link1} link4={link4} />}
        <li>
          <MoreNav>
            {isResponsive && (
              <MobileNavLinks link1={link1} link4={link4} status={status} />
            )}
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
            <li>
              <AuthButton status={status} />
            </li>
          </MoreNav>
        </li>
      </ul>
    </nav>
  );
}
