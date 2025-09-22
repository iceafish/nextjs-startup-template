import { createContext, useContext } from "react";
import {
  DialogContextProps,
  DialogOptions,
} from "@/components/StyledDialog/useDialog/types";

export enum DialogType {
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
}

export const DialogContext = createContext<DialogContextProps>({
  showDialog: () => {
    throw Error("DialogContext not initialized");
  },
});

/**
 * 显示对话框并返回用户操作结果的 Promise
 * @example
 * const showDialog = useDialog();
 * const handleClick = async () => {
 *   const result = await showDialog({
 *     title: 'Confirm',
 *     content: 'Are you sure?',
 *     confirm: 'Yes',
 *     cancel: 'No',
 *     type: DialogType.INFO,
 *     closeable: true,
 *     onConfirm: () => Promise.resolve("data"),
 *   });
 *   console.log(result); // true or false
 */
export const useDialog = () => {
  return useContext(DialogContext) as {
    showDialog: <R1 = unknown, R2 = R1>(
      options: DialogOptions<R1, R2>,
    ) => Promise<R1 | R2>;
  };
};
