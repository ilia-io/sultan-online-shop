import React from 'react'
import closeicon from '../assets/icons/order-modal-close.svg';

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
          <img src={closeicon} alt="x" className="modal__closeBtn-icon" />
        </button>
        <div className="modal__children">{children}</div>
      </div>
    </>
  );
};

export default Modal

