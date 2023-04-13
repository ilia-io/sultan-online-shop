import React from 'react'
import cartBtnIcon from '../assets/icons/product-cart-in-btn.svg';

type Props = {
  handleClick: ()=> void;
  classPrefix?: string;
}

const ProductCartBtn = ({ handleClick, classPrefix }: Props) => {
  return (
    <button
      onClick={handleClick}
      type="button"
      className={
        classPrefix === 'mobile'
          ? 'product-card__product-cartBtn_mobile'
          : 'product-card__product-cartBtn'
      }
    >
      В корзину{' '}
      <img
        src={cartBtnIcon}
        alt="cart"
        className="product-card__product-cartBtn-icon"
      />
    </button>
  );
};

export default ProductCartBtn