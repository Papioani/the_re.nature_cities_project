// src/app/the_re.nature_cities_project/page.tsx
import React, { FC } from "react";
// If there were props, we would define them here as an interface
// interface ReNaturePageProps {
//   title: string;
// }
const ReNaturePage: FC = () => {
  return (
    <section className="re.NatureProjectContent no-background px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">The Scope</h2>{" "}
      <p className="mb-4">
        Re.Nature Cities aims to evaluate via experimental and simulation means
        the ability of street trees as nature-based solutions (NBS) to act as an
        effective measure against the increased air temperature on the ambient
        and indoor environment, thermal discomfort, air pollution, and energy
        costs caused by climate change, while promoting public health and the
        well-being of the citizens.
      </p>{" "}
      <h2 className="text-2xl font-bold mb-4">The Objectives</h2>
      <ul className="list-disc pl-6">
        <li className="mb-2">
          To assess the microclimatic conditions prevailing in urban districts
          in Greek cities, based on current and future climate change
          conditions.
        </li>
        <li className="mb-2">
          To evaluate the building’s energy performance, as well as the thermal
          comfort conditions in indoor and outdoor spaces.
        </li>
        <li className="mb-2">
          To provide guidelines regarding the contribution of street trees as
          Nature Based Solutions to the climate resilience of urban areas.
        </li>
        <li className="mb-2">
          To create a high-accuracy experimental database of foliage, thermal,
          and aerodynamic characteristics of common urban tree species,
          available for use in the precise and holistic evaluation of trees'
          effects in cities.
        </li>
        <li className="mb-2">
          To develop a decision-making toolbox, which will allow for the
          optimized selection of street trees and planting patterns for urban
          areas.
        </li>
      </ul>
    </section>
  );
};

export default ReNaturePage;
