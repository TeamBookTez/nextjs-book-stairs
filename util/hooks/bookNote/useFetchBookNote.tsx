/*
마지막 편집자: 22-06-18 joohaem
변경사항 및 참고:
  - axios type 정의 필요함
    
고민점:
  - 
*/

import { useEffect, useState } from "react";

import { baseInstance } from "../../../core/api/axios";

export default function useFetchBookNote<T>(key: string, initialState: T) {
  const [data, setData] = useState<T>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async function () {
      try {
        const { data } = await baseInstance.get(key);

        setData(data);
      } finally {
        setIsLoading(false);
      }
    })();

    // return function cleanup() {
    //   setData(initialState);
    //   setIsLoading(false);
    // };
  }, []);

  return { data, setData, isLoading };
}
