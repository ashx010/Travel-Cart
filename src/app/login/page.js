import React from "react";
import style from "./login.module.css";
import AuthComponent from "@/components/login/AuthComponent";
import Image from "next/image";
import { SessionWrapper } from "@/components/SessionWrapper";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Auth Page",
  description: "User Registeration to TCart",
};

export default async function login() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <div className={style.container}>
      <div className={style.imageContainer}>
        <Image
          src="/register_login/register.png"
          alt="Auth Image"
          fill={true}
          sizes="50vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            zIndex: 10,
          }}
          priority={true}
        />
      </div>
      <SessionWrapper>
        <AuthComponent />
      </SessionWrapper>
    </div>
  );
}
