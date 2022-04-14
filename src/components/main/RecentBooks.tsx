import styled from "@emotion/styled";
import Link from "next/link";
import { useState } from "react";

import { Empty } from "../common";

export default function RecentBooks() {
  const [isFulFilled, setIsFulFilled] = useState<boolean>(false);

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
          <Empty />
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
  font-family: Pretendard;
  font-weight: 800;
  font-size: 2.2rem;
  line-height: 1.3;
  letter-spacing: -0.1rem;
  color: #242424;
`;

const StLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 8.8rem;
  height: 3.6rem;

  border: 0.2rem solid #555555;
  border-radius: 2.4rem;

  background-color: #ffffff;

  font-family: Pretendard;
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 1.3;
  letter-spacing: -0.1rem;
  color: #555555;
`;

const StBookWrapper = styled.section<{ isdefault: boolean }>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({ isdefault }) => (isdefault ? "column" : "row")};
  align-items: center;
  justify-content: ${({ isdefault }) => (isdefault ? "center" : "normal")};

  margin-left: 2rem;
`;
