"use client"; 
import "./Navbar.css";
import PropTypes from "prop-types";

export default function Navbar({
  titleName = "Navbar",
  link1 = "Home",
  link2 = "About",
  link3 = "Contact",
  link4 = "Login",
}) {
  return (
    <nav className="navbar-c">
      <li className="title">
        <a href="/">{titleName}</a>
      </li>
      <ul className="navbar-links-c">
        <li>
          <a href="/">{link1}</a>
        </li>
        <li>
          <a href="/">{link2}</a>
        </li>
        <li>
          <a href="/">{link3}</a>
        </li>
        <li>
          <a href="/">{link4}</a>
        </li>
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  titleName: PropTypes.string.isRequired,
  link1: PropTypes.string,
  link2: PropTypes.string,
  link3: PropTypes.string,
  link4: PropTypes.string,
};
