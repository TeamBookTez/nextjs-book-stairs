/*
마지막 편집자: 22-12-29 joohaem
변경사항 및 참고:
  - useFetchBookNote :: PeriNote를 axios 통신으로 패칭함 --> pre/peri 분리
    
고민점:
  - POST / DELETE 통신에는 SWR을 어떻게 사용하는가
  - pre/peri note를 전역적으로 관리해야 하는데, SWR 이용이 필요할지? Recoil 이용이 필요할지?
*/

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";

import { UseForm } from "../../../types/bookNote";
import { deepCopyTree, getTargetNodeByPath } from "../../../util/bookNoteTree";
import { periNoteState } from "../../atom/bookNote";
import { baseInstance } from "../axios";

// TODO :: PATCH 통신하여 저장 toast state 관리
// TODO :: 같은 방법으로 PreNote 작성
export default function usePeriNote(reviewId: string) {
  const [periNoteData, setPeriNoteData] = useRecoilState(periNoteState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { getValues } = useForm<UseForm>();

  // TODO :: useCallback
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

  async function savePeriNote() {
    baseInstance.patch(`/review/${reviewId}/peri`, { ...periNoteData, answerThree: saveStatelessPeriNoteData() });
  }

  async function completePeriNote() {
    const { data } = await baseInstance.patch(`/review/${reviewId}/peri`, {
      answerThree: saveStatelessPeriNoteData(),
      reviewSt: 4,
    });

    return data;
  }

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
