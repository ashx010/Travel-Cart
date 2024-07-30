"use client";
import { ButtonStyle4 } from "@/components/all/styledButtons";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const handleSignOut = async () => {
    signOut();
  }
  return (
    <>
      <div>
        <p>Welcome, {session?.user.name}</p>
        <p>Email: {session?.user.email}</p>
      </div>
      <ButtonStyle4
        onClick={handleSignOut}
      >
        Sign out
      </ButtonStyle4>
    </>
  );
}
