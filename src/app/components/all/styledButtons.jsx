"use client";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { LTR, canada } from "../../fonts.js";

export const ButtonStyle1 = styled(Button)({
  color: "#f1faee",
  backgroundColor: "#1d3557",
  fontFamily: LTR.style.fontFamily,
  "&:hover": {
    backgroundColor: "#a8dadc",
    color: "#1d3557",
  },
});

export const ButtonStyle2 = styled(Button)({
  color: "#1d3557",
  backgroundColor: "#a8dadc",
  fontFamily: LTR.style.fontFamily,
  "&:hover": {
    backgroundColor: "#457b9d",
    color: "#f1faee",
  },
});

export const ButtonStyle3 = styled(Button)({
  color: "#1d3557",
  backgroundColor: "#f1faee",
  fontFamily: canada.style.fontFamily,
  borderRadius: "2rem",
  padding: "0.3rem 1.5rem",
  border: "2px solid transparent",
  zIndex: 1000,
  "&:hover": {
    backgroundColor: "#80808066",
    color: "#f1faee",
    border: "2px solid #f1faee",
  },
});

export const ButtonStyle4 = styled(Button)({
  color: "#f1faee",
  backgroundColor: "#1d3557",
  fontFamily: canada.style.fontFamily,
  borderRadius: "2rem",
  padding: "0.3rem 1.5rem",
  border: "2px solid transparent",
  zIndex: 1000,
  "&:hover": {
    backgroundColor: "#a8dadc",
    color: "#1d3557",
    border: "2px solid #1d3557",
  },
});