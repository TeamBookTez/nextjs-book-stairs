import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";

import { BookInfo } from "../../../pages/bookcase/add-book";
import { escapeHtml } from "../../../util/escape";
import { StBookCardImgWrapper } from "../../common/styled/Img";
import ModalWrapper from "./ModalWrapper";
import ShowModal from "./ShowModal";

export interface PublishDate {
  year: string;
  month: string;
  date: string;
}

interface BookInfoWrapperProps {
  book: BookInfo;
  selectedBookIsbn: string;
  onClickBookCard: (isbn: string) => void;
  onResetSelectedBookIsbn: () => void;
}

export default function BookInfoWrapper(props: BookInfoWrapperProps) {
  const { book, selectedBookIsbn, onClickBookCard, onResetSelectedBookIsbn } = props;
  const { isbn, thumbnail, title, authors, datetime, contents } = book;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const publishDate: PublishDate = {
    year: datetime.toString().slice(0, 4),
    month: datetime.toString().slice(5, 7),
    date: datetime.toString().slice(8, 10),
  };

  const toggleModal = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  useEffect(() => {
    if (selectedBookIsbn !== "" && selectedBookIsbn === isbn) {
      toggleModal();
      onResetSelectedBookIsbn();
    }
  }, [selectedBookIsbn]);

  return (
    <>
      <StArticle onClick={() => onClickBookCard(book.isbn)}>
        <StThumbnailWrapper
          thumbnail={
            thumbnail ? thumbnail : "https://bookstairs-bucket.s3.ap-northeast-2.amazonaws.com/defaultBookImg.png"
          }
        />
        <StInfoWrapper>
          <InfoTitle>{title}</InfoTitle>
          <InfoLabelWrapper>
            {authors.length > 0 && (
              <>
                <InfoLabel>
                  {authors.length > 2 ? `${authors[0]} 외 ${authors.length - 1}명` : `${authors[0]}`}
                </InfoLabel>
                <DivideLine />
              </>
            )}
            <InfoLabel>
              {publishDate.year}년 {publishDate.month}월 {publishDate.date}일
            </InfoLabel>
          </InfoLabelWrapper>
          <InfoSummary>{escapeHtml(contents)}</InfoSummary>
        </StInfoWrapper>
      </StArticle>

      {isModalOpen && (
        <ModalWrapper>
          <ShowModal onToggleModal={toggleModal} bookInfo={book} publishDate={publishDate} />
        </ModalWrapper>
      )}
    </>
  );
}

const StArticle = styled.article`
  display: flex;
  padding: 1.6rem 8.1rem 1.6rem 1.6rem;

  border-radius: 1.6rem;
  height: 20.1rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.orange200};
    cursor: pointer;
  }
`;

const StThumbnailWrapper = styled(StBookCardImgWrapper)`
  margin-right: 1.6rem;
  border-radius: 0.8rem;

  width: 12.1rem;
  height: 16.9rem;
`;

const StInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding-top: 1.5rem;
  width: 100%;
`;

const InfoTitle = styled.strong`
  ${({ theme }) => theme.fonts.header2};
`;

const InfoLabelWrapper = styled.div`
  display: flex;
  align-items: center;

  height: 2.1rem;
`;

const InfoLabel = styled.p`
  color: ${({ theme }) => theme.colors.gray300};

  ${({ theme }) => theme.fonts.body6};

  line-height: 2.1rem; //감싸고 있는 부모의 div 높이인 2.1rem만큼 주어서 중앙에 오도록 설정(미세한 오차는 있음) - 씨에스에스 이주함 선생 -
`;

const DivideLine = styled.div`
  margin: 0 1.2rem;

  background-color: ${({ theme }) => theme.colors.white500};

  width: 0.1rem;
  height: 1.1rem;
`;

const InfoSummary = styled.p`
  color: ${({ theme }) => theme.colors.gray300};

  ${({ theme }) => theme.fonts.body4};

  max-height: 8.1rem;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
