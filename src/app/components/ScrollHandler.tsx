"use client";

// components/ScrollHandler.tsx

// !!!!!!!! SPA behavior in Next.js: When you change routes in an SPA like Next.js,
// the URL changes without a full page reload. This might not trigger the traditional
// hashchange event unless it’s manually handled. !!!!!!!!!!!!!!
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const hash = window.location.hash; // Get current hash
      console.log("Current hash:", hash);

      if (hash) {
        // Use requestAnimationFrame to wait for the layout to stabilize
        requestAnimationFrame(() => {
          // Find the element with the corresponding ID
          const targetElement = document.querySelector(hash) as HTMLElement;
          if (targetElement) {
            console.log("Found target element:", targetElement);

            // Get the height of the fixed navbar (adjust this value if needed)
            const navbarElement = document.querySelector(".navbar");
            const navbarHeight = navbarElement ? navbarElement.offsetHeight : 0;
            console.log("Navbar height:", navbarHeight);

            // Calculate the final scroll position based on document scroll
            const scrollToPosition =
              targetElement.getBoundingClientRect().top +
              window.scrollY -
              navbarHeight;
            console.log("Scroll position to:", scrollToPosition);

            // Scroll to the target element, adjusted for the navbar height
            window.scrollTo({
              top: scrollToPosition,
              behavior: "smooth",
            });

            // Optionally focus the target element for accessibility
            targetElement.setAttribute("tabindex", "-1");
            /*  targetElement.focus(); */
          } else {
            console.log("Target element not found");
          }
        });
      } else {
        console.log("No hash found, scrolling to top");
        window.scrollTo(0, 0);
      }
    };

    // Listen for hash changes (browser-based navigation)
    window.addEventListener("hashchange", handleScroll);

    // Also handle immediate hash links clicks and apply the scroll
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        target.tagName === "A" &&
        target.getAttribute("href")?.startsWith("#")
      ) {
        // Prevent the default anchor click behavior
        event.preventDefault();
        const href = target.getAttribute("href");
        if (href) {
          history.pushState(null, "", href); // Update the URL hash manually
          handleScroll(); // Perform custom scroll logic
        }
      }
    };

    // Attach event listener to hash links
    document.addEventListener("click", handleLinkClick);

    // Initial call to handle scroll logic (in case the page is loaded with a hash)
    handleScroll();

    // Clean up event listeners when component unmounts
    return () => {
      window.removeEventListener("hashchange", handleScroll);
      document.removeEventListener("click", handleLinkClick);
    };
  }, [pathname]); // Dependency on pathname to handle route changes

  return null; // This component doesn't render anything visible
}
