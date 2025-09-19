"use client";

import { FC, PropsWithChildren } from "react";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  DialogProvider,
  DialogRender,
} from "@/components/StyledDialog/useDialog/provider";

const queryClient = new QueryClient();

export const ClientLayoutProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        maxSnack={3}
      >
        <DialogProvider>
          {children}
          <DialogRender />
        </DialogProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
};
