// Navbar.tsx
import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar fixed top-0 left-0 right-0 z-50 ">
      <div className="container mx-auto flex justify-between px-4">
        <div>
          <a href="#" className="hover:text-gray-700">
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
