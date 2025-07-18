"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageAnnouncer() {
  const pathname = usePathname();
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    // Get the page title from the DOM
    if (typeof window !== "undefined") {
      const el = document.getElementById("page-title");
      setAnnouncement(el ? el.textContent || "" : "");
    }
  }, [pathname]);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        margin: "-1px",
        border: "0",
        padding: "0",
        overflow: "hidden",
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        whiteSpace: "nowrap",
      }}
    >
      {announcement}
    </div>
  );
}
