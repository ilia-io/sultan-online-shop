import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './app.scss';
import BreadCrumbs from './components/BreadCrumbs';
import Catalog from './components/Catalog';

function App() {
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
}

export default App;
