/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosInstance } from "axios";
import { isEmpty, isObject, isString, omitBy, values } from "lodash-es";
import { BaseResponse } from "@/typings/api";

import { FetchIdentity } from "./base";
import { server } from "./resources";
import { isArray } from "radash";

const NoAuthResourceIndex: string[] = <string[]>values(server)
  .map((biz) =>
    values(biz).map((it) => {
      if (isString(it)) {
        return null;
      }
      if (it.noAuth === true) {
        return <string>it.uri;
      }
    })
  )
  .flat()
  .filter(Boolean);

const instance = axios.create({
  // baseURL: HOST_PREFIX,
  // headers: {
  //   "Content-Type": "application/json",
  //   Version: GRAY_HEADER,
  // },
});

instance.interceptors.request.use(
  (config) => {
    if (
      NoAuthResourceIndex.includes(config.url!) ||
      NoAuthResourceIndex.some((it) => config.url?.endsWith(it))
    ) {
      return config;
    }

    // const specAuthToken = config.params?.__auth_token;

    // if (specAuthToken) {
    //   config.params = omit(config.params, ["__auth_token"]);
    // }

    // // TODO Opt 这里读取 cookie 可以考虑缓存优化，实现前不重新请求
    // const token = specAuthToken ?? getAuthenticationToken();

    // if (!token) {
    //   return Promise.reject();
    // }

    // if (config.headers) {
    //   config.headers["Authorization"] = `TOKEN ${token}`;
    // } else {
    //   config.headers = {
    //     Authorization: `TOKEN ${token ?? ""}`,
    //   } as any;
    // }

    if (config.url?.startsWith("http") || config.url?.startsWith("/api/")) {
      config.baseURL = undefined;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const responseData = response.data ?? {};

    if (
      responseData.success &&
      isObject(responseData.data) &&
      isEmpty(responseData.data)
    ) {
      return {
        ...responseData,
        data: null,
      };
    }

    return responseData;
  },
  async (error) => {
    console.error(error);
    const originalConfig = error.config;

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // if (error.response.status === 401) {
    //   try {
    //     const authToken = originalConfig.headers["Authorization"];
    //     const authTokenValue = authToken?.split(" ")[1];

    //     if (authTokenValue !== getAuthenticationToken()) {
    //       const authInfoMap = getAuthenticationTokenMap();

    //       Object.values(authInfoMap).forEach((it) => {
    //         if (it.accessToken === authTokenValue) {
    //           delete authInfoMap[it.address];
    //         }
    //       });

    //       setAuthenticationTokenMap(authInfoMap);

    //       return;
    //     }

    //     if (
    //       window?.__trustgo_api__?.connecting === false &&
    //       window.__trustgo_api__.isWalletConnected
    //     ) {
    //       window?.__trustgo_api__?.disconnect?.();
    //     }
    //   } catch (_error) {
    //     return Promise.reject(_error);
    //   }
    // }
    return Promise.reject(error);
  }
);

export const request: AxiosInstance = instance;

export type AccessTokenInfo = {
  address: string;
  timestamp: number;
  accessToken: string;
};

const fetchResourceFn = async (
  requestIdentity: string | FetchIdentity<any, any>,
  requestPayload?: unknown
): Promise<BaseResponse<unknown>> => {
  const payload = omitBy(requestPayload ?? {}, (_, key) =>
    key.startsWith("__s_")
  );

  // TODO Fix important 这里临时处理了 /api 本地请求，并且仅支持 get，满足当前需求，但并不通用
  if (isString(requestIdentity)) {
    return await request.get(requestIdentity, {
      params: payload,
    });
  }

  const { method, uri } = requestIdentity;

  if (!method || method === "get") {
    return await request.get(uri, {
      params: payload,
    });
  }

  return await request[method](uri, payload);
};

const fetcherInterceptor = async (
  params: [string | FetchIdentity<any, any>, unknown]
): Promise<BaseResponse<unknown> | BaseResponse<unknown>[]> => {
  if (params.every(isArray)) {
    return await Promise.all(
      (params as [string | FetchIdentity<any, any>, unknown][]).map((item) =>
        fetchResourceFn(item[0], item[1])
      )
    );
  } else {
    return await fetchResourceFn(params[0], params[1]);
  }
};

export const fetcherMutation = async <Resp, Req>(
  requestIdentity: FetchIdentity<Resp, Req>,
  { arg }: Readonly<{ arg: Req }>
) => {
  const res = (await fetcherInterceptor([
    requestIdentity,
    arg,
  ])) as BaseResponse<Resp>;

  if (!res.success || (res.code !== 0 && res.code !== 10001)) {
    throw Error(res.message);
  }
  return res;
};
