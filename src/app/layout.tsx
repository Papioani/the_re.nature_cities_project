import type { Metadata } from "next";
import { Suspense } from "react";

import "./styles/globals.css";
import styles from "./styles/layout.module.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ModalProvider } from "./context/ModalContext";
import Image from "next/image";
import Background from "./components/Background";
import { ErrorBoundary } from "./components/ErrorBoundary";
import MainFocusHandler from "./components/MainFocusHandler";
import PageAnnouncer from "./components/PageAnnouncer";

export const metadata: Metadata = {
  title: "Re.Nature Cities: Assessing Street Trees for Climate Adaptation",
  description:
    "Explore experimental and numerical methods to evaluate street trees as Nature-Based Solutions for mitigating climate change in urban environments.",
  icons: {
    apple: "/apple-touch-icon.png",
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16" },
    ],
    shortcut: "/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

type LayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<LayoutProps>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-[100dvh] w-full">
        <ErrorBoundary>
          <Suspense
            fallback={<div className={styles.loadingSpinner}>Loading...</div>}
          >
            <Background />
          </Suspense>
          <Navbar />
          <ModalProvider>
            <section className={styles.heroSection}>
              <div className={styles.heroImageContainer}>
                <Image
                  src="/background-forest2.webp"
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                  quality={80}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
              </div>
            </section>

            {/* Replace <main> with MainFocusHandler for accessibility focus management */}
            <MainFocusHandler
              className={`${styles.mainContent} flex-grow pt-16 md:pt-20 focus:outline-none focus-visible:outline-2 focus-visible:outline-[#2e4d2e] focus-visible:outline-offset-4 focus-visible:rounded`}
              aria-labelledby="page-title"
            >
              {children}
            </MainFocusHandler>
            {/* Live region for announcing page title */}
            <PageAnnouncer />
          </ModalProvider>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}
