/*
마지막 편집자: 22-06-20 joohaem
변경사항 및 참고:
- 

고민점:
- deepCopyTree --> immer.js 라이브러리로 치환 예정입니다
*/

import { PeriNoteTreeNode } from "../types/bookNote";

export const deepCopyTree = (root: PeriNoteTreeNode): PeriNoteTreeNode => {
  const newRoot = {
    type: root.type,
    content: root.content,
    children: root.children.map((node) => deepCopyTree(node)),
  };

  return newRoot;
};

export const getNodeByPath = (node: PeriNoteTreeNode, path: number[]): PeriNoteTreeNode => {
  if (node === undefined) {
    // throw new Error("something wrong getting node by path");
    console.log("something wrong getting node by path");
  }

  if (path.length === 0) {
    return node;
  }

  return getNodeByPath(node.children[path[0]], path.slice(1));
};
