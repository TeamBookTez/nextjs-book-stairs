import styled from "@emotion/styled";

interface BooksNumProps {
  reviewCount: number;
}

export default function BookComment(props: BooksNumProps) {
  const { reviewCount } = props;
  const readComment =
    reviewCount < 10 ? (
      <>
        <StNowcomment>지금까지</StNowcomment>
        <StReadcomment>권 책을 읽었어요</StReadcomment>
      </>
    ) : (
      <StReadcomment>
        권의 {reviewCount < 100 && "\n"}
        책을 읽었어요
      </StReadcomment>
    );

  return (
    <>
      <StBooksNum>{reviewCount}</StBooksNum>
      <StWrapper>{readComment}</StWrapper>
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
