// /src/components/Modal.tsx
import React, { FC, useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileId: string;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, fileId }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("Modal isOpen:", isOpen);
    console.log("FileId received by modal:", fileId);

    if (fileId) {
      const fetchFile = async () => {
        try {
          setLoading(true);
          const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
          console.log("API Key:", API_KEY);
          console.log(`Fetching file for fileId: ${fileId}`);

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
        } catch (error) {
          console.error("Error fetching file:", error);
          setLoading(false);
        }
      };

      fetchFile();
    }
  }, [fileId]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      {/* Modal container */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl relative max-h-[100vh] overflow-auto z-[2000]">
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          ✖
        </button>
        <div className="overflow-hidden h-full">
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : fileUrl ? (
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
