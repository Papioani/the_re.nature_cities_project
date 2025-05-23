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
  maximumScale: 1,
  userScalable: false,
};

type LayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<LayoutProps>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-[100dvh] w-full">
        <Suspense fallback={<div>Loading...</div>}>
          {" "}
          {/*  //loading state while components are being loaded. */}
          <Background />
          <Navbar />
          <ModalProvider>
            <section className={styles.heroSection}>
              <Image
                src="/background-forest2.webp"
                alt="Hero Background"
                fill
                style={{ objectFit: "cover" }}
                priority
                quality={75}
                sizes="100vw"
                loading="eager"
              />
            </section>

            <ErrorBoundary>
              <main
                className={`${styles.mainContent} flex-grow pt-16 md:pt-20`}
              >
                {children}
              </main>
            </ErrorBoundary>
          </ModalProvider>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
