'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ButtonStyle4 } from '../components/all/styledButtons';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }
  else if (status === 'unauthenticated') {
    return(
      <div>
        <p>You need to be signed in to access this page.</p>
        <ButtonStyle4 onClick={() => router.push("/login")}>Sign in</ButtonStyle4>
      </div>
    )
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user.name}</p>
      <p>Username: {session.user.username}</p>
      <p>Email: {session.user.email}</p>
      <p>Vendor Status: {session.user.isVendor ? 'Vendor' : 'Not a Vendor'}</p>
      <p>Verification Status: {session.user.isVerified ? 'Verified' : 'Not Verified'}</p>
    </div>
  );
}