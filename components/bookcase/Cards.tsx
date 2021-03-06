import styled from "@emotion/styled";

import { BookcaseInfo, BookcasePathKey } from "../../types/bookcase";
import { AddBookCard, BookCard } from ".";

interface CardsProps {
  navIndex: BookcasePathKey;
  bookcaseInfo: BookcaseInfo[];
}

export default function Cards(props: CardsProps) {
  const { navIndex, bookcaseInfo } = props;

  return (
    <StSection>
      <AddBookCard />
      {bookcaseInfo.map((bookcaseInfo: BookcaseInfo, idx: number) => (
        <BookCard key={idx} bookcaseInfo={bookcaseInfo} navIndex={navIndex} />
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
