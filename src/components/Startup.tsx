import { Button, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { PrimaryButton } from "./PrimaryButton";

export const Startup: FC = () => {
  return (
    <Paper>
      {"abcd"}
      <Button variant="contained">{"abcd"}</Button>
      <Typography>{"abcd"}</Typography>
      <PrimaryButton>Main</PrimaryButton>
    </Paper>
  );
};
