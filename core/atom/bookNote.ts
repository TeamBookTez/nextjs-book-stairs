import { atom } from "recoil";

import { PeriNoteData } from "../../types/bookNote";
import { initialPeriNoteData } from "../../util/bookNoteTree";

enum StateType {
  PERI_NOTE_STATE = "periNoteState",
}

export const periNoteState = atom<PeriNoteData>({
  key: StateType.PERI_NOTE_STATE,
  default: initialPeriNoteData,
});
