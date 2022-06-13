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
