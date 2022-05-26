import styled from "@emotion/styled";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { Loading } from "../components/common";
import {
  LandingExperiment,
  LandingFooter,
  LandingHeader,
  LandingInfo,
  LandingMotivation,
  LandingSuggestion,
  LandingValidation,
  MobileLandingExperiment,
  MobileLandingFooter,
  MobileLandingHeader,
  MobileLandingInfo,
  MobileLandingSuggestion,
  MobileLandingValidation,
} from "../components/landing";
import MobileLandingMotivation from "../components/landing/MobileLandingMotivatoin";
import { isLoginState } from "../core/atom";
// import useCheckLoginState from "../util/hooks/useCheckLoginState";
import { Desktop, Mobile } from "../util/hooks/useMediaQuery";

const Landing: NextPage = () => {
  const router = useRouter();
  // const { isLogin, isLoginLoading } = useCheckLoginState();
  const isLogin = useRecoilValue(isLoginState);
  const isLoginLoading = false;
  // 여기까지 임시 코드
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
            <MobileLandingInfo />
            <MobileLandingMotivation />
            <MobileLandingSuggestion />
            <MobileLandingExperiment />
            <MobileLandingValidation />
            <MobileLandingFooter />
          </Mobile>
          <Desktop>
            <StLandingWrapper>
              <LandingHeader />
              <StMain>
                <LandingInfo />
                <LandingMotivation />
                <LandingSuggestion />
                <LandingExperiment />
                <LandingValidation />
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
