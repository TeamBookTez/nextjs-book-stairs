/* eslint-disable prettier/prettier */
import { atom, atomFamily, selectorFamily } from "recoil";
import { v1 } from "uuid";

import { PeriNoteData, PreNoteData } from "../../types/bookNote";
import { initialPeriNoteData, initialPreNoteData } from "../../util/bookNoteTree";
import { getPreNoteData } from "../api/review/api";

enum StateType {
  PRE_NOTE_STATE = "preNoteState",
  PERI_NOTE_STATE = "periNoteState",
  PRE_NOTE_SELECTOR = "preNoteSelector",
}

// export const preNoteSelector = atomFamily<PreNoteData, string>({
//   key: `${StateType.PRE_NOTE_SELECTOR}/${v1()}`,
//   default: async (reviewId) => {
//     try {

//       const data = await getPreNoteData(reviewId);
      
//       return data;
//     }
//     catch(e) {
//       return initialPreNoteData;
//     }
//   },
// });

// TODO :: Suspense / ErrorBoundary(메이커스) 필요
// TODO :: cachePolicy_UNSTABLE :: 캐시 무효화 기술 확인
// 혹은 구독하는 atom 을 만들어, 북노트에 들어올 때 캐싱을 다시 하도록 구현
export const preNoteSelector = selectorFamily<PreNoteData, string>({
  key: `${StateType.PRE_NOTE_SELECTOR}/${v1()}`,
  get: (reviewId) => async () => {
    const data = await getPreNoteData(reviewId);

    return data;
  },
  set: (reviewId) => ({ set }, newValue) => {
    set(preNoteSelector(reviewId), newValue);
  },
});

export const preNoteState = atom<PreNoteData>({
  key: `${StateType.PRE_NOTE_STATE}/${v1()}`,
  default: initialPreNoteData,
});

export const periNoteState = atom<PeriNoteData>({
  key: `${StateType.PERI_NOTE_STATE}/${v1()}`,
  default: initialPeriNoteData,
});
