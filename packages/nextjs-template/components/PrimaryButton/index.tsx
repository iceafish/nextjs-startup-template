"use client";

import { styled } from "@mui/material";
import { AsyncHoCLoadingButton } from "../Button";

export const PrimaryButton = styled(AsyncHoCLoadingButton)(({ theme }) => ({
  borderRadius: "50px",
  background: "#1A1A1A",
  color: "#FFFFFF",
  fontWeight: 400,
  fontSize: "18px",
  textTransform: "none",
  boxShadow: "none",

  "&:hover": {
    backgroundColor: "#3AC0A1",
    boxShadow: "none",
  },
  "&:active": {
    backgroundColor: "#32b093",
    boxShadow: "none",
  },
  "&:disabled": {
    color: "#CCC",
    backgroundColor: "#555555",
    boxShadow: "none",
  },
  "&.MuiButton-sizeLarge": {
    fontSize: "20px",
    minWidth: "224px",
    height: "52px",
  },
  "&.MuiButton-sizeSmall": {
    minWidth: "120px",
    height: "36px",
  },

  // loading
  "&.MuiLoadingButton-root.MuiLoadingButton-loading": {
    color: "transparent",
    background: "#1A1A1A",
  },
  "&.MuiLoadingButton-root.MuiLoadingButton-loading > .MuiLoadingButton-loadingIndicator":
    {
      color: "#FFF",
    },

  //success
  "&.MuiButton-textSuccess": {
    backgroundColor: "#3AC0A1 !important",
  },
}));

export const GreenButton = styled(AsyncHoCLoadingButton)(({ theme }) => ({
  minHeight: "40px",
  zIndex: 1,
  color: "#FFF",
  backgroundColor: "#3AC0A1",
  top: 0,
  bottom: 0,
  height: "auto",
  borderRadius: "24px",
  fontSize: "14px",
  fontWeight: 600,
  paddingLeft: "20px",
  paddingRight: "20px",
  textTransform: "none",
  "&:hover": {
    color: "#FFF",
    backgroundColor: "#4cceae",
  },
  "&:active": {
    color: "#FFF",
    backgroundColor: "#32b093",
  },
  "&:disabled": {
    color: "#A7A7A7",
    backgroundColor: "#DCDCDC",
  },
}));
