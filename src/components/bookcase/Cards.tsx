import styled from "@emotion/styled";

import { useGetBookInfo } from "../../core/api";
import { BookcaseInfo, BookcasePathKey } from "../../types/bookcase";
import { Loading } from "../common";
import { AddBookCard, BookCard } from ".";
import Empty from "./cardSection/Empty";

interface CardsProps {
  navIndex: BookcasePathKey;
}

export default function Cards(props: CardsProps) {
  const { navIndex } = props;
  const { bookcaseInfo, isLoading, isError } = useGetBookInfo(navIndex);

  if (isLoading) {
    return <Loading />;
  } else if (!bookcaseInfo || isError || bookcaseInfo.length === 0) {
    return (
      <StDefaultSection>
        <Empty navIndex={navIndex} />
      </StDefaultSection>
    );
  } else {
    return (
      <StSection>
        <AddBookCard />
        {bookcaseInfo.map((bookcaseInfo: BookcaseInfo, idx: number) => (
          <BookCard key={idx} bookcaseInfo={bookcaseInfo} navIndex={navIndex} />
        ))}
      </StSection>
    );
  }
}

const StDefaultSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  height: calc(100vh - 19.7rem);
`;

const StSection = styled.section`
  display: flex;
  flex-wrap: wrap;

  width: 100%;

  padding-top: 3.2rem;
  padding-left: 2rem;
`;
