const EMAIL_REGEX =
  /^(([^<>()\].,;:\s@"]+(\.[^<>()\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const INVALID_PWD_CHAR_LIST: { [key: string]: string } = {
  ",": "반점(,)",
  '"': '쌍따옴표(")',
  "'": "홑따옴표(')",
  "`": "백틱(`)",
};

interface ErrorPatternValue<T> {
  value: T;
  message: string;
}

interface ErrorCondition {
  required: ErrorPatternValue<boolean>;
  pattern?: ErrorPatternValue<RegExp>;
  validate?: (value: string) => string | true;
  minLength?: ErrorPatternValue<number>;
  maxLength?: ErrorPatternValue<number>;
}

export const emailErrorPatterns: ErrorCondition = {
  required: { value: true, message: "이메일을 입력해주세요." },
  pattern: {
    value: EMAIL_REGEX,
    message: "이메일 형식을 지켜주시기 바랍니다.",
  },
};

const nicknameErrorPatterns: ErrorCondition = {
  required: {
    value: true,
    message: "닉네임을 입력해주세요.",
  },
};

export const passwordErrorPatterns: ErrorCondition = {
  required: {
    value: true,
    message: "비밀번호를 입력해주세요.",
  },
  validate: (value: string) => {
    if (value.match(/[,"'`]/)) {
      const invalidChar = /[,"']/.exec(value);

      if (invalidChar !== null) {
        return `${INVALID_PWD_CHAR_LIST[invalidChar[0]]}을 포함할 수 없습니다.`;
      }
    }

    return true;
  },
  minLength: {
    value: 8,
    message: "비밀번호는 8자 이상 입력해주시기 바랍니다.",
  },
  maxLength: {
    value: 64,
    message: "비밀번호는 64자 이하 입력해주시기 바랍니다.",
  },
};

export const errorPatterns: { [key: string]: ErrorCondition } = {
  email: emailErrorPatterns,
  nickname: nicknameErrorPatterns,
  password: passwordErrorPatterns,
};
