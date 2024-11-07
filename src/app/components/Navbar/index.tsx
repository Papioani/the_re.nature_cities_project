// Navbar.tsx
"use client";
import Link from "next/link";
// <Link>: This component enables client-side navigation, which means that clicking the link will not trigger a full page reload. Instead, it will only update the necessary components on the page
import React, { useState } from "react";

// many modern setups and Next.js examples skip React.FC
//when no props are present to keep the code concise.
const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <nav className="navbar sticky top-0 flex items-center justify-between text-white px-4">
      <Link href="/" className="logo-section flex items-center">
        <img
          src="/Papioani.png"
          alt="Logo"
          className="h-16 w-auto cursor-pointer"
        />
      </Link>

      {/* Hamburger Icon (visible on mobile) */}
      <div className="md:hidden flex items-center">
        <button className="text-2xl text-white" onClick={toggleMobileMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Navbar Links (hidden on mobile, shown on medium screens and up) */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } md:flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 items-center md:items-end text-white mt-4 md:mt-0`}
      >
        <Link href="/" className="nav-link">
          Home
        </Link>
        <Link href="/the-re.nature-cities-project" className="nav-link ">
          The Re.Nature <br /> Cities Project
        </Link>
        <Link href="/partners" className="nav-link">
          Partners
        </Link>
        <Link href="/project-outline" className="nav-link">
          Project Outline
        </Link>
        <Link href="/wind-tunnel" className="nav-link">
          Wind Tunnel, LAI/LAD <br /> and Albedo Measurements
        </Link>
        <Link href="/deliverables-publications" className="nav-link ">
          Deliverables and <br /> publications
        </Link>
        <Link href="/the-action" className="nav-link">
          The action
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
