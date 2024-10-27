// src/app/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer>
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
