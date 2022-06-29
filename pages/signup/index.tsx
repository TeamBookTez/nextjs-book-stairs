/*
마지막 편집자: 22-06-29 soryeongk
변경사항 및 참고:
  - bookNote/preNote/LinkToSignUpSection.tsx 에서 해당 경로를 참조합니다
    폴더구조가 바뀔 시 이 경로도 수정해주어야 합니다
  - autoLoginAfterSignup과 login을 통합해야합니다.
  - 너무 복잡합니다. 유지보수를 위한 유지보수가 필요합니다..
  - Error404 페이지가 필요할까욤?
    
고민점:
  - 
*/
import styled from "@emotion/styled";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { NavHeader } from "../../components/common";
import { StSignupHeading2, StSignupImage, StSignupParagraph } from "../../components/common/styled/Signup";
import { SignupForm } from "../../components/signup";
import { checkIsValid, login } from "../../core/api";
import { baseInstance } from "../../core/axios";
import LocalStorage from "../../core/localStorage";
import { ImgSignupFirst, ImgSignupSecond, ImgSignupThird } from "../../public/assets/images";
import theme from "../../styles/theme";
import { UseFormDataType } from "../../types/signup";

export default function Signup() {
  const router = useRouter();

  const [userData, setUserData] = useState<UseFormDataType>({
    email: "",
    password: "",
    nickname: "",
  });
  const [isAgreeCondition, setIsAgreeCondition] = useState<boolean>(false);
  const [formDataKeyIndex, setFormDataKeyIndex] = useState<string>("email");
  const formDataKeyData: UseFormDataType = {
    email: "이메일",
    nickname: "닉네임",
    password: "비밀번호",
  };

  const imgList: UseFormDataType = {
    email: ImgSignupFirst.src,
    nickname: ImgSignupSecond.src,
    password: ImgSignupThird.src,
  };

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isDirty },
  } = useForm<UseFormDataType>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      nickname: "",
    },
  });

  // 넥제 옮기면서 로그인도 함수로 빼내기 - error 처리만 각각 달리할 수 있도록
  const autoLoginAfterSignup = async (password: string) => {
    try {
      const res = await baseInstance.post("/auth/signup", { ...userData, password });

      console.log("res, userData", res, userData);
      if (res.status === 201) {
        const errorData = await login({ email: userData.email, password });

        if (errorData === null) {
          router.push("/welcome");
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        // setError(formDataKeyIndex, {
        //   type: "server",
        //   message: error.response?.data.message,
        // });
      }
    }
  };

  // 다음 단계로 이동하는 함수
  const setNextStep = (key: string) => {
    setUserData((current) => {
      const formData = { ...current };

      formData[formDataKeyIndex] = key;

      return formData;
    });

    setFormDataKeyIndex((current) => {
      if (current === "email") {
        return "nickname";
      } else if (current === "nickname") {
        return "password";
      }

      return "submit";
    });

    setValue(formDataKeyIndex, "");
  };

  // 폼 제출 에러가 없는지 확인
  const submitForm = async (loginFormData: UseFormDataType) => {
    const key = loginFormData[formDataKeyIndex];

    // 비밀번호 입력까지 마치면 자동 로그인
    if (formDataKeyIndex === "password") {
      if (loginFormData["password"] === loginFormData["password2"]) {
        autoLoginAfterSignup(key);
      } else {
        setError("password", { type: "server", message: "비밀번호가 일치하지 않습니다." });
      }
    } else {
      // 이메일 입력시 개인정보 취급 방침 동의를 먼저 유도
      if (formDataKeyIndex === "email" && !isAgreeCondition) {
        setError(formDataKeyIndex, {
          type: "agreeCondition",
          message: "개인정보 수집 및 이용 약관에 동의해주시기 바랍니다.",
        });
      } else {
        // 서버로 데이터를 보내서 유효성 검사
        // return: 유효한지(isValid) && 에러 메시지(message)
        const { isValid, message } = await checkIsValid(formDataKeyIndex, key);

        if (isValid) {
          setNextStep(key);
          if (formDataKeyIndex === "email") {
            LocalStorage.setItem("booktez-email", loginFormData["email"]);
          }
        } else {
          setError(formDataKeyIndex, { type: "server", message });
        }
      }
    }
  };

  const handleToggleIsAgreeCondition = () => {
    setIsAgreeCondition(!isAgreeCondition);
  };

  return (
    <>
      <NavHeader logoColor={theme.colors.gray100} />
      <StMain>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={formDataKeyIndex}
            transition={{
              default: { duration: 1 },
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <StFormWrapper>
              <StSignupImage src={imgList[formDataKeyIndex]} alt="회원가입 첫 단계" />
              <StSignupHeading2>나만의 서재를 만드는 중이에요!</StSignupHeading2>
              <StSignupParagraph>당신의 {formDataKeyData[formDataKeyIndex]}을 입력해 주세요.</StSignupParagraph>
              <StForm onSubmit={handleSubmit(submitForm)}>
                <SignupForm
                  register={register}
                  errors={errors}
                  keyData={formDataKeyData}
                  keyIndex={formDataKeyIndex}
                  isAgree={isAgreeCondition}
                  isDirty={isDirty}
                  onToggleIsAgreeCondition={handleToggleIsAgreeCondition}
                />
              </StForm>
            </StFormWrapper>
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

const StFormWrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
