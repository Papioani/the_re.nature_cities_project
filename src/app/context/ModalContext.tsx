"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import Modal from "../components/Modal";

type ModalContextType = {
  modalOpen: boolean;
  modalContent: string | null;
  loading: boolean;
  openModal: (fileName: string) => void;
  closeModal: () => void;
  setLoading: (loading: boolean) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const openModal = (fileName: string) => {
    setModalContent(fileName);
    setModalOpen(true);
    setLoading(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
    setLoading(false);
  };

  return (
    <ModalContext.Provider
      value={{
        modalOpen,
        modalContent,
        loading,
        openModal,
        closeModal,
        setLoading,
      }}
    >
      {children}

      {/* Backdrop overlay when the modal is open */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
          {/* Show a loading spinner if the modal is still fetching data */}
          {loading && <div className="loader" />}
        </div>
      )}

      {/* Global Modal (Always on top) */}
      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          fileName={modalContent || ""}
          setLoading={setLoading} // Pass setLoading to update it from Modal
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
