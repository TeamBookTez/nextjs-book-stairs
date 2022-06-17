import { FormController, PeriNoteTreeNode } from "../../../types/bookNote";

interface TopQuestionContainerProps {
  path: number[];
  node: PeriNoteTreeNode;
  onAddChild: (path: number[], currentIndex: number, isQuestion: boolean) => void;
  onSetContent: (value: string, path: number[]) => void;
  onDeleteChild: (path: number[]) => void;
  formController: FormController;
}

export default function TopQuestionContainer() {
  // const { path, node, onAddChild, onSetContent, onDeleteChild, formController } = props;

  return <div>TopQuestionContainer</div>;
}
