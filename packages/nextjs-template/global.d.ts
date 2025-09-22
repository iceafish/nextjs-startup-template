declare module "jazzicon" {
  function jz(diameter: number, seed: number): HTMLElement;

  export = jz;
}

export declare global {
  declare type TypedString<T> = string & { __type__?: T };

  declare type URLLink = string;

  declare type NumberStr = string;
  declare type DateStr = `${number}-${number}-${number}`;
  declare type DateTimeStr =
    `${number}-${number}-${number} ${number}:${number}:${number}`;
  declare type JSONStr = string;

  declare type EvmAddress = `0x${string}`;

  interface Window {
    __trustgo_api__?: {
      isWalletConnected?: boolean;
      connecting?: boolean;
      disconnect?: () => void;
    };

    turnstile?: {
      render: (
        containerId: string,
        config: {
          sitekey: string;
          theme?: "light" | "dark";
          callback: (token: string) => void;
        }
      ) => void;
    };
  }
}
