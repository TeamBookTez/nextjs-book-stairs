import { useEffect, useState } from "react";

import { AddBookDefault, BookList, SearchBar, StickyHeader } from "../../components/bookcase";
import { Loading } from "../../components/common";
import { MainLayout } from "../../components/layout";
import { MainHeader } from "../../components/main";
import { searchBook } from "../../core/api/api";
import { useDebounce } from "../../util/hooks/useDebounce";
import useUser from "../../util/hooks/useUser";

export interface BookInfo {
  thumbnail: string;
  title: string;
  authors: string[];
  translators: string[];
  datetime: Date | string;
  contents: string;
  isbn: string;
}

export default function AddBook() {
  const { query, debounceQuery, setDebounceQuery } = useDebounce<string>("");

  const [books, setBooks] = useState<BookInfo[]>([]);

  const { isLogin, isLoginLoading } = useUser();

  useEffect(() => {
    if (query.length > 0) {
      handleSearchBook(query, true); // 컴포넌트 마운트 후에, 함수를 호출한다.
    }
  }, [query]);

  const handleSearchBook = async (query: string, reset: boolean) => {
    const paramsAPI = {
      query,
      sort: "accuracy",
      // page: 1,
      size: 15,
    };

    const { data } = await searchBook(paramsAPI);

    if (reset) {
      setBooks(data.documents);
    } else {
      setBooks(books.concat(data.documents));
    }
  };

  const handleDebounceQuery = (tempQuery: string) => {
    setDebounceQuery(tempQuery);
  };

  const mainHeader = <MainHeader pageName="책추가" isLogin={isLogin} />;

  return (
    <>
      {isLoginLoading ? (
        <Loading />
      ) : (
        <MainLayout header={mainHeader}>
          <StickyHeader headerHeight={109}>
            <SearchBar debounceQuery={debounceQuery} onDebounceQuery={handleDebounceQuery} />
          </StickyHeader>
          {debounceQuery ? <BookList isLogin={isLogin} books={books} /> : <AddBookDefault />}
        </MainLayout>
      )}
    </>
  );
}
