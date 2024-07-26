import NavButton from "./NavButton.jsx";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";

export default function DesktopNavLinks({ link1, link4 }) {
  return (
    <>
      <li>
        <NavButton isDesktop={true} route="/" icon={HomeIcon}>
          {link1}
        </NavButton>
      </li>
      <li>
        <NavButton isDesktop={true} route="/dashboard" icon={DashboardIcon}>
          {link4}
        </NavButton>
      </li>
    </>
  );
}
