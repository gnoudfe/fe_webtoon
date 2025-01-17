/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";

export const useDebounce = (
  callback: (...args: any[]) => void,
  delay: number
) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFunction = (...args: any[]) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  debouncedFunction.cancel = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return debouncedFunction;
};
