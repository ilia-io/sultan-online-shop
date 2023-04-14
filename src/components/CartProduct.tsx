import React from 'react';
import { ICartItem } from '../@types/CartItem';
import typeBottleIcon from '../assets/icons/type-bottle.svg';
import typeSolidBoxIcon from '../assets/icons/type-solid-box.svg';
import deleteIcon from '../assets/icons/cart-delete.svg';
import { useAppDispatch } from '../app/hooks';
import {
  addItemToCart,
  minusItem,
  removeItemFromCart,
} from '../app/reducers/cartSlice';

type Props = {
  cartItem: ICartItem;
};

const CartProduct = ({ cartItem }: Props) => {
  const dispatch = useAppDispatch();

  function handleAddItem(item: ICartItem) {
    dispatch(addItemToCart(item));
  }

  function handleMinusItem(barcode: number) {
    dispatch(minusItem(barcode));
  }

  function handleRemoveItem(barcode: number) {
    dispatch(removeItemFromCart(barcode));
  }
  return (
    <div key={cartItem.barcode} className="cart__item-wrapper">
      <li key={cartItem.barcode} className="cart__item">
        <img
          src={cartItem.imageURL}
          alt={cartItem.name}
          className="cart__item-img"
        />
        <div className="cart__item-info-box">
          <div className="cart__product-type-box">
            <img
              src={
                cartItem.type === 'weight' ? typeSolidBoxIcon : typeBottleIcon
              }
              alt={cartItem.type === 'weight' ? 'solid box' : 'bottle'}
              className="cart__product-type-icon"
            />
            <p className="cart__product-type-text">
              {cartItem.size} {cartItem.type === 'weight' ? 'г' : 'мл'}
            </p>
          </div>
          <h2 className="cart__item-title">
            {cartItem.name.split('').slice(0, 50).join('')} ...
          </h2>
          <p className="cart__item-description">
            {cartItem.description.split('').slice(0, 200).join('')} ...
          </p>
        </div>
        <div className="cart__item-vertical-line mobile-hide"></div>
        <div className="cart__item-actions">
          <div className="cart__amount-box">
            <button
              onClick={() => handleMinusItem(cartItem.barcode)}
              type="button"
              className="cart__dec"
            >
              -
            </button>
            <p className="cart__count">{cartItem.count}</p>
            <button
              onClick={() => handleAddItem(cartItem)}
              type="button"
              className="cart__inc"
            >
              +
            </button>
          </div>
          <div className="cart__item-vertical-line"></div>
          <p className="cart__item-price">
            {(cartItem.price * cartItem.count).toFixed(2)} ₸
          </p>
          <div className="cart__item-vertical-line"></div>
          <button
            onClick={() => handleRemoveItem(cartItem.barcode)}
            type="button"
            className="cart__item-deleteBtn"
          >
            <img
              src={deleteIcon}
              alt="trash bin"
              className="cart__item-deleteBtn-icon"
            />
          </button>
        </div>
      </li>
      <div className="cart__horizontal-line"></div>
    </div>
  );
};

export default CartProduct;
