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

// TODO :: 북노트 mount or unmount 시에 refresh 필요
export const preNoteSelector = atomFamily<PreNoteData, string>({
  key: `${StateType.PRE_NOTE_SELECTOR}/${v1()}`,
  default: async (reviewId) => {
    try {
      const data = await getPreNoteData(reviewId);
      
      return data;
    }
    catch(e) {
      return initialPreNoteData;
    }
  },
});

// export const preNoteSelector = selectorFamily<PreNoteData, string>({
//   key: `${StateType.PRE_NOTE_SELECTOR}/${v1()}`,
//   get: (reviewId) => async () => {
//     const data = await getPreNoteData(reviewId);

//     return data;
//   },
//   set: (reviewId) => ({ set }, newValue) => {
//     set(preNoteSelector(reviewId), newValue);
//   },
// });

export const preNoteState = atom<PreNoteData>({
  key: `${StateType.PRE_NOTE_STATE}/${v1()}`,
  default: initialPreNoteData,
});

export const periNoteState = atom<PeriNoteData>({
  key: `${StateType.PERI_NOTE_STATE}/${v1()}`,
  default: initialPeriNoteData,
});
