import styled from "@emotion/styled";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useGetBookInfo } from "../../util/api";
import { Empty } from "../common";

export default function RecentBooks() {
  const [isFulFilled, setIsFulFilled] = useState<boolean>(false);
  const { bookcaseInfo, isLoading, isError } = useGetBookInfo("/book");

  const isWideDesktopScreen = useMediaQuery({
    query: "(min-width: 1920px) ",
  });
  const isWideWideDesktopScreen = useMediaQuery({
    query: "(min-width: 2560px) ",
  });
  const cntRecentBooks = isWideWideDesktopScreen ? 8 : isWideDesktopScreen ? 6 : 5;

  useEffect(() => {
    if (bookcaseInfo && bookcaseInfo.length && !isError) {
      setIsFulFilled(true);
    } else {
      setIsFulFilled(false);
    }
  }, [bookcaseInfo]);

  return (
    <section>
      <>
        <StHeader>
          <StHeading3>최근 작성한 북노트</StHeading3>
          {isFulFilled && (
            <Link href="/main/bookcase">
              <StLink>전체보기</StLink>
            </Link>
          )}
        </StHeader>
        <StBookWrapper isdefault={!isFulFilled}>
          {/* {isFulFilled ? (
            bookcaseInfo &&
            bookcaseInfo
              .slice(0, cntRecentBooks)
              .map((tempInfo, idx) => <BookCard key={idx} bookcaseInfo={tempInfo} pathKey="/book" />)
          ) : (
            <Empty />
          )} */}
        </StBookWrapper>
      </>
    </section>
  );
}

const StHeader = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin: 0 4rem;
  padding-top: 6rem;
  padding-bottom: 1.4rem;
`;

const StHeading3 = styled.h3`
  color: ${({ theme }) => theme.colors.gray100};
  ${({ theme }) => theme.fonts.header3}
`;

const StLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 8.8rem;
  height: 3.6rem;

  border: 0.2rem solid ${({ theme }) => theme.colors.gray300};
  border-radius: 2.4rem;

  background-color: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.gray300};
  ${({ theme }) => theme.fonts.button2};
`;

const StBookWrapper = styled.section<{ isdefault: boolean }>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({ isdefault }) => (isdefault ? "column" : "row")};
  align-items: center;
  justify-content: ${({ isdefault }) => (isdefault ? "center" : "normal")};

  margin-left: 2rem;
`;
