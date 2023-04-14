import React, { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { clearCart } from '../app/reducers/cartSlice';
import { createPortal } from 'react-dom';
import Modal from './Modal';
import orderCheckIcon from '../assets/icons/order-double-check.svg';

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

export default CartOrderComplete;
