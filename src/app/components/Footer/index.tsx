// src/app/components/Footer.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./Footer.module.css";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Reference to the modal content
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };
    // Attach event listener for click outside modal
    if (isModalOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    // Cleanup event listener on component unmount or when modal is closed
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <footer className={styles.footerBackground} aria-label="Footer">
      <div className={styles.footerBackgroundImage}>
        <Image
          src="/background-forest.webp" // The path to your background image
          alt="Footer Background"
          fill // fill the container
          quality={40}
          priority // Load it first as it's the hero image
          style={{ opacity: 0.2, objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 1920px"
        />
      </div>
      <button
        onClick={openModal}
        className={`${styles.footerLink} flex space-x-2 text-white transition-colors duration-300`}
        aria-label="Open contact modal"
      >
        {/* SVG Arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-right text-lg"
          viewBox="0 0 16 16"
          aria-hidden="true" // Marks the icon as decorative
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
            src="/elidek.png"
            alt="Elidek logo"
            width={500} // specify width
            height={300}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className={styles.footerImage} aria-label="Greece 2.0 logo">
          <Image
            src="/Ellada2.0.jpg"
            alt="Greece2.0 logo"
            width={500} // specify width
            height={300}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div
            ref={modalRef}
            className="bg-white p-8 rounded-lg max-w-md w-full"
            style={{ marginTop: "80px" }}
          >
            <p id="modal-title" className="text-lg text-center underline">
              Contact Details
            </p>

            <p id="modal-description" className="font-normal">
              <span className="text-xl font-semibold text-[#2e4d2e]">
                Stella Tsoka
              </span>
              <br />
              Scientific responsible and coordinator of the project <br />
              Assistant professor <br />
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
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
