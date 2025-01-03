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
      <h2 id="partnersTitle">The Partners</h2>
      <div className={`${styles.partnerLine} pb-8`}> </div>

      <article className={`${styles.partner} text-large px-4`}>
        <p
          className={`${styles.partnerDescription} text-lg `}
          ref={firstParagraphRef}
          tabIndex={0}
        >
          <Image
            src="/CEUPlogo.png"
            alt="University of Patras Logo"
            width={500}
            height={300}
            className={`${styles.partnerLogo1} inline-block mr-3 mb-2`}
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
          covering the areas of:
        </p>
        <ul className={`${styles.partnerList} text-lg`}>
          <li>Structural Engineering</li>
          <li>Geotechnical Engineering and Hydraulic Engineering </li>
          <li>Environmental Engineering and Transportation Engineering</li>
          <ul />

          <p
            className={`${styles.partnerDescription} text-lg `}
            ref={firstParagraphRef}
            tabIndex={0}
          >
            Among others, the department presents significant expertise in the
            research and development of innovative systems and components for
            combined energy and seismic retrofitting of buildings, and also a
            strong expertise in numerical methods for buildings’ dynamic energy
            performance and urban microclimate analysis, buildings hygrothermal
            performance and sustainable design of the urban built environment
          </p>
        </ul>
      </article>
      <div className={`${styles.partnerLine} pb-8`}> </div>

      <article className={`${styles.partner} px-4 text-lg`}>
        <p className={`${styles.partnerDescription} `}>
          <Image
            src="/UniAthensLogo.png"
            alt="University of Patras Logo"
            width={500}
            height={300}
            className={`${styles.partnerLogo2} inline-block mr-3`}
          />
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
          coefficient of common urban tree species.
        </p>
      </article>
    </section>
  );
};

export default PartnersPage;
