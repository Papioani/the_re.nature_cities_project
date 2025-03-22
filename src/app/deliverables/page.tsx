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
  fileName?: string | undefined;
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
        const isMobile = window.innerWidth <= 768;

        const response = await fetch(
          `/api/drive?fetchAll=true&isMobile=${isMobile}`
        ); // Send isMobile
        if (!response.ok) {
          throw new Error("Failed to fetch GCS data");
        }
        const data = await response.json(); // Get the JSON response
        setDeliverableUrls(data.fileUrls); // that is the { name: fileName, url: url };
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
  const deliverablesOrder = [
    "D1.1",
    "D2.1.",
    "D3.1.",
    "D4.1",
    "D4.2",
    "D4.3",
    "D5.1.",
    "D5.2.",
    "D5.3.",
    "D6.1.",
    "D6.2.",
  ];

  const getDeliverableData = (id: string): Deliverable | null => {
    if (id === "D1.1" || id === "D4.3") {
      return hardcodedRows.find((row) => row.id === id) || null;
    }

    const cloudDeliverables = [
      {
        id: "D2.1.",
        fileName:
          "Microclimate_evaluation_for_current_and_future_conditions.pdf",
      },
      {
        id: "D3.1.",
        fileName:
          "Evaluation_of_climate_change_effect_on_the_built_environment.pdf",
      },
      { id: "D4.1", fileName: "Selection_of_urban_street_tree_types.pdf" },
      { id: "D4.2", fileName: "LAI_LAD_and_albedo_database.pdf" },
    ];

    const cloudDeliverable = cloudDeliverables.find((d) => d.id === id);
    if (cloudDeliverable) {
      return {
        id: cloudDeliverable.id,
        title: cloudDeliverable.fileName.replace(".pdf", "").replace(/_/g, " "),
        fileName: deliverableUrls.find(
          (file) => file.name === cloudDeliverable.fileName
        )?.name,
      };
    }
    // Handle new deliverables without links or files
    if (["D5.1.", "D5.2.", "D5.3.", "D6.1.", "D6.2."].includes(id)) {
      let title = "";
      switch (id) {
        case "D5.1.":
          title = "Impact of NBS on microclimate";
          break;
        case "D5.2.":
          title = "Impact of NBS on building performance and NVP";
          break;
        case "D5.3.":
          title = "Impact of NBS on outdoor comfort and air quality";
          break;
        case "D6.1.":
          title = "Final report";
          break;
        case "D6.2.":
          title = "Interim report";
          break;
        default:
          break;
      }
      return { id, title };
    }

    return null;
  };

  const handleViewDeliverable = (deliverable: CloudDeliverable) => {
    const isMobile = window.innerWidth <= 768;
    const fileUrl = deliverableUrls.find(
      (file) => file.name === deliverable.fileName
    )?.url;

    if (fileUrl) {
      if (isMobile) {
        window.open(fileUrl, "_blank");
      } else {
        openModal(deliverable.fileName ?? "");
      }
    } else {
      console.error("URL not found for deliverable:", deliverable.id);
    }
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
                    {["D5.1.", "D5.2.", "D5.3.", "D6.1.", "D6.2."].includes(
                      deliverable.id
                    ) ? (
                      "" // Render nothing for these deliverables
                    ) : "link" in deliverable ? (
                      <Link
                        href={deliverable.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View deliverable
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleViewDeliverable(deliverable)}
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
