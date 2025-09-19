"use client";
import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Typography from "@mui/material/Typography";
import { DialogContext, DialogType } from "./common";
import {
  ContextDialogOptions,
  ContextDialogOptionsMap,
  DialogOptions,
  DialogRenderProps,
} from "./types";
import { omit } from "radash";
import { entries } from "lodash-es";
import { StyledDialog } from "..";
import { PrimaryButton } from "@/components/PrimaryButton";

const DefaultRenderDialog = ({
  type,
  title,
  content: Content,
  closeable,
  cancel,
  confirm,
  isConfirmLoading,
  isCancelLoading,
  handleConfirm,
  handleCancel,
  handleReturn,
}: DialogRenderProps) => {
  return (
    <>
      {closeable !== false && (
        <IconButton
          aria-label="close"
          disabled={isConfirmLoading || isCancelLoading}
          onClick={handleCancel}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
      )}
      {(type || title) && (
        <DialogTitle
          id="alert-dialog-title"
          sx={(theme) => ({
            color: type
              ? {
                  [DialogType.SUCCESS]: theme.palette.success.main,
                  [DialogType.INFO]: theme.palette.info.main,
                  [DialogType.WARNING]: theme.palette.warning.main,
                  [DialogType.ERROR]: theme.palette.error.main,
                }[type]
              : theme.palette.text.primary,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            ".MuiSvgIcon-root": {
              fontSize: "3rem",
            },
          })}
        >
          {type &&
            {
              [DialogType.SUCCESS]: <CheckCircleOutlineIcon />,
              [DialogType.INFO]: <InfoOutlinedIcon />,
              [DialogType.WARNING]: <WarningAmberIcon />,
              [DialogType.ERROR]: <ErrorOutlineIcon />,
            }[type]}
          <Typography fontSize={{ xs: "1.6rem" }} fontWeight={600}>
            {title}
          </Typography>
        </DialogTitle>
      )}

      <DialogContent>
        {typeof Content === "function" ? (
          <Content onReturn={handleReturn} />
        ) : typeof Content === "string" ? (
          <DialogContentText id="alert-dialog-description">
            {Content}
          </DialogContentText>
        ) : (
          Content
        )}
      </DialogContent>

      {(confirm !== false || cancel !== false) && (
        <DialogActions
          sx={{ display: "flex", gap: 3, justifyContent: "center" }}
        >
          {cancel === false ? null : (
            <PrimaryButton
              variant="outlined"
              onClick={handleCancel}
              sx={{ flex: 1, backgroundColor: "#0D121C", px: 4 }}
              loading={isCancelLoading}
              disabled={isConfirmLoading}
            >
              {cancel || "Cancel"}
            </PrimaryButton>
          )}
          {confirm === false ? null : (
            <PrimaryButton
              variant="contained"
              onClick={handleConfirm}
              sx={{ flex: 1, backgroundColor: "#0D121C", px: 4 }}
              loading={isConfirmLoading}
              disabled={isCancelLoading}
            >
              {confirm || "Confirm"}
            </PrimaryButton>
          )}
        </DialogActions>
      )}
    </>
  );
};

const DialogOptionsRender: FC<
  ContextDialogOptions & { index: string; closeDialog: (index: string) => void }
> = ({ options, promiseExecutor, closeDialog, index }) => {
  const {
    open,
    title,
    content,
    closeable,
    cancel,
    confirm,
    type,
    onConfirm,
    onCancel,
    contentRender,
    ...restOptions
  } = options;

  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const [isCancelLoading, setIsCancelLoading] = useState(false);

  const handleConfirm = useCallback(async () => {
    setIsConfirmLoading(true);
    try {
      if (onConfirm) {
        const result = await onConfirm();
        // 调用 resolve 函数返回用户操作结果
        promiseExecutor[0](result);
      } else {
        promiseExecutor[0]();
      }
      closeDialog(index);
    } catch (error) {
      // 阻止弹窗关闭
    } finally {
      setIsConfirmLoading(false);
    }
  }, [closeDialog, index, onConfirm, promiseExecutor]);

  const handleCancel = useCallback(async () => {
    setIsCancelLoading(true);
    try {
      if (onCancel) {
        const result = await onCancel();
        promiseExecutor[1](result ?? "Dialog cancel");
      } else {
        promiseExecutor[1]("Dialog cancel");
      }
      closeDialog(index);
    } catch (error) {
      // 阻止弹窗关闭
    } finally {
      setIsCancelLoading(false);
    }
  }, [closeDialog, index, onCancel, promiseExecutor]);

  const handleReturn = useCallback(
    (result: unknown) => {
      closeDialog(index);
      promiseExecutor[0](result);
    },
    [closeDialog, index, promiseExecutor],
  );
  const DialogRender = contentRender || DefaultRenderDialog;
  return (
    <StyledDialog
      {...restOptions}
      PaperProps={{
        sx: {
          px: 4,
          py: 2,
        },
        ...restOptions.PaperProps,
      }}
      open={open}
      onClose={() => {
        if (closeable == false || isConfirmLoading || isCancelLoading) {
          return;
        }
        handleCancel();
      }}
    >
      <DialogRender
        type={type}
        title={title}
        content={content}
        closeable={closeable}
        cancel={cancel}
        confirm={confirm}
        isConfirmLoading={isConfirmLoading}
        isCancelLoading={isCancelLoading}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        handleReturn={handleReturn}
      />
    </StyledDialog>
  );
};

const DialogOptionsContext = createContext<
  [ContextDialogOptionsMap, Dispatch<SetStateAction<ContextDialogOptionsMap>>]
>([{}, () => {}]);

export const DialogRender: FC = () => {
  const [dialogOptionsMap, setDialogOptionsMap] =
    useContext(DialogOptionsContext);

  const closeDialog = useCallback(
    (index: string) => {
      setDialogOptionsMap((prevState) => ({
        ...prevState,
        [index]: {
          ...prevState[index],
          options: {
            ...prevState[index].options,
            open: false,
          },
        },
      }));
      setTimeout(() => {
        setDialogOptionsMap((prevState) => omit(prevState, [index]));
      }, 1000);
    },
    [setDialogOptionsMap],
  );

  return (
    <>
      {entries(dialogOptionsMap).map(([key, value]) => (
        <DialogOptionsRender
          key={key}
          options={value.options}
          promiseExecutor={value.promiseExecutor}
          index={key}
          closeDialog={closeDialog}
        />
      ))}
    </>
  );
};
let dialogIndex = 0;
export const DialogProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [dialogOptionsMap, setDialogOptionsMap] =
    useState<ContextDialogOptionsMap>({});

  const showDialog = useCallback((options: DialogOptions): Promise<unknown> => {
    const localDialogIndex = dialogIndex;
    dialogIndex++;

    const handleAbort = () => {
      setDialogOptionsMap((prevState) => {
        return omit(prevState, [`${localDialogIndex}`]);
      });
    };

    options?.signal?.addEventListener("abort", handleAbort);

    return new Promise((resolve, reject) => {
      setDialogOptionsMap((prevState) => ({
        ...prevState,
        [localDialogIndex]: {
          options: {
            ...options,
            open: true,
          },
          promiseExecutor: [resolve, reject],
        },
      }));
    });
  }, []);

  return (
    <DialogContext.Provider value={{ showDialog }}>
      <DialogOptionsContext.Provider
        value={[dialogOptionsMap, setDialogOptionsMap]}
      >
        {children}
      </DialogOptionsContext.Provider>
    </DialogContext.Provider>
  );
};

export const DialogAndSlotProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <DialogProvider>
      {children}
      <DialogRender />
    </DialogProvider>
  );
};
