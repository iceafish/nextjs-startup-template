import { LoadingButton, type LoadingButtonProps } from "@mui/lab";
import { tryit } from "radash";
import { FC, useState } from "react";

export const AsyncHoCLoadingButton: FC<LoadingButtonProps> = ({
  children,
  loading,
  onClick,
  ...restProps
}) => {
  const [asyncLoading, setAsyncLoading] = useState(false);

  return (
    <LoadingButton
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
    </LoadingButton>
  );
};
