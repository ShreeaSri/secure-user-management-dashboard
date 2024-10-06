import React from 'react';
interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void; 
}

const Modal: React.FC<ModalProps> = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose} 
      ></div>

      <div className="relative bg-white w-96 p-6 rounded-lg shadow-lg z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose} 
          >
            ✖
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
