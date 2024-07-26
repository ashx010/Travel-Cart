import { ButtonStyle3, ButtonStyle4 } from "../all/styledButtons.jsx";
import { useRouter } from "next/navigation";

export default function NavButton({
  children,
  route,
  icon: Icon,
  disabled = false,
  isDesktop = false,
}) {
  const router = useRouter();
  const Button = isDesktop ? ButtonStyle3 : ButtonStyle4;

  return (
    <Button
      onClick={() => router.push(route)}
      startIcon={<Icon />}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
