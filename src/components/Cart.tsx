import React from 'react';
import { useAppSelector } from '../app/hooks';
import { cartSelector } from '../app/reducers/cartSlice';
import MobileBackBtn from './MobileBackBtn';
import CartProduct from './CartProduct';
import CartOrderComplete from './CartOrderComplete';

type Props = {};

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
