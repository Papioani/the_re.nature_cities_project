"use client";

// components/ScrollHandler.tsx

// !!!!!!!! SPA behavior in Next.js: When you change routes in an SPA like Next.js,
// the URL changes without a full page reload. This might not trigger the traditional
// hashchange event unless it’s manually handled. !!!!!!!!!!!!!!
"use client";

// components/ScrollHandler.tsx
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ScrollHandler() {
  const pathname = usePathname();
  const [isHashScroll, setIsHashScroll] = useState(false); // Flag to track hash-based scrolling
  const [hashScrollDone, setHashScrollDone] = useState(false); // Flag to track if hash scroll is complete

  useEffect(() => {
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    // Function to adjust the scroll position by adding the navbar height
    const adjustScrollPosition = () => {
      const hash = window.location.hash; // Get current hash
      console.log("ScrollHandler: adjustScrollPosition called", { hash });
      if (hash) {
        const targetElement = document.querySelector(hash) as HTMLElement;
        if (targetElement) {
          // Adjust scroll position by adding the navbar height
          const navbarElement = document.querySelector(
            ".navbarElement"
          ) as HTMLElement;
          const navbarHeight = navbarElement ? navbarElement.offsetHeight : 0;
          const rect = targetElement.getBoundingClientRect();
          console.log("ScrollHandler: target element rect", rect);
          const scrollToPosition = rect.top + window.scrollY - navbarHeight;

          // Adjust scroll position after the browser's scroll behavior is done
          window.scrollTo({
            top: scrollToPosition,
            behavior: "smooth",
          });

          // Optionally, focus the target element for accessibility
          targetElement.setAttribute("tabindex", "-1");
          targetElement.focus();
        }
      } else {
        console.log("ScrollHandler: No hash, scrolling to top");
        // If no hash is found, scroll to the top of the page
        window.scrollTo(0, 0);
      }
    };

    // Listen to the scroll event to detect manual scrolling
    const handleScroll = () => {
      if (isHashScroll) {
        // If it's a hash scroll, don't allow manual scroll resetting
        return;
      }

      if (isScrolling) {
        clearTimeout(scrollTimeout);
      }

      isScrolling = true;

      // Set a timeout to detect when scrolling stops
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150); // Wait for 150ms after scroll stops to consider it manual scroll
    };

    // Handle the case where hash-based scroll happens
    const handleHashChange = () => {
      setIsHashScroll(true);
      setHashScrollDone(false); // Mark hash scroll as not complete yet
      // Introduce a small delay to ensure the default scroll happens first
      setTimeout(() => {
        adjustScrollPosition(); // Adjust scroll after the default scroll
        setHashScrollDone(true); // Mark hash scroll as complete
      }, 50); // Small delay to wait for the browser's default scroll behavior
    };

    // Handle manual scrolling by the user
    const handleManualScroll = () => {
      if (isHashScroll) {
        // Prevent interfering with the manual scroll after hash-based navigation
        setIsHashScroll(false);
      }
    };

    // Initial adjustment when the page loads (in case the hash is present)
    if (!hashScrollDone) {
      adjustScrollPosition();
    }

    // Add event listeners for scroll and hash changes
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("hashchange", handleHashChange); // Handle hashchange for hash-based scroll

    // Handle user scroll to stop manual interference after the hash scroll
    window.addEventListener("wheel", handleManualScroll); // Handle mouse wheel scroll
    window.addEventListener("touchstart", handleManualScroll); // Handle touch-based scroll (for mobile)

    // Clean up event listeners when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("wheel", handleManualScroll);
      window.removeEventListener("touchstart", handleManualScroll);
    };
  }, [pathname, isHashScroll, hashScrollDone]);

  return null; // This component doesn't render anything visible
}
