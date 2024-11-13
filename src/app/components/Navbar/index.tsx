// Navbar.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
// <Link>: This component enables client-side navigation, which means that clicking the link will not trigger a full page reload. Instead, it will only update the necessary components on the page

// many modern setups and Next.js examples skip React.FC
//when no props are present to keep the code concise.
const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  /* const [isReDropdownOpen, setIsReDropdownOpen] = useState<boolean>(false); */
  const [isWorkDropdownOpen, setIsWorkDropdownOpen] = useState<boolean>(false);
  const [workDropdownTimeout, setWorkDropdownTimeout] =
    useState<NodeJS.Timeout | null>(null);

  // Create the ref for the workDropdownTrigger
  const workDropdownTriggerRef = useRef<HTMLAnchorElement | null>(null);
  const firstDropdownItemRef = useRef<HTMLAnchorElement | null>(null);

  const handleWorkFocus = () => {
    setIsWorkDropdownOpen(true);
  };
  const handleWorkBlur = (event: React.FocusEvent) => {
    const relatedTarget = event.relatedTarget as HTMLElement;
    if (
      relatedTarget &&
      workDropdownTriggerRef.current &&
      !workDropdownTriggerRef.current.contains(relatedTarget) &&
      !relatedTarget.closest("#workDropdownMenu")
    ) {
      setIsWorkDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isWorkDropdownOpen && firstDropdownItemRef.current) {
      firstDropdownItemRef.current.focus();
    }
  }, [isWorkDropdownOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  /* const handleReMouseEnter = () => setIsReDropdownOpen(true);
  const handleReMouseLeave = () => setIsReDropdownOpen(false); */

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
  // Define handleKeyDown to close dropdowns on Escape key press
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      setIsWorkDropdownOpen(false);
      workDropdownTriggerRef.current?.focus();
    }
  };

  const handleDropdownKeyDown = (event: React.KeyboardEvent) => {
    const focusableItems = document.querySelectorAll(
      "#workDropdownMenu [role='menuitem']"
    );

    if (focusableItems.length > 0) {
      const firstItem = focusableItems[0] as HTMLElement;
      const lastItem = focusableItems[focusableItems.length - 1] as HTMLElement;

      // Trap focus within the dropdown
      if (event.key === "Tab") {
        if (event.shiftKey && document.activeElement === firstItem) {
          // Shift+Tab on first item
          event.preventDefault();
          lastItem.focus();
        } else if (!event.shiftKey && document.activeElement === lastItem) {
          // Tab on last item
          event.preventDefault();
          firstItem.focus();
        }
      }
    }

    // Existing Enter/Space logic to toggle dropdown
    if (workDropdownTriggerRef.current === document.activeElement) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setIsWorkDropdownOpen((prev) => !prev);
      } else if (event.key === "Escape") {
        setIsWorkDropdownOpen(false);
        workDropdownTriggerRef.current.focus(); // Return focus to trigger
      }
    }
  };

  return (
    <nav
      aria-label="Main navigation"
      className="navbar flex sticky top-0 justify-between items-end p-2 text-white md:p-3"
      onKeyDown={handleKeyDown}
    >
      <header className="logo-section flex-grow max-w-xs">
        <Link href="/">
          <img
            src="/logo2.jpg"
            alt="The Re.Nature Cities logo showing a tree within a circle"
            className="max-h-24 max-w-40 object-contain cursor-pointer  md:w-auto px-6 py-0 hover:opacity-80 hover:scale-110 transition-all duration-200"
          />
        </Link>
      </header>
      {/* Hamburger Icon (visible on mobile) */}
      <div className="md:hidden flex items-center">
        <button
          className="text-2xl text-white"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
          onClick={toggleMobileMenu}
        >
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
        {/*  <Link href="/" className="nav-link">
          Home
        </Link> */}
        <div
          className="relative inline-block"
          /* onMouseEnter={handleReMouseEnter}
          onMouseLeave={handleReMouseLeave} 
          onKeyDown={handleKeyDown} */
        >
          <Link
            href="/the-re.nature-cities-project"
            className="nav-link"
            //aria-haspopup="true"
            //aria-expanded={false}
            // aria-controls="reDropdownMenu"
            //onFocus={handleReMouseEnter}
            //onBlur={handleReMouseLeave}
            // id="reDropdownTrigger"
          >
            The Re.Nature <br /> Cities Project
            {/* <svg
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
            </svg> */}
          </Link>
          {/* {isReDropdownOpen && (
            <div
              role="menu"
              id="reDropdownMenu"
              aria-labelledby="reDropdownTrigger"
              className="absolute z-10 mt-2 w-full bg-white font-bold rounded-lg shadow-lg "
              style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
            >
              <ul className="text-m" style={{ color: "#2e4d2e" }}>
                <li role="menuitem">
                  <Link
                    href="/the-re.nature-cities-project#scope"
                    className="block py-1 px-1 "
                  >
                    The Scope
                  </Link>
                </li>{" "}
                <li role="menuitem">
                  <Link
                    href="/the-re.nature-cities-project#objectives"
                    className="block py-1 px-1 "
                  >
                    The Objectives
                  </Link>
                </li>
              </ul>
            </div>
          )} */}
        </div>
        <Link href="/partners" className="nav-link">
          Partners
        </Link>
        <div
          className="relative inline-block"
          onMouseEnter={handleWorkMouseEnter}
          onMouseLeave={handleWorkMouseLeave}
          onKeyDown={handleDropdownKeyDown}
          tabIndex={0}
        >
          <Link
            href="/project-outline"
            className="nav-link"
            aria-haspopup="true"
            aria-expanded={isWorkDropdownOpen}
            aria-controls="workDropdownMenu"
            onFocus={handleWorkFocus}
            onBlur={handleWorkBlur}
            id="workDropdownTrigger"
            ref={workDropdownTriggerRef} // Attach the ref to the element
          >
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
              role="menu"
              id="workDropdownMenu"
              aria-labelledby="workDropdownTrigger"
              className="absolute z-10 mt-2 w-full bg-white font-bold rounded-lg shadow-lg "
              style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
            >
              <ul className="text-m" style={{ color: "#2e4d2e" }}>
                <li role="menuitem">
                  <Link
                    href="/project-outline#work1"
                    className="block py-1 px-1 "
                    ref={firstDropdownItemRef}
                    tabIndex={0}
                  >
                    Work Package 1
                  </Link>
                </li>{" "}
                <li>
                  <Link
                    href="/project-outline#work2"
                    className="block py-1 px-1 "
                    tabIndex={0}
                    role="menuitem"
                  >
                    Work Package 2
                  </Link>
                </li>
                <li role="menuitem">
                  <Link
                    href="/project-outline#work3"
                    className="block py-1 px-1 "
                    tabIndex={0}
                  >
                    Work Package 3
                  </Link>
                </li>{" "}
                <li role="menuitem">
                  <Link
                    href="/project-outline#work4"
                    className="block py-1 px-1 "
                    tabIndex={0}
                  >
                    Work Package 4
                  </Link>
                </li>
                <li role="menuitem">
                  <Link
                    href="/project-outline#work5"
                    className="block py-1 px-1 "
                    tabIndex={0}
                  >
                    Work Package 5
                  </Link>
                </li>{" "}
                <li role="menuitem">
                  <Link
                    href="/project-outline#work6"
                    className="block py-1 px-1 "
                    tabIndex={0}
                  >
                    Work Package 6
                  </Link>
                </li>
                <li role="menuitem">
                  <Link
                    href="/project-outline#work7"
                    className="block py-1 px-1 "
                    tabIndex={0}
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
