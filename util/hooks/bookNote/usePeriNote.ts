/*
마지막 편집자: 22-12-29 joohaem
변경사항 및 참고:
  - 
    
고민점:
  - POST / DELETE 통신에는 SWR을 어떻게 사용하는가
*/

import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValueLoadable } from "recoil";

import { patchPeriNoteData } from "../../../core/api/review";
import { periNoteSelector } from "../../../core/atom/bookNote";
import { UseForm } from "../../../types/bookNote";
import { deepCopyTree, getTargetNodeByPath } from "../../bookNoteTree";

export default function usePeriNote(reviewId: string) {
  const [periNoteData, setPeriNoteData] = useRecoilState(periNoteSelector(reviewId));
  const periNoteLoadable = useRecoilValueLoadable(periNoteSelector(reviewId));

  const { getValues } = useForm<UseForm>();

  // 임시 저장 or 작성 완료 시에 Uncontrolled Input 의 "내용"을 업데이트 해주는 함수
  function saveStatelessPeriNoteData() {
    const obj = getValues();

    const keys = Object.keys(obj);
    const newRoot = deepCopyTree(periNoteData.answerThree);

    keys.forEach((key) => {
      const value = obj[key];
      const pathKey = key.split(",").map((k) => parseInt(k));
      const current = getTargetNodeByPath(newRoot, pathKey);

      current.content = value;
    });

    // periNoteData state에도 저장
    setPeriNoteData((current) => ({ ...current, answerThree: newRoot }));

    return newRoot;
  }

  function savePeriNote() {
    patchPeriNoteData(reviewId, { ...periNoteData, answerThree: saveStatelessPeriNoteData() });
  }

  function completePeriNote() {
    return patchPeriNoteData(reviewId, {
      answerThree: saveStatelessPeriNoteData(),
      reviewSt: 4,
    });
  }

  return { periNoteData, periNoteLoadable, setPeriNoteData, savePeriNote, completePeriNote };
}
