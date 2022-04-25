import styled from "@emotion/styled";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { useGetBookInfo } from "../../util/api";
import { Empty, Loading } from "../common";

export default function RecentBooks() {
  const [isAnyBooks, setIsAnyBooks] = useState<boolean>(false);
  const { bookcaseInfo, isLoading, isError } = useGetBookInfo("/book");

  const isWideDesktopScreen = useMediaQuery({
    query: "(min-width: 1920px) ",
  });
  const isWideWideDesktopScreen = useMediaQuery({
    query: "(min-width: 2560px) ",
  });
  const cntRecentBooks = isWideWideDesktopScreen ? 8 : isWideDesktopScreen ? 6 : 5;

  useEffect(() => {
    if (bookcaseInfo?.length && !isError) {
      setIsAnyBooks(true);
    } else {
      setIsAnyBooks(false);
    }
  }, [bookcaseInfo]);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <section>
        <>
          <StHeader>
            <StHeading3>최근 작성한 북노트</StHeading3>
            {isAnyBooks && (
              <Link href="/main/bookcase">
                <StLink>전체보기</StLink>
              </Link>
            )}
          </StHeader>
          <StBookWrapper isdefault={!isAnyBooks}>
            {isAnyBooks ? (
              bookcaseInfo &&
              bookcaseInfo
                .slice(0, cntRecentBooks)
                .map(
                  (tempInfo, idx) =>
                    /*<BookCard key={idx 말고 id 값} bookcaseInfo={tempInfo} pathKey="/book" />*/ "북카드",
                )
            ) : (
              <Empty />
            )}
          </StBookWrapper>
        </>
      </section>
    );
  }
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
