"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import Modal from "../components/Modal";

type ModalContextType = {
  modalOpen: boolean;
  modalContent: string | null;
  openModal: (fileId: string) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string | null>(null);

  const openModal = (fileId: string) => {
    setModalContent(fileId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider
      value={{ modalOpen, modalContent, openModal, closeModal }}
    >
      {children}

      {/* Backdrop overlay when the modal is open */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50" // Apply grey background with opacity
          onClick={closeModal} // Close modal when clicking outside the modal
        />
      )}

      {/* Global Modal (Always on top) */}
      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          fileId={modalContent || ""}
        />
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
