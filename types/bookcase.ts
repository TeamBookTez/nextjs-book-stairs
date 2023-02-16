const bookcasePathKey = {
  default: "/main",
  all: "/book",
  pre: "/book/pre",
  peri: "/book/peri",
  post: "/book/post",
} as const;

export type BookcasePathKey = typeof bookcasePathKey[keyof typeof bookcasePathKey];

export interface NavigatingBookInfoState {
  reviewId: string;
  title: string;
  fromUrl: string;
  fromSt: BookcasePathKey | null;
  reviewSt?: 2 | 3 | 4;
}

export interface BookcaseInfo {
  author: string[];
  reviewId: string;
  reviewSt?: 2 | 3 | 4;
  thumbnail: string;
  title: string;
}
