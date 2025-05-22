import { useEffect, RefObject } from "react";

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: () => void,
  excludeSelectors?: string[] // For elements like SVG that should be excluded
) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || !event.target) return;

      const targetElement = event.target as HTMLElement;

      // Check if click is on excluded elements
      const isExcluded = excludeSelectors?.some((selector) =>
        targetElement.closest(selector)
      );

      if (isExcluded) return;

      // If click is outside the ref element
      if (!ref.current.contains(targetElement)) {
        handler();
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [ref, handler, excludeSelectors]);
};
