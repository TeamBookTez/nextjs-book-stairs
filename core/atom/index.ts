import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import { NavigatingBookInfoState } from "../../types/bookcase";
const { persistAtom } = recoilPersist();

enum StateType {
  IS_LOGIN_STATE = "isLoginState",
  NAVIGATING_BOOK_INFO_STATE = "navigatingBookInfoState",
}

export const isLoginState = atom<boolean>({
  key: StateType.IS_LOGIN_STATE,
  default: false,
});

export const navigatingBookInfoState = atom<NavigatingBookInfoState>({
  key: StateType.NAVIGATING_BOOK_INFO_STATE,
  default: {
    reviewId: "",
    title: "",
    fromUrl: "",
    fromSt: null,
  },
  effects_UNSTABLE: [persistAtom],
});
