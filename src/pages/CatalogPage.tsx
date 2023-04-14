import React from 'react';
import BreadCrumbs from '../components/BreadCrumbs/BreadCrumbs';
import Catalog from '../components/Catalog';
import Footer from '../components/Footer';
import Header from '../components/Header';

type Props = {};

const CatalogPage = (props: Props) => {
  return (
    <>
      <Header />
      <main className="main">
        <BreadCrumbs />
        <Catalog />
      </main>
      <Footer />
    </>
  );
};

export default CatalogPage;
