import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";

import { patchBookNote } from "../../../core/api";
import { PeriNoteData, PeriNoteTreeNode } from "../../../types/bookNote";
import { DefaultButton } from "../../common/styled/Button";

interface PeriNotePostSectionProps {
  reviewId: string;
  bookData: PeriNoteData;
  setBookData: React.Dispatch<React.SetStateAction<PeriNoteData>>;
  saveStatelessPeriNoteData: () => PeriNoteTreeNode;
  isPreventedPeriNoteComplete: boolean;
}

export default function PeriNotePostSection(props: PeriNotePostSectionProps) {
  const { reviewId, bookData, setBookData, saveStatelessPeriNoteData, isPreventedPeriNoteComplete } = props;

  const [isOpenSubmitModal, SetIsOpenSubmitModal] = useState<boolean>(false);

  const submitPeriNote = () => {
    const dataToPatch = saveStatelessPeriNoteData();

    patchBookNote(`/review/${reviewId}/peri`, {
      answerThree: dataToPatch,
      reviewSt: 4,
    }).then((res) => {
      setBookData(res.bookData);
      SetIsOpenSubmitModal(true);
    });
  };

  return (
    <>
      {/* type을 submit으로 변경하면 페이지를 이동하는 것에 초점을 둬서 제대로 작동하지 않음 */}
      <StSubmitButton
        type="button"
        onClick={submitPeriNote}
        disabled={isPreventedPeriNoteComplete}
        id="btn_complete_reading">
        작성 완료
      </StSubmitButton>

      {/* {isOpenSubmitModal && <Complete bookData={bookData} />} */}
    </>
  );
}

const StSubmitButton = styled(DefaultButton)<{ disabled: boolean }>`
  margin-top: 6rem;
  margin-left: auto;
  border-radius: 1rem;

  width: 32.5rem;
  height: 5.6rem;
  ${({ theme }) => theme.fonts.button}

  background-color: ${({ disabled, theme }) => (disabled ? theme.colors.white400 : theme.colors.orange100)};
  color: ${({ disabled, theme }) => (disabled ? theme.colors.gray300 : theme.colors.white)};

  ${({ disabled }) =>
    disabled &&
    css`
      &:hover {
        cursor: default;
      }
    `}
`;
