import React from "react";
import { useMediaQuery } from "react-responsive";

const Mobile: React.FC = ({ children }) => {
  const isMobileScreen = useMediaQuery({
    query: "(max-width: 1439px)",
  });

  return <>{isMobileScreen && children}</>;
};

const Desktop: React.FC = ({ children }) => {
  const isDesktopScreen = useMediaQuery({
    query: "(min-width: 1440px) ",
  });

  return <>{isDesktopScreen && children}</>;
};

export { Desktop, Mobile };
