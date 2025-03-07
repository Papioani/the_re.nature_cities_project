"use client";
import React, { FC, useEffect, useState, useRef } from "react";
import styles from "./Deliverables.module.css";
import Link from "next/link";
import { useModal } from "../context/ModalContext";

// Define the type for the file object
interface FileObject {
  name: string;
  url: string;
}
interface HardcodedDeliverable {
  id: string;
  title: string;
  link: string;
}
interface CloudDeliverable {
  id: string;
  title: string;
  fileName: string | undefined;
}

type Deliverable = HardcodedDeliverable | CloudDeliverable;

const DeliverablesPage: FC = () => {
  const mainContentRef = useRef<HTMLElement>(null);
  const firstParagraphRef = useRef<HTMLParagraphElement>(null);
  // Access modal state and functions from context
  const { openModal } = useModal();
  const [deliverableUrls, setDeliverableUrls] = useState<FileObject[]>([]);

  useEffect(() => {
    async function fetchUrls() {
      try {
        const response = await fetch("/api/drive?fetchAll=true");
        if (!response.ok) {
          throw new Error("Failed to fetch GCS data");
        }
        const data = await response.json(); // Get the JSON response
        setDeliverableUrls(data.fileUrls); // that is the { name: fileName, url: url };
        console.log("deliverableUrls:", data.fileUrls); // Add this line !!!!!!
      } catch (error) {
        console.error("Error fetching GCS URLs data:", error);
      }
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

  const hardcodedRows: HardcodedDeliverable[] = [
    {
      id: "D1.1",
      title: "Case study areas and simulations days",
      link: "https://zenodo.org/records/14513140",
    },
    {
      id: "D4.3",
      title: "Drag coefficients database",
      link: "https://zenodo.org/records/14442184",
    },
  ];
  const deliverablesOrder = ["D1.1", "D2.1.", "D3.1.", "D4.1", "D4.2", "D4.3"];

  const getDeliverableData = (id: string): Deliverable | null => {
    if (id === "D1.1" || id === "D4.3") {
      return hardcodedRows.find((row) => row.id === id) || null;
    }

    if (id === "D2.1.") {
      return {
        id: "D2.1.",
        title: "Microclimate evaluation for current and future conditions",
        fileName: deliverableUrls.find(
          (file) =>
            file.name ===
            "Microclimate_evaluation_for_current_and_future_conditions.pdf"
        )?.name,
      };
    }

    if (id === "D3.1.") {
      return {
        id: "D3.1.",
        title: "Evaluation of climate change effect on the built environment",
        fileName: deliverableUrls.find(
          (file) =>
            file.name ===
            "Evaluation_of_climate_change_effect_on_the_built_environment.pdf"
        )?.name,
      };
    }

    if (id === "D4.1") {
      return {
        id: "D4.1",
        title: "Selection of urban street tree types",
        fileName: deliverableUrls.find(
          (file) => file.name === "Selection_of_urban_street_trees_types.pdf"
        )?.name,
      };
    }
    if (id === "D4.2") {
      return {
        id: "D4.2",
        title: "LAI/LAD and albedo database",
        fileName: deliverableUrls.find(
          (file) => file.name === "LAI_LAD_and_albedo_database.pdf"
        )?.name,
      };
    }

    return null;
  };
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
            {deliverablesOrder.map((id) => {
              const deliverable = getDeliverableData(id);
              if (!deliverable) return null;

              return (
                <tr className={styles.deliverableRow} key={deliverable.id}>
                  <td className="px-4 py-2 font-semibold text-[#2e4d2e]">
                    {deliverable.id}
                  </td>
                  <td className="px-4 py-2 ">{deliverable.title}</td>
                  <td className={`px-4 py-2 ${styles.deliverableLink}`}>
                    {"link" in deliverable ? (
                      <Link href={deliverable.link} target="_blank">
                        View deliverable
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          const isMobile = window.innerWidth <= 768;
                          if (deliverable.fileName) {
                            console.log(
                              "deliverable.fileName:",
                              deliverable.fileName
                            );
                            // Conditional check
                            if (isMobile) {
                              window.open(deliverable.fileName, "_blank");
                            } else {
                              openModal(deliverable.fileName);
                            }
                          } else {
                            console.error(
                              "URL is undefined for deliverable:",
                              deliverable.id
                            );
                          }
                        }}
                      >
                        View deliverable
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
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
