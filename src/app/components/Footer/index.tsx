// src/app/components/Footer.tsx
import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footerLinks">
        <div className="footerImages">
          <Link href="/contact" className="footer-link">
            Contact
          </Link>
          <img src="/elidek.png" alt="Elidek logo" className="footerImage" />
          <img
            src="/Ελλάδα2.0.jpg"
            alt="image of Greece2.0"
            className="footerImage"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
