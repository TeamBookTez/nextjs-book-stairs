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

export const getNodeByPath = (rootNode: PeriNoteTreeNode, pathIndices: number[]): PeriNoteTreeNode => {
  if (rootNode === undefined) {
    throw new Error("something wrong getting rootNode by pathIndices");
  }

  if (pathIndices.length === 0) {
    return rootNode;
  }

  return getNodeByPath(rootNode.children[pathIndices[0]], pathIndices.slice(1));
};
