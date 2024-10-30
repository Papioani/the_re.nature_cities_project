// Navbar.tsx
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="container mx-auto flex justify-between px-4">
          <a href="/">The Re.Nature Cities Project</a>

          <a href="/partners">Partners</a>

          <a href="/about">Project Outline</a>

          <a href="/wind-tunnel">
            Wind tunnel, LAI/LAD and albedo measurements
          </a>

          <a href="/deliverables">Deliverables and publications</a>

          <a href="/the-action">The action</a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
