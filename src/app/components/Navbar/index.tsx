// Navbar.tsx
"use client";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useClickOutside } from "../../hooks/userClickOutside";
import { usePathname } from "next/navigation";

// <Link>: This component enables client-side navigation, which means that clicking the link will not trigger a full page reload. Instead, it will only update the necessary components on the page
interface Tooltip {
  text: string;
  show: boolean;
  position: {
    top: number;
    left: number;
  };
}
// many modern setups and Next.js examples skip React.FC when no props are present to keep the code concise.
const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isRotated, setIsRotated] = useState<boolean>(false);
  const navbarRef = useRef<HTMLElement | null>(null); // Ref to access the Navbar
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isWorkDropdownOpen, setIsWorkDropdownOpen] = useState<boolean>(false);
  const [workDropdownTimeout, setWorkDropdownTimeout] =
    useState<NodeJS.Timeout | null>(null);

  // ref for the workDropdownTrigger
  const workDropdownTriggerRef = useRef<HTMLAnchorElement | null>(null);
  const firstDropdownItemRef = useRef<HTMLAnchorElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(
    dropdownRef,
    () => {
      setIsWorkDropdownOpen(false);
      setIsRotated(false);
    },
    ["svg", ".hamburger-container", "#mobile-menu"] // exclusions
  );

  // Check for mobile screen size on initial render and when window resizes
  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileView = window.innerWidth <= 1024;
      setIsMobile(isMobileView);
      if (!isMobileView) {
        setIsMobileMenuOpen(false);
      }
    };

    // Check immediately
    checkScreenSize();

    // Add resize listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useLayoutEffect(() => {
    if (navbarRef.current) {
      const height = navbarRef.current.getBoundingClientRect().height;
      setNavbarHeight(height);
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
    console.log("handleWorkBlur triggered");
    console.log("Event target:", event.target);
    console.log("Related target:", relatedTarget);
    if (
      relatedTarget &&
      workDropdownTriggerRef.current &&
      !workDropdownTriggerRef.current.contains(relatedTarget) &&
      !relatedTarget.closest("#workDropdownMenu")
    ) {
      setIsWorkDropdownOpen(false);
    } else {
      console.log("Not closing dropdown, conditions not met");
    }
  };

  useEffect(() => {
    if (isWorkDropdownOpen && firstDropdownItemRef.current) {
      if (document.activeElement === workDropdownTriggerRef.current) {
        firstDropdownItemRef.current.focus();
      }
    }
  }, [isWorkDropdownOpen]);

  useEffect(() => {
    // reset focus stealing
    if (document.activeElement !== document.body) {
      (document.activeElement as HTMLElement).blur();
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsWorkDropdownOpen(false); // close the dropdown
    setIsRotated(false);
  };

  const handleWorkMouseEnter = () => {
    if (workDropdownTimeout) {
      clearTimeout(workDropdownTimeout);
    }
    setIsWorkDropdownOpen(true);
    setIsRotated(true);
  };

  const handleWorkMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsWorkDropdownOpen(false);
      setIsRotated(false);
    }, 1000);
    setWorkDropdownTimeout(timeout);
  };

  // handleKeyDown to close dropdowns on Escape key press
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
        if (workDropdownTriggerRef.current) {
          workDropdownTriggerRef.current.focus(); // Add a null check here
        } // Return focus to trigger
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
  useEffect(() => {
    console.log(
      "Updated State -> Rotated:",
      isRotated,
      "Dropdown:",
      isWorkDropdownOpen
    );
  }, [isRotated, isWorkDropdownOpen]);
  // Handle the span click (navigate to project outline page)
  const handleProjectOutlineClick = () => {
    window.location.href = "/project-outline"; // Redirect to the project outline page
  };

  // Handle the arrow click (toggle dropdown)
  const handleDropdownClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering other click events
    setIsRotated((prev) => !prev);
    setIsWorkDropdownOpen((prev) => !prev); // Toggle the dropdown visibility
  };

  // useEffect to ensure proper initialization
  useEffect(() => {
    // Reset any existing timeouts on component mount
    if (workDropdownTimeout) {
      clearTimeout(workDropdownTimeout);
    }

    // Initialize the dropdown state
    setIsWorkDropdownOpen(false);
    setIsRotated(false);

    // Cleanup on unmount
    return () => {
      if (workDropdownTimeout) {
        clearTimeout(workDropdownTimeout);
      }
    };
  }, [workDropdownTimeout]); //  workDropdownTimeout to dependencies

  return (
    <nav
      ref={navbarRef}
      aria-label="Main navigation"
      className={`${styles.navbar} flex sticky top-0 justify-between items-end text-white navbarElement`}
      onKeyDown={handleKeyDown}
    >
      <header
        className={`${styles.logoSection} flex items-center pl-2 pr-2 pt-2 pb-2`}
      >
        <Link href="/" onClick={closeMobileMenu} className="inline-block">
          <Image
            src="/Logo2.png"
            width={100}
            height={100}
            alt="The Re.Nature Cities logo showing a tree within a circle"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "contain",
              objectPosition: "center",
            }}
            className="cursor-pointer hover:opacity-80 hover:scale-105 transition-all duration-200"
            priority
          />
        </Link>
      </header>

      {/* Hamburger Icon */}
      <div className={`hamburger-container ${isMobile ? "block" : "hidden"}`}>
        <button
          className="text-2xl text-white"
          aria-label={
            isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"
          }
          aria-expanded={isMobileMenuOpen ? "true" : "false"}
          aria-controls="mobile-menu" // Associates button with the menu
          onClick={toggleMobileMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
            aria-hidden="true"
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
        id="mobile-menu"
        className={`${isMobileMenuOpen ? "block" : "hidden"} ${
          isMobile
            ? "absolute inset-x-0 top-full bg-[#e3e3cb] text-white p-4 z-50 "
            : "md:flex flex-row space-y-0 md:space-x-4 2xl:gap-6 md:items-start text-white mt-8 md:mt-0"
        } ${styles.navbarLinks}`}
        role="menu"
      >
        <Link
          href="/"
          className={`${styles.navLink} ${
            pathname === "/" ? styles.active : ""
          }`}
          onClick={closeMobileMenu}
        >
          Home
        </Link>

        <Link
          href="/the-re.nature-cities-project"
          className={`${styles.navLink} mobileMarginTop mt-2 ${
            pathname === "/the-re.nature-cities-project" ? styles.active : ""
          }`}
          onClick={closeMobileMenu}
        >
          <span className="inline-flex lg:flex-col items-center text-start gap-x-1">
            <span>The Re.Nature</span>
            <span className="block">Cities Project</span>
          </span>
        </Link>

        <Link
          href="/partners"
          className={`${styles.navLink} mobileMarginTop mt-2 ${
            pathname === "/partners" ? styles.active : ""
          }`}
          onClick={closeMobileMenu}
        >
          <span className="inline-flex flex-row max-[1024px]:flex-row lg:flex-col items-center text-start gap-x-1">
            <span className="w-full text-start">Partners & </span>
            <span className="block"> Research Team</span>
          </span>
        </Link>

        {/* Conditionally render for mobile */}
        {isMobile ? (
          <>
            {/*  MOBILE DROPDOWN RENDERING */}
            <div className="relative">
              <div className="relative inline-block">
                <button
                  onClick={handleProjectOutlineClick}
                  className={`${
                    styles.navLink
                  } mobileMarginTop mt-2 inline-flex items-center space-x-2 ${
                    pathname === "/project-outline" ? styles.active : ""
                  }`}
                  aria-expanded={isWorkDropdownOpen ? "true" : "false"}
                  aria-controls="workDropdownMenu"
                  id="project-outline-link"
                >
                  <span>Project Outline</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className={`bi bi-chevron-down transition-transform duration-300 ${
                      isRotated ? "rotate-180" : ""
                    } text-[#fffff] `}
                    viewBox="0 0 16 16"
                    onClick={handleDropdownClick}
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
                  className="absolute left-0 top-full mt-2 bg-white shadow-md rounded-md max-w-[90%] sm:max-w-[350px]"
                  style={{ width: "100vw" }}
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
                        Work Package 3: Evaluation of Climate Change Effect on
                        the Built Environment
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
                        Work Package 4: Experimental Assessment of Street Trees
                        as Urban NBS
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
                        Work Package 5: Evaluation of the Environmental and
                        Energy Effect of Street Trees
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
            </div>
          </>
        ) : (
          <>
            {/* DESKTOP DROPDOWN RENDERING */}

            <div
              className="relative inline-block group"
              onMouseEnter={handleWorkMouseEnter}
              onMouseLeave={handleWorkMouseLeave}
              onKeyDown={handleDropdownKeyDown}
              tabIndex={0}
              role="navigation"
              aria-label="Project Outline navigation"
            >
              <Link
                href="/project-outline"
                className={`${styles.navLink} px-4 ${
                  pathname === "/project-outline" ? styles.active : ""
                }`}
                aria-haspopup="true"
                aria-expanded={isWorkDropdownOpen}
                aria-controls="workDropdownMenu"
                onFocus={handleWorkFocus}
                onBlur={handleWorkBlur}
                id="workDropdownTrigger"
                ref={workDropdownTriggerRef}
              >
                Project Outline
                <svg
                  className={`-mr-1 h-5 w-5 text-gray-400 transition-transform ${
                    isRotated ? "rotate-180" : ""
                  }`}
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

              {/* NEW: Invisible bridge to fill the gap */}
              {isWorkDropdownOpen && (
                <div
                  className="absolute top-full left-0 right-0 h-2 bg-transparent"
                  style={{ height: "8px" }} // Covers the gap
                />
              )}

              {/* The dropdown menu */}
              {isWorkDropdownOpen && (
                <div
                  role="menu"
                  id="workDropdownMenu"
                  aria-labelledby="workDropdownTrigger"
                  className="dropdown-container absolute z-10 w-full bg-white font-bold rounded-lg shadow-lg "
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
          className={`${styles.navLink} mobileMarginTop mt-2 ${
            pathname === "/wind-tunnel" ? styles.active : ""
          }`}
          onClick={closeMobileMenu}
        >
          <span>Wind Tunnel, LAI/LAD</span>
          <span className="block">& Albedo Measurements</span>
        </Link>
        <Link
          href="/deliverables"
          className={`${styles.navLink} mobileMarginTop mt-2 ${
            pathname === "/deliverables" ? styles.active : ""
          }`}
          onClick={closeMobileMenu}
        >
          Deliverables
        </Link>
        <Link
          href="/publications-announcements"
          className={`${styles.navLink} mobileMarginTop mt-2 ${
            pathname === "/publications-announcements" ? styles.active : ""
          }`}
          onClick={closeMobileMenu}
        >
          <span className="w-full text-start">Publications & Conference</span>
          <span style={{ display: "block" }} className="w-full text-start">
            Announcements
          </span>
        </Link>
        <Link
          href="/the-action"
          className={`${styles.navLink} mobileMarginTop mt-2 ${
            pathname === "/the-action" ? styles.active : ""
          }`}
          onClick={closeMobileMenu}
        >
          <span className="inline-flex items-center text-start gap-x-1">
            <span className="w-full text-start">The</span>
            <span>Action</span>
          </span>
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
