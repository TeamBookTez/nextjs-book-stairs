import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";
import { useRecoilValue } from "recoil";

import { isLoginState } from "../../core/atom";
import { IcEditProfile } from "../../public/assets/icons";
import { ImgMypageBanner, ImgUser } from "../../public/assets/images";
import { UserInfo } from "../../types/myPage";

interface TopBannerProps {
  userInfo: UserInfo;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TopBanner(props: TopBannerProps) {
  const { userInfo, onImageChange } = props;
  const { email, img, nickname } = userInfo;

  const isLogin = useRecoilValue(isLoginState);

  return (
    <StBanner bannerImage={ImgMypageBanner.src}>
      <StProfile>
        <StProfileImgBox>
          <StUserImgWrapper>
            <Image src={isLogin ? img : ImgUser} alt="유저" />
          </StUserImgWrapper>
          <StIcEditProfile htmlFor="input-file">
            <StIcEditProfileImg />
          </StIcEditProfile>
          <StFileInput id="input-file" type="file" onChange={onImageChange} accept="image/jpg, image/png, image/jpeg" />
        </StProfileImgBox>
        <StProfileContent>
          <StUserName>{nickname}</StUserName>
          <StEmail>{email}</StEmail>
        </StProfileContent>
      </StProfile>
    </StBanner>
  );
}

const StBanner = styled.div<{ bannerImage: string }>`
  position: relative;

  width: 100%;
  height: 23.2rem;

  margin-bottom: 1.6rem;

  border-radius: 2rem 2rem 0 0;

  background-color: ${({ theme }) => theme.colors.white300};
  background-image: url(${(props) => props.bannerImage});
  background-position: right;
  background-repeat: no-repeat;
`;

const StProfile = styled.div`
  position: absolute;
  bottom: -48%;
  left: 4%;

  display: flex;
  align-items: flex-end;
`;

const StProfileImgBox = styled.div`
  position: relative;

  width: 16rem;

  margin-right: 3.4rem;
`;

const StIcEditProfile = styled.label`
  position: absolute;
  bottom: 0.3rem;
  right: -1.3rem;
`;

const StIcEditProfileImg = styled(IcEditProfile)`
  cursor: pointer;
`;

const StFileInput = styled.input`
  display: none;
`;

const StUserImgWrapper = styled.div`
  width: 17.2rem;
  height: 17.2rem;

  border: 0.6rem solid ${({ theme }) => theme.colors.white};
  border-radius: 50%;

  & > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const StProfileContent = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 4.4rem;
`;

const StUserName = styled.h3`
  margin-bottom: 0.4rem;

  ${({ theme }) => theme.fonts.header3};
  color: ${({ theme }) => theme.colors.gray100};
`;

const StEmail = styled.p`
  ${({ theme }) => theme.fonts.body2};
  color: #939393;
`;