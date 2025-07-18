import { useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

export default function ScrollHandler() {
  const pathname = usePathname();

  // Add scroll behavior control
  useEffect(() => {
    if (pathname === "/project-outline") {
      document.documentElement.classList.add("disable-smooth-scroll");
    } else {
      document.documentElement.classList.remove("disable-smooth-scroll");
    }
  }, [pathname]);

  const adjustScrollPosition = useCallback(() => {
    const hash = window.location.hash; // gives the part of the URL after the #
    if (hash) {
      const targetElement = document.querySelector(hash) as HTMLElement;

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

        const scrollToPosition =
          rect.top + window.scrollY - navbarHeight - visualOffset;

        requestAnimationFrame(() => {
          window.scrollTo({
            top: scrollToPosition,
            behavior: pathname === "/project-outline" ? "auto" : "smooth",
          });
        });
        // make focusable the elements that are not focusable, cause they’re not interactive
        if (targetElement) {
          if (targetElement.tabIndex === -1) {
            targetElement.setAttribute("tabindex", "0");
          }
        }
      }
    }
  }, [pathname]);

  useEffect(() => {
    // Handle same-page hash navigation
    const handleAnchorClick = (event: Event) => {
      const target = event.target as HTMLAnchorElement;

      if (
        target.tagName === "A" &&
        target.hash &&
        (target.pathname === window.location.pathname ||
          target.pathname === pathname)
      ) {
        event.preventDefault();

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
  }, [adjustScrollPosition, pathname]);

  return null;
}
