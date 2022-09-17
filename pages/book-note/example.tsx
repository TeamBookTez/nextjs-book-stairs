import styled from "@emotion/styled";
import Link from "next/link";
import { useState } from "react";

import { StepUpLayout } from "../../components/bookNote";
import {
  DetailArticleWrapper,
  DetailArticleWrapperLabeling,
  ExamplePeriNote,
  ExamplePreNoteLabeling,
} from "../../components/bookNote/detail";
import {
  StBookTitle,
  StIcCancelWhite,
  StNoteModalWrapper,
  StStepModalWrapper,
} from "../../components/bookNote/styled/DetailBookNote.styled";
import { Loading } from "../../components/common";
import { periNoteStepUp, reviewData } from "../../core/bookNote/exampleData";
import useUser from "../../util/hooks/useUser";

export default function Example() {
  const [isStepUpModalOpen, setIsOpenedStepUpModal] = useState(false);
  const { isLogin, isLoginLoading } = useUser();

  const handleOpenedStepUpCarousel = () => {
    setIsOpenedStepUpModal(!isStepUpModalOpen);
  };

  if (isLoginLoading) return <Loading />;

  return (
    <StNoteModalWrapper>
      <Link href="/main" passHref>
        <StIcCancelWhite />
      </Link>
      <StBookTitleUp>{reviewData?.bookTitle}</StBookTitleUp>
      <DetailArticleWrapper title="독서 전 단계">
        <ExamplePreNoteLabeling
          answerOne={reviewData?.answerOne}
          answerTwo={reviewData?.answerTwo}
          questionList={reviewData?.questionList}
        />
      </DetailArticleWrapper>
      {isLogin && (
        <StMarginTop>
          <DetailArticleWrapperLabeling title="독서 중 단계" handlePeriCarousel={handleOpenedStepUpCarousel}>
            <ExamplePeriNote answerThree={reviewData?.answerThree} />
          </DetailArticleWrapperLabeling>
        </StMarginTop>
      )}
      {isStepUpModalOpen && (
        <StStepModalWrapper>
          <StepUpLayout stepUpContent={periNoteStepUp} onClickModalCancel={handleOpenedStepUpCarousel} />
        </StStepModalWrapper>
      )}
    </StNoteModalWrapper>
  );
}

const StBookTitleUp = styled(StBookTitle)`
  margin-bottom: 7.2rem;
`;

const StMarginTop = styled.div`
  margin-top: 8.3rem;
`;
