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

// Work packages data
const workPackages = [
  {
    id: "work1",
    title: "Work Package 1",
    description: "Definition of the Case Study Areas and Simulation Days",
  },
  {
    id: "work2",
    title: "Work Package 2",
    description: "Microclimate Evaluation on the Basis of Climate Change",
  },
  {
    id: "work3",
    title: "Work Package 3",
    description: "Evaluation of Climate Change Effect on the Built Environment",
  },
  {
    id: "work4",
    title: "Work Package 4",
    description: "Experimental Assessment of Street Trees as Urban NBS",
  },
  {
    id: "work5",
    title: "Work Package 5",
    description:
      "Evaluation of the Environmental and Energy Effect of Street Trees",
  },
  {
    id: "work6",
    title: "Work Package 6",
    description: "Project Management",
  },
  {
    id: "work7",
    title: "Work Package 7",
    description: "Dissemination and Communication of the Results",
  },
];

// many modern setups and Next.js examples skip React.FC when no props are present to keep the code concise.
const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isRotated, setIsRotated] = useState<boolean>(false);
  const navbarRef = useRef<HTMLElement | null>(null);
  // eslint-disable-next-line no-unused-vars
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isWorkDropdownOpen, setIsWorkDropdownOpen] = useState<boolean>(false);
  const [workDropdownTimeout, setWorkDropdownTimeout] =
    useState<NodeJS.Timeout | null>(null);

  // ref for the workDropdownTrigger
  const workDropdownTriggerRef = useRef<HTMLAnchorElement | null>(null);
  const firstDropdownItemRef = useRef<HTMLAnchorElement | null>(null);
  const lastDropdownItemRef = useRef<HTMLAnchorElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null);

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
  const handleWorkBlur = () => {
    requestAnimationFrame(() => {
      const active = document.activeElement as HTMLElement | null;
      console.log("handleWorkBlur: active element is", active);
      if (active) {
        console.log("active.id:", active.id);
        console.log("active.className:", active.className);
        console.log(
          "active.closest('#workDropdownMenu'):",
          active.closest("#workDropdownMenu")
        );
        console.log(
          "active.id === 'workDropdownTrigger':",
          active.id === "workDropdownTrigger"
        );
        console.log("active.textContent:", active.textContent);
      }
      if (
        active &&
        (active.closest("#workDropdownMenu") ||
          active.id === "workDropdownTrigger")
      ) {
        // Focus is still in the menu or on the trigger, do not close
        return;
      }
      setIsWorkDropdownOpen(false);
    });
  };

  useEffect(() => {
    if (isMobileMenuOpen && firstMobileLinkRef.current) {
      firstMobileLinkRef.current.focus();
    }
  }, [isMobileMenuOpen]);

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
    // Wait 100 milliseconds before closing the dropdown
    setTimeout(() => {
      setIsWorkDropdownOpen(false);
      setTooltip((prevState) => ({ ...prevState, show: false }));
    }, 100);
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

  const handleHashLinkClick = (e: React.MouseEvent, hash: string) => {
    e.preventDefault(); // ⛔ Stop the default <a href="#hash"> jump behavior  , for overriding anchor scroll behavior

    const el = document.getElementById(hash); // 🔍 Find the element with the matching ID
    if (el) {
      el.scrollIntoView({ behavior: "smooth" }); // ✅ Smooth scroll to it
      el.focus?.({ preventScroll: true }); // ♿ Accessibility: put keyboard focus on it (without scrolling again)
    }

    // 🔐 Close dropdown and tooltip UI states
    setIsWorkDropdownOpen(false);
    setTooltip((prev) => ({ ...prev, show: false }));
  };

  return (
    <nav
      ref={navbarRef}
      aria-label="Main navigation"
      className={`${styles.navbar} flex sticky top-0 justify-between items-end text-white navbarElement`}
    >
      {/* Skip to main content link  */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-blue-600 text-white p-2 rounded shadow-lg"
      >
        Skip to main content
      </a>

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
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu" // Associates button with the menu
          onClick={toggleMobileMenu}
        >
          <span className="sr-only">
            {isMobileMenuOpen ? "Close menu" : "Open menu"}
          </span>
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
      >
        <Link
          href="/"
          ref={firstMobileLinkRef}
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
              <div className="relative inline-flex items-center space-x-2">
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
                  type="button"
                >
                  Project Outline
                </button>
                <button
                  onClick={handleDropdownClick}
                  aria-label={
                    isWorkDropdownOpen
                      ? "Close project outline menu"
                      : "Open project outline menu"
                  }
                  aria-expanded={isWorkDropdownOpen}
                  aria-controls="workDropdownMenu"
                  type="button"
                  className="dropdownToggle"
                  tabIndex={0}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className={`bi bi-chevron-down transition-transform duration-300 ${
                      isRotated ? "rotate-180" : ""
                    } text-[#fffff]`}
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
                  style={{ width: "100vw", zIndex: 100 }}
                  role="menu"
                  aria-labelledby="project-outline-link"
                >
                  <ul>
                    {/* Dropdown items for mobile */}
                    <li
                      role="none"
                      style={{
                        backgroundColor: "rgba(107, 139, 59, 0.2)", // RGBA for #556b2f with opacity 0.5
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      <a
                        href="/project-outline#work1"
                        className="mobile-link"
                        role="menuitem"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") {
                            e.preventDefault();
                            setIsWorkDropdownOpen(false);
                          }
                        }}
                        onClick={() => {
                          closeMobileMenu();
                          handleLinkClick();
                        }}
                      >
                        Work Package 1: Definition of the Case Study Areas and
                        Simulation Days
                      </a>
                    </li>
                    <li role="none">
                      <a
                        href="/project-outline#work2"
                        className="mobile-link"
                        role="menuitem"
                        onClick={() => {
                          closeMobileMenu();
                          handleLinkClick();
                        }}
                      >
                        Work Package 2: Microclimate Evaluation on the Basis of
                        Climate Change
                      </a>
                    </li>
                    <li
                      role="none"
                      style={{
                        backgroundColor: "rgba(107, 139, 59, 0.2)", // RGBA for #556b2f with opacity 0.5
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      <a
                        href="/project-outline#work3"
                        className="mobile-link"
                        role="menuitem"
                        onClick={() => {
                          closeMobileMenu();
                          handleLinkClick();
                        }}
                      >
                        Work Package 3: Evaluation of Climate Change Effect on
                        the Built Environment
                      </a>
                    </li>
                    <li role="none">
                      <a
                        href="/project-outline#work4"
                        className="mobile-link"
                        role="menuitem"
                        onClick={() => {
                          closeMobileMenu();
                          handleLinkClick();
                        }}
                      >
                        Work Package 4: Experimental Assessment of Street Trees
                        as Urban NBS
                      </a>
                    </li>
                    <li
                      role="none"
                      style={{
                        backgroundColor: "rgba(107, 139, 59, 0.2)", // RGBA for #556b2f with opacity 0.5
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      <a
                        href="/project-outline#work5"
                        className="mobile-link"
                        role="menuitem"
                        onClick={() => {
                          closeMobileMenu();
                          handleLinkClick();
                        }}
                      >
                        Work Package 5: Evaluation of the Environmental and
                        Energy Effect of Street Trees
                      </a>
                    </li>
                    <li role="none">
                      <a
                        href="/project-outline#work6"
                        className="mobile-link"
                        role="menuitem"
                        onClick={() => {
                          closeMobileMenu();
                          handleLinkClick();
                        }}
                      >
                        Work Package 6: Project Management
                      </a>
                    </li>
                    <li
                      role="none"
                      style={{
                        backgroundColor: "rgba(107, 139, 59, 0.2)", // RGBA for #556b2f with opacity 0.5
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      <a
                        href="/project-outline#work7"
                        className="mobile-link"
                        role="menuitem"
                        onClick={() => {
                          closeMobileMenu();
                          handleLinkClick();
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
              onBlur={(e) => {
                // If focus is leaving both trigger and dropdown, close it
                const relatedTarget = e.relatedTarget as HTMLElement | null;
                if (
                  relatedTarget &&
                  (relatedTarget.closest("#workDropdownMenu") ||
                    relatedTarget.id === "workDropdownTrigger")
                ) {
                  return; // still inside trigger or dropdown
                }
                setIsWorkDropdownOpen(false);
              }}
            >
              <Link
                href="/project-outline"
                tabIndex={0} // makes it focusable by Tab.
                className={`${styles.navLink} px-4 ${
                  pathname === "/project-outline" ? styles.active : ""
                }`}
                aria-current={
                  pathname === "/project-outline" ? "page" : undefined
                }
                aria-haspopup="true" // Announces to assistive tech that this link controls a menu
                aria-expanded={isWorkDropdownOpen}
                aria-controls="workDropdownMenu" // Associates this link with the menu it controls (by id)
                /*  onFocus={handleWorkFocus} */

                onKeyDown={(e) => {
                  // Support for VoiceOver: Control+Option+Down Arrow to expand
                  if (e.key === "ArrowDown" && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    setIsWorkDropdownOpen(true);
                    setTimeout(() => firstDropdownItemRef.current?.focus(), 0);
                  } else if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setIsWorkDropdownOpen(true);
                    setTimeout(() => firstDropdownItemRef.current?.focus(), 0);
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setIsWorkDropdownOpen(true);
                    setTimeout(() => lastDropdownItemRef.current?.focus(), 0);
                  } else if (e.key === "Escape") {
                    setIsWorkDropdownOpen(false);
                    workDropdownTriggerRef.current?.focus();
                  } else if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsWorkDropdownOpen((prev) => !prev);
                    if (!isWorkDropdownOpen) {
                      setTimeout(
                        () => firstDropdownItemRef.current?.focus(),
                        0
                      );
                    }
                  }
                  // Tab: do nothing special, let browser move to next nav item
                }}
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

              {/* Invisible bridge to fill the gap */}
              {isWorkDropdownOpen && (
                <div
                  className="absolute top-full left-0 right-0 h-2 bg-transparent"
                  style={{ height: "8px" }} // Covers the gap
                />
              )}

              {/* The dropdown menu */}
              {isWorkDropdownOpen && (
                <div
                  id="workDropdownMenu"
                  role="menu"
                  aria-labelledby="workDropdownTrigger"
                  aria-describedby="dropdown-instructions"
                  className="dropdown-container absolute z-10 w-full bg-white font-bold rounded-lg shadow-lg "
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                >
                  <ul className="text-m" style={{ color: "#2e4d2e" }}>
                    {workPackages.map((wp, index) => (
                      <li key={wp.id} role="none">
                        <Link
                          href={`/project-outline#${wp.id}`}
                          aria-label={wp.description}
                          className="work-link block py-1 px-1"
                          tabIndex={-1}
                          role="menuitem"
                          ref={
                            index === 0
                              ? firstDropdownItemRef
                              : index === workPackages.length - 1
                              ? lastDropdownItemRef
                              : null
                          }
                          onKeyDown={(e) => {
                            if (e.key === "ArrowDown") {
                              e.preventDefault();
                              // Focus next menu item, or first if at end
                              const next =
                                e.currentTarget.parentElement?.nextElementSibling?.querySelector(
                                  'a[role="menuitem"]'
                                );
                              if (next) (next as HTMLElement).focus();
                              else firstDropdownItemRef.current?.focus();
                            } else if (e.key === "ArrowUp") {
                              e.preventDefault();
                              // Focus previous menu item, or last if at start
                              const prev =
                                e.currentTarget.parentElement?.previousElementSibling?.querySelector(
                                  'a[role="menuitem"]'
                                );
                              if (prev) (prev as HTMLElement).focus();
                              else lastDropdownItemRef.current?.focus();
                            } else if (e.key === "Escape") {
                              setIsWorkDropdownOpen(false);
                              workDropdownTriggerRef.current?.focus();
                            }

                            // Tab/Shift+Tab: let browser move to next/prev nav item, menu will close via blur
                          }}
                          onClick={() => {
                            setIsWorkDropdownOpen(false);
                            // Optionally close tooltip, etc.
                          }}
                        >
                          {wp.title}
                        </Link>
                      </li>
                    ))}
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
          role="tooltip"
          aria-live="polite"
        >
          {tooltip.text}
        </div>
      )}
      {/* Hidden instructions for screen readers */}
      <div id="dropdown-instructions" className="sr-only">
        Use arrow keys to navigate work packages. Press Enter or Space to
        activate. Press Escape to close the menu. For VoiceOver users, use
        Control+Option+Down Arrow to expand the menu.
      </div>
    </nav>
  );
};

export default Navbar;
