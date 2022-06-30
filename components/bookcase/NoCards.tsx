import styled from "@emotion/styled";

import { BookcasePathKey } from "../../types/bookcase";
import Empty from "./cardSection/Empty";

interface NoCardsProps {
  navIndex: BookcasePathKey;
}
export default function NoCards(props: NoCardsProps) {
  const { navIndex } = props;

  return (
    <StDefaultSection>
      <Empty navIndex={navIndex} />
    </StDefaultSection>
  );
}

const StDefaultSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  height: calc(100vh - 19.7rem);
`;
