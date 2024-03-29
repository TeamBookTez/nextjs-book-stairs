import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";

import { BookDetailData } from "../../../types/bookNote";
import usePeriNote from "../../../util/hooks/bookNote/usePeriNote";
import { DefaultButton } from "../../common/styled/Button";
import { Complete } from ".";

interface PeriNotePostSectionProps {
  reviewId: string;
  isPreventedPeriNoteComplete: boolean;
}

interface BookDetailResponse {
  bookData: BookDetailData;
}

export default function PeriNotePostSection(props: PeriNotePostSectionProps) {
  const { reviewId, isPreventedPeriNoteComplete } = props;

  const { completePeriNote } = usePeriNote(reviewId);
  const [isOpenSubmitModal, setIsOpenSubmitModal] = useState<boolean>(false);
  const [bookDetailData, setBookDetailData] = useState<BookDetailData>({
    author: [""],
    publicationDt: "",
    thumbnail: "",
    title: "",
    translator: [""],
  });

  const submitPeriNote = async () => {
    const res: BookDetailResponse = await completePeriNote();

    setBookDetailData(res.bookData);
    setIsOpenSubmitModal(true);
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

      {isOpenSubmitModal && <Complete reviewId={reviewId} bookDetailData={bookDetailData} />}
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
