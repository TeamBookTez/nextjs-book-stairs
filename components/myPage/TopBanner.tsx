import styled from "@emotion/styled";
import React from "react";

import { IcEditProfile } from "../../public/assets/icons";
import { ImgMypageBanner, ImgUser } from "../../public/assets/images";
import { UserInfo } from "../../types/myPage";
import { ImageWrapper } from "../common/styled/Img";

interface TopBannerProps {
  userInfo: UserInfo | undefined;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TopBanner(props: TopBannerProps) {
  const { userInfo, onImageChange } = props;
  const isLogin = userInfo !== undefined;

  return (
    <StBanner bannerImage={ImgMypageBanner.src}>
      <StProfile>
        <StProfileImgBox>
          <StUserImg thumbnail={isLogin ? userInfo.img : ImgUser.src} />
          {isLogin && (
            <>
              <StIcEditProfile htmlFor="input-file">
                <StIcEditProfileImg />
              </StIcEditProfile>
              <StFileInput
                id="input-file"
                type="file"
                onChange={onImageChange}
                accept="image/jpg, image/png, image/jpeg"
              />
            </>
          )}
        </StProfileImgBox>
        {isLogin && (
          <StProfileContent>
            <StUserName>{userInfo.nickname}</StUserName>
            <StEmail>{userInfo.email}</StEmail>
          </StProfileContent>
        )}
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

const StUserImg = styled(ImageWrapper)`
  border: 0.6rem solid ${({ theme }) => theme.colors.white};
  border-radius: 50%;

  width: 17.2rem;
  height: 17.2rem;
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
