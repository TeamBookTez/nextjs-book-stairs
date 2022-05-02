import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";

import { ImgDeletePopUp } from "../../../public/assets/images";
import { deleteData } from "../../core/api";
import LocalStorage from "../../core/localStorage";
import { StBtnCancel, StBtnDelete, StBtnWrapper, StDetail, StPopUp, StPopUpWrapper, StQuestion } from "./styled/PopUp";

interface PopUpDeleteProps {
  onPopUp: () => void;
  pathKey: string;
  reviewId: string;
}

export default function PopUpDelete(props: PopUpDeleteProps) {
  const { onPopUp, pathKey, reviewId } = props;

  const { mutate } = useSWRConfig();
  const router = useRouter();

  const userToken = LocalStorage.getItem("booktez-token");

  const handleDelete = async () => {
    await deleteData(`/review/${reviewId}`, userToken);

    onPopUp();
    mutate(pathKey);

    if (router.pathname === "/book-note/detail-book-note") {
      router.push("/main/bookcase");
    }
  };

  return (
    <StPopUpWrapper>
      <StPopUp>
        <StImgWrapper>
          <Image src={ImgDeletePopUp} alt="독서 전 단계 완료" />
        </StImgWrapper>
        <StQuestion>삭제하시겠어요?</StQuestion>
        <StDetail>삭제한 기록은 복구가 어려워요!</StDetail>
        <StBtnWrapper>
          <StBtnCancel type="button" onClick={onPopUp}>
            취소
          </StBtnCancel>
          <StBtnDelete id="btn_delete" type="button" onClick={handleDelete}>
            삭제
          </StBtnDelete>
        </StBtnWrapper>
      </StPopUp>
    </StPopUpWrapper>
  );
}

const StImgWrapper = styled.div`
  width: 12.6rem;
  height: 12.6rem;

  margin-bottom: 2.1rem;
`;
