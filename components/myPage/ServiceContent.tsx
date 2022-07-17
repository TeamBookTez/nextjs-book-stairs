import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";

import { ImgReadNum } from "../../public/assets/images";
import { UserInfo } from "../../types/myPage";
import referralLinkList from "../../util/referralLinkList";
import { BookComment } from ".";

interface ServiceContentProps {
  isLogin: boolean;
  userInfo: UserInfo | undefined;
  children: React.ReactNode;
}

export default function ServiceContent(props: ServiceContentProps) {
  const { isLogin, userInfo, children } = props;

  return (
    <StWrapper>
      {isLogin && userInfo && (
        <StCountBook>
          <StImgWrapper>
            <Image src="/assets/images/mypageReadImage.png" alt="읽은 책 수" layout="fill" />
          </StImgWrapper>
          <StContentWrapper>
            <BookComment reviewCount={userInfo.reviewCount} />
          </StContentWrapper>
        </StCountBook>
      )}
      <StServiceWrapper>
        {referralLinkList.map((info) => (
          <StServiceInfo key={info.title}>
            <a href={info.href} target="_blank" rel="noopner noreferrer">
              <StInfoTitle>{info.title}</StInfoTitle>
              <StInfoDesc>{info.description}</StInfoDesc>
            </a>
          </StServiceInfo>
        ))}
      </StServiceWrapper>
      {children}
    </StWrapper>
  );
}

const StWrapper = styled.section`
  position: relative;

  display: flex;

  width: 100%;
  height: 41%;

  padding: 0 4rem 0 4rem;
`;

const StCountBook = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-width: 24.5rem;
  height: 30.3rem;

  margin-right: 4rem;

  border-radius: 2rem;

  background-color: #fbedea;
`;

const StImgWrapper = styled.div`
  position: relative;

  width: 21.1rem;
  height: 16.3rem;

  margin-bottom: 2.5rem;

  border-radius: 2rem 2rem 0 0;
`;

const StContentWrapper = styled.div`
  display: flex;
  justify-content: center;

  padding: 0 2rem 5rem 2rem;
`;

const StServiceWrapper = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 3rem;
  row-gap: 3rem;
`;

const StServiceInfo = styled.article`
  width: 100%;
  height: 13.6rem;

  border-radius: 2rem;

  background-color: ${({ theme }) => theme.colors.white200};

  & > a {
    display: block;

    width: 100%;
    height: 100%;

    padding: 3.7rem 4.8rem;
  }
`;

const StInfoTitle = styled.h4`
  margin-bottom: 1.5rem;

  ${({ theme }) => theme.fonts.header4};
  color: ${({ theme }) => theme.colors.gray200};
`;

const StInfoDesc = styled.p`
  ${({ theme }) => theme.fonts.body6};
  color: ${({ theme }) => theme.colors.gray400};
`;
