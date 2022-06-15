// api
export interface KAKAOParams {
  query: string;
  sort: string;
  size: number;
}

export interface AxiosResponse {
  message: string;
  status: number;
  success: boolean;
}
export interface Response<T> extends AxiosResponse {
  data: T;
}
