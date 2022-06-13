/*
마지막 편집자: 22-05-27 joohaem
변경사항 및 참고:
  {isSave && (
    <StSave>
      <StIcCheckSave />
      작성한 내용이 저장되었어요.
    </StSave>
  )}
  {isLogin && <StIcSave onClick={() => setIsSave(true)} id="btn_save" />}
    
고민점:
  - 
*/

import styled from "@emotion/styled";
import { useEffect } from "react";

import { IcCheckSave, IcSave } from "../../public/assets/icons";
import { BookNotePathKey, SavingData } from "../../types/bookNote";

interface SavePointProps {
  navIndex: BookNotePathKey;
  savingData: SavingData;
  handleSavingData: (obj: SavingData) => void;
}

export default function SavePoint(props: SavePointProps) {
  const { savingData, handleSavingData } = props;

  useEffect(() => {
    if (savingData.isPending === false && savingData.isError === false) {
      // 토스트 띄우기
    }
  }, [savingData]);

  return (
    <>
      {true && (
        <StSave>
          <StIcCheckSave />
          작성한 내용이 저장되었어요.
        </StSave>
      )}
      <StIcSave onClick={() => handleSavingData({ isPending: true, isError: false })} id="btn_save" />
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
