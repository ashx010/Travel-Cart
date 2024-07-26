import NavButton from "./NavButton.jsx";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";

export default function MobileNavLinks({ link1, link4, status }) {
  return (
    <>
      <li>
        <NavButton route="/" icon={HomeIcon}>
          {link1}
        </NavButton>
      </li>
      <li>
        <NavButton
          route="/dashboard"
          icon={DashboardIcon}
        >
          {link4}
        </NavButton>
      </li>
    </>
  );
}
