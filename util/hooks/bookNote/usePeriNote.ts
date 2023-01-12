/*
마지막 편집자: 22-12-29 joohaem
변경사항 및 참고:
  - 
    
고민점:
  - POST / DELETE 통신에는 SWR을 어떻게 사용하는가
*/

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";

import { getPeriNoteData, patchPeriNoteData } from "../../../core/api/review";
import { periNoteStates } from "../../../core/atom/bookNote";
import { PeriNoteData, UseForm } from "../../../types/bookNote";
import { deepCopyTree, getTargetNodeByPath, initialPeriNoteData } from "../../bookNoteTree";

let periNoteFlag = false;

export default function usePeriNote(reviewId: string) {
  const [periNoteData, setPeriNoteData] = useRecoilState(periNoteStates(reviewId));
  const [isLoading, setIsLoading] = useState(false);

  const { getValues } = useForm<UseForm>();

  useEffect(() => {
    (async function () {
      if (periNoteFlag) return;

      setIsLoading(true);
      try {
        const data = await getPeriNoteData(reviewId);

        setUpPeriNoteData(data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

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

  function setUpPeriNoteData(data: PeriNoteData) {
    setPeriNoteData(data);
    periNoteFlag = true;
  }

  function cleanUpPeriNoteData() {
    setPeriNoteData(initialPeriNoteData);
    periNoteFlag = false;
  }

  return { periNoteData, isLoading, setPeriNoteData, savePeriNote, completePeriNote, cleanUpPeriNoteData };
}
