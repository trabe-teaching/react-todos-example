import { useEffect } from "react";

const useTitle = title => {
  useEffect(() => {
    document.title = title || document.title;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useTitle;
