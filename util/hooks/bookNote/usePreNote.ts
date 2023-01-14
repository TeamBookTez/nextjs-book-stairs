/*
마지막 편집자: 22-12-31 joohaem
변경사항 및 참고:
  - 
    
고민점:
  - 독서 전/독서 중 한 번에 PATCH 하는 API :: https://www.notion.so/life-racer/3649c9da08354c90b90c4ad1ab6a287e

*/

import { useEffect } from "react";
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValueLoadable } from "recoil";
import { v4 as uuidv4 } from "uuid";

import { patchPeriNoteData, patchPreNoteData } from "../../../core/api/review";
import {
  editInitializePeriNoteSelector,
  editInitializePreNoteSelector,
  preNoteState,
} from "../../../core/atom/bookNote";
import { PeriNoteTreeNode } from "../../../types/bookNote";

export default function usePreNote(reviewId: string) {
  const [preNoteData, setPreNoteData] = useRecoilState(preNoteState);
  const preNoteLoadable = useRecoilValueLoadable(editInitializePreNoteSelector(reviewId));
  const resetEditInitializePreNoteSelector = useRecoilRefresher_UNSTABLE(editInitializePreNoteSelector(reviewId));
  const resetEditInitializePeriNoteSelector = useRecoilRefresher_UNSTABLE(editInitializePeriNoteSelector(reviewId));

  useEffect(() => {
    if (preNoteLoadable.state === "hasValue") {
      setPreNoteData(preNoteLoadable.contents);
    }
  }, [preNoteLoadable.state]);

  async function savePreNote() {
    await patchPreNoteData(reviewId, preNoteData);
    resetEditInitializePreNoteSelector();
  }

  async function completePreNote() {
    if (preNoteData.reviewSt !== 2) {
      savePreNote();

      return;
    }

    // 독서 전 상태라면, 독서 중 상태로 변경하고 질문리스트를 독서 중으로 넘겨준다
    await patchPreNoteData(reviewId, { ...preNoteData, reviewSt: 3 });

    const questionFromPre: PeriNoteTreeNode[] = [];

    preNoteData.questionList.forEach((content) => {
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

    await patchPeriNoteData(reviewId, {
      answerThree: {
        id: uuidv4(),
        type: "Root",
        content: "root",
        children: questionFromPre,
      },
      reviewSt: 3,
    });

    resetEditInitializePeriNoteSelector();
    resetEditInitializePreNoteSelector();
  }

  return {
    preNoteData,
    isPreNoteLoading: preNoteLoadable.state === "loading",
    setPreNoteData,
    savePreNote,
    completePreNote,
  };
}
