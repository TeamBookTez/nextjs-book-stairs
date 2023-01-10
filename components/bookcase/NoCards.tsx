import styled from "@emotion/styled";

import Empty from "./cardSection/Empty";

export default function NoCards() {
  return (
    <StDefaultSection>
      <Empty />
    </StDefaultSection>
  );
}

const StDefaultSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  height: calc(100vh - 19.7rem);
`;
