import { ButtonStyle4 } from "../all/styledButtons.jsx";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

export default function AuthButton({ status }) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  if (status === "authenticated") {
    return (
      <ButtonStyle4 onClick={handleSignOut} endIcon={<LogoutIcon />}>
        Sign Out
      </ButtonStyle4>
    );
  }

  return (
    <ButtonStyle4 onClick={() => router.push("/login")} endIcon={<LoginIcon />}>
      Sign In
    </ButtonStyle4>
  );
}
