// /src/components/Modal.tsx
import React, { FC, useState, useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileId: string;
  setLoading: (loading: boolean) => void; // Accept setLoading from parent
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, fileId, setLoading }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  /*   const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false); */
  const modalRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // !!!!!! The general rule is: any state or prop used inside the useEffect should go into the dependency array !!!!!!!!!!!!!!!!!!!
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
  }, [isOpen, onClose, setLoading]); // React's eslint plugin requires you to list setLoading(a function) in the dependencies as safety mechanism to ensure that not using an old version of a function if it's being updated frequently.

  useEffect(() => {
    if (fileId) {
      const fetchFile = async () => {
        try {
          setLoading(true);
          /*  setIsDataLoaded(false); */
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
          console.log("Blob type:", fileBlob.type);
          // Create object URL only when the Blob is valid
          if (fileBlob.type === "application/pdf") {
            const fileUrl = URL.createObjectURL(fileBlob);
            console.log("File URL created:", fileUrl);
            setFileUrl(fileUrl);
            console.log("fileUrl after setting:", fileUrl);
          } else {
            console.error("Fetched file is not a valid PDF.");
            setFileUrl(null); // In case the file is not a PDF, reset fileUrl
          }

          setLoading(false);
          /* setIsDataLoaded(true); */ // Mark data as loaded
        } catch (error) {
          console.error("Error fetching file:", error);
          setLoading(false);
          setFileUrl(null); // Reset if there's an error
          /*  setIsDataLoaded(false); */
        }
      };

      fetchFile();
    }
  }, [fileId, setLoading]);

  useEffect(() => {
    console.log("iframeRef.current:", iframeRef.current);
    if (fileUrl && iframeRef.current) {
      const currentIframe = iframeRef.current; // Copy the ref value here

      currentIframe.src = fileUrl;

      const handleLoad = () => {
        console.log("Iframe loaded successfully");
      };

      const handleError = (error: Event) => {
        console.error("Iframe load error:", error);
        // Handle the error, perhaps set an error state
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
      className="absolute inset-x-0 bottom-0 top-16 flex justify-center items-end z-[2000]"
      role="dialog"
      aria-labelledby="deliverable-modal-title"
    >
      {/* Modal container */}
      <div
        ref={modalRef}
        role="dialog"
        className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl relative max-h-[200vh] overflow-auto z-[2000] md:top-96"
      >
        <h2 id="deliverable-modal-title" className="sr-only">
          Modal Title
        </h2>{" "}
        {/* Add a title element, visually hidden if necessary */}
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✖
        </button>
        <div className="overflow-hidden h-full">
          {fileUrl ? (
            <iframe
              ref={iframeRef}
              src={fileUrl}
              width="100%"
              height="100%"
              /* sandbox="allow-same-origin allow-scripts" */
              className="h-96 sm:h-[50vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh] rounded-lg border"
            ></iframe>
          ) : (
            <p className="text-gray-600">Error loading file.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
