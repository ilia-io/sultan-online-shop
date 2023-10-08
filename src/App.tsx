import React from 'react';
import './App.scss';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/catalog" replace />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="catalog/:barcode" element={<ProductPage />} />
      </Routes>
    </>
  );
}

export default App;
