import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";

import usePreNote from "../../../core/api/review/usePreNote";
import { ImgPreBook } from "../../../public/assets/images";
import { BookNotePathKey } from "../../../types/bookNote";
import { DefaultButton } from "../../common/styled/Button";
import { ImageWrapper } from "../../common/styled/Img";
import {
  StBtnCancel,
  StBtnDelete,
  StBtnWrapper,
  StDetail,
  StPopUp,
  StPopUpWrapper,
  StQuestion,
} from "../../common/styled/PopUp";

interface PreNotePostSectionProps {
  reviewId: string;
  isDisabledNextButton: boolean;
  handlePrevent: (shouldPrevent: boolean) => void;
  handleNavIndex: (idx: BookNotePathKey) => void;
}

export default function PreNotePostSection(props: PreNotePostSectionProps) {
  const { reviewId, isDisabledNextButton, handlePrevent, handleNavIndex } = props;

  const { completePreNote } = usePreNote(reviewId);

  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);

  const handleSubmit = async () => {
    completePreNote();

    // flushsync 필요하면 사용해야 함!
    handlePrevent(false);
    setIsOpenedModal(false);
    handleNavIndex("peri");
  };

  return (
    <>
      <StNextBtn type="button" disabled={isDisabledNextButton} onClick={() => setIsOpenedModal(true)}>
        다음 계단
      </StNextBtn>

      {isOpenedModal && (
        <StPopUpWrapper>
          <StPopUp>
            <StImg thumbnail={ImgPreBook.src} />
            <StQuestion>독서 전 단계를 완료하셨나요?</StQuestion>
            <StDetail>질문리스트와 함께 본격적으로 책을 펼쳐봐요!</StDetail>
            <StBtnWrapper>
              <StBtnCancel type="button" onClick={() => setIsOpenedModal(false)}>
                취소
              </StBtnCancel>
              <StBtnDelete type="button" onClick={handleSubmit}>
                다음
              </StBtnDelete>
            </StBtnWrapper>
          </StPopUp>
        </StPopUpWrapper>
      )}
    </>
  );
}

const StNextBtn = styled(DefaultButton)<{ disabled: boolean }>`
  margin-top: 10rem;
  padding: 1.6rem 13rem;
  border-radius: 1rem;
  background-color: ${({ disabled, theme }) => (disabled ? theme.colors.white400 : theme.colors.orange100)};

  width: 32.5rem;
  color: ${({ disabled, theme }) => (disabled ? theme.colors.gray300 : theme.colors.white)};
  ${({ theme }) => theme.fonts.button};

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: default;
    `}
`;

const StImg = styled(ImageWrapper)`
  margin-bottom: 1.3rem;

  width: 14.1rem;
  height: 14rem;
`;
