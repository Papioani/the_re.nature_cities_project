"use client";
import React, { FC, useEffect, useRef } from "react";
import styles from "./Deliverables.module.css";

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
      className=" px-8 pb-10"
      ref={mainContentRef}
      aria-labelledby="deliverablesTitle"
    >
      <h2 className={styles.deliverablesLine}>Deliverables</h2>
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
            <tr>
              <td className="px-4 py-2 font-semibold">D1.1. </td>
              <td className="px-4 py-2 ">
                Case study areas and simulations days
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
