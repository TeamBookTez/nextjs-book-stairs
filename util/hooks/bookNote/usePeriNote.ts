/*
마지막 편집자: 22-12-29 joohaem
변경사항 및 참고:
  - 
    
고민점:
  - POST / DELETE 통신에는 SWR을 어떻게 사용하는가
*/

import { useEffect } from "react";
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValueLoadable } from "recoil";
import { v4 as uuidv4 } from "uuid";

import { patchPeriNoteData } from "../../../core/api/review";
import { editInitializePeriNoteSelector, periNoteState } from "../../../core/atom/bookNote";
import { deepCopyTree, getTargetNodeByPath } from "../../bookNoteTree";

export default function usePeriNote(reviewId: string) {
  const [periNoteData, setPeriNoteData] = useRecoilState(periNoteState);
  const periNoteLoadable = useRecoilValueLoadable(editInitializePeriNoteSelector(reviewId));
  const refreshPeriNoteData = useRecoilRefresher_UNSTABLE(editInitializePeriNoteSelector(reviewId));

  useEffect(() => {
    if (periNoteLoadable.state === "hasValue") {
      setPeriNoteData(periNoteLoadable.contents);
    }
  }, [periNoteLoadable.state]);

  async function savePeriNote() {
    await patchPeriNoteData(reviewId, periNoteData);

    refreshPeriNoteData();
  }

  async function completePeriNote() {
    const response = await patchPeriNoteData(reviewId, {
      ...periNoteData,
      reviewSt: 4,
    });

    refreshPeriNoteData();

    return response;
  }

  const handleAddChildAnswer = (pathStack: number[]) => {
    const newRoot = deepCopyTree(periNoteData.answerThree);
    const targetNode = getTargetNodeByPath(newRoot, pathStack);

    targetNode.children.push({
      id: uuidv4(),
      type: "answer",
      content: "",
      children: [],
    });
    setPeriNoteData((current) => ({ ...current, answerThree: newRoot }));
  };

  const handleAddSiblingAnswer = (pathStack: number[], currentIndex: number) => {
    const newRoot = deepCopyTree(periNoteData.answerThree);
    const targetNode = getTargetNodeByPath(newRoot, pathStack);

    targetNode.children.splice(currentIndex + 1, 0, {
      id: uuidv4(),
      type: "answer",
      content: "",
      children: [],
    });
    setPeriNoteData((current) => ({ ...current, answerThree: newRoot }));
  };

  const handleAddChildQuestion = (pathStack: number[]) => {
    const newRoot = deepCopyTree(periNoteData.answerThree);
    const targetNode = getTargetNodeByPath(newRoot, pathStack);

    targetNode.children.push({
      id: uuidv4(),
      type: "question",
      content: "",
      children: [
        {
          id: uuidv4(),
          type: "answer",
          content: "",
          children: [],
        },
      ],
    });
    setPeriNoteData((current) => ({ ...current, answerThree: newRoot }));
  };

  const handleAddSiblingQuestion = (pathStack: number[], currentIndex: number) => {
    const newRoot = deepCopyTree(periNoteData.answerThree);
    const targetNode = getTargetNodeByPath(newRoot, pathStack);

    targetNode.children.splice(currentIndex + 1, 0, {
      id: uuidv4(),
      type: "question",
      content: "",
      children: [
        {
          id: uuidv4(),
          type: "answer",
          content: "",
          children: [],
        },
      ],
    });
    setPeriNoteData((current) => ({ ...current, answerThree: newRoot }));
  };

  const handleSetContent = (value: string, pathStack: number[]) => {
    const newRoot = deepCopyTree(periNoteData.answerThree);
    const current = getTargetNodeByPath(newRoot, pathStack);

    current.content = value;

    setPeriNoteData((current) => ({ ...current, answerThree: newRoot }));
  };

  const handleDeleteChild = (pathStack: number[]) => {
    const newRoot = deepCopyTree(periNoteData.answerThree);
    // 삭제할 때는 자신의 부모를 찾아서 children을 제거
    const parent = getTargetNodeByPath(newRoot, pathStack.slice(0, -1));

    // parent.children.splice(pathStack[pathStack.length - 1], 1);
    parent.children[pathStack[pathStack.length - 1]] = {
      ...parent.children[pathStack[pathStack.length - 1]],
      type: "deleted",
    };

    setPeriNoteData((current) => ({ ...current, answerThree: newRoot }));
  };

  return {
    periNoteData,
    isPerNoteLoading: periNoteLoadable.state === "loading",
    savePeriNote,
    completePeriNote,
    handleAddChildAnswer,
    handleAddSiblingAnswer,
    handleAddChildQuestion,
    handleAddSiblingQuestion,
    handleSetContent,
    handleDeleteChild,
  };
}
