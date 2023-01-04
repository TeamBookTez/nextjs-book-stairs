import { useDeferredValue, useEffect, useState } from "react";

export default function useUpdatePeriNote(
  defaultValue: string,
  path: number[],
  updateContent: (value: string, path: number[]) => void,
) {
  const [urgentQuery, setUrgentQuery] = useState<string>(defaultValue);
  const deferredQuery = useDeferredValue<string>(urgentQuery);

  // react가 바쁘지 않은 시점에 path를 찾아 urgentQuery에 모인 내용을 periNote로 업데이트
  useEffect(() => {
    updateContent(deferredQuery, path);
  }, [deferredQuery]);

  return { urgentQuery, setUrgentQuery };
}
