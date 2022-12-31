import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { preNoteState } from "../../atom/bookNote";
import { baseInstance } from "../axios";

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
