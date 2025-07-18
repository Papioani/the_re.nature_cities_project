"use client";

import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function MainFocusHandler({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const mainRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <main id="main-content" tabIndex={-1} ref={mainRef} className={className}>
      {children}
    </main>
  );
}
