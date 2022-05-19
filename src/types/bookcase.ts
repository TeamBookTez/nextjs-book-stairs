const bookcasePathKey = {
  default: "/book",
  pre: "/book/pre",
  peri: "/book/peri",
  post: "/book/post",
} as const;

export type BookcasePathKey = typeof bookcasePathKey[keyof typeof bookcasePathKey];

export interface NavigatingBookInfoState {
  reviewId: string;
  title: string;
  fromUrl: string;
  fromSt: BookcasePathKey;
}

export interface BookcaseInfo {
  author: string[];
  reviewId: string;
  reviewSt?: number;
  thumbnail: string;
  title: string;
}
