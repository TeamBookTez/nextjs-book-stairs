import styled from "@emotion/styled";

import { BookcaseInfo } from "../../types/bookcase";
import useBookcase from "../../util/hooks/useBookcase";
import { Loading } from "../common";
import { AddBookCard, BookCard, NoCards } from ".";

export default function Cards() {
  const { navIndex, bookcaseInfo, isLoading, isError } = useBookcase();

  if (isLoading) {
    return <Loading />;
  }

  if (!bookcaseInfo || !bookcaseInfo.length || isError) {
    return <NoCards />;
  }

  return (
    <StSection>
      <AddBookCard />
      {bookcaseInfo.map((bookcaseInfo: BookcaseInfo, idx: number) => (
        <BookCard key={idx} bookcaseInfo={bookcaseInfo} navIndex={navIndex.key} />
      ))}
    </StSection>
  );
}

const StSection = styled.section`
  display: flex;
  flex-wrap: wrap;

  width: 100%;

  padding-top: 3.2rem;
  padding-left: 2rem;
`;
