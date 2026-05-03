import { useEffect, useRef } from "react";

export function useDebouncedCallback<T>(
  callback: VoidFunction,
  dependencies: T[],
  timeout: number,
) {
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(callback, timeout);
    return () => {
      clearTimeout(timer.current);
    };
  }, [dependencies]);
}
