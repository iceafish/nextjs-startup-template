"use client";

import { FC, PropsWithChildren } from "react";

import { SnackbarProvider } from "notistack";
import { DialogsProvider } from "@toolpad/core";
import { ConfirmProvider } from "material-ui-confirm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const ClientLayoutProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        maxSnack={3}
      >
        <DialogsProvider>
          <ConfirmProvider>{children}</ConfirmProvider>
        </DialogsProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
};
