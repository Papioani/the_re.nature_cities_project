// src/app/project-outline/page.tsx
import React, { FC } from "react";

const ProjectOutline: FC = () => {
  return (
    <section className="project-outline-container text-m px-6 pb-16">
      <h2 className="text-start">The Project Outline</h2>
      <p className="project-description text-m leading-relaxed my-6">
        Re.Nature Cities project consists of the following work packages and
        subsections:
      </p>

      <article className="work-package">
        <h2 id="work1" className="work-package-title">
          Work Package 1: Definition of the Case Study Areas and Simulation Days
        </h2>
        <ul className="work-package-details text-m">
          <li>
            Collection of Local Climate Zone classification data for Athens and
            selection of the case study urban districts
          </li>
          <li>
            Definition of typical and extreme simulation days for microclimate
            analysis
          </li>
        </ul>
      </article>

      <article className="work-package">
        <h2 id="work2" className="work-package-title">
          Work Package 2: Microclimate Evaluation on the Basis of Climate Change
        </h2>
        <ul className="work-package-details">
          <li>
            Microclimate analysis of the selected urban districts for the
            current and future climatic conditions considering 2 future periods
            and 2 emission scenarios
          </li>
          <li>Identification of the most critical scenario</li>
          <li>
            Extraction of microclimate data for buildings’ dynamic energy
            performance simulations.
          </li>
        </ul>
      </article>

      <article className="work-package">
        <h2 id="work3" className="work-package-title">
          Work Package 3: Evaluation of Climate Change Effect on the Built
          Environment
        </h2>
        <ul className="work-package-details">
          <li>
            Building energy performance and indoor thermal comfort analysis of
            residential buildings located inside the selected case study areas
          </li>
          <li>Assessment of Natural Ventilation Potential</li>
          <li>Outdoor thermal comfort analysis</li>
        </ul>
      </article>

      <article className="work-package">
        <h2 id="work4" className="work-package-title">
          Work Package 4: Experimental Assessment of Street Trees as Urban NBS
        </h2>
        <ul className="work-package-details">
          <li>
            Selection of tree types, commonly encountered in urban areas of
            Mediterranean cities
          </li>
          <li>LAI/LAD, albedo measurements</li>
          <li>Wind tunnel measurements</li>
        </ul>
      </article>

      <article className="work-package">
        <h2 id="work5" className="work-package-title">
          Work Package 5: Evaluation of the Environmental and Energy Effect of
          Street Trees
        </h2>
        <ul className="work-package-details">
          <li>
            Definition of planting scenarios according to each tree type and the
            morphology of the selected case study areas
          </li>
          <li>
            Numerical evaluation of the impact of the selected trees on the
            microclimate of the examined case study areas, the outdoor thermal
            comfort, the buildings’ energy performance, and the natural
            ventilation potential.
          </li>
          <li>
            Use of the measured values in WP4, for the accurate modeling of
            plants
          </li>
        </ul>
      </article>

      <article className="work-package">
        <h2 id="work6" className="work-package-title">
          Work Package 6: Project Management
        </h2>
      </article>

      <article className="work-package">
        <h2 id="work7" className="work-package-title">
          Work Package 7: Dissemination and Communication of the Results
        </h2>
      </article>
    </section>
  );
};

export default ProjectOutline;
