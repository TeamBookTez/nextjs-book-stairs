export interface NavigatingBookInfoState {
  reviewId: string;
  title: string;
  fromUrl: string;
  fromSt: number;
}

export interface BookcaseInfo {
  author: string[];
  reviewId: string;
  reviewSt?: number;
  thumbnail: string;
  title: string;
}
