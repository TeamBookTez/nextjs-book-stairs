// api
export interface KAKAOParams {
  query: string;
  sort: string;
  size: number;
}

export interface ResponseDto {
  message: string;
  status: number;
  success: boolean;
}

export interface Response<T> extends ResponseDto {
  data: T;
}
