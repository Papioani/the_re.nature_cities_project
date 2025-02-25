// /src/components/Modal.tsx
import React, { FC, useState, useEffect, useRef } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileId: string | null;
  setLoading: (loading: boolean) => void; // Accept setLoading from parent
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, fileId, setLoading }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loadError, setLoadError] = useState<boolean>(false); // State for load errors

  // !!!!!! The general rule is: any state or prop used inside the useEffect should go into the dependency array !!!!!!!!!!!!!!!!!!!

  // State variables to store the max width and height of the resizable box
  const [maxWidth, setMaxWidth] = useState(600);
  const [maxHeight, setMaxHeight] = useState(400);

  // useEffect to update maxWidth and maxHeight when the component is mounted
  useEffect(() => {
    // Set the max width and height based on the window's inner dimensions
    setMaxWidth(window.innerWidth - 20);
    setMaxHeight(window.innerHeight - 20);
  }, []); // Empty dependency array ensures this only runs on mount (client-side)

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onClose]); // React's eslint plugin requires you to list setLoading(a function) in the dependencies as safety mechanism to ensure that not using an old version of a function if it's being updated frequently.

  useEffect(() => {
    const fetchFile = async () => {
      if (!fileId) return; // prevent the useEffect from running at all until a valid fileId is available

      setLoading(true);
      setLoadError(false); // Reset load error state

      try {
        const response = await fetch(`/api/drive?fileId=${fileId}`);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error ${response.status}: ${errorText}`);
        }

        // Check for JSON errors even if response.ok is true
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          try {
            const data = await response.json();
            if (data.error) {
              // Check for an 'error' property in the JSON
              throw new Error(data.error); // Throw the server's error
            }
          } catch (jsonError) {
            // Handle JSON parsing errors or missing 'error' property
            console.error("Error parsing JSON response:", jsonError);
            throw new Error("Invalid JSON response from server.");
          }
        }
        const fileBlob = (await response.blob()) as Blob;

        // Create object URL only when the Blob is valid
        if (fileBlob.type === "application/pdf") {
          const fileUrl = URL.createObjectURL(fileBlob);
          setFileUrl(fileUrl);
        } else {
          console.error("Fetched file is not a valid PDF.");
          setFileUrl(null); // In case the file is not a PDF, reset fileUrl
          setLoadError(true); // Set load error state
        }
      } catch (error) {
        console.error("Error fetching file:", error);
        setFileUrl(null); // Reset if there's an error
        setLoadError(true); // Set load error state
      } finally {
        setLoading(false);
      }
    };

    fetchFile();
  }, [fileId, setLoading]);

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
    <div
      className="fixed inset-0 flex justify-center items-center z-[2000]"
      role="dialog"
      aria-labelledby="deliverable-modal-title"
    >
      <div className=" w-full h-full flex justify-center items-center">
        {" "}
        {/* Center ResizableBox */}
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
  );
};

export default Modal;
