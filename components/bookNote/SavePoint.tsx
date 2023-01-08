import styled from "@emotion/styled";

import usePeriNote from "../../util/hooks/bookNote/usePeriNote";
import { IcCheckSave, IcSave } from "../../public/assets/icons";
import { BookNotePathKey } from "../../types/bookNote";
import usePreNote from "../../util/hooks/bookNote/usePreNote";
import useToast from "../../util/hooks/useToast";

interface SavePointProps {
  navIndex: BookNotePathKey;
  reviewId: string;
}

export default function SavePoint(props: SavePointProps) {
  const { navIndex, reviewId } = props;
  const { isToastAlertTime, setIsToastAlertTime } = useToast();
  const { savePeriNote } = usePeriNote(reviewId);
  const { savePreNote } = usePreNote(reviewId);

  const handleClickSaveBtn = async () => {
    switch (navIndex) {
      case "pre":
        await savePreNote();
        break;
      case "peri":
        await savePeriNote();
        break;
    }

    setIsToastAlertTime(true);
  };

  return (
    <>
      {isToastAlertTime && (
        <StSave>
          <StIcCheckSave />
          작성한 내용이 저장되었어요.
        </StSave>
      )}
      <StIcSave onClick={handleClickSaveBtn} id="btn_save" />
    </>
  );
}

const StIcCheckSave = styled(IcCheckSave)`
  margin-right: 1rem;
`;

const StSave = styled.div`
  position: absolute;
  right: 4.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 23.7rem;
  height: 3.8rem;

  margin-bottom: 0.5rem;
  margin-right: 1.6rem;

  border-radius: 0.8rem;

  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.14);

  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.gray200};
`;

const StIcSave = styled(IcSave)`
  cursor: pointer;
`;
