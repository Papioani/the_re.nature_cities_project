// src/app/components/Footer.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <footer className="footerBackground" aria-label="Footer">
      <button
        onClick={openModal}
        className="footer-link flex space-x-2 text-white transition-colors duration-300"
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
        <span>Contact</span>
      </button>
      <div className="footerImages" aria-label="Footer logos">
        <img
          src="/elidek.png"
          alt="Elidek logo"
          className="footerImage"
          aria-label="Elidek logo"
        />
        <img
          src="/Ellada2.0.jpg"
          alt="image of Greece2.0"
          className="footerImage"
          aria-label="Greece 2.0 logo"
        />
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 id="modal-title" className="text-lg font-semibold">
              Contact Details
            </h2>

            <p id="modal-description" className="text-[#1c3d5a]">
              <span className="text-xl font-semibold">Stella Tsoka</span>
              <br />
              Scientific responsible and coordinator of the project <br />
              Assistant professor <br />
              <Link
                href="https://www.civil.upatras.gr/?lang=en"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
                aria-label="Visit the Department of Civil Engineering at the University of Patras website"
              >
                Department of Civil Engineering,
              </Link>{" "}
              <Link
                href="https://www.civil.upatras.gr/?lang=en"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
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
