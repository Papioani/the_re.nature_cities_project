// /src/components/Modal.tsx
import React, { FC } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl relative">
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          ✖
        </button>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default Modal;
