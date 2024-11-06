// Navbar.tsx

import Link from "next/link";
// <Link>: This component enables client-side navigation, which means that clicking the link will not trigger a full page reload. Instead, it will only update the necessary components on the page
import React from "react";

// many modern setups and Next.js examples skip React.FC
//when no props are present to keep the code concise.
const Navbar: React.FC = () => {
  return (
    <nav className="navbar sticky flex flex-col items-end justify-end text-white px-4 h-20">
      <div className="flex space-x-6 ">
        {" "}
        <Link href="/" className="nav-link">
          Home
        </Link>
        <Link href="/the-re.nature-cities-project" className="nav-link ">
          The Re.Nature <br /> Cities Project
        </Link>
        <Link href="/partners" className="nav-link">
          Partners
        </Link>
        <Link href="/project-outline" className="nav-link">
          Project Outline
        </Link>
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
