// hooks/useIntersectionObserver.js
import { useEffect, useRef, useState } from "react";

export function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !isLoaded) {
          setIsLoaded(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [isLoaded, options]);

  return {
    elementRef,
    isIntersecting,
    isLoaded,
    reset: () => setIsLoaded(false),
  };
}
