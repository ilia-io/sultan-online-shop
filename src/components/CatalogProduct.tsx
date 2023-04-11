import React from 'react';
import { IProduct } from '../@types/Product';
import typeBottleIcon from '../assets/icons/type-bottle.svg';
import typeSolidBoxIcon from '../assets/icons/type-solid-box.svg';
import cartBtnIcon from '../assets/icons/product-cart-in-btn.svg';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addItemToCart, cartSelector } from '../app/reducers/cartSlice';
import { getCurrentItem } from '../app/reducers/productSlice';

type Props = {
  product: IProduct;
};

const CatalogProduct = ({ product }: Props) => {
  const { items: cartItems } = useAppSelector(cartSelector);
  const dispatch = useAppDispatch();
  function handleAddItemToCart(product: IProduct) {
    dispatch(addItemToCart(product));
  }
  function openProductPage(barcode: number) {
    dispatch(getCurrentItem(barcode));
    window.scrollTo(0, 0);
  }
  function isProductInCart() {
    const currentProduct = cartItems.find(
      (cartItem) => cartItem.barcode === product.barcode
    );
    return currentProduct && currentProduct.count > 0 ? true : false;
  }

  return (
    <li className="catalog__product">
      <img
        src={product.imageURL}
        alt={product.name}
        className="catalog__product-img"
      />
      <div className="catalog__product-type-box">
        <img
          src={product.type === 'weight' ? typeSolidBoxIcon : typeBottleIcon}
          alt={product.type === 'weight' ? 'solid box' : 'bottle'}
          className="catalog__product-type-icon"
        />
        <p className="catalog__product-type-text">
          {product.size} {product.type === 'weight' ? 'г' : 'мл'}
        </p>
      </div>
      <Link to={`/catalog/${product.barcode}`}>
        <h2
          onClick={() => openProductPage(product.barcode)}
          className="catalog__product-title"
        >
          <span className="catalog__product-title_bold">
            {product.name.split(' ').slice(0, 1).join('')}{' '}
          </span>
          {product.name.split(' ').slice(1).join(' ')}
        </h2>
      </Link>
      <p className="catalog__product-barcode">
        Штрихкод:{' '}
        <span className="catalog__product-barcode_value">
          {product.barcode}
        </span>
      </p>
      <p className="catalog__product-manufacturer">
        Производитель:{' '}
        <span className="catalog__product-manufacturer_value">
          {product.manufacturer}
        </span>
      </p>
      <p className="catalog__product-brand">
        Бренд:{' '}
        <span className="catalog__product-brand_value">{product.brand}</span>
      </p>
      <div className="catalog__product-price-box">
        <p className="catalog__product-price">{product.price} ₸</p>
        <button
          onClick={() => handleAddItemToCart(product)}
          type="button"
          className={
            isProductInCart()
              ? 'catalog__product-cartBtn catalog__product-cartBtn_active'
              : 'catalog__product-cartBtn'
          }
        >
          В КОРЗИНУ{' '}
          <img
            src={cartBtnIcon}
            alt="cart"
            className="catalog__product-cartBtn-icon"
          />
        </button>
      </div>
    </li>
  );
};

export default CatalogProduct;
