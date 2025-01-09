"use client";

// src/app/partners/page.tsx
import React, { FC, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Partners.module.css";
import Image from "next/image";

const PartnersPage: FC = () => {
  const mainContentRef = useRef<HTMLElement>(null);
  const firstParagraphRef = useRef<HTMLParagraphElement>(null);

  // Set focus to the main content on load
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.focus({ preventScroll: true });
    }
    if (firstParagraphRef.current) {
      firstParagraphRef.current.focus({ preventScroll: true });
    }
  }, []);
  /*  useEffect(() => {
    console.log("Testing without focus logic");
    window.scrollTo(0, 0);
  }, []); */

  return (
    <section
      className=" px-8 pb-10"
      ref={mainContentRef}
      aria-labelledby="partnersTitle"
    >
      <h2 id="partnersTitle">The Partners and Research Team</h2>
      <div className={`${styles.partnerLine} pb-8`}> </div>

      <article className={`${styles.partner} px-4`}>
        <p
          className={styles.partnerDescription}
          ref={firstParagraphRef}
          tabIndex={0}
        >
          <Image
            src="/CEUPlogo.png"
            alt="University of Patras Logo"
            width={500}
            height={300}
            className={`${styles.partnerLogo1} inline-block mr-3 mb-2`}
            priority // Add this line to prioritize loading the image
            layout="intrinsic"
          />
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
          <span>
            is the host institution of the project. The department consists of
            three divisions, nine laboratories, a Seismic{" "}
          </span>
          Simulator Facility, a Fire Testing Facility, and two Computer Centers
          covering the areas of Structural Engineering, Geotechnical Engineering
          and Hydraulic Engineering and Environmental Engineering and
          Transportation Engineering.
        </p>
        <ul className={styles.partnerList}>
          <ul />
          <p
            className={styles.partnerDescription}
            ref={firstParagraphRef}
            tabIndex={0}
          >
            Among others, the department presents significant expertise in the
            research and development of innovative systems and components for
            combined energy and seismic retrofitting of buildings, and also a
            strong expertise in numerical methods for buildings’ dynamic energy
            performance and urban microclimate analysis, buildings hygrothermal
            performance and sustainable design of the urban built environment.
          </p>
        </ul>
      </article>
      <div className="section-divider"></div>

      <article className={`${styles.partner} px-4`}>
        <p className={`${styles.partnerDescription} pb-8`}>
          <Image
            src="/UniAthensLogo.png"
            alt="University of Athens Logo"
            width={500}
            height={300}
            className={`${styles.partnerLogo2} inline-block mr-3`}
          />
          The{" "}
          <Link
            href="https://ntua.gr/en/"
            target="_blank"
            className="partner-link"
          >
            National Technical University of Athens (NTUA)
          </Link>
          , is a Collaborating Organization of the Re.NatureCities project. NTUA
          participates through the School of Mechanical Engineering,{" "}
          <Link
            href="http://wt.fluid.mech.ntua.gr/"
            target="_blank"
            className="partner-link"
          >
            Fluid Section
          </Link>{" "}
          and assures the wind tunnel measurements of the drag coefficient of
          common urban tree species.
        </p>
      </article>
      <div className="section-divider"></div>
      <article className={`${styles.partner} px-4`}>
        <ul>
          <li>
            <strong>Stella Tsoka</strong>
          </li>
          <li>Principal Investigator</li>
          <li>
            Assistant Professor, Department of Civil Engineering, University of
            Patras
          </li>
          <Link
            href="https://orcid.org/0000-0002-8187-8493"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.orcidLink}
          >
            Visit ORCID profile
          </Link>
        </ul>
        <ul>
          <li>
            <strong>Demetri Bouris</strong>
          </li>
          <li>
            Professor, School of Mechanical Engineering, Section of Fluids,
          </li>
          <li>
            Laboratory of Aerodynamics, National Technical University of Athens
          </li>
          <li>
            <Link
              href="https://orcid.org/0000-0003-3464-6945"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.orcidLink}
            >
              Visit ORCID profile
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <strong>Nikos Markos</strong>
          </li>
          <li>
            Researcher, Department of Civil Engineering, University of Patras,
          </li>
          <li>Researcher at Hellenic Agricultural Organization DEMETER</li>
          <li>
            <Link
              href="https://orcid.org/0000-0002-7726-9062"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.orcidLink}
            >
              Visit ORCID profile
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <strong>Ifigeneia Theodoridou</strong>
          </li>
          <li>
            Post-Doctoral Researcher, Department of Civil Engineering,
            University of Patras
          </li>
          <li>
            <Link
              href="https://scholar.google.com/citations?user=9LaZgY0AAAAJ&hl=el"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.orcidLink}
            >
              Visit Google Scholar profile
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <strong>Kondylia Velikou</strong>
          </li>
          <li>
            Post-Doctoral Researcher, Department of Civil Engineering,
            University of Patras
          </li>
          <li>
            <Link
              href="https://orcid.org/0000-0002-7897-4660"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.orcidLink}
            >
              Visit ORCID profile
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <strong>Vasiliki Pappa</strong>
          </li>
          <li>
            Scientific Associate, School of Mechanical Engineering, Section of
            Fluids,
          </li>
          <li>
            Laboratory of Aerodynamics, National Technical University of Athens
          </li>
          <li>
            <Link
              href="https://www.researchgate.net/profile/Vasiliki-Pappa-5"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.orcidLink}
            >
              Visit ResearchGate Profile
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <strong>Zwi Zaraveli</strong>
          </li>
          <li>
            Scientific Associate, Department of Civil Engineering, University of
            Patras
          </li>
        </ul>
      </article>
    </section>
  );
};

export default PartnersPage;
