import styled from "@emotion/styled";
import { useContext } from "react";

import { useGetBookInfo } from "../../core/api/api";
import { BookcaseInfo } from "../../types/bookcase";
import { BookcaseNavigationContext } from "../../util/bookcaseContext";
import { Loading } from "../common";
import { AddBookCard, BookCard, NoCards } from ".";
export default function Cards() {
  const { navIndex } = useContext(BookcaseNavigationContext);
  const { bookcaseInfo, isLoading, isError } = useGetBookInfo();

  if (isLoading) {
    return <Loading />;
  } else if (!bookcaseInfo || !bookcaseInfo.length || isError) {
    return <NoCards />;
  } else {
    return (
      <StSection>
        <AddBookCard />
        {bookcaseInfo.map((bookcaseInfo: BookcaseInfo, idx: number) => (
          <BookCard key={idx} bookcaseInfo={bookcaseInfo} navIndex={navIndex.key} />
        ))}
      </StSection>
    );
  }
}

const StSection = styled.section`
  display: flex;
  flex-wrap: wrap;

  width: 100%;

  padding-top: 3.2rem;
  padding-left: 2rem;
`;
