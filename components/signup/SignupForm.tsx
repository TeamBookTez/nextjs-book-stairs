import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FieldError, UseFormRegister } from "react-hook-form";

import LocalStorage from "../../core/localStorage";
import { IcSignupChecking } from "../../public/assets/icons";
import { UseFormDataType } from "../../types/signup";
import { errorPatterns } from "../../util/check";
import { AlertLabel } from "../common";
import { DefaultButton } from "../common/styled/Button";
import { Input } from "../common/styled/Input";
import { LabelHidden } from "../common/styled/LabelHidden";
import PasswordInput from "./PasswordInput";

interface SignupFormProps {
  register: UseFormRegister<UseFormDataType>;
  errors: { [x: string]: FieldError };
  keyData: UseFormDataType;
  keyIndex: string;
  isAgree: boolean;
  isDirty: boolean;
  onToggleIsAgreeCondition: () => void;
}

export default function SignupForm(props: SignupFormProps) {
  const { register, errors, keyData, keyIndex, isAgree, isDirty, onToggleIsAgreeCondition } = props;

  const PasswordForm = (
    <>
      <StEmailFixed>{LocalStorage.getItem("booktez-email")}</StEmailFixed>
      <PasswordInput register={register} keyIndex={keyIndex} />
      <StPassword2Input>
        <PasswordInput register={register} keyIndex="password2" />
      </StPassword2Input>
    </>
  );

  const AgreeConditionBox = (
    <StAgreeConditionBox htmlFor="signupAgree" onClick={onToggleIsAgreeCondition}>
      <StIcSignupChecking isagree={isAgree} />
      <p>개인정보 수집 및 이용 약관에 동의합니다.</p>
    </StAgreeConditionBox>
  );

  return (
    <>
      <LabelHidden htmlFor={keyIndex}>{keyData[keyIndex]}</LabelHidden>
      {keyIndex === "password" ? (
        PasswordForm
      ) : (
        <Input {...register(keyIndex, errorPatterns[keyIndex])} placeholder={`${keyData[keyIndex]}을 입력해 주세요`} />
      )}
      {errors[keyIndex]?.message && <AlertLabel message={errors[keyIndex].message} />}

      {keyIndex === "email" && AgreeConditionBox}

      <StNextStepBtn disabled={!isDirty} type="submit">
        다음 계단
      </StNextStepBtn>
    </>
  );
}

const StEmailFixed = styled.article`
  display: flex;
  align-items: center;

  margin-bottom: 5.2rem;
  border: 0.2rem solid ${({ theme }) => theme.colors.white400};
  border-radius: 1rem;
  padding-left: 2rem;
  background-color: ${({ theme }) => theme.colors.white400};

  width: 100%;
  height: 5.4rem;

  ${({ theme }) => theme.fonts.body3}
  color: ${({ theme }) => theme.colors.gray100};
`;

const StAgreeConditionBox = styled.label`
  width: 100%;
  height: 2.1rem;

  display: flex;
  align-items: center;

  margin: 1.7rem 0 0 0;

  ${({ theme }) => theme.fonts.body6}
`;

const StIcSignupChecking = styled(IcSignupChecking)<{ isagree: boolean }>`
  margin-right: 0.2rem;

  fill: ${({ theme, isagree }) => (isagree ? theme.colors.orange100 : theme.colors.white400)};
`;

const StNextStepBtn = styled(DefaultButton)<{ disabled: boolean }>`
  width: 46.4rem;
  height: 5.4rem;

  margin-top: 3.9rem;

  border-radius: 1rem;

  ${({ theme }) => theme.fonts.button}

  ${({ disabled, theme }) =>
    disabled &&
    css`
      background-color: ${theme.colors.white400};
      color: ${theme.colors.gray300};
      &:hover {
        cursor: default;
      }
    `}
`;

const StPassword2Input = styled.div`
  margin-top: 2.4rem;
  width: 100%;
`;
