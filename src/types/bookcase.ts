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

const bookcasePathKey = {
  default: "/",
  Pre: "/PRE",
  Peri: "/PERI",
  Post: "/POST",
};

export type BookcasePathKey = typeof bookcasePathKey[keyof typeof bookcasePathKey];
