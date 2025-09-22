import { HOST_PREFIX } from "@/common/constants";
import { PaginationReq, PaginationResp } from "@/typings/api";

export function defineRestResource<Resp, Req>(
  uri: string,
  method: "get" | "post"
): TypedString<Resp> {
  return `${HOST_PREFIX}${uri}` as TypedString<Resp>;
}

export type FetchIdentity<Resp, Req> =
  | ResourceIdentity<Resp, Req>
  | MutationIdentity<Resp, Req>;

export type ResourceIdentity<Resp, Req> = {
  uri: string;
  method?: "get";
  host?: string;
  noAuth?: boolean;
  absoluteUri: string;
};

export type MutationIdentity<Resp, Req> = {
  uri: string;
  method?: "post" | "delete";
  host?: string;
  noAuth?: boolean;
  absoluteUri: string;
};

export function defineFetch<Resp, Req>(
  uri: string,
  method?: "get" | "post" | "delete",
  option?: {
    host?: string;
    noAuth?: boolean;
  }
): FetchIdentity<Resp, Req> {
  return {
    uri: <TypedString<Resp>>uri,
    method,
    host: option?.host,
    absoluteUri: `${option?.host ?? HOST_PREFIX}${uri}`,
    noAuth: option?.noAuth,
  };
}

export function defineResource<Resp, Req>(
  uri: string,
  option?: {
    host?: string;
    noAuth?: boolean;
  }
): ResourceIdentity<Resp, Req> {
  return {
    uri: <TypedString<Resp>>uri,
    method: "get",
    host: option?.host,
    absoluteUri: `${option?.host ?? HOST_PREFIX}${uri}`,
    noAuth: option?.noAuth,
  };
}

export function defineResourceList<Resp, Req>(
  uri: string,
  option?: {
    host?: string;
    noAuth?: boolean;
  }
): ResourceIdentity<PaginationResp<Resp>, Req & PaginationReq> {
  return {
    uri: <TypedString<Resp>>uri,
    method: "get",
    host: option?.host,
    absoluteUri: `${option?.host ?? HOST_PREFIX}${uri}`,
    noAuth: option?.noAuth,
  };
}

export function defineMutation<Resp, Req>(
  uri: string,
  option?: {
    host?: string;
    noAuth?: boolean;
    method: "post" | "delete";
  }
): MutationIdentity<Resp, Req> {
  return {
    uri: <TypedString<Resp>>uri,
    method: option?.method ?? "post",
    host: option?.host,
    absoluteUri: `${option?.host ?? HOST_PREFIX}${uri}`,
    noAuth: option?.noAuth,
  };
}
