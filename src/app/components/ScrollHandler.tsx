import { useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

export default function ScrollHandler() {
  const pathname = usePathname();

  const adjustScrollPosition = useCallback(() => {
    console.log("Adjust scroll position called");

    // Cache the navbar element outside of the scroll handler

    const hash = window.location.hash;
    if (hash) {
      const targetElement = document.querySelector(hash) as HTMLElement;
      console.log("Target element found:", targetElement);
      if (targetElement) {
        const getNavbarHeight = () => {
          const navbarElement = document.querySelector(
            ".navbarElement"
          ) as HTMLElement;
          return navbarElement ? navbarElement.offsetHeight : 0;
        };
        const navbarHeight = getNavbarHeight();
        // viewport offset for mobile devices
        const visualOffset = window.visualViewport?.offsetTop || 0;
        // Use requestAnimationFrame to ensure rendering is complete

        const rect = targetElement.getBoundingClientRect();
        // Log the values before the scroll action
        console.log("Navbar height:", navbarHeight);
        console.log("Target element rect:", rect);
        console.log(
          "Current scroll position (window.scrollY):",
          window.scrollY
        );
        console.log("Visual offset (viewport offset):", visualOffset);

        const scrollToPosition =
          rect.top + window.scrollY - navbarHeight - visualOffset;
        console.log("Calculated scrollToPosition:", scrollToPosition);
        requestAnimationFrame(() => {
          window.scrollTo({
            top: scrollToPosition,
            behavior: "smooth",
          });
        });
        // Focus for accessibility
        if (targetElement) {
          if (targetElement.tabIndex === -1) {
            targetElement.setAttribute("tabindex", "0");
          }
          targetElement.focus();
        }
      }
    }
  }, []);

  useEffect(() => {
    // Handle same-page hash navigation
    const handleAnchorClick = (event: Event) => {
      const target = event.target as HTMLAnchorElement;
      console.log("Anchor click detected:", target);
      if (
        target.tagName === "A" &&
        target.hash &&
        (target.pathname === window.location.pathname ||
          target.pathname === pathname)
      ) {
        event.preventDefault();
        console.log("Same-page navigation detected:", target.hash);
        // Update the URL hash manually
        window.history.pushState(null, "", target.hash);
        adjustScrollPosition();
      }
    };

    // Initial adjustment on page load if hash exists
    if (window.location.hash) {
      adjustScrollPosition();
    }

    document.addEventListener("click", handleAnchorClick);
    // clean event listener
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, [adjustScrollPosition]);

  return null;
}
