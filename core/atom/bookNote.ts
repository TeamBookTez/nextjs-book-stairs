/* eslint-disable indent */
/* eslint-disable no-empty-pattern */
import { atom, selectorFamily } from "recoil";
import { v1 } from "uuid";

import { PeriNoteData, PreNoteData } from "../../types/bookNote";
import { initialPeriNoteData, initialPreNoteData } from "../../util/bookNoteTree";
import { getPeriNoteData, getPreNoteData } from "../api/review";

enum StateType {
  PRE_NOTE_STATE = "preNoteState",
  PERI_NOTE_STATE = "periNoteState",
  PRE_NOTE_SELECTOR = "preNoteSelector",
  PERI_NOTE_SELECTOR = "periNoteSelector",
}

export const preNoteState = atom<PreNoteData>({
  key: `${StateType.PRE_NOTE_STATE}/${v1()}`,
  default: initialPreNoteData,
});

export const preNoteSelector = selectorFamily<PreNoteData, string>({
  key: `${StateType.PRE_NOTE_SELECTOR}/${v1()}`,
  get:
    (reviewId) =>
    async ({}) => {
      try {
        const data = await getPreNoteData(reviewId);

        return data;
      } catch (e) {
        return initialPreNoteData;
      }
    },
  set:
    () =>
    ({ set }, newValue) => {
      set(preNoteState, newValue);
    },
});

export const periNoteState = atom<PeriNoteData>({
  key: `${StateType.PERI_NOTE_STATE}/${v1()}`,
  default: initialPeriNoteData,
});

export const periNoteSelector = selectorFamily<PeriNoteData, string>({
  key: `${StateType.PERI_NOTE_SELECTOR}/${v1()}`,
  get:
    (reviewId) =>
    async ({}) => {
      try {
        const data = await getPeriNoteData(reviewId);

        return data;
      } catch (e) {
        return initialPeriNoteData;
      }
    },
  set:
    () =>
    ({ set }, newValue) => {
      set(periNoteState, newValue);
    },
});
