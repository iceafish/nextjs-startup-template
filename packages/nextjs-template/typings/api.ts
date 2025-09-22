export interface BaseResponse<T> {
  datetime?: string;
  success: boolean;
  code: number;
  message?: string;
  data?: T;
}

export interface PaginationReq {
  page?: number;
  size?: number;
}

export interface PaginationResp<T> {
  items: T[];
  total: number;
  current: number;
  size: number;
}
