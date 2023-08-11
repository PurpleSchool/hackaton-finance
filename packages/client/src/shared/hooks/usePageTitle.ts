import { useEffect, useRef } from "react";

export const usePageTitle = (title: string) => {
  const documentDefined = typeof document !== "undefined";
  const originalTitle = useRef(documentDefined ? document.title : null);

  useEffect(() => {
    if (!documentDefined) return;

    if (document.title !== title) document.title = title;

    return () => {
      originalTitle.current !== null
        ? (document.title = originalTitle.current)
        : null;
    };
  }, []);
};


