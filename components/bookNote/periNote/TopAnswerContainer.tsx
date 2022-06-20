import { PeriNoteTreeNode } from "../../../types/bookNote";

interface TopAnswerContainerProps {
  index: number;
  path: number[];
  node: PeriNoteTreeNode;
  onAddChild: (path: number[], index: number, isQuestion: boolean) => void;
  onSetContent: (value: string, path: number[]) => void;
  onDeleteChild: (path: number[]) => void;
}

export default function TopAnswerContainer(props: TopAnswerContainerProps) {
  const { index, path, node, onAddChild, onSetContent, onDeleteChild } = props;

  return <div>TopAnswerContainer</div>;
}
