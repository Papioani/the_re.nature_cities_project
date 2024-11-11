// src/app/the_re.nature_cities_project/page.tsx

"use client";

import React, { FC } from "react";

// If there were props, we would define them here as an interface
// interface ReNaturePageProps {
//   title: string;
// }
const ReNaturePage: FC = () => {
  return (
    <section className="re.NatureProjectContent px-8 py-2 pb-16 ">
      <h2 id="scope" className="marker-square">
        The Scope
      </h2>{" "}
      <p className="text-lg leading-relaxed mb-6 border-l-4 border-[#059669] pl-4">
        Re.Nature Cities aims to evaluate via experimental and simulation means
        the ability of street trees as nature-based solutions (NBS) to act as an
        effective measure against the increased air temperature on the ambient
        and indoor environment, thermal discomfort, air pollution, and energy
        costs caused by climate change, while promoting public health and the
        well-being of the citizens.
      </p>{" "}
      <div className="section-divider"></div>
      <h2 id="objectives" className="marker-square">
        The Objectives
      </h2>
      <ul className="list-custom pl-6">
        <li className="mb-2">
          To assess the{" "}
          <span className="emphasis">microclimatic conditions</span> prevailing
          in urban districts in Greek cities, based on{" "}
          <span className="emphasis">
            current and future climate change conditions.
          </span>
        </li>
        <li className="mb-2">
          To evaluate the{" "}
          <span className="emphasis">building’s energy performance</span>, as
          well as the{" "}
          <span className="emphasis">thermal comfort conditions</span> in indoor
          and outdoor spaces.
        </li>
        <li className="mb-2">
          To provide <span className="emphasis">guidelines</span> regarding the{" "}
          <span className="emphasis">
            contribution of street trees as Nature Based Solutions to the
            climate resilience
          </span>{" "}
          of urban areas.
        </li>
        <li className="mb-2">
          To create a{" "}
          <span className="emphasis">
            high-accuracy experimental database of foliage, thermal, and
            aerodynamic characteristics
          </span>{" "}
          of common urban tree species, available for use in the precise and
          holistic evaluation of trees' effects in cities.
        </li>
        <li className="mb-2">
          To develop a <span className="emphasis">decision-making toolbox</span>
          , which will allow for the optimized selection of street trees and
          planting patterns for urban areas.
        </li>
      </ul>
      <div className="section-divider"></div>
    </section>
  );
};

export default ReNaturePage;
