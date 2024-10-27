// Navbar.tsx
import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">Re.Nature Cities</h1>

        <div>
          <a href="#" className="hover:underline">
            Home
          </a>

          <a href="#" className="hover:underline">
            About
          </a>

          <a href="#" className="hover:underline">
            Research
          </a>

          <a href="#" className="hover:underline">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
