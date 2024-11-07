// src/app/components/Footer.tsx
import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="footerBackground">
      <Link
        href="/contact"
        className="footer-link flex space-x-2 text-white transition-colors duration-300"
      >
        {/* SVG Arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-right text-lg"
          viewBox="0 0 16 16"
        >
          <path d="M11.854 8l-4.5 4.5L6.5 11 9.707 8 6.5 4.5l.854-.854 4.5 4.5z" />
        </svg>
        <span>Contact</span>
      </Link>
      <div className="footerImages">
        <img src="/elidek.png" alt="Elidek logo" className="footerImage" />
        <img
          src="/Ελλάδα2.0.jpg"
          alt="image of Greece2.0"
          className="footerImage"
        />
      </div>
    </footer>
  );
};

export default Footer;
