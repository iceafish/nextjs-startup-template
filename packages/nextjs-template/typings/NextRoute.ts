export type CommonRouteProps = {
  params: {
    locale: "en" | "zh";
    s: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type CommonAppRouteProps = {
  params: {
    locale: "en" | "zh";
    s: string;
    id?: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};
