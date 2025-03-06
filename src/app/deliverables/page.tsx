"use client";
import React, { FC, useEffect, useState, useRef } from "react";
import styles from "./Deliverables.module.css";
import Link from "next/link";
import { getFileUrl } from "../../lib/gcs";
import { useModal } from "../context/ModalContext";

const DeliverablesPage: FC = () => {
  const mainContentRef = useRef<HTMLElement>(null);
  const firstParagraphRef = useRef<HTMLParagraphElement>(null);
  // Access modal state and functions from context
  const { openModal } = useModal();
  const [deliverableUrls, setDeliverableUrls] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    async function fetchUrls() {
      const fileNames: { [key: string]: string } = {
        "Microclimate_evaluation_for_current_and_future_conditions.pdf":
          "Microclimate_evaluation_for_current_and_future_conditions.pdf",
        "Evaluation_of_climate_change_effect_on_the_built_environment.pdf":
          "Evaluation_of_climate_change_effect_on_the_built_environment.pdf",
        "Selection_of_urban_street_trees_types.pdf":
          "Selection_of_urban_street_trees_types.pdf",
        "LAI_LAD_and_albedo_database.pdf": "LAI_LAD_and_albedo_database.pdf",
      };

      const urls: { [key: string]: string } = {};

      for (const key in fileNames) {
        const url = await getFileUrl(fileNames[key]);
        if (url) {
          urls[key] = url;
        }
      }
      setDeliverableUrls(urls);
    }
    fetchUrls();
  }, []);

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
                      deliverableUrls[
                        "Microclimate_evaluation_for_current_and_future_conditions.pdf"
                      ];

                    if (isMobile) {
                      window.open(pdfUrl, "_blank"); // Redirect to Google Drive on mobile
                    } else {
                      openModal(pdfUrl); // Open modal on desktop
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
                      deliverableUrls[
                        "Evaluation_of_climate_change_effect_on_the_built_environment.pdf"
                      ];

                    if (isMobile) {
                      window.open(pdfUrl, "_blank"); // Redirect to Google Drive on mobile
                    } else {
                      openModal(pdfUrl); // Open modal on desktop
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
                      deliverableUrls[
                        "Selection_of_urban_street_trees_types.pdf"
                      ];

                    if (isMobile) {
                      window.open(pdfUrl, "_blank"); // Redirect to Google Drive on mobile
                    } else {
                      openModal(pdfUrl); // Open modal on desktop
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
                      deliverableUrls["LAI_LAD_and_albedo_database.pdf"];

                    if (isMobile) {
                      window.open(pdfUrl, "_blank"); // Redirect to Google Drive on mobile
                    } else {
                      openModal(pdfUrl); // Open modal on desktop
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
