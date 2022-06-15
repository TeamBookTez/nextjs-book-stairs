/*
마지막 편집자: 22-06-15 joohaem
변경사항 및 참고:
  - 
  
  고민점:
  - 

*/

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";
import { useRecoilValue } from "recoil";

import { patchBookNote } from "../../../core/api";
import { navigatingBookInfoState } from "../../../core/atom";
import { ImgPreBook } from "../../../public/assets/images";
import { BookNotePathKey, PreNoteData } from "../../../types/bookNote";
import { DefaultButton } from "../../common/styled/Button";
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
  bookNoteData: PreNoteData;
  isFilled: boolean;
  handlePrevent: (shouldPrevent: boolean) => void;
  handleNavIndex: (idx: BookNotePathKey) => void;
}

export default function PreNotePostSection(props: PreNotePostSectionProps) {
  const { isFilled, bookNoteData, handlePrevent, handleNavIndex } = props;

  const navigatingBookInfo = useRecoilValue(navigatingBookInfoState);
  const { reviewId } = navigatingBookInfo;

  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      if (bookNoteData.reviewSt === 2) {
        // 독서 전 상태라면, 독서 중 상태로 변경
        await patchBookNote(`/review/${reviewId}/pre`, { ...bookNoteData, reviewSt: 3 });
      } else {
        await patchBookNote(`/review/${reviewId}/pre`, bookNoteData);
      }

      // flushsync 필요하면 사용해야 함!
      handlePrevent(false);
      setIsOpenedModal(false);
      handleNavIndex("peri");
    } catch (err) {
      console.log(err); // 토스트 알림이 필요할랑가 ..
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
            <StImg src={ImgPreBook} alt="독서 전 단계 완료" />
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

const StImg = styled(Image)`
  margin-bottom: 1.3rem;
`;
