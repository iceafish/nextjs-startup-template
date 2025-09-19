import { DialogProps } from "@mui/material";
import { ComponentType, ReactNode } from "react";
import { DialogType } from "./common";

export type DialogOptions<R1 = unknown, R2 = R1> = Omit<
  DialogProps,
  "title" | "open" | "content" | "children"
> & {
  type?: DialogType;
  title?: string;
  content:
    | ReactNode
    | ComponentType<{
        onReturn: (result: R1 | R2) => void;
      }>;
  confirm?: string | false;
  cancel?: string | false;
  closeable?: boolean;
  onConfirm?: () => Promise<R1> | R1;
  onCancel?: () => Promise<R2> | R2;
  contentRender?: (props: DialogRenderProps) => ReactNode | undefined;
  signal?: AbortSignal;
};

export type DialogContextProps = {
  showDialog: (options: DialogOptions) => Promise<unknown>;
};

export type DialogRenderProps = Omit<
  DialogOptions,
  "onConfirm" | "onCancel"
> & {
  isConfirmLoading: boolean;
  isCancelLoading: boolean;
  handleCancel: () => void;
  handleConfirm: () => void;
  handleReturn: (result: unknown) => void;
};

export type ContextDialogOptions = {
  options: DialogOptions & { open: boolean };
  promiseExecutor: [
    resolve: (value?: unknown | PromiseLike<unknown>) => void,
    reject: (reason?: unknown) => void,
  ];
};

export type ContextDialogOptionsMap = Record<string, ContextDialogOptions>;
