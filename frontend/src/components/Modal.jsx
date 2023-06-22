import { useState } from "react";

export const Modal = ({ isOpen, closeModal, className }) => {
  if (!isOpen) {
    return null;
  }

  const modalClasses = `please add some classes to use this`;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-darkSecondary opacity-70"></div>
        <div className="absolute bg-darkSecondary rounded-md shadow-2xl h-[60%] w-[70%] border border-l-lightPrimary p-8">
          <h2 className="text-xl font-bold mb-4">Modal Content</h2>
          <p>This is the modal content.</p>
          <button
            className="bg-blue-500 text-white rounded px-4 py-2 mt-4 hover:bg-blue-700"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};
