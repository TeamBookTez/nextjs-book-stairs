/*
마지막 편집자: 22-06-20 joohaem
변경사항 및 참고:
- 

고민점:
- deepCopyTree --> immer.js 라이브러리로 치환 예정입니다
*/

import { IPeriNoteData, PeriNoteTreeNode } from "../types/bookNote";

export const initialPeriNoteData: IPeriNoteData = {
  answerThree: {
    type: "Root",
    content: "root",
    children: [
      {
        type: "question",
        content: "",
        children: [{ type: "answer", content: "", children: [] }],
      },
    ],
  },
  reviewSt: 3,
};

// 재귀 함수
export const deepCopyTree = (root: PeriNoteTreeNode): PeriNoteTreeNode => {
  const newRoot = {
    type: root.type,
    content: root.content,
    children: root.children.map((node) => deepCopyTree(node)),
  };

  return newRoot;
};

// rootNode와 map으로부터 생성되는 idx를 배열에 넣어, 노드 경로를 탐색하고 타깃 노드(꼬리질문 삭제, 답변 추가 등 선택)가 무엇인지 찾기
export const getTargetNodeByPath = (rootNode: PeriNoteTreeNode, pathStack: number[]): PeriNoteTreeNode => {
  if (rootNode === undefined) {
    throw new Error("something wrong getting rootNode by pathStack");
  }

  if (pathStack.length === 0) {
    return rootNode;
  }

  return getTargetNodeByPath(rootNode.children[pathStack[0]], pathStack.slice(1));
};
