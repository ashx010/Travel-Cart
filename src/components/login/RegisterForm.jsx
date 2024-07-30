"use client";
import React, { useState } from "react";
import {
  TextField,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import {
  Public as PublicIcon,
  PublicOff as PublicOffIcon,
  AppRegistration as AppRegistrationIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { handleRegisterSubmit } from "@/lib/action";
import style from "./AuthComponent.module.css";
import { canada, LTR } from "@/app/fonts";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import LinearProgress, {linearProgressClasses} from "@mui/material/LinearProgress";

export default function RegisterForm({ switchForm }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    repassword: "",
    country: "India",
    contactNumber: "",
    address: "",
  });

  const [error, setError] = useState({
    name: false,
    username: false,
    email: false,
    password: false,
    repassword: false,
    country: false,
    contactNumber: false,
    address: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorStyleColor, setErrorStyleColor] = useState("#e63946");
  const [progressState, setProgressState] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocusError = (e) => {
    const { name } = e.target;
    setError((prev) => ({ ...prev, [name]: false }));
  };

  const handleRegisterEvent = async (e) => {
    e.preventDefault();
    let valid = true;
    const newError = {};
    setProgressState(true);

    if (formData.password !== formData.repassword) {
      newError.password = true;
      newError.repassword = true;
      valid = false;
    }

    for (const field in formData) {
      if (formData[field] === "") {
        newError[field] = true;
        valid = false;
      }
    }

    setError((prev) => ({ ...prev, ...newError }));
    if (!valid) return;

    let result = await handleRegisterSubmit(formData);
    if (result.result === "failed") {
      setErrorMessage("Failed to register");
      setProgressState(false);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } else if (result.result === "success") {
      setErrorMessage("Register Success, Redirecting to Login Page");
      setErrorStyleColor("#06d6a0");
      setTimeout(() => {
        setErrorMessage("");
        setErrorStyleColor("#e63946");
        setProgressState(false);
        switchForm();
      }, 1000);
    } else if(result.result === "required"){
      setErrorMessage("Please fill all the fields");
      setProgressState(false);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } else if(result.result === "user_exists"){
      setErrorMessage("User already exists");
      setProgressState(false);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } else {
      setErrorMessage("Something went wrong");
      setProgressState(false);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
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

  const CustomLinearProgress = styled(LinearProgress)(() => ({
    height: 5,
    width: "100%",
    borderRadius: "50%",
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: '#457B9D',
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: "50%",
      backgroundColor: '#1d3557',
    },
  }));

  return (
    <form className={style.formContainer} onSubmit={handleRegisterEvent}>
      {progressState && <CustomLinearProgress />}
      <div className={style.formFieldGroup}>
        <TextField
          error={error.name}
          onFocus={handleFocusError}
          id="name"
          label="Name"
          variant="standard"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          error={error.username}
          onFocus={handleFocusError}
          id="username"
          label="Username"
          variant="standard"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
        />
      </div>
      <TextField
        error={error.email}
        onFocus={handleFocusError}
        id="email"
        label="Email"
        variant="standard"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
      />
      <div className={style.formFieldGroup}>
        <FormControl error={error.password} variant="standard" fullWidth>
          <InputLabel htmlFor="password">Enter Password</InputLabel>
          <Input
            id="password"
            label="Password"
            onFocus={handleFocusError}
            type={showPassword ? "text" : "password"}
            value={formData.password}
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
        <FormControl error={error.repassword} variant="standard" fullWidth>
          <InputLabel htmlFor="repassword">Enter Password Again</InputLabel>
          <Input
            id="repassword"
            label="Password Again"
            onFocus={handleFocusError}
            type={showPassword ? "text" : "password"}
            value={formData.repassword}
            onChange={handleChange}
            name="repassword"
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
      </div>
      <TextField
        error={error.address}
        onFocus={handleFocusError}
        id="address"
        label="Address"
        variant="standard"
        name="address"
        value={formData.address}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        error={error.contactNumber}
        onFocus={handleFocusError}
        id="contactNumber"
        label="Contact Number"
        variant="standard"
        name="contactNumber"
        value={formData.contactNumber}
        onChange={handleChange}
        fullWidth
      />
      <div className={style.btnFieldGroup}>
        <SubmitButton
          type="submit"
          variant="contained"
          endIcon={<AppRegistrationIcon />}
        >
          Register
        </SubmitButton>
        <p onClick={switchForm} className={style.loginLink}>
          Already have an account? Login
        </p>
      </div>
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
