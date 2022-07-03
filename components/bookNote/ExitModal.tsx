/*
마지막 편집자: 22-06-07 joohaem
변경사항 및 참고:
  - 
    
고민점:
  - 현재 "나가기" 버튼을 누르면, "navigatingBookInfo"의 "fromUrl"로
    서재 전/중/후로 url 이동을 하는데,
    url을 합쳐놓은 상태이기 때문에 새로운 정보 확인이 필요함
*/

import styled from "@emotion/styled";
import Link from "next/link";
import { useRecoilValue } from "recoil";

import { navigatingBookInfoState } from "../../core/atom";
import { ImgExit } from "../../public/assets/images";
import { ImageWrapper } from "../common/styled/Img";
import { StBtnCancel, StBtnWrapper, StDetail, StPopUp, StPopUpWrapper, StQuestion } from "../common/styled/PopUp";

interface ExitModalProps {
  onClickCancelBtn: () => void;
}

export default function ExitModal(props: ExitModalProps) {
  const { onClickCancelBtn } = props;

  const navigatingBookInfo = useRecoilValue(navigatingBookInfoState);
  const { reviewId, fromUrl } = navigatingBookInfo;

  return (
    <StPopUpWrapper>
      <StPopUp>
        <StImg thumbnail={ImgExit.src} />
        <StQuestion>현재 페이지에서 나가시겠어요?</StQuestion>
        <StDetail>변경사항이 저장되지 않을 수도 있어요!</StDetail>
        <StBtnWrapper>
          <StBtnCancel type="button" onClick={onClickCancelBtn}>
            취소
          </StBtnCancel>
          <Link
            href={{
              pathname: fromUrl,
              query: { reviewId },
            }}
            passHref>
            <StLink>나가기</StLink>
          </Link>
        </StBtnWrapper>
      </StPopUp>
    </StPopUpWrapper>
  );
}

const StImg = styled(ImageWrapper)`
  margin-bottom: 1.2rem;

  width: 19.2rem;
  height: 12.6rem;
`;

const StLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 0.8rem;

  ${({ theme }) => theme.fonts.button}
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.orange100};

  color: ${({ theme }) => theme.colors.white};

  width: 8rem;
  height: 4.6rem;

  cursor: pointer;
`;
