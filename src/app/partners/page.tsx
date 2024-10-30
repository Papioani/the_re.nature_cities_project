// src/app/partners/page.tsx
import React, { FC } from "react";
import Link from "next/link";

const PartnersPage: FC = () => {
  return (
    <section className="partnersContent no-background px-4 py-6">
      <h1 className="section-title">The Partners</h1>

      <article className="partner">
        <p>
          Founded in 1972, the{" "}
          <Link
            href="https://www.civil.upatras.gr/?lang=en"
            target="_blank"
            className="partner-link"
          >
            Department of Civil Engineering
          </Link>{" "}
          at the{" "}
          <Link
            href="https://www.civil.upatras.gr/?lang=en"
            target="_blank"
            className="partner-link"
          >
            University of Patras
          </Link>{" "}
          is the host institution of the project. The department consists of
          three divisions, nine laboratories, a Seismic Simulator Facility, a
          Fire Testing Facility, and two Computer Centers covering the areas of
        </p>
        <ul>
          <li>Structural Engineering</li>
          <li>Geotechnical Engineering and Hydraulic Engineering</li>
          <li>Environmental Engineering and Transportation Engineering</li>
          <ul />
          <li>
            Research and development of innovative systems for combined energy
            and seismic retrofitting of buildings
          </li>
          <p>
            {" "}
            Among its notable expertise, the department focuses on the research
            and development of innovative systems for combined energy and
            seismic retrofitting of buildings. It also excels in numerical
            methods for assessing dynamic energy performance and urban
            microclimate analysis, along with hygrothermal performance and
            sustainable design of the urban built environment.
          </p>
          <li>
            Numerical methods for dynamic energy performance of buildings and
            urban microclimate analysis
          </li>
          <li>
            Hygrothermal performance of buildings and sustainable urban design
          </li>
        </ul>
      </article>

      <article className="partner">
        <p>
          The{" "}
          <Link
            href="http://wt.fluid.mech.ntua.gr/"
            target="_blank"
            className="partner-link"
          >
            National Technical University of Athens (NTUA){" "}
          </Link>{" "}
          is a collaborating organization for the Re.Nature Cities project. NTUA
          participates through the School of Mechanical Engineering, Fluids is a
          Collaborating Organization of the Re.Nature Cities project. NTUA
          participates through the School of Mechanical Engineering, Fluids
          Section and assures the wind tunnel measurements of the drag
          coefficient of common urban tree species
        </p>
      </article>
    </section>
  );
};

export default PartnersPage;
