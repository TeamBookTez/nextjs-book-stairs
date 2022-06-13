/*
마지막 편집자: 22-06-13 joohaem
변경사항 및 참고:
  - ableGoPeri : peri로 넘어가기 전에 pre 데이터 제대로 patch 되었는지 확인 용도
  - flushSync 확인해야 함
  
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
import LocalStorage from "../../../core/localStorage";
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
  const userToken = LocalStorage.getItem("booktez-token");

  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);

  // const [ableGoPeri, setAbleGoPeri] = useState<boolean>(true);

  const handleSubmit = async () => {
    // setAbleGoPeri(true);

    try {
      if (!bookNoteData.finishSt) {
        // 수정 중이 아니라면, 독서중으로
        patchBookNote(userToken, `/review/${reviewId}/pre`, { ...bookNoteData, reviewSt: 3 });
      } else {
        patchBookNote(userToken, `/review/${reviewId}/pre`, bookNoteData);
      }

      // flushSync(() => {
      handlePrevent(false);
      setIsOpenedModal(false);
      // if (ableGoPeri) handleNavIndex("peri");
      handleNavIndex("peri");
      // });
    } catch (err) {
      console.log(err); // 토스트 알림이 필요할랑가 ..
    }

    // if (bookNoteData.reviewSt === 2) {
    //   const questionFromPre: PeriNoteTreeNode[] = [];

    //   bookNoteData.questionList.map((content) => {
    //     questionFromPre.push({ type: "question", content, children: [{ type: "answer", content: "", children: [] }] });
    //   });

    //   // setAbleGoPeri(false);
    //   const resData = await patchBookNote(userToken, `review/${reviewId}/peri`, {
    //     answerThree: {
    //       type: "Root",
    //       content: "root",
    //       children: questionFromPre,
    //     },
    //     reviewSt: 3,
    //     finishSt: false,
    //   });

    //   if (resData) {
    //     setAbleGoPeri(true);
    //   }
    // }
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
