import type { Metadata } from "next";

import "./styles/globals.css";
import styles from "./styles/layout.module.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ModalProvider } from "./context/ModalContext"; // Import the provider

export const metadata: Metadata = {
  title: "Re.Nature Cities: Assessing Street Trees for Climate Adaptation",
  description:
    "Explore experimental and numerical methods to evaluate street trees as Nature-Based Solutions for mitigating climate change in urban environments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add the viewport meta tag here */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Favicon and Manifest */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className="antialiased flex flex-col min-h-screen w-full">
        {/*  <ScrollHandler /> */}

        <Navbar />
        <ModalProvider>
          {/* For styles in globals.css, you don't use styles. You just use the regular class names directly (e.g., className="heroSection"). */}
          <section className={styles.heroSection}></section>

          {/* For styles in layout.module.css, you use styles because those class names are scoped locally to the component (e.g., className={styles.heroSection}). */}
          <main className={`${styles.mainContent} flex-grow pt-20`}>
            {children}
          </main>
        </ModalProvider>
        <footer>
          {" "}
          <Footer />
        </footer>
      </body>
    </html>
  );
}
