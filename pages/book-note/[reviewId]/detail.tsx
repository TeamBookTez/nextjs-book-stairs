/*
마지막 편집자: 22-06-15 joohaem
변경사항 및 참고:
  - 북노트 독서 전 : book-note/asdf
  - 북노트 독서 중 : book-note/asdf
  - 북노트 독서 후 : book-note/asdf/detail
  - 북노트 예시 페이지 : book-note/example
    
고민점:
  - 
*/

import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { DetailArticleWrapper, ExamplePeriNote } from "../../../components/bookNote/detail";
import ExamplePreNote from "../../../components/bookNote/detail/ExamplePreNote";
import {
  StBookTitle,
  StIcCancelWhite,
  StNoteModalWrapper,
} from "../../../components/bookNote/styled/DetailBookNote.styled";
import { Loading, PopUpDelete } from "../../../components/common";
import { getData } from "../../../core/api";
import { navigatingBookInfoState } from "../../../core/atom";
import { IcDeleteNote, IcModifyNote } from "../../../public/assets/icons";
import { ReviewData } from "../../../types/bookNote";

export default function Detail() {
  const [reviewData, setReviewData] = useState<ReviewData>({
    bookTitle: "",
    answerOne: "",
    answerTwo: "",
    answerThree: { type: "Root", content: "root", children: [] },
    questionList: [""],
  });
  const [isPopUp, setIsPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [navigatingBookInfo, setNavigatingBookInfo] = useRecoilState(navigatingBookInfoState);
  const { reviewId, fromUrl } = navigatingBookInfo;

  const router = useRouter();

  useEffect(() => {
    getReview(`review/${reviewId}`);
  }, []);

  const getReview = async (key: string) => {
    try {
      const { data } = await getData(key);

      setReviewData(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePopUp = () => {
    setIsPopUp((isPopUp) => !isPopUp);
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <StNoteModalWrapper>
        {isPopUp || (
          <Link href={fromUrl} passHref>
            <StIcCancelWhite />
          </Link>
        )}
        <StBookTitle>{reviewData?.bookTitle}</StBookTitle>
        <StBtnWrapper>
          <IcDeleteNote onClick={handlePopUp} />
          <IcModifyNote
            onClick={() => {
              const tempNavigatingBookInfo = {
                ...navigatingBookInfo,
                reviewId,
                title: reviewData?.bookTitle,
                fromUrl,
              };

              setNavigatingBookInfo(tempNavigatingBookInfo);
              router.push(`/book-note/${reviewId}`);
            }}
            id="btn_update"
          />
        </StBtnWrapper>
        <DetailArticleWrapper title="독서 전 단계">
          <ExamplePreNote
            answerOne={reviewData?.answerOne}
            answerTwo={reviewData?.answerTwo}
            questionList={reviewData?.questionList}
          />
        </DetailArticleWrapper>
        <StMarginTop>
          <DetailArticleWrapper title="독서 중 단계">
            {reviewData?.answerThree && <ExamplePeriNote answerThree={reviewData.answerThree} />}
          </DetailArticleWrapper>
        </StMarginTop>
      </StNoteModalWrapper>

      {isPopUp ? <PopUpDelete onTogglePopUp={handlePopUp} navIndex="/book" reviewId={reviewId} /> : <></>}
    </>
  );
}

const StBtnWrapper = styled.div`
  text-align: right;

  & > svg {
    &:hover {
      cursor: pointer;
    }
  }
  & > svg:not(:first-of-type) {
    margin-left: 1.4rem;
  }
`;

const StMarginTop = styled.div`
  margin-top: 8.3rem;
`;
