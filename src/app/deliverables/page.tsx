"use client";
import React, { FC, useEffect, useRef } from "react";
import styles from "./Deliverables.module.css";
import Link from "next/link";
import { useModal } from "../context/ModalContext";

const DeliverablesPage: FC = () => {
  const mainContentRef = useRef<HTMLElement>(null);
  const firstParagraphRef = useRef<HTMLParagraphElement>(null);
  // Access modal state and functions from context
  const { openModal } = useModal();

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
              <td className="px-4 py-2 font-semibold text-[#2e4d2e]">D1.1. </td>
              <td className="px-4 py-2 ">
                Case study areas and simulations days
              </td>
              <td className={`px-4 py-2 ${styles.deliverableLink}`}>
                <Link
                  href="https://zenodo.org/records/14513140"
                  target="_blank"
                >
                  View deliverable
                </Link>
              </td>
            </tr>
            <tr className={styles.deliverableRow}>
              <td className="px-4 py-2 font-semibold text-[#2e4d2e]">D2.1.</td>
              <td className="px-4 py-2 ">
                Microclimate evaluation for current and future conditions
              </td>
              <td className={`px-4 py-2 ${styles.deliverableLink}`}>
                <button
                  onClick={() => {
                    const isMobile = window.innerWidth <= 768;
                    const pdfUrl =
                      "https://drive.google.com/file/d/1vMgajDuBjWnoUVVDVh7XebpVfH_2FJek/view";

                    if (isMobile) {
                      window.open(pdfUrl, "_blank"); // Redirect to Google Drive on mobile
                    } else {
                      openModal("1vMgajDuBjWnoUVVDVh7XebpVfH_2FJek"); // Open modal on desktop
                    }
                  }}
                >
                  View deliverable
                </button>
              </td>
            </tr>
            <tr className={styles.deliverableRow}>
              <td className="px-4 py-2 font-semibold text-[#2e4d2e]">D3.1.</td>
              <td className="px-4 py-2 ">
                Evaluation of climate change effect on the built environment
              </td>
              <td className={`px-4 py-2 ${styles.deliverableLink}`}>
                <button
                  onClick={() => {
                    const isMobile = window.innerWidth <= 768;
                    const pdfUrl =
                      "https://drive.google.com/file/d/1xi3RCLIqwWL5yTjPiUHiLoFeql9Aja0M/view";

                    if (isMobile) {
                      window.open(pdfUrl, "_blank"); // Redirect to Google Drive on mobile
                    } else {
                      openModal("1xi3RCLIqwWL5yTjPiUHiLoFeql9Aja0M"); // Open modal on desktop
                    }
                  }}
                >
                  View deliverable
                </button>
              </td>
            </tr>
            <tr className={styles.deliverableRow}>
              <td className="px-4 py-2 font-semibold text-[#2e4d2e]">D4.1</td>
              <td className="px-4 py-2 ">
                Selection of urban street trees types{" "}
              </td>
              <td className={`px-4 py-2 ${styles.deliverableLink}`}>
                <button
                  onClick={() => {
                    const isMobile = window.innerWidth <= 768;
                    const pdfUrl =
                      "https://drive.google.com/file/d/1pTdys-Z7qRrmG-XvQXwdLwBSOIsWnQu5/view";

                    if (isMobile) {
                      window.open(pdfUrl, "_blank"); // Redirect to Google Drive on mobile
                    } else {
                      openModal("1pTdys-Z7qRrmG-XvQXwdLwBSOIsWnQu5"); // Open modal on desktop
                    }
                  }}
                >
                  View deliverable
                </button>
              </td>
            </tr>
            <tr className={styles.deliverableRow}>
              <td className="px-4 py-2 font-semibold text-[#2e4d2e]">D4.2.</td>
              <td className="px-4 py-2 ">LAI/LAD and albedo database</td>
              <td className={`px-4 py-2 ${styles.deliverableLink}`}>
                <button
                  onClick={() => {
                    const isMobile = window.innerWidth <= 768;
                    const pdfUrl =
                      "https://drive.google.com/file/d/1L39hJMJPHgcm1wRM7CsEwxfeXLxMOyyu/view";

                    if (isMobile) {
                      window.open(pdfUrl, "_blank"); // Redirect to Google Drive on mobile
                    } else {
                      openModal("1L39hJMJPHgcm1wRM7CsEwxfeXLxMOyyu"); // Open modal on desktop
                    }
                  }}
                >
                  View deliverable
                </button>
              </td>
            </tr>
            <tr className={styles.deliverableRow}>
              <td className="px-4 py-2 font-semibold text-[#2e4d2e]">D4.3.</td>
              <td className="px-4 py-2 ">Drag coefficients database</td>
              <td className={`px-4 py-2 ${styles.deliverableLink}`}>
                <Link
                  href="https://zenodo.org/records/14442184"
                  target="_blank"
                >
                  View deliverable
                </Link>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold text-[#2e4d2e]">D5.1.</td>
              <td className="px-4 py-2 ">Impact of NBS on microclimate</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold text-[#2e4d2e]">D5.2.</td>
              <td className="px-4 py-2 ">
                Impact of NBS on building performance and NVP
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold text-[#2e4d2e]">D5.3.</td>
              <td className="px-4 py-2 ">
                Impact of NBS on outdoor comfort and air quality
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold text-[#2e4d2e]">D6.1.</td>
              <td className="px-4 py-2 ">Final report</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold text-[#2e4d2e]">D6.2.</td>
              <td className="px-4 py-2 ">Interim report</td>
            </tr>
          </tbody>
          <tfoot className="bg-[#1c3d5a]">
            <tr>
              <td colSpan={3} className="px-4 py-2"></td>
            </tr>
          </tfoot>
        </table>
        {/* Modal Component */}
      </div>
    </section>
  );
};

export default DeliverablesPage;
