import styled from "@emotion/styled";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

import { checkIsBookExist } from "../../../core/api/api";
import { navigatingBookInfoState } from "../../../core/atom";
import { BookInfo } from "../../../pages/bookcase/add-book";
import useToast from "../../../util/hooks/useToast";
import AlertToast from "./AlertToast";
import BookEmpty from "./BookEmpty";
import BookInfoWrapper from "./BookInfoWrapper";

interface BookListProps {
  isLogin: boolean;
  books: BookInfo[];
}

export interface ServerError {
  error: boolean;
  exist: boolean;
  message: string;
}

export default function BookList(props: BookListProps) {
  const { isLogin, books } = props;

  const setNavigatingBookInfo = useSetRecoilState(navigatingBookInfoState);

  const { isToastAlertTime, setIsToastAlertTime } = useToast();
  const [selectedBookIsbn, setSelectedBookIsbn] = useState<string>("");
  const [isServerError, setIsServerError] = useState<ServerError>({
    error: false,
    exist: false,
    message: "",
  });

  const closeAlertToast = () => {
    setIsToastAlertTime(false);
  };

  const resetSelectedBookIsbn = () => {
    setSelectedBookIsbn("");
  };

  const handleClickBookCard = (isbn: string) => {
    if (!isLogin) return setSelectedBookIsbn(isbn);

    checkIsBookExist(isbn).then((result) => {
      const { isError, isExist, message } = result;

      setIsServerError((prev) => {
        return { ...prev, error: isError, exist: isExist, message };
      });

      if (isError || isExist) {
        // 에러가 존재할 경우
        // 에러 토스트 띄우기 - 모종의 이유로 실패한 경우
        setIsToastAlertTime(true);
      } else {
        // 모든 상황을 통과
        setSelectedBookIsbn(isbn);
        setNavigatingBookInfo((current) => ({ ...current, reviewSt: 2 }));
      }
    });
  };

  if (books.length === 0) return <BookEmpty />;

  return (
    <StListWrapper>
      {books.map((book: BookInfo, idx: number) => (
        <BookInfoWrapper
          key={idx}
          book={book}
          selectedBookIsbn={selectedBookIsbn}
          onClickBookCard={handleClickBookCard}
          onResetSelectedBookIsbn={resetSelectedBookIsbn}
        />
      ))}
      {isToastAlertTime ? <AlertToast onCloseAlertToast={closeAlertToast} isServerError={isServerError} /> : null}
    </StListWrapper>
  );
}

const StListWrapper = styled.section`
  margin: 0 4rem 2.9rem 4rem;
`;
