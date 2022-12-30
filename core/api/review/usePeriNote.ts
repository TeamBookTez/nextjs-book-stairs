/*
마지막 편집자: 22-12-29 joohaem
변경사항 및 참고:
  - useFetchBookNote :: PeriNote를 axios 통신으로 패칭함 --> pre/peri 분리
    
고민점:
  - POST / DELETE 통신에는 SWR을 어떻게 사용하는가
  - pre/peri note를 전역적으로 관리해야 하는데, SWR 이용이 필요할지? Recoil 이용이 필요할지?
*/

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { periNoteState } from "../../atom/bookNote";
import { baseInstance } from "../axios";

// TODO :: PATCH 통신하여 저장 toast state 관리
// TODO :: 같은 방법으로 PreNote 작성
export default function usePeriNote(reviewId: string) {
  const [periNoteData, setPeriNoteData] = useRecoilState(periNoteState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async function () {
      try {
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

  return { periNoteData, setPeriNoteData, isLoading };
}
