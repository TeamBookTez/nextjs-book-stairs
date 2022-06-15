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
    reviewId: "62a9c46d1b74916b7a94dcb3",
    title: "북노오오오오오트으으으으",
    fromUrl: "",
    fromSt: "/main",
  },
  effects_UNSTABLE: [persistAtom],
});
