import { ButtonStyle3, ButtonStyle4 } from "../all/styledButtons.jsx";
import { useRouter } from "next/navigation";
import AutoModeIcon from '@mui/icons-material/AutoMode';
import classNames from "classnames";

export default function NavButton({
  children,
  route,
  icon: Icon = AutoModeIcon,
  disabled = false,
  style1 = false,
  customClass = "",
}) {
  const router = useRouter();
  const Button = style1 ? ButtonStyle3 : ButtonStyle4;

  return (
    <Button
      className={customClass}
      onClick={() => router.push(route)}
      startIcon={<Icon />}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
