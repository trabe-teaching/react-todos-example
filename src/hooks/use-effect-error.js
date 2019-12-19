import { useState, useCallback } from "react";

const useEffectError = () => {
  const [_, setError] = useState(null); // eslint-disable-line no-unused-vars
  return useCallback(
    e => {
      setError(() => {
        throw e;
      });
    },
    [setError],
  );
};

export default useEffectError;
