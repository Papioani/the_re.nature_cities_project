// /src/components/Modal.tsx
import React, { FC, useState, useEffect, useRef } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string | null;
  setLoading: (loading: boolean) => void; // Accept setLoading from parent
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, fileName, setLoading }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loadError, setLoadError] = useState<boolean>(false); // State for load errors

  // State variables to store the max width and height of the resizable box
  const [maxWidth, setMaxWidth] = useState(600);
  const [maxHeight, setMaxHeight] = useState(400);

  // useEffect to update maxWidth and maxHeight when the component is mounted
  useEffect(() => {
    // Set the max width and height based on the window's inner dimensions
    setMaxWidth(window.innerWidth - 20);
    setMaxHeight(window.innerHeight - 20);
  }, []); // Empty dependency array ensures this only runs on mount (client-side)

  useEffect(() => {
    if (fileName) {
      setLoading(true);
      fetch(`/api/drive?fileId=${fileName}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.url) {
            setFileUrl(data.url);
          } else {
            setLoadError(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching file URL:", error);
          setLoadError(true);
        })
        .finally(() => setLoading(false));
    }
  }, [fileName, setLoading]);

  useEffect(() => {
    if (fileUrl && iframeRef.current) {
      const currentIframe = iframeRef.current; // Copy the ref value here
      currentIframe.src = fileUrl;

      const handleLoad = () => {
        console.log("Iframe loaded successfully");
      };

      const handleError = (error: Event) => {
        console.error("Iframe load error:", error);
        setLoadError(true);
      };

      currentIframe.addEventListener("load", handleLoad);
      currentIframe.addEventListener("error", handleError);

      return () => {
        currentIframe.removeEventListener("load", handleLoad); // Use currentIframe
        currentIframe.removeEventListener("error", handleError); // Use currentIframe
        if (fileUrl) {
          // Check if fileUrl is not null before revoking
          URL.revokeObjectURL(fileUrl);
        }
      };
    }
  }, [fileUrl]);

  if (!isOpen || !fileUrl) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[1999]"
        aria-hidden="true"
      />
      {/* Modal Content */}
      <div
        className="fixed inset-0 flex justify-center items-center z-[2000]"
        role="dialog"
        aria-labelledby="deliverable-modal-title"
      >
        <div className="w-full h-full flex justify-center items-center">
          <div ref={modalRef}>
            <ResizableBox
              width={600}
              height={600}
              minConstraints={[400, 300]}
              maxConstraints={[maxWidth, maxHeight]}
              resizeHandles={["se", "sw", "ne", "nw"]}
              className="bg-white p-6 rounded-lg shadow-lg relative"
            >
              <button
                className="absolute top-2 right-2 text-gray-500"
                onClick={onClose}
                aria-label="Close modal"
              >
                ✖
              </button>
              <div className="h-full w-full">
                {fileUrl ? (
                  <iframe
                    ref={iframeRef}
                    src={fileUrl}
                    width="100%"
                    height="100%"
                    className="rounded-lg border"
                    title="PDF Viewer"
                    loading="lazy"
                  />
                ) : loadError ? (
                  <p className="text-gray-600">Error loading file.</p>
                ) : (
                  <p className="text-gray-600">Loading PDF...</p>
                )}
              </div>
            </ResizableBox>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
