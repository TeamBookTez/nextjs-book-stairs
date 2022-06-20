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

  return <div>TopAnswerContainer</div>;
}
