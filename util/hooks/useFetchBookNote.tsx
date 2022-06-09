import { useEffect, useState } from "react";

import { client } from "../../core/axios";

export default function useFetchBookNote<T>(token: string, key: string, initialState: T) {
  const [data, setData] = useState<T>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async function () {
      try {
        const {
          data: { data },
        } = await client(token).get(key);

        setData(data);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { data, setData, isLoading };
}
