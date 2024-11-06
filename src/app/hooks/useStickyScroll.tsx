import { useState, useEffect } from "react";

export const useStickyScroll = (
  navbarRef: React.RefObject<HTMLElement>,
  heroRef: React.RefObject<HTMLElement>
) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const navbarHeight = navbarRef.current?.offsetHeight || 0;
      const heroHeight = heroRef.current?.offsetHeight || 0; // Get hero section height

      const scrollPosition = window.scrollY;

      if (scrollPosition > heroHeight) {
        setOffset(-navbarHeight);
      } else {
        setOffset(0);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navbarRef, heroRef]);

  return offset;
};
