import { useEffect, useState } from "react";

const DEFAULT_DEBOUNCE_DELAY = 400;

export const useDebounce = <T>(
  value: T,
  delay = DEFAULT_DEBOUNCE_DELAY
): T => {
  const [debouncedValue, setDebouncedValue] =
    useState<T>(value);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedValue(value);
    }, Math.max(0, delay));

    return () => {
      window.clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};