/*
마지막 편집자: 22-12-31 joohaem
변경사항 및 참고:
  - 
    
고민점:
  - 독서 전/독서 중 한 번에 PATCH 하는 API :: https://www.notion.so/life-racer/3649c9da08354c90b90c4ad1ab6a287e

*/

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

import { getPreNoteData, patchPeriNoteData, patchPreNoteData } from "../../../core/api/review";
import { preNoteStates } from "../../../core/atom/bookNote";
import { PeriNoteTreeNode, PreNoteData } from "../../../types/bookNote";
import { initialPreNoteData } from "../../bookNoteTree";

let preNoteFlag = false;

export default function usePreNote(reviewId: string) {
  const [preNoteData, setPreNoteData] = useRecoilState(preNoteStates(reviewId));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      if (preNoteFlag) return;

      setIsLoading(true);
      try {
        const data = await getPreNoteData(reviewId);

        setUpPreNoteData(data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

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

  function setUpPreNoteData(data: PreNoteData) {
    setPreNoteData(data);
    preNoteFlag = true;
  }

  function cleanUpPreNoteData() {
    setPreNoteData(initialPreNoteData);
    preNoteFlag = true;
  }

  return { preNoteData, isLoading, setPreNoteData, savePreNote, completePreNote, cleanUpPreNoteData };
}
