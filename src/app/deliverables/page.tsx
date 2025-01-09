"use client";
import React, { FC, useEffect, useRef } from "react";
import styles from "./Deliverables.module.css";
import Link from "next/link";

const DeliverablesPage: FC = () => {
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
      className="px-8 pb-10"
      aria-labelledby="deliverablesTitle"
      ref={mainContentRef}
    >
      {" "}
      <h2 id="deliverablesTitle">Deliverables</h2>
      <div className={`${styles.deliverablesLine} pb-8`}></div>
      <div className="rounded-lg border border-gray-200 overflow-hidden shadow-md">
        <table className="table-auto w-full">
          <thead className="bg-[#1c3d5a]" /* 2e4d2e  1c3d5a 556b2f*/>
            <tr>
              <th className="px-4 py-2  "></th>
              <th className="px-4 py-2 "></th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.deliverableRow}>
              <td className="px-4 py-2 font-semibold">D1.1. </td>
              <td className="px-4 py-2 ">
                Case study areas and simulations days
              </td>
              <td className={`px-4 py-2 ${styles.deliverableLink}`}>
                <Link
                  href="https://zenodo.org/records/14513140"
                  target="_blank"
                >
                  Go to deliverable
                </Link>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">D2.1.</td>
              <td className="px-4 py-2 ">
                Microclimate evaluation for current and future conditions
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">D3.1.</td>
              <td className="px-4 py-2 ">
                Evaluation of climate change effect on the built environment
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">D4.1</td>
              <td className="px-4 py-2 ">
                Selection of urban street trees types{" "}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">D4.2.</td>
              <td className="px-4 py-2 ">LAI/LAD and albedo database</td>
            </tr>
            <tr className={styles.deliverableRow}>
              <td className="px-4 py-2 font-semibold">D4.3.</td>
              <td className="px-4 py-2 ">Drag coefficients database</td>
              <td className={`px-4 py-2 ${styles.deliverableLink}`}>
                <Link
                  href="https://zenodo.org/records/14442184"
                  target="_blank"
                >
                  Go to deliverable
                </Link>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">D5.1.</td>
              <td className="px-4 py-2 ">Impact of NBS on microclimate</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">D5.2.</td>
              <td className="px-4 py-2 ">
                Impact of NBS on building performance and NVP
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">D5.3.</td>
              <td className="px-4 py-2 ">
                Impact of NBS on outdoor comfort and air quality
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">D6.1.</td>
              <td className="px-4 py-2 ">Final report</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">D6.2.</td>
              <td className="px-4 py-2 ">Interim report</td>
            </tr>
          </tbody>
          <tfoot className="bg-[#1c3d5a]">
            <tr>
              <td colSpan={3} className="px-4 py-2"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
};

export default DeliverablesPage;
