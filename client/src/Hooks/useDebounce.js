import { useEffect, useState } from "react";

const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      /* cleanup code */
      clearTimeout(id);
    };
  }, [delay, value]);
  return debouncedValue;
};

export default useDebounce;
