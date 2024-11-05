// Navbar.tsx
import Link from "next/link";
// <Link>: This component enables client-side navigation, which means that clicking the link will not trigger a full page reload. Instead, it will only update the necessary components on the page
import React from "react";

// many modern setups and Next.js examples skip React.FC
//when no props are present to keep the code concise.
const Navbar = () => {
  return (
    <>
      <nav className="navbar flex items-center justify-between text-white px-4">
        <div className="flex space-x-6">
          {" "}
          <Link href="/" className="nav-link home">
            Home
          </Link>
          <Link
            href="/the-re.nature-cities-project"
            className="nav-link large-tabs"
          >
            The Re.Nature Cities Project
          </Link>
          <Link href="/partners" className="nav-link home">
            Partners
          </Link>
          <Link href="/project-outline" className="nav-link">
            Project Outline
          </Link>
          <Link href="/wind-tunnel" className="nav-link wind large-tabs">
            Wind tunnel, LAI/LAD and albedo measurements
          </Link>
          <Link
            href="/deliverables-publications"
            className="nav-link large-tabs"
          >
            Deliverables and publications
          </Link>
          <Link href="/the-action" className="nav-link home">
            The action
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
