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
    reviewId: "62b5581c1b74916b7a94efc8",
    title: "북노오오오오오트으으으으",
    fromUrl: "/main",
    fromSt: "/main",
  },
  effects_UNSTABLE: [persistAtom],
});
