"use client";

import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary
      fallback={
        <div className="p-4 text-center">
          Something went wrong. Please try refreshing the page.
        </div>
      }
      onError={(error) => {
        console.error("Error caught by boundary:", error);
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
