// src/app/partners/page.tsx
import React from "react";
import Link from "next/link";

const PartnersPage = () => {
  return (
    <section className="partnersContent no-background px-4 py-6">
      <h1 className="section-title">The Partners</h1>

      <article className="partner">
        <h2 className="partner-title">
          University of Patras, Department of Civil Engineering
        </h2>
        <p>
          Founded in 1972, the Department of Civil Engineering at the University
          of Patras is the host institution of the project. The department
          consists of:
        </p>
        <ul>
          <li>Three Divisions</li>
          <li>Nine Laboratories</li>
          <li>A Seismic Simulator Facility</li>
          <li>A Fire Testing Facility</li>
          <li>Two Computer Centers</li>
        </ul>
        <p>
          The department covers Structural, Geotechnical, Hydraulic,
          Environmental, and Transportation Engineering. It also specializes in:
        </p>
        <ul>
          <li>
            Research and development of innovative systems for combined energy
            and seismic retrofitting of buildings
          </li>
          <li>
            Numerical methods for dynamic energy performance of buildings and
            urban microclimate analysis
          </li>
          <li>
            Hygrothermal performance of buildings and sustainable urban design
          </li>
        </ul>
        <p>Learn more about the University of Patras:</p>
        <Link
          href="https://www.civil.upatras.gr/?lang=en"
          target="_blank"
          className="partner-link"
        >
          University of Patras Civil Engineering Department
        </Link>
        <br />
        <Link
          href="https://www.upatras.gr/en/"
          target="_blank"
          className="partner-link"
        >
          University of Patras Official Website
        </Link>
      </article>

      <article className="partner">
        <h2 className="partner-title">
          National Technical University of Athens (NTUA)
        </h2>
        <p>
          The National Technical University of Athens (NTUA) is a collaborating
          organization for the Re.Nature Cities project. NTUA participates
          through the School of Mechanical Engineering, Fluids Section,
          contributing by:
        </p>
        <ul>
          <li>Conducting wind tunnel measurements</li>
          <li>Studying the drag coefficient of common urban tree species</li>
        </ul>
        <p>Learn more about NTUA's contribution:</p>
        <Link
          href="http://wt.fluid.mech.ntua.gr/"
          target="_blank"
          className="partner-link"
        >
          NTUA Fluids Section
        </Link>
      </article>
    </section>
  );
};

export default PartnersPage;
