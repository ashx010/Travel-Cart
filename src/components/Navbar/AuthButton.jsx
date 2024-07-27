import { ButtonStyle4 } from "../all/styledButtons.jsx";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

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
  }, [status]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  if (isAuthenticated) {
    return (
      <li>
        <ButtonStyle4 onClick={handleSignOut} endIcon={<LogoutIcon />}>
          Sign Out
        </ButtonStyle4>
      </li>
    );
  }

  return (
    <>
      <li>
        <ButtonStyle4
          onClick={() => router.push("/login")}
          endIcon={<LoginIcon />}
        >
          Sign In
        </ButtonStyle4>
      </li>
      <li>
        <ButtonStyle4
          onClick={() => router.push("/register")}
          icon={AppRegistrationIcon}
        >
          Register
        </ButtonStyle4>
      </li>
    </>
  );
}
