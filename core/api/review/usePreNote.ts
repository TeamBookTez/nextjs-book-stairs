/*
마지막 편집자: 22-12-31 joohaem
변경사항 및 참고:
  - 
    
고민점:
  - core/api/review 에 api 함수 추상화 후에, 해당 훅을 util/hooks/bookNote로 옮김이 어떨까
*/

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { preNoteState } from "../../atom/bookNote";
import { baseInstance } from "../axios";

// TODO :: POST (patchBookNote 없애기)
// TODO :: 저장 로직 걷어내기
export default function usePreNote(reviewId: string) {
  const [preNoteData, setPreNoteData] = useRecoilState(preNoteState);
  const [isLoading, setIsLoading] = useState(true);

  // TODO :: Recoil async selector + Suspense
  useEffect(() => {
    (async function () {
      try {
        // TODO :: SWR
        const { data } = await baseInstance.get(`/review/${reviewId}/pre`);

        setPreNoteData(data);
      } finally {
        setIsLoading(false);
      }
    })();

    // return function cleanup() {
    //   setPeriNoteData(initialState);
    //   setIsLoading(false);
    // };
  }, []);

  return { preNoteData, setPreNoteData, isLoading };
}
