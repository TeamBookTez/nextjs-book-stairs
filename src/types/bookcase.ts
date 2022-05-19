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
  default: "/book",
  Pre: "/book/pre",
  Peri: "/book/peri",
  Post: "/book/post",
};

export type BookcasePathKey = typeof bookcasePathKey[keyof typeof bookcasePathKey];
