import styled from "@emotion/styled";

import { BookcasePathKey } from "../../types/bookcase";
import { Empty } from "../common";

interface NoCardsProps {
  navIndex: BookcasePathKey;
}
export default function NoCards(props: NoCardsProps) {
  const { navIndex } = props;

  return (
    <StDefaultSection>
      <Empty
        text={navIndex === "/book" ? "아직 읽은 책이 없어요." : "이 단계의 책이 없어요."}
        buttonVisible={navIndex === "/book"}
      />
    </StDefaultSection>
  );
}

const StDefaultSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  height: calc(100vh - 19.7rem);
`;
