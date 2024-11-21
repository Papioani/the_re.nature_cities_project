import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollHandler() {
  const pathname = usePathname();

  const adjustScrollPosition = () => {
    console.log("Adjust scroll position called");
    const hash = window.location.hash; // Get current hash
    if (hash) {
      const targetElement = document.querySelector(hash) as HTMLElement;
      console.log("Target element found:", targetElement);
      if (targetElement) {
        const navbarElement = document.querySelector(
          ".navbarElement"
        ) as HTMLElement;
        const navbarHeight = navbarElement ? navbarElement.offsetHeight : 0;
        const rect = targetElement.getBoundingClientRect();
        console.log("Navbar height:", navbarHeight, "Element rect:", rect);
        const scrollToPosition = rect.top + window.scrollY - navbarHeight;

        window.scrollTo({
          top: scrollToPosition,
          behavior: "smooth",
        });

        // Focus for accessibility
        targetElement.setAttribute("tabindex", "-1");
        targetElement.focus();
      }
    }
  };

  useEffect(() => {
    // Handle hash navigation when navigating between pages
    const handleHashChange = () => {
      adjustScrollPosition();
    };

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
        console.log("Same-page navigation detected:", target.hash);
        setTimeout(() => adjustScrollPosition(), 100); // Delay to allow default behavior
      }
    };

    // Initial adjustment on page load if hash exists
    if (window.location.hash) {
      adjustScrollPosition();
    }

    // Event listeners
    window.addEventListener("hashchange", handleHashChange);
    document.addEventListener("click", handleAnchorClick);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, [pathname]);

  return null; // No visible UI
}
