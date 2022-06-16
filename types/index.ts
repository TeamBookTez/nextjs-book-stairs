// api
export interface KAKAOParams {
  query: string;
  sort: string;
  size: number;
}

// error response에 대해 적용할 때는 data가 없을 수 있으므로 공통 부분을 Dto로 분리했습니다.
// 불필요한 분리라고 생각된다면 합쳐도 좋습니다!
export interface ResponseDto {
  message: string;
  status: number;
  success: boolean;
}

export interface Response<T> extends ResponseDto {
  data: T;
}
