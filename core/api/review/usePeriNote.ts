/*
마지막 편집자: 22-12-29 joohaem
변경사항 및 참고:
  - 
    
고민점:
  - core/api/review 에 api 함수 추상화 후에, 해당 훅을 util/hooks/bookNote로 옮김이 어떨까
  - POST / DELETE 통신에는 SWR을 어떻게 사용하는가
  - pre/peri note를 전역적으로 관리해야 하는데, SWR 이용이 필요할지? Recoil 이용이 필요할지?
*/

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";

import { UseForm } from "../../../types/bookNote";
import { deepCopyTree, getTargetNodeByPath } from "../../../util/bookNoteTree";
import { periNoteState } from "../../atom/bookNote";
import { patchPeriNoteData } from "../api";
import { baseInstance } from "../axios";

// TODO :: 같은 방법으로 PreNote 작성
export default function usePeriNote(reviewId: string) {
  const [periNoteData, setPeriNoteData] = useRecoilState(periNoteState);
  const [isLoading, setIsLoading] = useState(true);

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

  // TODO :: Recoil async selector + Suspense
  useEffect(() => {
    (async function () {
      try {
        // TODO :: SWR
        const { data } = await baseInstance.get(`/review/${reviewId}/peri`);

        setPeriNoteData(data);
      } finally {
        setIsLoading(false);
      }
    })();

    // return function cleanup() {
    //   setPeriNoteData(initialState);
    //   setIsLoading(false);
    // };
  }, []);

  return { periNoteData, setPeriNoteData, isLoading, savePeriNote, completePeriNote };
}
