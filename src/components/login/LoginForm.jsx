"use client";
import React, { Suspense, useState } from "react";
import {
  TextField,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  IconButton,
  Button,
  Skeleton,
} from "@mui/material";
import {
  Public as PublicIcon,
  PublicOff as PublicOffIcon,
  AppRegistration as AppRegistrationIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import style from "./AuthComponent.module.css";
import { canada, LTR } from "@/app/fonts";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import { signIn } from "next-auth/react";

export default function LoginForm({ switchForm }) {
  const router = useRouter();

  const [formLoginData, setFormLoginData] = useState({
    email: "",
    password: "",
  });
  const [errorLogin, setErrorLogin] = useState({
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const [errorMessage, setErrorMessage] = useState("");
  const [errorStyleColor, setErrorStyleColor] = useState("#e63946");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocusError = (e) => {
    const { name } = e.target;
    setErrorLogin((prev) => ({ ...prev, [name]: false }));
  };

  const handleLoginEvent = async (e) => {
    e.preventDefault();

    let valid = true;
    const newError = {};

    for (const field in formLoginData) {
      if (formLoginData[field] === "") {
        newError[field] = true;
        valid = false;
      }
    }

    if (
      formLoginData.email &&
      !formLoginData.email.includes("@") &&
      !formLoginData.email.includes(".")
    ) {
      newError.email = true;
      valid = false;
    }

    setErrorLogin((prev) => ({ ...prev, ...newError }));
    if (!valid) return;

    // let result = handleLoginSubmit(formLoginData);

    try {
      let result = await signIn("credentials", {
        ...formLoginData,
        redirect: false,
      });
      if (result?.ok) {
        router.push("/dashboard");
      } else if (result?.error) {
        setErrorMessage(() => {
          setTimeout(() => setErrorMessage(""), 5000);
          setErrorLogin((prev) => ({ ...prev, email: true, password: true }));
          return "Invalid email or password";
        });
        setErrorLogin((prev) => ({ ...prev, [email]: true, [password]: true }));
      }
    } catch (error) {
      console.error("An unexpected error happened:", error);
      setErrorMessage(() => {
        setTimeout(() => setErrorMessage(""), 5000);
        return "An unexpected error happened";
      });
    }
  };

  const SubmitButton = styled(Button)({
    color: "#f1faee",
    backgroundColor: "#1d3557",
    fontFamily: canada.style.fontFamily,
    borderRadius: "2rem",
    padding: "0.3rem 1.5rem",
    border: "2px solid transparent",
    zIndex: 1000,
    "&:hover": {
      backgroundColor: "#1d3557",
      color: "#f1faee",
      border: "2px solid #f1faee",
    },
  });

  return (
    <form className={style.formContainer}>
      <Suspense fallback={<Skeleton />}>
        <TextField
          error={errorLogin.email}
          onFocus={handleFocusError}
          id="email"
          label="Email"
          variant="standard"
          name="email"
          type="email"
          value={formLoginData.email}
          onChange={handleChange}
          fullWidth
        />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <FormControl error={errorLogin.password} variant="standard" fullWidth>
          <InputLabel htmlFor="password">Enter Password</InputLabel>
          <Input
            id="password"
            label="Password"
            onFocus={handleFocusError}
            type={showPassword ? "text" : "password"}
            value={formLoginData.password}
            onChange={handleChange}
            name="password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <PublicIcon /> : <PublicOffIcon />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <div className={style.btnFieldGroup}>
          <SubmitButton
            type="submit"
            variant="contained"
            onClick={handleLoginEvent}
            endIcon={<AppRegistrationIcon />}
          >
            Login
          </SubmitButton>
          <p onClick={switchForm} className={style.loginLink}>
            Do not have an account? Register
          </p>
        </div>
      </Suspense>
      {errorMessage && (
        <h3
          className={classNames(style.errorAuth, LTR.className)}
          style={{ color: errorStyleColor }}
        >
          {errorMessage}
        </h3>
      )}
    </form>
  );
}
