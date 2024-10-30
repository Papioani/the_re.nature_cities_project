// Navbar.tsx
import Link from "next/link";
// <Link>: This component enables client-side navigation, which means that clicking the link will not trigger a full page reload. Instead, it will only update the necessary components on the page
import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="container mx-auto flex justify-between px-4">
          <Link href="/">Home</Link>
          <Link href="/the_re.nature_cities_project">
            The Re.Nature Cities Project
          </Link>

          <Link href="/partners">Partners</Link>

          <Link href="/project_outline">Project Outline</Link>

          <Link href="/wind-tunnel">
            Wind tunnel, LAI/LAD and albedo measurements
          </Link>

          <Link href="/deliverables">Deliverables and publications</Link>

          <Link href="/the-action">The action</Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
