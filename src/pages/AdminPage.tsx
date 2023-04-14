import React from 'react';
import AdminPanel from '../components/AdminPanel/AdminPanel';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BreadCrumbs from '../components/BreadCrumbs/BreadCrumbs';

type Props = {};

const AdminPage = (props: Props) => {
  return (
    <>
      <Header />
      <main className="main">
        <BreadCrumbs />
        <AdminPanel />
      </main>
      <Footer />
    </>
  );
};

export default AdminPage;
