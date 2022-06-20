import { FormController, PeriNoteTreeNode } from "../../../types/bookNote";

interface PeriNoteInputProps {
  path: number[];
  index: number;
  node: PeriNoteTreeNode;
  onAddChild: (path: number[], index: number, isQuestion: boolean) => void;
  onDeleteChild: (path: number[]) => void;
  formController: FormController;
}

export default function ChildQANode(props: PeriNoteInputProps) {
  const { path, index, node, onAddChild, onDeleteChild, formController } = props;

  return <div>ChildQANode</div>;
}
