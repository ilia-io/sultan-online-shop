import React from 'react'
import Header from '../components/Header';
import BreadCrumbs from '../components/BreadCrumbs';
import Cart from '../components/Cart';
import Footer from '../components/Footer';

type Props = {}

const CartPage = (props: Props) => {
  return (
    <>
      <Header />
      <main className="main">
        <BreadCrumbs />
        <Cart />
      </main>
      <Footer />
    </>
  );
}

export default CartPage