'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ButtonStyle3 } from './all/styledButtons';
import LogoutIcon from '@mui/icons-material/Logout';

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <ButtonStyle3 onClick={handleSignOut} endIcon={<LogoutIcon />}>
      Sign Out
    </ButtonStyle3>
  );
}