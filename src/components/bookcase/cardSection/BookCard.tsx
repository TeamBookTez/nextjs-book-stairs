import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { IcBin } from "../../../../public/assets/icons";
import { isLoginState, navigatingBookInfoState } from "../../../core/atom";
import { BookcaseInfo } from "../../../types/bookcase";
import { PopUpDelete } from "../../common";
import { StBookCardImgWrapper } from "../../common/styled/Img";

interface BookCardProps {
  bookcaseInfo: BookcaseInfo;
  pathKey: string;
}

export default function BookCard(props: BookCardProps) {
  const { bookcaseInfo, pathKey } = props;
  const { author, reviewId, thumbnail, title, reviewSt } = bookcaseInfo;

  const [isPopUp, setIsPopUp] = useState(false);
  const isLogin = useRecoilValue(isLoginState);
  const setNavigatingBookInfo = useSetRecoilState(navigatingBookInfoState);
  const router = useRouter();

  const reviewUrl = reviewSt === 2 ? "/book-note" : reviewSt === 3 ? "/book-note/peri" : "/book-note/detail-book-note";

  let fromSt = 0;

  switch (pathKey) {
    case "/book":
      fromSt = 0;
      break;
    case "/book/pre":
      fromSt = 1;
      break;
    case "/book/peri":
      fromSt = 2;
      break;
    case "/book/post":
      fromSt = 3;
      break;
    default:
      break;
  }

  // 홈에 대한 예외 처리
  const handleTogglePopUp = () => {
    setIsPopUp((isPopUp) => !isPopUp);
  };

  const moveBookNoteHandler = () => {
    if (!isLogin) return;

    const tempNavigatingBookInfo = { reviewId, title, fromUrl: router.pathname, fromSt };

    setNavigatingBookInfo(tempNavigatingBookInfo);
    router.push(reviewUrl);
  };

  return (
    <StCardWrapper>
      <StBookCard onClick={moveBookNoteHandler}>
        <StImgWrapper>
          <StBookCardImgWrapper>
            <Image src={thumbnail} alt={`도서 ${title}의 이미지`} />
          </StBookCardImgWrapper>
        </StImgWrapper>
        <StTextWrapper>
          <StTitleWrapper>
            <StCardTitle>{title}</StCardTitle>
            <StCardAuthor>
              {author.length > 2 ? (
                <>
                  {author[0]} 외 {author.length - 1}명
                </>
              ) : (
                <>
                  {author[0]} {author[1]}
                </>
              )}
            </StCardAuthor>
          </StTitleWrapper>
        </StTextWrapper>
      </StBookCard>
      <StIcBin onClick={handleTogglePopUp} />
      {isPopUp && <PopUpDelete onTogglePopUp={handleTogglePopUp} pathKey={pathKey} reviewId={reviewId} />}
    </StCardWrapper>
  );
}

const StCardWrapper = styled.div`
  position: relative;

  border-radius: 1.6rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.orange200};
    cursor: pointer;

    & > svg {
      display: block;
    }
  }
`;

const StBookCard = styled.article`
  display: flex;
  flex-direction: column;

  width: 24.5rem;
  height: 39.3rem;

  padding: 1.6rem 2rem;

  &:hover > div > header {
    width: 16.8rem;
  }
`;

const StImgWrapper = styled.div`
  width: 20.5rem;
  height: 30rem;

  margin-bottom: 1.6rem;

  border: 0.2rem solid ${({ theme }) => theme.colors.white400};
  border-radius: 1.6rem;

  overflow: hidden;
`;

const StTextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StTitleWrapper = styled.header`
  width: 100%;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StCardTitle = styled.strong`
  ${({ theme }) => theme.fonts.body1}
  color: ${({ theme }) => theme.colors.gray100};
`;

const StCardAuthor = styled.p`
  ${({ theme }) => theme.fonts.body6}
  color: ${({ theme }) => theme.colors.gray300};

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StIcBin = styled(IcBin)`
  position: absolute;
  right: 2.2rem;
  bottom: 2.2rem;

  display: none;
`;
