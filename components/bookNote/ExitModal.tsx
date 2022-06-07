import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useRecoilValue } from "recoil";

import { navigatingBookInfoState } from "../../core/atom";
import { ImgExit } from "../../public/assets/images";
import {
  StBtnCancel,
  StBtnDelete,
  StBtnWrapper,
  StDetail,
  StPopUp,
  StPopUpWrapper,
  StQuestion,
} from "../common/styled/PopUp";

interface ExitModalProps {
  onClickCancelBtn: () => void;
}

export default function ExitModal(props: ExitModalProps) {
  const { onClickCancelBtn } = props;

  const navigatingBookInfo = useRecoilValue(navigatingBookInfoState);
  const { fromUrl } = navigatingBookInfo;

  return (
    <StPopUpWrapper>
      <StPopUp>
        <StImg src={ImgExit} alt="페이지 나가기" />
        <StQuestion>현재 페이지에서 나가시겠어요?</StQuestion>
        <StDetail>변경사항이 저장되지 않을 수도 있어요!</StDetail>
        <StBtnWrapper>
          <StBtnCancel type="button" onClick={onClickCancelBtn}>
            취소
          </StBtnCancel>
          <StBtnDelete type="button">
            <StLink href={fromUrl} passHref>
              나가기
            </StLink>
          </StBtnDelete>
        </StBtnWrapper>
      </StPopUp>
    </StPopUpWrapper>
  );
}

const StImg = styled(Image)`
  margin-bottom: 1.2rem;
`;

const StLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;
