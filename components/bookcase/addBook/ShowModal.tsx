import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

import { navigatingBookInfoState } from "../../../core/atom";
import { baseInstance } from "../../../core/axios";
import { BookInfo } from "../../../pages/bookcase/add-book";
import { IcCancelBlack } from "../../../public/assets/icons";
import { DefaultButton } from "../../common/styled/Button";
import { ImageWrapper } from "../../common/styled/Img";
import { PublishDate } from "./BookInfoWrapper";

interface ShowModalProps {
  bookInfo: BookInfo;
  publishDate: PublishDate;
  onToggleModal: () => void;
}

export default function ShowModal(props: ShowModalProps) {
  const { bookInfo, publishDate, onToggleModal } = props;
  const { thumbnail, title, authors, translators } = bookInfo;

  const [navigatingBookInfo, setNavigatingBookInfo] = useRecoilState(navigatingBookInfoState);

  const publicationDt = `${publishDate["year"]}년 ${publishDate["month"]}월 ${publishDate["date"]}일`;

  const bookData = { ...bookInfo, publicationDt, author: authors, translator: translators };

  const _token = localStorage.getItem("booktez-token");
  const userToken = _token ? _token : "";

  const router = useRouter();

  const postAddBooks = async () => {
    const { data } = await baseInstance.post("/book", bookData);

    if (!userToken) {
      const { isbn, thumbnail, title, authors, translators, publicationDt } = bookData;

      sessionStorage.setItem(
        "booktez-bookData",
        JSON.stringify({
          isbn,
          thumbnail,
          title,
          author: authors,
          translator: translators,
          publicationDt,
        }),
      );
    }

    const tempNavigatingBookInfo = {
      ...navigatingBookInfo,
      reviewId: data.reviewId,
      title,
      fromUrl: "/bookcase/add-book",
    };

    setNavigatingBookInfo(tempNavigatingBookInfo);
    router.push(`/book-note/${data.reviewId}`);
  };

  const participantInfo = (participants: string[], inCharge: "지음" | "옮김") => {
    console.log("participants.length", participants.length);
    let result = "";

    switch (participants.length) {
      case 0:
        return "";
      case 1:
        result = `${participants[0]} `;
        break;
      case 2:
        result = `${participants[0]} ${participants[1]} `;
        break;
      default:
        result = `${participants[0]} 외 ${participants.length - 1}명 `;
    }
    console.log("result", result);

    return result + inCharge;
  };

  return (
    <>
      <StIcCancel onClick={onToggleModal} />
      <StModalThumbnail
        thumbnail={
          thumbnail ? thumbnail : "https://bookstairs-bucket.s3.ap-northeast-2.amazonaws.com/defaultBookImg.png"
        }
      />
      <StModalTitle>{title}</StModalTitle>
      <StModalLabelWrapper>
        <StModalLabel>{participantInfo(authors, "지음")}</StModalLabel>
        {translators.length > 0 && (
          <StModalLabel>
            <StDivideLine>|</StDivideLine>
            {participantInfo(translators, "옮김")}
          </StModalLabel>
        )}
      </StModalLabelWrapper>
      <StModalDate>{publicationDt} 출간</StModalDate>
      <StWriteBtn onClick={postAddBooks} id="start_reading_book">
        독서 시작
      </StWriteBtn>
    </>
  );
}

const StModalThumbnail = styled(ImageWrapper)`
  margin-bottom: 3.5rem;

  border: 0.2rem solid ${({ theme }) => theme.colors.white400};
  border-radius: 1.6rem;

  width: 20.5rem;
  height: 30rem;
`;

const StModalTitle = styled.strong`
  margin-bottom: 0.5rem;

  ${({ theme }) => theme.fonts.header0};
`;

const StModalLabelWrapper = styled.div`
  display: flex;
  margin-bottom: 2.1rem;
`;

const StModalLabel = styled.p`
  color: ${({ theme }) => theme.colors.gray400};
  ${({ theme }) => theme.fonts.body0};
`;

const StDivideLine = styled.span`
  margin: 0 0.5rem;
`;

const StModalDate = styled.p`
  margin-bottom: 2.8rem;

  color: ${({ theme }) => theme.colors.white500};
  ${({ theme }) => theme.fonts.body2};
`;

const StWriteBtn = styled(DefaultButton)`
  width: 16.6rem;
  height: 5.6rem;

  border-radius: 1rem;

  ${({ theme }) => theme.fonts.button};
`;

const StIcCancel = styled(IcCancelBlack)`
  position: absolute;
  top: 3.2rem;
  left: 2.4rem;
  z-index: 20;

  width: 4.8rem;
  height: 4.8rem;

  &:hover {
    cursor: pointer;
  }
`;
