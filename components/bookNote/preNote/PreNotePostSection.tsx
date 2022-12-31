/*
마지막 편집자: 22-06-23 joohaem
변경사항 및 참고:
  - To. 규민 ))
    handleSubmit에서, 독서 중으로 넘어갈 때 질문리스트를 업데이트 시키기 위해
    peri patch도 동시에 이루어집니다
    하지만 이를 통합시켜서 patch 시킬 수 있는 API 가 따로 있습니다!
    --> https://www.notion.so/3649c9da08354c90b90c4ad1ab6a287e
    --> 대충 테스트 해봤을 때, reviewSt 변경이 제대로 안 되는 것 같은데 나중에 확인 부탁드립니다 !
    --> 한 번에 통합된 API가 아닌, 안전하게 두 번 API 통신을 하는 것도 좋은 방법이라고 생각듭니다
    
고민점:
  - 
*/

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";

import usePreNote from "../../../core/api/review/usePreNote";
import { ImgPreBook } from "../../../public/assets/images";
import { BookNotePathKey, PreNoteData } from "../../../types/bookNote";
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
  bookNoteData: PreNoteData;
  isFilled: boolean;
  handlePrevent: (shouldPrevent: boolean) => void;
  handleNavIndex: (idx: BookNotePathKey) => void;
}

export default function PreNotePostSection(props: PreNotePostSectionProps) {
  const { reviewId, isFilled, bookNoteData, handlePrevent, handleNavIndex } = props;

  const { completePreNote } = usePreNote(reviewId);

  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      completePreNote();

      // flushsync 필요하면 사용해야 함!
      handlePrevent(false);
      setIsOpenedModal(false);
      handleNavIndex("peri");
    } catch (err) {
      // 에러 알림이 필요할랑가 ..
    }
  };

  return (
    <>
      <StNextBtn
        type="button"
        disabled={!isFilled || bookNoteData.questionList.length === 0}
        onClick={() => setIsOpenedModal(true)}>
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
