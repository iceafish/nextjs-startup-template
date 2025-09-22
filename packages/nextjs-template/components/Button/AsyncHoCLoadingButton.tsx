import Button, { ButtonProps } from "@mui/material/Button";
import { tryit } from "radash";
import { FC, useState } from "react";

export const AsyncHoCLoadingButton: FC<ButtonProps> = ({
  children,
  loading,
  onClick,
  ...restProps
}) => {
  const [asyncLoading, setAsyncLoading] = useState(false);

  return (
    <Button
      {...restProps}
      loading={loading || asyncLoading}
      onClick={async (...args) => {
        if (!onClick) {
          return;
        }

        setAsyncLoading(true);
        await tryit(async () => onClick(...args))();
        setAsyncLoading(false);
      }}
    >
      {children}
    </Button>
  );
};
