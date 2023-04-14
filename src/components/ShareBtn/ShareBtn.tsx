import React from 'react';
import shareIcon from '../../assets/icons/product-share.svg';

type Props = {
  classPrefix?: string;
};

const ShareBtn = ({ classPrefix }: Props) => {
  return (
    <button
      disabled
      className={
        classPrefix === 'mobile'
          ? 'product-card__share-link_mobile'
          : 'product-card__share-link'
      }
    >
      <img src={shareIcon} alt="share" className="product-card__share-icon" />
    </button>
  );
};

export default ShareBtn;
