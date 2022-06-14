import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";

import { login } from "../../core/api";
import { UserData } from "../../types/login";
import { emailErrorPatterns, passwordErrorPatterns } from "../../util/check";
import { AlertLabel } from "../common";
import { DefaultButton } from "../common/styled/Button";
import { Input } from "../common/styled/Input";
import { PwdSightIcon } from ".";

export default function LoginForm() {
  const [isPwdSight, setIsPwdSight] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty },
  } = useForm<UserData>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate } = useSWRConfig();

  const submitForm = async (loginFormData: UserData) => {
    const errorData = await login(loginFormData, setError);

    mutate("/auth/check");

    if (errorData === null) {
      router.push("/main");
    }
  };

  const toggleSightPwd = (isSight: boolean) => {
    setIsPwdSight(isSight);
  };

  return (
    <StForm onSubmit={handleSubmit(submitForm)}>
      <StLabel htmlFor="loginEmail">이메일</StLabel>
      <Input {...register("email", emailErrorPatterns)} placeholder="이메일을 입력해 주세요" />
      {errors.email?.message && <AlertLabel message={errors.email.message} />}

      <StLabelPwd htmlFor="loginPwd">비밀번호</StLabelPwd>
      <StInputPwdWrapper>
        <Input
          {...register("password", passwordErrorPatterns)}
          placeholder="비밀번호를 입력해 주세요"
          type={isPwdSight ? "text" : "password"}
        />
        <PwdSightIcon isPwdSight={isPwdSight} onToggleSightPwd={toggleSightPwd} />
      </StInputPwdWrapper>
      {errors.password?.message && <AlertLabel message={errors.password.message} />}

      <StLoginBtn disabled={!isDirty} type="submit">
        로그인
      </StLoginBtn>
    </StForm>
  );
}

const StForm = styled.form`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const StLabel = styled.label`
  margin-bottom: 1.8rem;

  ${({ theme }) => theme.fonts.body1}
`;

const StLabelPwd = styled(StLabel)`
  margin: 3.2rem 0 1.2rem;
`;

const StLoginBtn = styled(DefaultButton)<{ disabled: boolean }>`
  width: 46.4rem;
  height: 5.6rem;

  margin-top: 5.6rem;

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

const StInputPwdWrapper = styled.div`
  position: relative;
`;
