import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import Modal from './Modal';
import orderCheckIcon from '../assets/icons/order-double-check.svg';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { cartSelector, clearCart } from '../app/reducers/cartSlice';
import MobileBackBtn from './MobileBackBtn';
import CartProduct from './CartProduct';

type Props = {};

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

  const dispatch = useAppDispatch();

  function handleOrderComplete() {
    dispatch(clearCart());
    setShowModal(true);
  }

  return (
    <>
      <button
        onClick={handleOrderComplete}
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
  const { items: cartItems, totalPrice } = useAppSelector(cartSelector);

  return (
    <section className="cart">
      <div className="cart__wrapper container">
        <MobileBackBtn classPrefix="cart" />
        <h1 className="cart__title">Корзина</h1>
        <div className="cart__horizontal-line"></div>
        <ul className="cart__list">
          {cartItems.map((cartItem) => (
            <CartProduct key={cartItem.barcode} cartItem={cartItem} />
          ))}
        </ul>
        <div className="cart__order-box">
          <CartOrderComplete />
          <p className="cart__total-price">{totalPrice.toFixed(2)} ₸</p>
        </div>
      </div>
    </section>
  );
};

export default Cart;
