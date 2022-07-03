import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

import { navigatingBookInfoState } from "../../../core/atom";
import { IcBin } from "../../../public/assets/icons";
import { BookcaseInfo, BookcasePathKey } from "../../../types/bookcase";
import useUser from "../../../util/hooks/useUser";
import { PopUpDelete } from "../../common";
import { StBookCardImgWrapper } from "../../common/styled/Img";

interface BookCardProps {
  bookcaseInfo: BookcaseInfo;
  navIndex: BookcasePathKey;
}

export default function BookCard(props: BookCardProps) {
  const { bookcaseInfo, navIndex } = props;
  const { author, reviewId, thumbnail, title } = bookcaseInfo;
  const { isLogin } = useUser();

  const [isPopUp, setIsPopUp] = useState(false);
  const router = useRouter();

  const setNavigatingBookInfo = useSetRecoilState(navigatingBookInfoState);

  // 홈에 대한 예외 처리
  const handleTogglePopUp = () => {
    setIsPopUp((isPopUp) => !isPopUp);
  };

  const moveBookNoteHandler = () => {
    if (!isLogin) return;

    const tempNavigatingBookInfo = { reviewId, title, fromUrl: router.pathname, fromSt: navIndex };

    setNavigatingBookInfo(tempNavigatingBookInfo);
    if (navIndex === "/book/post") {
      router.push(`book-note/${reviewId}/detail`);
    } else {
      router.push(`book-note/${reviewId}`);
    }
  };

  return (
    <StCardWrapper>
      <StBookCard onClick={moveBookNoteHandler}>
        <StImgWrapper thumbnail={thumbnail} />
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
      {isPopUp && <PopUpDelete onTogglePopUp={handleTogglePopUp} navIndex={navIndex} reviewId={reviewId} />}
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

const StImgWrapper = styled(StBookCardImgWrapper)`
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
