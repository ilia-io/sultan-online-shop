import React from 'react';
import Header from '../components/Header';
import BreadCrumbs from '../components/BreadCrumbs/BreadCrumbs';
import Cart from '../components/Cart/Cart';
import Footer from '../components/Footer';

type Props = {};

const CartPage = (props: Props) => {
  return (
    <>
      <Header />
      <main className="main">
        <Cart />
      </main>
      <Footer />
    </>
  );
};

export default CartPage;
