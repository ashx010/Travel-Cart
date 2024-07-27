import { ButtonStyle4 } from "../all/styledButtons.jsx";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


export default function AuthButton() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }
  , [status]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  if (isAuthenticated) {
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
