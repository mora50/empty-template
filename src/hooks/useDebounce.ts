import { useRef } from "react";

export default function useDebounce(
  fn: (...args: any[]) => void,
  delay: number
) {
  const timeoutRef = useRef(null);

  function debouncedFn(...args: any[]) {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  }

  return debouncedFn;
}
