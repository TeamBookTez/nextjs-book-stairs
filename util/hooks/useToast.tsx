/*
마지막 편집자: 22-06-13 joohaem
변경사항 및 참고:
  - 커스텀 훅을 인자를 받지 않고 state를 사용하도록 수정하였습니다
    피드백이 있으시면 해주시길 바랍니다 !!
    
고민점:
  - 
*/

import { useEffect, useState } from "react";

export default function useToast() {
  const [isToastAlertTime, setIsToastAlertTime] = useState<boolean>(false);

  useEffect(() => {
    if (isToastAlertTime) {
      const alertToastTimeout = setTimeout(() => {
        setIsToastAlertTime(false);
      }, 2000);

      return () => {
        clearTimeout(alertToastTimeout);
      };
    }
  }, [isToastAlertTime]);

  return { isToastAlertTime, setIsToastAlertTime };
}
