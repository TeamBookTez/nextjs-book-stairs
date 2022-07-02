import { useEffect, useState } from "react";

export function useDebounce<T>(defaultValue: T) {
  // query: 200ms 동안 모인 글자, 최종적으로 사용될 변수
  const [query, setQuery] = useState<T>(defaultValue);
  // debounceQuery: input value로 사용되면서 변화가 감지될 state
  const [debounceQuery, setDebounceQuery] = useState<T>(defaultValue);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      return setQuery(debounceQuery);
    }, 200);

    return () => clearTimeout(debounceTimeout);
  }, [debounceQuery]);

  return { query, debounceQuery, setDebounceQuery };
}
