// src/app/the_re.nature_cities_project/page.tsx

"use client";

import React, { FC } from "react";
import styles from "./theReNatureCitiesProject.module.css";

// If there were props, we would define them here as an interface
// interface ReNaturePageProps {
//   title: string;
// }
const ReNaturePage: FC = () => {
  return (
    <>
      {/* <section
        className={`${styles.reNatureProjectContent} px-8 py-2 pb-16 p-4 bg-white shadow-md rounded-lg`}
      > */}
      <div className="w-full flex justify-center items-center gap-4 p-8">
        <div className="line"></div>
        <h2 id="scope" className="text-center" /*  className="markerSquare" */>
          The Scope
        </h2>{" "}
        <div className="line"></div>
      </div>
      <p
        /*  style={{ backgroundColor: "white" }} */
        className="text-m leading-relaxed mb-6 " /*  border-l-2 border-[#059669] pl-2 */
      >
        Re.Nature Cities aims to evaluate via experimental and simulation means
        the ability of street trees as nature-based solutions (NBS) to act as an
        effective measure against the increased air temperature on the ambient
        and indoor environment, thermal discomfort, air pollution, and energy
        costs caused by climate change, while promoting public health and the
        well-being of the citizens.
      </p>{" "}
      <div>
        <div className="section-divider"></div>
        {/* <div className="section-divider2"></div> */}
      </div>
      <div className="w-full flex justify-center items-center gap-4 p-8">
        <div className="line"></div>
        <h2
          id="objectives"
          className="text-center gap-4" /* className="markerSquare" */
        >
          The Objectives
        </h2>
        <div className="line"></div>
      </div>
      <ul className={`${styles.listCustom} pl-6`}>
        <li className="mb-2">
          To assess the{" "}
          <span className={styles.emphasis}>microclimatic conditions</span>{" "}
          prevailing in urban districts in Greek cities, based on{" "}
          <span className={styles.emphasis}>
            current and future climate change conditions.
          </span>
        </li>
        <li className="mb-2">
          To evaluate the{" "}
          <span className={styles.emphasis}>building’s energy performance</span>
          , as well as the{" "}
          <span className={styles.emphasis}>thermal comfort conditions</span> in
          indoor and outdoor spaces.
        </li>
        <li className="mb-2">
          To provide <span className={styles.emphasis}>guidelines</span>{" "}
          regarding the{" "}
          <span className={styles.emphasis}>
            contribution of street trees as Nature Based Solutions to the
            climate resilience
          </span>{" "}
          of urban areas.
        </li>
        <li className="mb-2">
          To create a{" "}
          <span className={styles.emphasis}>
            high-accuracy experimental database of foliage, thermal, and
            aerodynamic characteristics
          </span>{" "}
          of common urban tree species, available for use in the precise and
          holistic evaluation of trees' effects in cities.
        </li>
        <li className="mb-2">
          To develop a{" "}
          <span className={styles.emphasis}>decision-making toolbox</span>,
          which will allow for the optimized selection of street trees and
          planting patterns for urban areas.
        </li>
      </ul>
      {/* <div className="section-divider2"></div> */}
    </>
  );
};

export default ReNaturePage;
