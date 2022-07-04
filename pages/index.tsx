import styled from "@emotion/styled";
import type { NextPage } from "next";
import { useRouter } from "next/router";

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
import { Desktop, Mobile } from "../util/hooks/useMediaQuery";
import useUser from "../util/hooks/useUser";

const Landing: NextPage = () => {
  const router = useRouter();
  const { isLogin, isLoginLoading } = useUser();

  if (isLoginLoading) {
    return <Loading />;
  } else if (isLogin) {
    router.push("/main");

    return null;
  } else
    return (
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
