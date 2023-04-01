import React from 'react';
import './app.scss';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <>
      {/* <ProductPage /> */}
      <Routes>
        <Route path="*" element={<Navigate to="/catalog" replace />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
}

export default App;
