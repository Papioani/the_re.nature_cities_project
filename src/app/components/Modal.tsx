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
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);

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
          setIsDataLoaded(false);
          const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
          console.log("API Key:", API_KEY);
          const response = await fetch(
            `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${API_KEY}`
          );
          console.log("Fetch response status:", response.status);

          if (!response.ok) {
            throw new Error("Failed to fetch file");
          }

          const fileBlob = await response.blob();
          const fileUrl = URL.createObjectURL(fileBlob);
          console.log("File URL created:", fileUrl);
          setFileUrl(fileUrl);
          setLoading(false);
          setIsDataLoaded(true); // Mark data as loaded
        } catch (error) {
          console.error("Error fetching file:", error);
          setLoading(false);
          setIsDataLoaded(false);
        }
      };

      fetchFile();
    }
  }, [fileId, setLoading]);

  if (!isOpen || !isDataLoaded) return null; // Only show modal when data is available and modal is open

  return (
    <div
      className="absolute inset-x-0 bottom-0 top-16 flex justify-center items-end z-[2000]"
      role="dialog"
      aria-labelledby="deliverable-modal-title"
    >
      {/* Modal container */}
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl relative max-h-[200vh] overflow-auto z-[2000] md:top-96"
      >
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          ✖
        </button>
        <div className="overflow-hidden h-full">
          {fileUrl ? (
            <iframe
              src={fileUrl}
              width="100%"
              height="100%"
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
