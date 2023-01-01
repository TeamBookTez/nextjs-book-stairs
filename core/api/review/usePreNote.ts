/*
마지막 편집자: 22-12-31 joohaem
변경사항 및 참고:
  - 
    
고민점:
  - core/api/review 에 api 함수 추상화 후에, 해당 훅을 util/hooks/bookNote로 옮김이 어떨까
  - 독서 전/독서 중 한 번에 PATCH 하는 API :: https://www.notion.so/life-racer/3649c9da08354c90b90c4ad1ab6a287e

*/

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

import { PeriNoteTreeNode } from "../../../types/bookNote";
import { preNoteSelector, preNoteState } from "../../atom/bookNote";
import { getPreNoteData, patchPeriNoteData, patchPreNoteData } from "./api";

export default function usePreNote(reviewId: string) {
  const [preNoteData, setPreNoteData] = useRecoilState(preNoteSelector(reviewId));
  // const [preNoteData, setPreNoteData] = useRecoilState(preNoteState);
  const [isLoading, setIsLoading] = useState(false);

  function savePreNote() {
    patchPreNoteData(reviewId, preNoteData);
  }

  async function completePreNote() {
    if (preNoteData.reviewSt !== 2) {
      savePreNote();

      return;
    }

    // 독서 전 상태라면, 독서 중 상태로 변경하고 질문리스트를 독서 중으로 넘겨준다
    await patchPreNoteData(reviewId, { ...preNoteData, reviewSt: 3 });

    const questionFromPre: PeriNoteTreeNode[] = [];

    preNoteData.questionList.map((content) => {
      questionFromPre.push({
        id: uuidv4(),
        type: "question",
        content,
        children: [
          {
            id: uuidv4(),
            type: "answer",
            content: "",
            children: [],
          },
        ],
      });
    });

    patchPeriNoteData(reviewId, {
      answerThree: {
        id: uuidv4(),
        type: "Root",
        content: "root",
        children: questionFromPre,
      },
      reviewSt: 3,
    });
  }

  // TODO :: Recoil async selector + Suspense
  // useEffect(() => {
  //   (async function () {
  //     try {
  //       // TODO :: SWR? selector?
  //       const data = await getPreNoteData(reviewId);

  //       setPreNoteData(data);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   })();

  //   // return function cleanup() {
  //   //   setPeriNoteData(initialState);
  //   //   setIsLoading(false);
  //   // };
  // }, []);

  return { preNoteData, setPreNoteData, isLoading, savePreNote, completePreNote };
}
