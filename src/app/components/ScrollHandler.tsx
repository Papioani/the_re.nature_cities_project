"use client";

// components/ScrollHandler.tsx

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        // Find the element with the corresponding ID
        const targetElement = document.querySelector(hash) as HTMLElement;
        if (targetElement) {
          // Get the height of the fixed navbar (adjust this value if needed)
          const navbarHeight =
            document.querySelector(".navbar")?.clientHeight || 0;

          // Scroll to the target element, adjusted for the navbar height
          window.scrollTo({
            top:
              targetElement.getBoundingClientRect().top +
              window.scrollY -
              navbarHeight,
            behavior: "smooth",
          });

          // Optionally focus the target element for accessibility
          targetElement.setAttribute("tabindex", "-1");
          targetElement.focus();
        }
      } else {
        // If no hash, scroll to the top of the page or container
        window.scrollTo(0, 0);
      }
    };

    handleScroll();

    // Listen for hash changes in the URL
    window.addEventListener("hashchange", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("hashchange", handleScroll);
    };
  }, [pathname]); // Dependency on pathname to trigger the effect on page load

  return null; // This component doesn't render anything visible
}
