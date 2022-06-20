import { useEffect, useRef } from "react";

import { PeriNoteTreeNode } from "../../../types/bookNote";

interface TopAnswerContainerProps {
  index: number;
  path: number[];
  node: PeriNoteTreeNode;
  onSetContent: (value: string, path: number[]) => void;
  onAddChild: (path: number[], index?: number) => void;
  onDeleteChild: (path: number[]) => void;
}

export default function TopAnswerContainer(props: TopAnswerContainerProps) {
  const { index, path, node, onSetContent, onAddChild, onDeleteChild } = props;

  if (node.type !== "answer") return <></>;

  return <div>TopAnswerContainer</div>;
}
