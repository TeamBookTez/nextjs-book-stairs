import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";

import { NavHeader } from "../../components/common";
import { LastStep } from "../../components/signup";
import theme from "../../styles/theme";

export default function Welcome() {
  return (
    <>
      <NavHeader logoColor={theme.colors.gray100} />
      <StMain>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key="lastSignup"
            transition={{
              default: { duration: 1 },
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <LastStep />
          </motion.div>
        </AnimatePresence>
      </StMain>
    </>
  );
}

const StMain = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
