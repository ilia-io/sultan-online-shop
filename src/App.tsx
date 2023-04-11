import React, { useEffect } from 'react';
import './app.scss';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  localItemsSelector,
  productsSelector,
  setLocalItems,
} from './app/reducers/productSlice';

function App() {
  // const dispatch = useAppDispatch();
  // const products = useAppSelector(productsSelector);
  // const localItems = useAppSelector(localItemsSelector);

  // useEffect(() => {
  //   if (
  //     localStorage.getItem('products')?.length === 0 ||
  //     localStorage.getItem('products') === null
  //   ) {
  //     localStorage.setItem('products', JSON.stringify(products));
  //     dispatch(setLocalItems(products));
  //   } else {
  //     const local = JSON.parse(localStorage.getItem('products') as string);
  //     dispatch(setLocalItems(local));
  //   }

  //   return () => {};
  // }, [dispatch, products]);

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
