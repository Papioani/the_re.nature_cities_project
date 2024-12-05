// Navbar.tsx
"use client";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
// <Link>: This component enables client-side navigation, which means that clicking the link will not trigger a full page reload. Instead, it will only update the necessary components on the page
interface Tooltip {
  text: string;
  show: boolean;
  position: {
    top: number;
    left: number;
  };
}
// many modern setups and Next.js examples skip React.FC
//when no props are present to keep the code concise.
const Navbar: React.FC = () => {
  const [isRotated, setIsRotated] = useState<boolean>(false);
  const navbarRef = useRef<HTMLElement | null>(null); // Ref to access the Navbar
  const [navbarHeight, setNavbarHeight] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isWorkDropdownOpen, setIsWorkDropdownOpen] = useState<boolean>(false);
  const [workDropdownTimeout, setWorkDropdownTimeout] =
    useState<NodeJS.Timeout | null>(null);

  // Create the ref for the workDropdownTrigger
  const workDropdownTriggerRef = useRef<HTMLAnchorElement | null>(null);
  const firstDropdownItemRef = useRef<HTMLAnchorElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsWorkDropdownOpen(false);
      setIsRotated(false);
    }
  };
  useEffect(() => {
    if (isWorkDropdownOpen) {
      document.addEventListener("click", handleClickOutside); // Add listener when dropdown opens
      document.addEventListener("touchstart", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside); // Remove listener when dropdown closes
      document.removeEventListener("touchstart", handleClickOutside);
    }

    // Cleanup on unmount or when dropdown state changes
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    };
  }, [isWorkDropdownOpen]); // Depend on `isDropdownOpen`
  // Check for mobile screen size on initial render and when window resizes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768); // Threshold for mobile screens
    };

    checkScreenSize(); // Check on initial render
    window.addEventListener("resize", checkScreenSize); // Check on resize

    return () => {
      window.removeEventListener("resize", checkScreenSize); // Cleanup on unmount
    };
  }, []);

  useLayoutEffect(() => {
    if (navbarRef.current) {
      const height = navbarRef.current.getBoundingClientRect().height;
      setNavbarHeight(height);
      console.log("Navbar height from index.tsx of Navbar:", height);
    } else {
      console.log("Navbar ref is null or not yet rendered");
    }
  }, []);
  const [tooltip, setTooltip] = useState<Tooltip>({
    text: "",
    show: false,
    position: { top: 0, left: 0 },
  });

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

  useEffect(() => {
    // Debug and reset focus stealing
    console.log("Initially focused element:", document.activeElement);
    if (document.activeElement !== document.body) {
      (document.activeElement as HTMLElement).blur();
    }
  }, []);

  useEffect(() => {
    // Check if the dropdown menu is ready (for debugging)
    const dropdownElement = document.querySelector("#workDropdownMenu");
    if (dropdownElement) {
      console.log("Dropdown element exists:", dropdownElement);
    }
  }, []);

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };
  const closeMobileMenu = (): void => {
    setIsMobileMenuOpen(false);
  };

  const handleWorkMouseEnter: React.MouseEventHandler<
    HTMLAnchorElement
  > = () => {
    console.log("Mouse entered the 'Project Outline' link");
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
    } else if (event.key === "Enter" || event.key === " ") {
      // Toggle the dropdown on Enter or Space key press
      setIsWorkDropdownOpen((prevState) => !prevState);
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
        workDropdownTriggerRef.current?.focus(); // Return focus to trigger
      }
    }
  };
  // Define types for event and description
  const handleTooltipMouseEnter = (
    e: React.MouseEvent<HTMLAnchorElement>,
    description: string
  ) => {
    const rect = e.currentTarget.getBoundingClientRect(); // Get the position of the link
    // Calculate the position for the tooltip to be to the right of the link
    const tooltipPosition = {
      top: rect.top, // Tooltip's top position relative to the viewport (same as the link)
      left: rect.right + 5, // Position the tooltip just to the right of the link (5px padding)
    };
    console.log("Tooltip Position:", tooltipPosition);

    setTooltip({
      show: true,
      text: description,
      position: tooltipPosition,
    });
  };

  const handleTooltipMouseLeave = () => {
    setTooltip((prevState) => ({ ...prevState, show: false }));
  };

  // Close both the tooltip and dropdown after clicking on a link (hash navigation)
  const handleLinkClick = () => {
    setIsWorkDropdownOpen(false); // Close dropdown after link click
    setTooltip((prevState) => ({ ...prevState, show: false })); // Close tooltip after link click
  };

  // Handle the span click (navigate to project outline page)
  const handleProjectOutlineClick = () => {
    window.location.href = "/project-outline"; // Redirect to the project outline page
  };

  // Handle the arrow click (toggle dropdown)
  const handleDropdownClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering other click events
    setIsWorkDropdownOpen((prev) => !prev); // Toggle the dropdown visibility
    setIsRotated((prev) => !prev);
  };

  return (
    <nav
      ref={navbarRef}
      aria-label="Main navigation"
      className={`${styles.navbar} flex sticky top-0 justify-between items-end p-2 text-white md:p-3 navbarElement`}
      onKeyDown={handleKeyDown}
    >
      <header className={`${styles.logoSection} px-6`}>
        <Link href="/" onClick={closeMobileMenu} className="inline-block">
          <img
            src="/logo2.jpg"
            alt="The Re.Nature Cities logo showing a tree within a circle"
            className="max-h-28 max-w-30 object-contain cursor-pointer  md:w-auto  py-0 hover:opacity-80 hover:scale-110 transition-all duration-200"
          />
        </Link>
      </header>
      {/* Hamburger Icon (visible on mobile) */}
      <div className="md:hidden flex items-center">
        <button
          className="text-2xl text-white"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu" // Associates button with the menu
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
      <div className="relative">
        <input
          className="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Search..."
        />
        <div className="absolute right-0 inset-y-0 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <div className="absolute left-0 inset-y-0 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-3 text-gray-400 hover:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      {/* Navbar Links (hidden on mobile, shown on medium screens and up) */}
      <div
        id="mobile-menu"
        className={`${isMobileMenuOpen ? "block" : "hidden"} ${
          styles.navbarLinks
        } md:flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 md:items-start text-white mt-8 md:mt-0`}
        aria-hidden={!isMobileMenuOpen} // Semantically hide the menu
      >
        <Link href="/" className={styles.navLink} onClick={closeMobileMenu}>
          Home
        </Link>
        <div className="relative inline-block">
          <Link
            href="/the-re.nature-cities-project"
            className={styles.navLink}
            onClick={closeMobileMenu}
          >
            The Re.Nature <br /> Cities Project
          </Link>
        </div>
        <Link
          href="/partners"
          className={styles.navLink}
          onClick={closeMobileMenu}
        >
          Partners
        </Link>

        {/* Conditionally render for mobile */}
        {isMobile ? (
          <>
            <div className="relative inline-block">
              <button
                onClick={handleProjectOutlineClick} // Redirect to the project outline page
                className={`${styles.navLink} inline-flex items-center space-x-2 p-2`}
                aria-expanded={isWorkDropdownOpen} // Reflect dropdown state
                aria-controls="workDropdownMenu"
              >
                <span className="mr-2">Project Outline</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className={`bi bi-chevron-down transition-transform duration-300 ${
                    isRotated ? "rotate-180" : ""
                  } text-[#fffff] `}
                  viewBox="0 0 16 16"
                  onClick={handleDropdownClick} // Open the dropdown on arrow click
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 5.5a.5.5 0 0 1 .707-.707L8 9.793l5.793-5.793a.5.5 0 0 1 .707.707l-6 6a.5.5 0 0 1-.707 0l-6-6z"
                  />
                </svg>
              </button>
            </div>
            {/* Dropdown for mobile */}
            {isWorkDropdownOpen && (
              <div
                ref={dropdownRef}
                id="workDropdownMenu"
                className="absolute left-0 mt-2 bg-white shadow-md rounded-md max-w-[90%] sm:max-w-[350px]"
                role="region"
                aria-labelledby="project-outline-link"
              >
                <ul>
                  {/* Dropdown items for mobile */}
                  <li
                    style={{
                      backgroundColor: "rgba(107, 139, 59, 0.2)", // RGBA for #556b2f with opacity 0.5
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    <a
                      href="#work1"
                      className="mobile-link"
                      onClick={() => {
                        closeMobileMenu();
                        handleProjectOutlineClick();
                      }}
                    >
                      Work Package 1: Definition of the Case Study Areas and
                      Simulation Days
                    </a>
                  </li>
                  <li>
                    <a
                      href="#work2"
                      className="mobile-link"
                      onClick={() => {
                        closeMobileMenu();
                        handleProjectOutlineClick();
                      }}
                    >
                      Work Package 2: Microclimate Evaluation on the Basis of
                      Climate Change
                    </a>
                  </li>
                  <li
                    style={{
                      backgroundColor: "rgba(107, 139, 59, 0.2)", // RGBA for #556b2f with opacity 0.5
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    <a
                      href="#work3"
                      onClick={() => {
                        closeMobileMenu();
                        handleProjectOutlineClick();
                      }}
                    >
                      Work Package 3: Evaluation of Climate Change Effect on the
                      Built Environment
                    </a>
                  </li>
                  <li>
                    <a
                      href="#work4"
                      onClick={() => {
                        closeMobileMenu();
                        handleProjectOutlineClick();
                      }}
                    >
                      Work Package 4: Experimental Assessment of Street Trees as
                      Urban NBS
                    </a>
                  </li>
                  <li
                    style={{
                      backgroundColor: "rgba(107, 139, 59, 0.2)", // RGBA for #556b2f with opacity 0.5
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    <a
                      href="#work5"
                      onClick={() => {
                        closeMobileMenu();
                        handleProjectOutlineClick();
                      }}
                    >
                      Work Package 5: Evaluation of the Environmental and Energy
                      Effect of Street Trees
                    </a>
                  </li>
                  <li>
                    <a
                      href="#work6"
                      onClick={() => {
                        closeMobileMenu();
                        handleProjectOutlineClick();
                      }}
                    >
                      Work Package 6: Project Management
                    </a>
                  </li>
                  <li
                    style={{
                      backgroundColor: "rgba(107, 139, 59, 0.2)", // RGBA for #556b2f with opacity 0.5
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    <a
                      href="#work7"
                      onClick={() => {
                        closeMobileMenu();
                        handleProjectOutlineClick();
                      }}
                    >
                      Work Package 7: Dissemination and Communication of the
                      Results
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <>
            {/* For desktop, no button but dropdown with hover interaction */}

            <div
              className="relative inline-block"
              onKeyDown={handleDropdownKeyDown}
              tabIndex={0}
            >
              <Link
                href="/project-outline"
                passHref // This tells Next.js to handle the anchor properly
                className={styles.navLink}
                aria-haspopup="true"
                aria-expanded={isWorkDropdownOpen}
                aria-controls="workDropdownMenu"
                onFocus={handleWorkFocus}
                onBlur={handleWorkBlur}
                id="workDropdownTrigger"
                ref={workDropdownTriggerRef} // Attach the ref to the element
                onMouseEnter={handleWorkMouseEnter}
                onMouseLeave={handleWorkMouseLeave}
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
              {/* Dropdown for desktop */}

              {isWorkDropdownOpen && (
                <div
                  role="menu"
                  id="workDropdownMenu"
                  aria-labelledby="workDropdownTrigger"
                  className="dropdown-container absolute z-10 mt-2 w-full bg-white font-bold rounded-lg shadow-lg "
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                >
                  <ul className="text-m" style={{ color: "#2e4d2e" }}>
                    <li role="menuitem">
                      <Link
                        href="/project-outline#work1"
                        aria-label="Definition of the Case Study Areas and Simulation Days"
                        className="work-link block py-1 px-1 "
                        ref={firstDropdownItemRef}
                        tabIndex={0}
                        role="menuitem"
                        aria-level={2}
                        onMouseEnter={(e) =>
                          handleTooltipMouseEnter(
                            e,
                            "Definition of the Case Study Areas and Simulation Days"
                          )
                        }
                        onMouseLeave={handleTooltipMouseLeave}
                        onClick={handleLinkClick}
                      >
                        Work Package 1
                      </Link>
                    </li>{" "}
                    <li>
                      <Link
                        href="/project-outline#work2"
                        aria-label="Microclimate Evaluation on the Basis of Climate Change"
                        className="work-link block py-1 px-1 "
                        tabIndex={0}
                        role="menuitem"
                        aria-level={2}
                        onMouseEnter={(e) =>
                          handleTooltipMouseEnter(
                            e,
                            "Microclimate Evaluation on the Basis of Climate Change"
                          )
                        }
                        onMouseLeave={handleTooltipMouseLeave}
                        onClick={handleLinkClick}
                      >
                        Work Package 2
                      </Link>
                    </li>
                    <li role="menuitem">
                      <Link
                        href="/project-outline#work3"
                        aria-label="Evaluation of Climate Change Effect on the Built Environment"
                        className="work-link block py-1 px-1 "
                        tabIndex={0}
                        role="menuitem"
                        aria-level={2}
                        onMouseEnter={(e) =>
                          handleTooltipMouseEnter(
                            e,
                            "Evaluation of Climate Change Effect on the Built Environment"
                          )
                        }
                        onMouseLeave={handleTooltipMouseLeave}
                        onClick={handleLinkClick}
                      >
                        Work Package 3
                      </Link>
                    </li>{" "}
                    <li role="menuitem">
                      <Link
                        href="/project-outline#work4"
                        aria-label="Experimental Assessment of Street Trees as Urban NBS"
                        className="work-link block py-1 px-1 "
                        tabIndex={0}
                        role="menuitem"
                        aria-level={2}
                        onMouseEnter={(e) =>
                          handleTooltipMouseEnter(
                            e,
                            "Experimental Assessment of Street Trees as Urban NBS"
                          )
                        }
                        onMouseLeave={handleTooltipMouseLeave}
                        onClick={handleLinkClick}
                      >
                        Work Package 4
                      </Link>
                    </li>
                    <li role="menuitem">
                      <Link
                        href="/project-outline#work5"
                        aria-label="Evaluation of the Environmental and Energy Effect of Street Trees"
                        className="work-link block py-1 px-1 "
                        tabIndex={0}
                        role="menuitem"
                        aria-level={2}
                        onMouseEnter={(e) =>
                          handleTooltipMouseEnter(
                            e,
                            "Evaluation of the Environmental and Energy Effect of Street Trees"
                          )
                        }
                        onMouseLeave={handleTooltipMouseLeave}
                        onClick={handleLinkClick}
                      >
                        Work Package 5
                      </Link>
                    </li>{" "}
                    <li role="menuitem">
                      <Link
                        href="/project-outline#work6"
                        aria-label="Project Management"
                        className="work-link block py-1 px-1 "
                        tabIndex={0}
                        role="menuitem"
                        aria-level={2}
                        onMouseEnter={(e) =>
                          handleTooltipMouseEnter(e, "Project Management")
                        }
                        onMouseLeave={handleTooltipMouseLeave}
                        onClick={handleLinkClick}
                      >
                        Work Package 6
                      </Link>
                    </li>
                    <li role="menuitem">
                      <Link
                        href="/project-outline#work7"
                        aria-label="Dissemination and Communication of the Results"
                        className="work-link block py-1 px-1 "
                        tabIndex={0}
                        role="menuitem"
                        aria-level={2}
                        onMouseEnter={(e) =>
                          handleTooltipMouseEnter(
                            e,
                            "Dissemination and Communication of the Results"
                          )
                        }
                        onMouseLeave={handleTooltipMouseLeave}
                        onClick={handleLinkClick}
                      >
                        Work Package 7
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
        <Link
          href="/wind-tunnel"
          className={styles.navLink}
          onClick={closeMobileMenu}
        >
          Wind Tunnel, LAI/LAD <br /> and Albedo Measurements
        </Link>
        <Link
          href="/deliverables-publications"
          className={styles.navLink}
          onClick={closeMobileMenu}
        >
          Deliverables and <br /> publications
        </Link>
        <Link
          href="/the-action"
          className={styles.navLink}
          onClick={closeMobileMenu}
        >
          The action
        </Link>
      </div>
      {/* Tooltip that will appear on hover */}
      {tooltip.show && (
        <div
          className={styles.tooltipBox}
          style={{
            top: tooltip.position.top + "px",
            left: tooltip.position.left + "px",
          }}
        >
          {tooltip.text}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
