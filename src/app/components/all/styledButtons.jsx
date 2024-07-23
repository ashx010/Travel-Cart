"use client";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const ButtonStyle1 = styled(Button)({
  color: "#f1faee",
  backgroundColor: "#1d3557",
  "&:hover": {
    backgroundColor: "#a8dadc",
    color: "#1d3557",
  },
});
