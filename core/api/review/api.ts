import { PeriNoteData, PreNoteData } from "../../../types/bookNote";
import { baseInstance } from "../axios";

export const getPreNoteData = async (reviewId: string) => {
  const { data } = await baseInstance.get<PreNoteData>(`/review/${reviewId}/pre`);

  return data;
};

export const patchPreNoteData = async (reviewId: string, body: PreNoteData) => {
  const { data } = await baseInstance.patch(`/review/${reviewId}/pre`, body);

  return data;
};

export const patchPeriNoteData = async (reviewId: string, body: PeriNoteData) => {
  const { data } = await baseInstance.patch(`/review/${reviewId}/peri`, body);

  return data;
};
