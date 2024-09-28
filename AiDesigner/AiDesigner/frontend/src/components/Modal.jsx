import React from "react";

const Modal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4 sm:mx-8">
        <h2 className="text-xl font-bold mb-4">
          El contenido se ha enviado correctamente!
        </h2>
        <p>
          Será enviado a tu correo electrónico el diseño propuesto por nuestra IA.
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-orange-500 text-white font-bold px-4 py-2 rounded border border-transparent hover:bg-white hover:text-orange-500 hover:border-orange-500 transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
