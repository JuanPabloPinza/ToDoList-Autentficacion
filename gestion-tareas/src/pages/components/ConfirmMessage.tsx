import React from "react";

interface ModalProps {
  message: string;
  onClose: () => void;
}

const ConfirmMessageModal: React.FC<ModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black opacity-50 absolute inset-0"></div>
      <div className="bg-white rounded-lg p-8 shadow-lg relative z-10">
        <h2 className="text-2xl font-bold mb-4">Mensaje</h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-gray-700 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default ConfirmMessageModal;
