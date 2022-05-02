import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import { useGetBookInfo } from "../../core/api";
import { BookcaseInfo } from "../../types/bookcase";
import { Loading } from "../common";
import { AddBookCard, BookCard } from ".";
import Empty from "./cardSection/Empty";

interface CardsProps {
  navIndex: number;
}

export default function Cards(props: CardsProps) {
  const { navIndex } = props;
  const [pathKey, setPathKey] = useState<string>("");
  const { bookcaseInfo, isLoading, isError } = useGetBookInfo(pathKey);

  useEffect(() => {
    switch (navIndex) {
      case 1:
        setPathKey("/book/pre");
        break;
      case 2:
        setPathKey("/book/peri");
        break;
      case 3:
        setPathKey("/book/post");
        break;
      default:
        setPathKey("/book");
    }
  }, [navIndex]);

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
        {/* {bookcaseInfo.map((bookcaseInfo: BookcaseInfo, idx: number) => (
          <BookCard key={idx} bookcaseInfo={bookcaseInfo} pathKey={pathKey} />
        ))} */}
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
