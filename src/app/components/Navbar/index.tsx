// Navbar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
// <Link>: This component enables client-side navigation, which means that clicking the link will not trigger a full page reload. Instead, it will only update the necessary components on the page

// many modern setups and Next.js examples skip React.FC
//when no props are present to keep the code concise.
const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isReDropdownOpen, setIsReDropdownOpen] = useState<boolean>(false);
  const [isWorkDropdownOpen, setIsWorkDropdownOpen] = useState<boolean>(false);
  const [workDropdownTimeout, setWorkDropdownTimeout] =
    useState<NodeJS.Timeout | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleReMouseEnter = () => setIsReDropdownOpen(true);
  const handleReMouseLeave = () => setIsReDropdownOpen(false);
  const handleWorkMouseEnter = () => {
    if (workDropdownTimeout) clearTimeout(workDropdownTimeout); // Clear any previous timeout
    setIsWorkDropdownOpen(true);
  };

  const handleWorkMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsWorkDropdownOpen(false);
    }, 300); // 300ms delay before closing the dropdown
    setWorkDropdownTimeout(timeout);
  };
  return (
    <nav className="navbar flex sticky top-0 justify-between items-end text-white px-4">
      <div className="logo-section h-full w-full rounded-md">
        <Link href="/">
          <img
            src="/logo2.jpg"
            alt="Logo"
            className="h-30 w-auto cursor-pointer  md:h-20 px-2 hover:opacity-80 transition-opacity duration-200"
          />
        </Link>
      </div>
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
        } navbar-links md:flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 md:items-start text-white mt-8 md:mt-0`}
      >
        <Link href="/" className="nav-link">
          Home
        </Link>
        <div
          className="relative inline-block"
          onMouseEnter={handleReMouseEnter}
          onMouseLeave={handleReMouseLeave}
        >
          <Link href="/the-re.nature-cities-project" className="nav-link">
            The Re.Nature <br /> Cities Project
            <svg
              className="-mr-1 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          {isReDropdownOpen && (
            <div
              className="absolute z-10 mt-2 w-full bg-white font-bold rounded-lg shadow-lg "
              style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
            >
              <ul className="text-m" style={{ color: "#2e4d2e" }}>
                <li>
                  <Link
                    href="/the-re.nature-cities-project#scope"
                    className="block py-1 px-1 "
                  >
                    The Scope
                  </Link>
                </li>{" "}
                <li>
                  <Link
                    href="/the-re.nature-cities-project#objectives"
                    className="block py-1 px-1 "
                  >
                    The Objectives
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        <Link href="/partners" className="nav-link">
          Partners
        </Link>
        <div
          className="relative inline-block"
          onMouseEnter={handleWorkMouseEnter}
          onMouseLeave={handleWorkMouseLeave}
        >
          <Link href="/project-outline" className="nav-link">
            Project Outline
            <svg
              className="-mr-1 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          {isWorkDropdownOpen && (
            <div
              className="absolute z-10 mt-2 w-full bg-white font-bold rounded-lg shadow-lg "
              style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
            >
              <ul className="text-m" style={{ color: "#2e4d2e" }}>
                <li>
                  <Link
                    href="/project-outline#work1"
                    className="block py-1 px-1 "
                  >
                    Work Package 1
                  </Link>
                </li>{" "}
                <li>
                  <Link
                    href="/project-outline#work2"
                    className="block py-1 px-1 "
                  >
                    Work Package 2
                  </Link>
                </li>
                <li>
                  <Link
                    href="/project-outline#work3"
                    className="block py-1 px-1 "
                  >
                    Work Package 3
                  </Link>
                </li>{" "}
                <li>
                  <Link
                    href="/project-outline#work4"
                    className="block py-1 px-1 "
                  >
                    Work Package 4
                  </Link>
                </li>
                <li>
                  <Link
                    href="/project-outline#work5"
                    className="block py-1 px-1 "
                  >
                    Work Package 5
                  </Link>
                </li>{" "}
                <li>
                  <Link
                    href="/project-outline#work6"
                    className="block py-1 px-1 "
                  >
                    Work Package 6
                  </Link>
                </li>
                <li>
                  <Link
                    href="/project-outline#work7"
                    className="block py-1 px-1 "
                  >
                    Work Package 7
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
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
