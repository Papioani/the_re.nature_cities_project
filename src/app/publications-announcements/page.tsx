"use client";
import React, { useRef, useEffect } from "react";
import styles from "./PublicationsAnnouncements.module.css";

const PublicationsAnnouncements: React.FC = () => {
  const mainContentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.focus({ preventScroll: true });
    }
  }, []);
  return (
    <section className="px-8" ref={mainContentRef}>
      <h2>Publications & Conference Announcements</h2>
      <div className={`${styles.publicationsLine} pb-4`}> </div>
      {/*  <div className="section-divider"></div> */}

      {/* Conferences Section */}
      <div className="conference-announcements">
        <h3 className={styles.h3} style={{ paddingBottom: "1rem" }}>
          CONFERENCE ANNOUNCEMENTS
        </h3>
        <div className={styles.conference}>
          <p>
            Zaraveli, Z., Theodoridou, I., Tsoka, S., & Velikou, K. (2024).
            Evaluating the microclimate and thermal comfort of two urban areas
            in Athens on the basis of current and future climatic conditions{" "}
            <i>
              6th International Conference on Changing Cities CCVI: Spatial,
              Design, Landscape, Heritage, and Socio-Economic Dimensions
            </i>{" "}
            24-28 June 2024, Rhodes, Greece.
            <a
              href="https://www.researchgate.net/publication/387196067_Evaluating_the_microclimate_and_thermal_comfort_of_two_urban_areas_in_Athens_on_the_basis_of_current_and_future_climatic_conditions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more on ResearchGate
            </a>
          </p>
        </div>
        <div className={styles.conference}>
          <p>
            Tsoka, S., Pappa, V., Markos, N., & Bouris, D. (2024). Assessing the
            effect of citrus plant on the improvement of the outdoor thermal
            environment using wind tunnel and ground-based Leaf Area Index
            measurements <i>EGU 2024 Conference, Copernicus Meetings.</i>
            <a
              href="https://meetingorganizer.copernicus.org/EGU24/EGU24-20879.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              View the session here
            </a>
          </p>
          <div className="section-divider"></div>
        </div>
      </div>

      {/* Publications section */}
      <div className="publications-section">
        <h3 className={styles.h3} style={{ paddingBottom: "1rem" }}>
          PUBLICATIONS
        </h3>
        <div>
          <p></p>
        </div>
        <div>
          <p></p>
        </div>
      </div>
    </section>
  );
};

export default PublicationsAnnouncements;
