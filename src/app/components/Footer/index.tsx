// src/app/components/Footer.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./Footer.module.css";
import Link from "next/link";
import Image from "next/image";
import { useClickOutside } from "../../hooks/userClickOutside";

const Footer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const openModal = () => {
    triggerRef.current = document.activeElement as HTMLButtonElement;
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    triggerRef.current?.focus();
  };

  // Use the useClickOutside hook
  useClickOutside(modalRef, closeModal);

  // Focus management useEffect
  useEffect(() => {
    if (isModalOpen) {
      // Focus the heading and keep it there
      headingRef.current?.focus();
    }
  }, [isModalOpen]);

  // Keyboard handling useEffect (your new one)
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalRef.current) return;

      const focusableSelectors = [
        "a[href]",
        "button:not([disabled])",
        "textarea:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        '[tabindex]:not([tabindex="-1"])',
      ];
      const focusableEls = modalRef.current.querySelectorAll<HTMLElement>(
        focusableSelectors.join(",")
      );
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];

      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }

      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <footer className={styles.footerBackground} aria-label="Footer">
      <div className={styles.footerBackgroundImage}>
        <Image
          src="/background-forest.webp"
          alt="Footer Background"
          fill // fill the container
          quality={40}
          style={{ opacity: 0.2, objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 1920px"
        />
      </div>
      <button
        onClick={openModal}
        className={`${styles.footerLink} flex space-x-2 text-white transition-colors duration-300`}
        aria-label="Open contact modal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-right text-lg"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path d="M11.854 8l-4.5 4.5L6.5 11 9.707 8 6.5 4.5l.854-.854 4.5 4.5z" />
        </svg>
        <span className="text-lg">Contact</span>
      </button>
      <div
        className={styles.footerImages}
        aria-label="Logos Elidek and Ellada2.0"
      >
        <div className={styles.footerImage}>
          <Image
            src="/elidek.jpg"
            alt="Elidek logo"
            width={500}
            height={300}
            loading="lazy"
            quality={85}
            sizes="(max-width: 768px) 100vw, 500px"
          />
        </div>
        <div className={styles.footerImage} aria-label="Greece 2.0 logo">
          <Image
            src="/Ellada2.0.jpg"
            alt="Greece2.0 logo"
            width={500}
            height={300}
            loading="lazy"
            quality={85}
            sizes="(max-width: 768px) 100vw, 500px"
          />
        </div>
      </div>
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[1999]"
            onClick={closeModal}
            aria-hidden="true"
          />
          {/* Modal Content */}

          <div className="fixed inset-0 flex justify-center items-center z-[2000]">
            <section
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
              className="bg-white p-8 rounded-lg max-w-md w-full shadow-lg"
              style={{
                marginTop: "80px",
                boxShadow: "0 4px 24px rgba(44,62,80,0.10)",
              }}
            >
              <h2
                id="modal-title"
                className="sr-only"
                tabIndex={-1}
                ref={headingRef}
              >
                Contact Details
              </h2>
              {/*  <p id="modal-title" className="text-lg text-center underline">
                Contact Details
              </p> */}

              <p id="modal-description" className="font-normal">
                <span className="text-xl font-semibold text-[#2e4d2e] block">
                  Stella Tsoka
                </span>
                <span className="block">
                  Scientific responsible and coordinator of the project{" "}
                </span>
                <span className="block">Assistant professor</span>
                <span className="block">
                  <Link
                    href="https://www.civil.upatras.gr/?lang=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactLink}
                    aria-label="Visit the Department of Civil Engineering at the University of Patras website"
                  >
                    Department of Civil Engineering,
                  </Link>{" "}
                  <Link
                    href="https://www.upatras.gr/en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactLink}
                    aria-label="Visit the University of Patras website"
                  >
                    University of Patras
                  </Link>
                </span>
              </p>
              <p className="mb-3">
                <a
                  href="mailto:stsoka@upatras.gr"
                  className="partner-link"
                  aria-label="Send an email to Stella Tsoka"
                >
                  stsoka@upatras.gr
                </a>
              </p>
              <p className="mb-3">
                <a
                  href="tel:+302610996583"
                  className="partner-link"
                  aria-label="Call Stella Tsoka at +30 2610 996583"
                >
                  +30 2610 996583
                </a>
              </p>

              <button
                onClick={closeModal}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors"
                aria-label="Close contact modal"
              >
                Close
              </button>
            </section>
          </div>
        </>
      )}
    </footer>
  );
};

export default Footer;
