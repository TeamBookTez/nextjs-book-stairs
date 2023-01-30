import styled from "@emotion/styled";
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";

import { UseFormDataType } from "../../types/signup";
import { passwordErrorPatterns } from "../../util/check";
import { Input } from "../common/styled/Input";
import { PwdSightIcon } from "../login";

interface PasswordInputProps {
  register: UseFormRegister<UseFormDataType>;
  keyIndex: string;
}

export default function PasswordInput(props: PasswordInputProps) {
  const { register, keyIndex } = props;
  const [isPwdSight, setIsPwdSight] = useState<boolean>(false);

  const toggleSightPwd = (isSight: boolean) => {
    setIsPwdSight(isSight);
  };

  return (
    <StInputPwdWrapper>
      <Input
        {...register(keyIndex, passwordErrorPatterns)}
        placeholder={
          keyIndex === "password2"
            ? " 비밀번호를 확인해 주세요."
            : "영문, 숫자, 특수문자를 조합해 8자 이상 입력해 주세요."
        }
        type={isPwdSight ? "text" : "password"}
      />
      <PwdSightIcon isPwdSight={isPwdSight} onToggleSightPwd={toggleSightPwd} />
    </StInputPwdWrapper>
  );
}

const StInputPwdWrapper = styled.div`
  position: relative;
  width: 100%;
`;
