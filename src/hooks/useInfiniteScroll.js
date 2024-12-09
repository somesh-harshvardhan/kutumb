import { useState, useEffect, useRef } from "react";

function useInfiniteScroll(fetchCallback, hasMore) {
  const [isFetching, setIsFetching] = useState(false);
  const loaderRef = useRef(null);

  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching) {
          setIsFetching(true);
          fetchCallback().finally(() => setIsFetching(false));
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loaderRef.current);

    return () => {
      if (loaderRef?.current) observer.unobserve(loaderRef?.current);
    };
  }, [fetchCallback, hasMore, isFetching]);

  return { loaderRef, isFetching };
}

export default useInfiniteScroll;
