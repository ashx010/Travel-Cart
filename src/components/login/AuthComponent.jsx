"use client";
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import style from "./AuthComponent.module.css";
import { font2 } from "@/app/fonts";
import classNames from "classnames";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  const switchForm = () => setIsLogin(!isLogin);

  return (
    <>
      <h1 className={classNames(style.titleHeading, font2.className)}>
        {isLogin ? "Login" : "Register"}
      </h1>
      {isLogin ? (
        <LoginForm switchForm={switchForm} />
      ) : (
        <RegisterForm switchForm={switchForm} />
      )}
    </>
  );
}
//"#06d6a0" : "#e63946"
