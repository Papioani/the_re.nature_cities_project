import type { Metadata } from "next";

import "./styles/globals.css";
import styles from "./styles/layout.module.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Urban Resilience: Assessing Street Trees for Climate Adaptation",
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
      </head>
      <body className="antialiased flex flex-col min-h-screen w-full">
        {/*  <ScrollHandler /> */}
        <Navbar />
        {/* For styles in globals.css, you don't use styles. You just use the regular class names directly (e.g., className="heroSection"). */}
        <section className={styles.heroSection}></section>

        {/* For styles in layout.module.css, you use styles because those class names are scoped locally to the component (e.g., className={styles.heroSection}). */}
        <main className={`${styles.mainContent} flex-grow pt-20`}>
          {children}
        </main>

        <footer>
          {" "}
          <Footer />
        </footer>
      </body>
    </html>
  );
}
