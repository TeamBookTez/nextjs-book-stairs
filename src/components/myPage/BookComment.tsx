import styled from "@emotion/styled";

interface BooksNumProps {
  reviewCount: number;
}

export default function BookComment(props: BooksNumProps) {
  const { reviewCount } = props;
  const nowComment = "지금까지";

  return (
    <>
      <StBooksNum>{reviewCount}</StBooksNum>
      <StWrapper>
        {reviewCount < 10 && <StNowcomment>{nowComment}</StNowcomment>}
        <StReadcomment>
          권{reviewCount < 10 ? <>&nbsp;</> : <>의&nbsp;</>}
          {10 <= reviewCount && reviewCount < 100 && <br />}
          책을 읽었어요
        </StReadcomment>
      </StWrapper>
    </>
  );
}

const StBooksNum = styled.strong`
  margin-right: 1.2rem;

  ${({ theme }) => theme.fonts.header};
  color: ${({ theme }) => theme.colors.gray200};
`;

const StWrapper = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${({ theme }) => theme.fonts.body0};
  color: ${({ theme }) => theme.colors.gray200};

  & > span {
    ${({ theme }) => theme.fonts.header4};
  }
`;

const StNowcomment = styled.span``;
const StReadcomment = styled.span``;
