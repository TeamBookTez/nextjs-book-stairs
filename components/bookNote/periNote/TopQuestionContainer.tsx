import styled from "@emotion/styled";
import TextareaAutosize from "react-textarea-autosize";

import { IcPeriQuestion } from "../../../public/assets/icons";
import { FormController, PeriNoteTreeNode } from "../../../types/bookNote";
import { StAddAnswerButton, StMenuBtn } from "../../common/styled/Button";
import { StMoreIcon } from "../../common/styled/Icon";
import { StMenuWrapper } from "../../common/styled/MenuWrapper";

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

  return (
    <StArticle>
      <StFieldset>
        <legend>
          <StQuestionIcon />
        </legend>
        <StInput
        // ref={textAreaRef}
        // value={node.content}
        // placeholder="질문을 입력해주세요."
        // onChange={(e) => handleContent(e, path)}
        // onKeyPress={(e) => handleKeyPress(e, path)}
        />
        <StAddAnswerButton
          type="button"
          // onClick={() => onAddChild(path, currentIndex, isQuestion)}
        >
          답변
        </StAddAnswerButton>
        <StMoreIcon className="icn_more" />
        <StMenuWrapper menuposition="isPriQ">
          <StMenuBtn
            type="button"
            //  onClick={() => onDeleteChild(path)}
          >
            삭제
          </StMenuBtn>
        </StMenuWrapper>
      </StFieldset>
    </StArticle>
  );
}

const StArticle = styled.article`
  position: relative;

  margin-top: 3rem;

  &:focus-within {
    & > fieldset {
      border-bottom: 0.1rem solid ${({ theme }) => theme.colors.white400};
      border-color: ${({ theme }) => theme.colors.orange100};
    }
  }
`;

const StFieldset = styled.fieldset`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 0.8rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.white200};
  border-bottom: 0.1rem dashed ${({ theme }) => theme.colors.white400};

  padding: 2.6rem 4.4rem 2.6rem 8.4rem;
  background-color: ${({ theme }) => theme.colors.white};

  width: 100%;
`;

const StQuestionIcon = styled(IcPeriQuestion)`
  position: absolute;
  top: -1.2rem;
  left: 0.8rem;
`;

const StInput = styled(TextareaAutosize)`
  flex: 1;
  margin: 0;
  min-height: 2.6rem;
  ${({ theme }) => theme.fonts.header4};

  &::placeholder {
    color: ${({ theme }) => theme.colors.white500};
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
