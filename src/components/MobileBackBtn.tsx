import React from 'react';
import mBackIcon from '../assets/icons/mobile-back.svg';
type Props = {
  classPrefix?: string;
};

const MobileBackBtn = ({ classPrefix }: Props) => {
  return (
    <button
      className={
        !classPrefix
          ? 'mobile__back-btn'
          : `mobile__back-btn mobile__back-btn_${classPrefix}`
      }
    >
      <img src={mBackIcon} alt="arrow back" className="mobile__back-img" />
      НАЗАД
    </button>
  );
};

export default MobileBackBtn;
