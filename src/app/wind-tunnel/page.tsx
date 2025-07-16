"use client";
import React, { useEffect, useRef } from "react";
import styles from "./Wind-tunnel.module.css";
import Image from "next/image";

const WindTunnel: React.FC = () => {
  const mainContentRef = useRef<HTMLElement>(null);

  // Set focus to the main content on load
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.focus({ preventScroll: true });
    }
  }, []);
  return (
    <main
      className="px-6 sm:px-8 pb-16"
      ref={mainContentRef}
      aria-labelledby="main-title"
    >
      <h2 id="main-title">Wind Tunnel, LAI/LAD & Albedo Measurements</h2>
      {/* <div className={styles.windLine}> </div> */}

      <section
        aria-labelledby="wind-tunnel-experiments"
        className={styles.windPart}
      >
        <h3 id="wind-tunnel-experiments" className={styles.NTUAPackageTitle}>
          NTUA Wind tunnel experiments{" "}
        </h3>
        <div className={styles.NTUADescription}>
          <div className={styles.NTUAtext}>
            <ul>
              <li>
                <div className={styles.NTUALiContent}>
                  <span className={styles.NTUABullet} aria-hidden="true">
                    ○
                  </span>{" "}
                  <span className={styles.NTUAtext}>
                    Experimental determination of the drag coefficient (Cd) of
                    natural trees/shrubs with different geometric properties.
                  </span>
                </div>
              </li>
              <li>
                <div className={styles.NTUALiContent}>
                  <span className={styles.NTUABullet} aria-hidden="true">
                    ○
                  </span>{" "}
                  <span className={styles.NTUAtext}>
                    Representative deciduous and evergreen species, commonly
                    used in urban areas of Mediterranean region, i.e. i)
                    Clementine, ii) Magnolia, iii) Oleander and iv) Tilia.
                  </span>
                </div>
              </li>
              <li>
                <div className={styles.NTUALiContent}>
                  <span className={styles.NTUABullet} aria-hidden="true">
                    ○
                  </span>{" "}
                  <span className={styles.NTUAtext}>
                    Trees samples&apos; height: 1.8m.
                  </span>
                </div>
              </li>
              <li>
                <div className={styles.NTUALiContent}>
                  <span className={styles.NTUABullet} aria-hidden="true">
                    ○
                  </span>{" "}
                  <span className={styles.NTUAtext}>
                    Examined wind speeds: 1.4m/s-10m/s.
                  </span>
                </div>
              </li>
              <li>
                <div className={styles.NTUALiContent}>
                  <span className={styles.NTUABullet} aria-hidden="true">
                    ○
                  </span>{" "}
                  <span className={styles.NTUAtext}>
                    3 examined samples of each tree type.
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div className={`${styles.NTUAimage} ${styles.NTUAimageWithPadding}`}>
            <Image
              src="/WIND TUN.jpg"
              alt="Wind tunnel experimental setup showing tree sample during drag coefficient measurement"
              width={380}
              height={228}
              className={styles.treePhoto}
              priority
              quality={85}
              sizes="(max-width: 768px) 100vw, 380px"
              title="Wind Tunnel Setup"
            />
          </div>
        </div>
      </section>
      <section
        aria-labelledby="albedo-measurements"
        className={styles.windPart}
      >
        <h3 id="albedo-measurements" className={styles.NTUAPackageTitle}>
          Albedo Measurements
        </h3>
        <div className={styles.NTUADescription}>
          <div className={styles.NTUAtext}>
            <ul>
              <li>
                <div className={styles.NTUALiContent}>
                  <span className={styles.NTUABullet} aria-hidden="true">
                    ○
                  </span>{" "}
                  <span className={styles.NTUAtext}>
                    Use of portable pyranometers to measure the received and
                    reflected radiation by the plants&apos; foliage and
                    definition of the albedo value.
                  </span>
                </div>
              </li>
              <li>
                <div className={styles.NTUALiContent}>
                  <span className={styles.NTUABullet} aria-hidden="true">
                    ○
                  </span>{" "}
                  <span className={styles.NTUAtext}>
                    Measurements conducted for the 4 examined tree types and all
                    samples.
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div className={`${styles.NTUAimage} ${styles.NTUAimageWithPadding}`}>
            <Image
              src="/ALBEDO.jpg"
              alt="Portable pyranometers measuring reflected radiation from tree foliage for albedo determination"
              width={500}
              height={300}
              className={styles.treePhoto}
              priority
              quality={85}
              sizes="(max-width: 768px) 100vw, 500px"
              title="Albedo Measurements"
            />
          </div>
        </div>
      </section>
      <section aria-labelledby="lai-measurements" className={styles.windPart}>
        <h3 id="lai-measurements" className={styles.NTUAPackageTitle}>
          Leaf Area Index/Leaf Area Density Measurements
        </h3>
        <div className={styles.NTUADescription}>
          <div className={styles.NTUAtext}>
            <ul>
              <li>
                <div className={styles.NTUALiContentWithMargin}>
                  <span className={styles.NTUABullet} aria-hidden="true">
                    ○
                  </span>{" "}
                  <span className={styles.NTUAtext}>
                    Use of a portable canopy analyzer (LAI- 2000 PCA, LI-COR
                    Biosciences, USA) for the LAI definition.
                  </span>
                </div>
              </li>
              <li>
                <div className={styles.NTUALiContent}>
                  <span className={styles.NTUABullet} aria-hidden="true">
                    ○
                  </span>{" "}
                  <span className={styles.NTUAtext}>
                    For each plant, 4 perimetric measurements performed, with
                    the use of a 45 o lens cap, for the better representation of
                    plants&apos; spatial distribution.
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div className={styles.NTUAimage}>
            <Image
              src="/ANALYSER.jpg"
              alt="LAI-2000 PCA canopy analyzer used for leaf area index measurements"
              width={500}
              height={300}
              className={styles.treePhoto}
              loading="lazy"
              quality={85}
              sizes="(max-width: 768px) 100vw, 500px"
              title="LAI-2000 PCA Canopy Analyzer"
            />
          </div>
        </div>
      </section>
      <section aria-labelledby="lma-measurements" className={styles.windPart}>
        <h3 id="lma-measurements" className={styles.NTUAPackageTitle}>
          Leaf Mass per Area (LMA) Measurements
        </h3>
        <div className={styles.NTUADescription}>
          <div className={styles.NTUAtext}>
            <ul>
              <li>
                <div className={styles.NTUALiContent}>
                  <span className={styles.NTUABullet} aria-hidden="true">
                    ○
                  </span>{" "}
                  <span className={styles.NTUAtext}>
                    Leaf Mass per Area denotes the dry weight of leaves per the
                    respective leaf area.
                  </span>
                </div>
              </li>
              <li>
                <div className={styles.NTUALiContent}>
                  <span className={styles.NTUABullet} aria-hidden="true">
                    ○
                  </span>{" "}
                  <span className={styles.NTUAtext}>
                    LMA measurements performed for all plants.
                  </span>
                </div>
              </li>
              <li>
                <div className={styles.NTUALiContent}>
                  <span className={styles.NTUABullet} aria-hidden="true">
                    ○
                  </span>{" "}
                  <span className={styles.NTUAtext}>
                    From each plant, 10 leaves were collected and taken to the
                    laboratory.
                  </span>
                </div>
              </li>
              <li>
                <div className={styles.NTUALiContent}>
                  <span className={styles.NTUABullet} aria-hidden="true">
                    ○
                  </span>{" "}
                  <span className={styles.NTUAtext}>
                    Samples were collected from each leaf with the use of a
                    borer with known area. The samples were dried in the oven at
                    80 o C for 48 hours.
                  </span>
                </div>
              </li>
              <li>
                <div className={styles.NTUALiContent}>
                  <span className={styles.NTUABullet} aria-hidden="true">
                    ○
                  </span>{" "}
                  <span className={styles.NTUAtext}>
                    Finally, leaf dry weight was measured with the use of a
                    precision scale.
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div className={styles.NTUAimage}>
            <Image
              src="/LMA.jpg"
              alt="Laboratory equipment setup for leaf mass per area measurements including precision scale"
              width={500}
              height={300}
              className={styles.treePhoto}
              loading="lazy"
              quality={85}
              sizes="(max-width: 768px) 100vw, 500px"
              title="LMA Measurements"
            />
          </div>
        </div>
      </section>
    </main>
  );
};
export default WindTunnel;
