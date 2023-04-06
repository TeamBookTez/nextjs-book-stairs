import styled from "@emotion/styled";

interface CarouselProps {
  maxIndex: number;
  contentIndex: number;
  onSetContentIndex: (idx: number) => void;
}

export default function CarouselDots(props: CarouselProps) {
  const { maxIndex, contentIndex, onSetContentIndex } = props;

  return (
    <StContainerDots>
      {Array.from({ length: maxIndex + 1 }, (value: number, index: number) => (
        <StDot
          key={`carouselDots-${index}`}
          isactive={contentIndex === index}
          onClick={() => onSetContentIndex(value)}
        />
      ))}
    </StContainerDots>
  );
}

const StContainerDots = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 50%;

  display: flex;

  transform: translateX(-50%);
`;

const StDot = styled.div<{ isactive: boolean }>`
  width: 1rem;
  height: 1rem;

  margin: 0 0.5rem;

  border-radius: 50%;

  transition: 0.5s;
  background: ${({ theme, isactive }) => (isactive ? theme.colors.orange300 : theme.colors.white300)};
`;
