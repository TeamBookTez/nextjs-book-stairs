import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import { NavigatingBookInfoState } from "../types/bookcase";
const { persistAtom } = recoilPersist();

export const isLoginState = atom<boolean>({
  key: "isLoginState",
  default: false,
});

export const navigatingBookInfoState = atom<NavigatingBookInfoState>({
  key: "navigatingBookInfoState",
  default: {
    reviewId: "-1",
    title: "들꽃의 노래",
    fromUrl: "",
    fromSt: "/main",
  },
  effects_UNSTABLE: [persistAtom],
});
