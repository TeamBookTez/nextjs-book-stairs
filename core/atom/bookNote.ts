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
  EDIT_INITIALIZE_PRE_NOTE_SELECTOR = "editInitializePreNoteSelector",
  EDIT_INITIALIZE_PERI_NOTE_SELECTOR = "editInitializePeriNoteSelector",
}

export const preNoteState = atom<PreNoteData>({
  key: `${StateType.PRE_NOTE_STATE}/${v1()}`,
  default: initialPreNoteData,
});

export const editInitializePreNoteSelector = selectorFamily<PreNoteData, string>({
  key: `${StateType.EDIT_INITIALIZE_PRE_NOTE_SELECTOR}/${v1()}`,
  get:
    (reviewId) =>
    async ({}) => {
      try {
        return await getPreNoteData(reviewId);
      } catch (e) {
        return initialPreNoteData;
      }
    },
});

export const periNoteState = atom<PeriNoteData>({
  key: `${StateType.PERI_NOTE_STATE}/${v1()}`,
  default: initialPeriNoteData,
});

export const editInitializePeriNoteSelector = selectorFamily<PeriNoteData, string>({
  key: `${StateType.EDIT_INITIALIZE_PERI_NOTE_SELECTOR}/${v1()}`,
  get:
    (reviewId) =>
    async ({}) => {
      try {
        return await getPeriNoteData(reviewId);
      } catch (e) {
        return initialPeriNoteData;
      }
    },
});
