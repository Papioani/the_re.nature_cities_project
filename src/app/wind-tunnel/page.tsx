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
      <div className="section-divider"></div>
      <h3 id="NTUA" className={styles.NTUAPackageTitle}>
        NTUA Wind tunnel experiments{" "}
      </h3>
      <div className={styles.NTUADescription}>
        <article className={styles.NTUA}>
          <ul>
            <p>
              Experimental determination of the drag coefficient (Cd) of natural
              trees/shrubs with different geometric properties
            </p>
            <p>
              Representative deciduous and evergreen species, commonly used in
              urban areas of Mediterranean region, i.e. i) Clementine, ii)
              Magnolia, iii) Oleander and iv) Tilia.
            </p>
            <p> Trees samples’height: 1.8m</p>
            <p>Examined wind speeds: 1.4m/s-10m/s</p>
            <p>3 examined samples of each tree type</p>
          </ul>

          <Image
            src="/WIND TUN.jpg"
            alt="Photo of the tree sample"
            width={500}
            height={300}
            className={styles.treePhoto}
          />
        </article>
      </div>
    </section>
  );
};
export default WindTunnel;
