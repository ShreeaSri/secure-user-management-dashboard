import React from 'react';

interface ModalProps {
  title: string;
  children: React.ReactNode; 
}

const Modal: React.FC<ModalProps> = ({ title, children }) => {
  return (
    <div className="modal">
      <div className="modal-header">{title}</div>
      <div className="modal-body">{children}</div>
    </div>
  );
};

export default Modal;
