import styled from "@emotion/styled";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { Loading } from "../components/common";
import {
  LandingFive,
  LandingFooter,
  LandingFour,
  LandingHeader,
  LandingOne,
  LandingThree,
  LandingTwo,
  MobileLandingFive,
  MobileLandingFooter,
  MobileLandingFour,
  MobileLandingHeader,
  MobileLandingOne,
  MobileLandingThree,
  MobileLandingTwo,
} from "../components/landing";
import { isLoginState } from "../core/atom";
import useCheckLoginState from "../util/hooks/useCheckLoginState";
import { Desktop, Mobile } from "../util/hooks/useMediaQuery";

const Landing: NextPage = () => {
  const router = useRouter();
  const { isLogin, isLoginLoading } = useCheckLoginState();
  const setIsLogin = useSetRecoilState(isLoginState);

  useEffect(() => {
    setIsLogin(isLogin);

    if (isLogin) router.push("/main");
  }, [isLogin]);

  return (
    <>
      {isLoginLoading ? (
        <Loading />
      ) : (
        <>
          <Mobile>
            <MobileLandingHeader />
            <MobileLandingOne />
            <MobileLandingTwo />
            <MobileLandingThree />
            <MobileLandingFour />
            <MobileLandingFive />
            <MobileLandingFooter />
          </Mobile>
          <Desktop>
            <StLandingWrapper>
              <LandingHeader />
              <StMain>
                <LandingOne />
                <LandingTwo />
                <LandingThree />
                <LandingFour />
                <LandingFive />
              </StMain>
            </StLandingWrapper>
            <LandingFooter />
          </Desktop>
        </>
      )}
    </>
  );
};

const StMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0 11.5rem;
`;

const StLandingWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

export default Landing;
