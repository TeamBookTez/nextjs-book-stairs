/*
마지막 편집자: 22-06-20 joohaem
변경사항 및 참고:
- 

고민점:
- deepCopyTree --> immer.js 라이브러리로 치환 예정입니다
*/

import { v4 as uuidv4 } from "uuid";

import { PeriNoteData, PeriNoteTreeNode } from "../types/bookNote";

export const initialPeriNoteData: PeriNoteData = {
  answerThree: {
    id: uuidv4(),
    type: "Root",
    content: "root",
    children: [
      {
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
      },
    ],
  },
  reviewSt: 3,
};

export const deepCopyTree = (root: PeriNoteTreeNode): PeriNoteTreeNode => {
  const newRoot = {
    id: root.id,
    type: root.type,
    content: root.content,
    children: root.children.map((node) => deepCopyTree(node)),
  };

  return newRoot;
};

export const getTargetNodeByPath = (node: PeriNoteTreeNode, path: number[]): PeriNoteTreeNode => {
  if (node === undefined) {
    throw new Error("something wrong getting node by path");
  }

  if (path.length === 0) {
    return node;
  }

  // 다음 step의 node 찾기
  return getTargetNodeByPath(node.children[path[0]], path.slice(1));
};
