import { atom, atomFamily } from "recoil";
import { v1 } from "uuid";

import { PeriNoteData, PreNoteData } from "../../types/bookNote";
import { initialPeriNoteData, initialPreNoteData } from "../../util/bookNoteTree";
import { getPreNoteData } from "../api/review";

enum StateType {
  PRE_NOTE_STATE = "preNoteState",
  PERI_NOTE_STATE = "periNoteState",
  PRE_NOTE_SELECTOR = "preNoteSelector",
}

// TODO :: 북노트 mount or unmount 시에 refresh 필요
export const preNoteSelector = atomFamily<PreNoteData, string>({
  key: `${StateType.PRE_NOTE_SELECTOR}/${v1()}`,
  default: getPreNoteData,
});

export const preNoteState = atom<PreNoteData>({
  key: `${StateType.PRE_NOTE_STATE}/${v1()}`,
  default: initialPreNoteData,
});

export const periNoteState = atom<PeriNoteData>({
  key: `${StateType.PERI_NOTE_STATE}/${v1()}`,
  default: initialPeriNoteData,
});
