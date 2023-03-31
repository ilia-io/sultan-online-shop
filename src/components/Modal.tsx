import React from 'react'

type Props = {
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<Props> = ({ onClose, children }) => {
  return (
    <>
      <div className="modal-bg"></div>
      <div className="modal">
        <button className="modal__closeBtn" onClick={onClose}>
          Close
        </button>
        <div className="modal__children"> {children}</div>
      </div>
    </>
  );
};

export default Modal

