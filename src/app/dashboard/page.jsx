'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import SignOutButton from '../components/SignOutButton';

export default function Dashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  });

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user.name}</p>
      <p>Username: {session.user.username}</p>
      <p>Email: {session.user.email}</p>
      <p>Vendor Status: {session.user.isVendor ? 'Vendor' : 'Not a Vendor'}</p>
      <p>Verification Status: {session.user.isVerified ? 'Verified' : 'Not Verified'}</p>
      <SignOutButton />
    </div>
  );
}