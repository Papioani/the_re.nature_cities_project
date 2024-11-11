"use client";

// components/ScrollHandler.tsx

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    // Reset scroll position to top when navigating to a new page
    window.scrollTo(0, 0);
  }, [pathname]); // Run this effect when the route changes

  return null; // This component doesn't render anything visible
}
