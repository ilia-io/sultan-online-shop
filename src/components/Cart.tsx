import React, { useState } from 'react';
import { IProduct, PRODUCTS } from './Catalog';
import typeBottleIcon from '../assets/icons/type-bottle.svg';
import typeSolidBoxIcon from '../assets/icons/type-solid-box.svg';
import deleteIcon from '../assets/icons/cart-delete.svg';
import { createPortal } from 'react-dom';
import Modal from './Modal';
import orderCheckIcon from '../assets/icons/order-double-check.svg';

type Props = {};

const cartItems: IProduct[] = PRODUCTS.slice(0, 3);

const totalPrice: number = cartItems.reduce(
  (prev, current) => prev + current.price,
  0
);

const orderComplete = (
  <div className="order-complete">
    <div className="order-complete__icon-wrapper">
      <img
        src={orderCheckIcon}
        alt="double check"
        className="order-complete__icon"
      />
    </div>

    <h2 className="order-complete__title">Спасибо за заказ</h2>
    <p className="order-complete_text">
      Наш менеджер свяжется с вами в ближайшее время
    </p>
  </div>
);

const CartOrderComplete = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        type="button"
        className="cart__orderBtn"
      >
        Оформить заказ
      </button>
      {showModal &&
        createPortal(
          <Modal
            onClose={() => setShowModal(false)}
            children={orderComplete}
          />,
          document.body
        )}
    </>
  );
};

const Cart = (props: Props) => {
  return (
    <section className="cart">
      <div className="cart__wrapper container">
        <h1 className="cart__title">Корзина</h1>
        <div className="cart__horizontal-line"></div>
        <ul className="cart__list">
          {cartItems.map((cartItem) => (
            <>
              <li className="cart__item">
                <img
                  src={cartItem.imageURL}
                  alt={cartItem.name}
                  className="cart__item-img"
                />
                <div className="cart__item-info-box">
                  <div className="cart__product-type-box">
                    <img
                      src={
                        cartItem.type === 'weight'
                          ? typeSolidBoxIcon
                          : typeBottleIcon
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
                <div className="cart__item-vertical-line"></div>
                <div className="cart__amount-box">
                  <button type="button" className="cart__dec">
                    -
                  </button>
                  <p className="cart__count">1</p>
                  <button type="button" className="cart__inc">
                    +
                  </button>
                </div>
                <div className="cart__item-vertical-line"></div>
                <p className="cart__item-price">{cartItem.price} ₸</p>
                <div className="cart__item-vertical-line"></div>
                <button type="button" className="cart__item-deleteBtn">
                  <img
                    src={deleteIcon}
                    alt="trash bin"
                    className="cart__item-deleteBtn-icon"
                  />
                </button>
              </li>
              <div className="cart__horizontal-line"></div>
            </>
          ))}
        </ul>
        <div className="cart__order-box">
          <CartOrderComplete />
          <p className="cart__total-price">{totalPrice} ₸</p>
        </div>
      </div>
    </section>
  );
};

export default Cart;
