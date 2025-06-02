// src/app/the_re.nature_cities_project/page.tsx

"use client";

import React, { FC, useRef } from "react";
import styles from "./theReNatureCitiesProject.module.css";
import {
  MagnifyingGlass,
  ClipboardText,
  Leaf,
  Tree,
  Wind,
  Buildings,
  ChartLine,
} from "@phosphor-icons/react";

// If there were props, we would define them here as an interface
// interface ReNaturePageProps {
//   title: string;
// }
const ReNaturePage: FC = () => {
  const mainContentRef = useRef<HTMLElement>(null);

  return (
    <>
      {/* <section
        className={`${styles.reNatureProjectContent} px-8 py-2 pb-16 p-4 bg-white shadow-md rounded-lg`}
      > */}
      <section className=" pb-10" ref={mainContentRef}>
        <div className="w-full flex justify-between items-center ">
          <h2
            id="scope"
            className="text-center flex items-center gap-4 px-4" /*  className="markerSquare" */
          >
            <MagnifyingGlass size={24} weight="light" color="#2e4d2e" /> The
            Scope
          </h2>
        </div>
        <p
          className="leading-relaxed mb-6 pl-6" /*  border-l-2 border-[#059669] pl-2 */
        >
          Re.Nature Cities aims to evaluate via experimental and simulation
          means the ability of street trees as nature-based solutions (NBS) to
          act as an effective measure against the increased air temperature on
          the ambient and indoor environment, thermal discomfort, air pollution,
          and energy costs caused by climate change, while promoting public
          health and the well-being of the citizens.
        </p>{" "}
        <div className="section-divider"></div>
        <div className="w-full flex justify-between items-center">
          <h2
            id="objectives"
            className="text-center flex items-center gap-4 px-4"
          >
            <ClipboardText size={24} weight="light" color="#2e4d2e" /> The
            Objectives
          </h2>
        </div>
        <ul className={`${styles.listCustom} pl-6 text-m`}>
          <li className="mb-2 flex items-start gap-2">
            <Buildings
              size={20}
              weight="light"
              color="#2e4d2e"
              className="mt-1 flex-shrink-0"
            />
            <span>
              To assess the{" "}
              <span className={styles.emphasis}>microclimatic conditions</span>{" "}
              prevailing in urban districts in Greek cities, based on{" "}
              <span className={styles.emphasis}>
                current and future climate change conditions.
              </span>
            </span>
          </li>
          <li className="mb-2 flex items-start gap-2">
            <ChartLine
              size={20}
              weight="light"
              color="#2e4d2e"
              className="mt-1 flex-shrink-0"
            />
            <span>
              To evaluate the{" "}
              <span className={styles.emphasis}>
                building&apos;s energy performance
              </span>
              , as well as the{" "}
              <span className={styles.emphasis}>
                thermal comfort conditions
              </span>{" "}
              in indoor and outdoor spaces.
            </span>
          </li>
          <li className="mb-2 flex items-start gap-2">
            <Leaf
              size={20}
              weight="light"
              color="#2e4d2e"
              className="mt-1 flex-shrink-0"
            />
            <span>
              To provide <span className={styles.emphasis}>guidelines</span>{" "}
              regarding the{" "}
              <span className={styles.emphasis}>
                contribution of street trees as Nature Based Solutions to the
                climate resilience
              </span>{" "}
              of urban areas.
            </span>
          </li>
          <li className="mb-2 flex items-start gap-2">
            <Tree
              size={20}
              weight="light"
              color="#2e4d2e"
              className="mt-1 flex-shrink-0"
            />
            <span>
              To create a{" "}
              <span className={styles.emphasis}>
                high-accuracy experimental database of foliage, thermal, and
                aerodynamic characteristics
              </span>{" "}
              of common urban tree species, available for use in the precise and
              holistic evaluation of trees&apos; effects in cities.
            </span>
          </li>
          <li className="mb-2 flex items-start gap-2">
            <Wind
              size={20}
              weight="light"
              color="#2e4d2e"
              className="mt-1 flex-shrink-0"
            />
            <span>
              To develop a{" "}
              <span className={styles.emphasis}>decision-making toolbox</span>,
              which will allow for the optimized selection of street trees and
              planting patterns for urban areas.
            </span>
          </li>
        </ul>
      </section>
    </>
  );
};

export default ReNaturePage;
