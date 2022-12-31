import { atom } from "recoil";

import { PeriNoteData, PreNoteData } from "../../types/bookNote";
import { initialPeriNoteData, initialPreNoteData } from "../../util/bookNoteTree";

enum StateType {
  PRE_NOTE_STATE = "preNoteState",
  PERI_NOTE_STATE = "periNoteState",
}

export const preNoteState = atom<PreNoteData>({
  key: StateType.PRE_NOTE_STATE,
  default: initialPreNoteData,
});

export const periNoteState = atom<PeriNoteData>({
  key: StateType.PERI_NOTE_STATE,
  default: initialPeriNoteData,
});
