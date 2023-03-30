import React from 'react'
import BreadCrumbs from '../components/BreadCrumbs';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

type Props = {}

const ProductPage = (props: Props) => {
  return (
    <>
      <Header />
      <main className="main">
        <BreadCrumbs />
        <ProductCard />
      </main>
      <Footer />
    </>
  );
}

export default ProductPage