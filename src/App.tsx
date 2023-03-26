import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './app.scss';
import BreadCrumbs from './components/BreadCrumbs';

function App() {
  return (
    <>
      <Header />
      <BreadCrumbs />
      <Footer />
    </>
  );
}

export default App;
