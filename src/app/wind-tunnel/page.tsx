"use client";
import React, { useEffect, useRef } from "react";
import styles from "./Wind-tunnel.module.css";
import Image from "next/image";

const WindTunnel: React.FC = () => {
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
  return (
    <section
      className=" text-m px-6 pb-16"
      ref={mainContentRef}
      aria-labelledby="WindTunnelTitle"
    >
      <h2>Wind Tunnel, LAI/LAD & Albedo Measurements</h2>
      <div className={`${styles.windLine} pb-8`}> </div>
      <div className={styles.windPart}>
        <h3 id="NTUA" className={styles.NTUAPackageTitle}>
          NTUA Wind tunnel experiments{" "}
        </h3>
        <div className={styles.NTUADescription}>
          <div className={styles.NTUAtext}>
            <ul>
              <li>
                <div className={styles.NTUALiContent}>
                  <span className={styles.NTUABullet}>○</span>
                  <span className={styles.NTUAtext}>
                    Experimental determination of the drag coefficient (Cd) of
                    natural trees/shrubs with different geometric properties.
                  </span>
                </div>
              </li>
              <li>
                <div className={styles.NTUALiContent}>
                  <span className={styles.NTUABullet}>○</span>
                  <span className={styles.NTUAtext}>
                    Representative deciduous and evergreen species, commonly
                    used in urban areas of Mediterranean region, i.e. i)
                    Clementine, ii) Magnolia, iii) Oleander and iv) Tilia.
                  </span>
                </div>
              </li>
              <li>
                <div className={styles.NTUALiContent}>
                  <span className={styles.NTUABullet}>○</span>
                  <span className={styles.NTUAtext}>
                    Trees samples’ height: 1.8m.
                  </span>
                </div>
              </li>
              <li>
                <div className={styles.NTUALiContent}>
                  <span className={styles.NTUABullet}>○</span>
                  <span className={styles.NTUAtext}>
                    Examined wind speeds: 1.4m/s-10m/s.
                  </span>
                </div>
              </li>
              <li>
                <div className={styles.NTUALiContent}>
                  <span className={styles.NTUABullet}>○</span>
                  <span className={styles.NTUAtext}>
                    3 examined samples of each tree type.
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div className={styles.NTUAimage}>
            <Image
              src="/WIND TUN.jpg"
              alt="Photo of the tree sample"
              width={500}
              height={300}
              className={styles.treePhoto}
            />
          </div>
        </div>
      </div>
      <div className={styles.windPart}>
        <h3 id="NTUA" className={`${styles.NTUAPackageTitle} ml-4`}>
          Albedo measurements{" "}
        </h3>
        <div className={styles.NTUADescription}>
          <div className={styles.NTUAtext}>
            <ul>
              <li>
                <div
                  className={styles.NTUALiContent}
                  style={{ marginTop: "2rem" }}
                >
                  <span className={styles.NTUABullet}>○</span>
                  <span className={styles.NTUAtext}>
                    Use of portable pyranometers to measure the received and
                    reflected radiation by the plants’ foliage and definition of
                    the albedo value.
                  </span>
                </div>
              </li>
              <li>
                <div className={styles.NTUALiContent}>
                  <span className={styles.NTUABullet}>○</span>
                  <span className={styles.NTUAtext}>
                    Measurements conducted for the 4 examined tree types and all
                    samples.
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div className={styles.NTUAimage}>
            <Image
              src="/ALBEDO.jpg"
              alt="Photo of portable pyranometers"
              width={500}
              height={300}
              className={styles.treePhoto}
            />
          </div>
        </div>
      </div>
      {/* <article className={styles.windBox}> */}
      <div className={styles.windPart}>
        <h3 id="NTUA" className={`${styles.NTUAPackageTitle} ml-4`}>
          Leaf Area Index/Leaf Area Density measurements{" "}
        </h3>
        <div className={styles.NTUADescription}>
          <div className={styles.NTUAtext}>
            <ul>
              <li>
                <div
                  className={styles.NTUALiContent}
                  style={{ marginTop: "2rem" }}
                >
                  <span className={styles.NTUABullet}>○</span>
                  <span className={styles.NTUAtext}>
                    Use of a portable canopy analyzer (LAI- 2000 PCA, LI-COR
                    Biosciences, USA) for the LAI definition.
                  </span>
                </div>
              </li>
              <li>
                <div className={styles.NTUALiContent}>
                  <span className={styles.NTUABullet}>○</span>
                  <span className={styles.NTUAtext}>
                    For each plant, 4 perimetric measurements performed, with
                    the use of a 45 o lens cap, for the better representation of
                    plants’ spatial distribution.
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div className={styles.NTUAimage}>
            <Image
              src="/ANALYSER.jpg"
              alt="Photo of the analyser"
              width={500}
              height={300}
              className={styles.treePhoto}
            />
          </div>
        </div>
      </div>
      <div className={styles.windPart}>
        <h3 id="NTUA" className={`${styles.NTUAPackageTitle} ml-4`}>
          Leaf Area Index/Leaf Area Density measurements{" "}
        </h3>
        <div className={styles.NTUADescription}>
          <div className={styles.NTUAtext}>
            <ul>
              <li>
                <div className={styles.NTUALiContent}>
                  <span className={styles.NTUABullet}>○</span>
                  <span className={styles.NTUAtext}>
                    Leaf Mass per Area denotes the dry weight of leaves per the
                    respective leaf area.
                  </span>
                </div>
              </li>
              <li>
                <div className={styles.NTUALiContent}>
                  <span className={styles.NTUABullet}>○</span>
                  <span className={styles.NTUAtext}>
                    LMA measurements performed for all plants.
                  </span>
                </div>
              </li>
              <li>
                <div className={styles.NTUALiContent}>
                  <span className={styles.NTUABullet}>○</span>
                  <span className={styles.NTUAtext}>
                    From each plant, 10 leaves were collected and taken to the
                    laboratory.
                  </span>
                </div>
              </li>
              <li>
                <div className={styles.NTUALiContent}>
                  <span className={styles.NTUABullet}>○</span>
                  <span className={styles.NTUAtext}>
                    Samples were collected from each leaf with the use of a
                    borer with known area. The samples were dried in the oven at
                    80 o C for 48 hours.
                  </span>
                </div>
              </li>
              <li>
                <div className={styles.NTUALiContent}>
                  <span className={styles.NTUABullet}>○</span>
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
              alt="Photo of the LMA"
              width={500}
              height={300}
              className={styles.treePhoto}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default WindTunnel;
