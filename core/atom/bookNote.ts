import { atomFamily } from "recoil";
import { v1 } from "uuid";

import { PeriNoteData, PreNoteData } from "../../types/bookNote";
import { initialPeriNoteData, initialPreNoteData } from "../../util/bookNoteTree";

enum StateType {
  PRE_NOTE_STATES = "preNoteStates",
  PERI_NOTE_STATES = "periNoteStates",
}

export const preNoteStates = atomFamily<PreNoteData, string>({
  key: `${StateType.PRE_NOTE_STATES}/${v1()}`,
  default: initialPreNoteData,
});

export const periNoteStates = atomFamily<PeriNoteData, string>({
  key: `${StateType.PERI_NOTE_STATES}/${v1()}`,
  default: initialPeriNoteData,
});
