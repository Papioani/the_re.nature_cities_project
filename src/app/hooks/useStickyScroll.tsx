// useStickyScroll.ts
"use client";

import { useEffect } from "react";

const useStickyScroll = () => {
  useEffect(() => {
    // Type assertion to HTMLElement to tell TypeScript it's not null
    const navbar = document.querySelector(".navbar") as HTMLElement | null;
    const heroSection = document.querySelector(
      ".hero-section"
    ) as HTMLElement | null;

    // Check if elements exist before accessing their properties
    if (navbar && heroSection) {
      const navbarHeight = navbar.offsetHeight;

      const handleScroll = () => {
        const heroSectionBottom = heroSection.getBoundingClientRect().bottom;

        if (heroSectionBottom <= navbarHeight) {
          // When the hero section is out of view, make navbar "sticky" by keeping it at the top of the main content
          navbar.style.position = "absolute";
          navbar.style.top = `${window.scrollY + navbarHeight}px`;
        } else {
          // Fix navbar to the top as long as the hero section is in view
          navbar.style.position = "fixed";
          navbar.style.top = "0";
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);
};

export default useStickyScroll;
