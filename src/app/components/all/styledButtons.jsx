"use client";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { LTR } from "../../fonts.js";

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
