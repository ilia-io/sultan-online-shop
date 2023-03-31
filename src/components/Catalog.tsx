import React from 'react';
import arrowDown from '../assets/icons/sort-arrow-down.svg';
import arrowUp from '../assets/icons/sort-arrow-up.svg';
import DB from '../assets/db.json';
import SearchForm from './SearchForm';
import typeBottleIcon from '../assets/icons/type-bottle.svg';
import typeSolidBoxIcon from '../assets/icons/type-solid-box.svg';
import cartBtnIcon from '../assets/icons/product-cart-in-btn.svg';
import ManufacturersList from './ManufacturersList';

type Props = {};

export interface IProduct {
  imageURL: string;
  name: string;
  type: string;
  size: number;
  barcode: number;
  manufacturer: string;
  brand: string;
  description: string;
  price: number;
  careType: string[];
}

const categories: string[] = DB.careTypes;
export const manufacturers: string[] = DB.manufacturers;
export const PRODUCTS: IProduct[] = DB.products;

const Catalog = (props: Props) => {
  return (
    <section className="catalog">
      <div className="catalog__wrapper container">
        <section className="catalog__title-box">
          <h1 className="catalog__title">Косметика и гигиена</h1>
          <div className="catalog__sort-box">
            <p className="catalog__sort-text">Сортировка:</p>
            <button className="catalog__sort-btn" type="button">
              Название{' '}
              <img
                src={arrowDown}
                alt="arrow down"
                className="catalog__sort-icon"
              />
            </button>
            <ul className="catalog__sort-list">
              <li className="catalog__sort-option">
                Название{' '}
                <img
                  src={arrowDown}
                  alt="arrow down"
                  className="catalog__sort-icon"
                />
              </li>
              <li className="catalog__sort-option">
                Название{' '}
                <img
                  src={arrowUp}
                  alt="arrow up"
                  className="catalog__sort-icon"
                />
              </li>
              <li className="catalog__sort-option">
                Цена{' '}
                <img
                  src={arrowDown}
                  alt="arrow down"
                  className="catalog__sort-icon"
                />
              </li>
              <li className="catalog__sort-option">
                Цена{' '}
                <img
                  src={arrowUp}
                  alt="arrow up"
                  className="catalog__sort-icon"
                />
              </li>
            </ul>
          </div>
        </section>
        <section className="catalog__top-line-categories">
          <ul className="catalog__top-line-categories-list">
            {categories.map((categorie) => (
              <li key={categorie} className="catalog__top-line-categories-item">
                {categorie}
              </li>
            ))}
          </ul>
        </section>
        <section className="catalog__main">
          <section className="catalog__side-filters">
            <h2 className="catalog__side-filters-title">
              ПОДБОР ПО ПАРАМЕТРАМ
            </h2>
            <div className="catalog__price-filter-box">
              <h2 className="catalog__price-filter-title">
                Цена <span className="catalog__price-filter-currency">₸</span>
              </h2>
              <div className="catalog__price-filter-inputs">
                <label htmlFor="priceMin"></label>
                <input
                  id="priceMin"
                  type="text"
                  className="catalog__price-filter-min"
                  placeholder="0"
                />
                <p className="catalog__price-filter-divider">-</p>
                <label htmlFor="priceMax"></label>
                <input
                  id="priceMax"
                  type="text"
                  className="catalog__price-filter-max"
                  placeholder="10 000"
                />
              </div>
            </div>
            <div className="catalog__manufacturer-filter-box">
              <h2 className="catalog__manufacturer-filter-title">
                Производитель
              </h2>
              <SearchForm />
              <ManufacturersList />

              <div className="catalog__manufacturer-filter-divider"></div>
            </div>
            <div className="catalog__side-filters-categories-box">
              <ul className="catalog__side-filters-categories-list">
                {categories.map((categorie) => (
                  <li
                    key={categorie}
                    className="catalog__side-filters-categories-item"
                  >
                    {categorie}
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className="catalog__products">
            <ul className="catalog__products-list">
              {PRODUCTS.map((product: IProduct) => (
                <li key={product.barcode} className="catalog__product">
                  <img
                    src={product.imageURL}
                    alt={product.name}
                    className="catalog__product-img"
                  />
                  <div className="catalog__product-type-box">
                    <img
                      src={
                        product.type === 'weight'
                          ? typeSolidBoxIcon
                          : typeBottleIcon
                      }
                      alt={product.type === 'weight' ? 'solid box' : 'bottle'}
                      className="catalog__product-type-icon"
                    />
                    <p className="catalog__product-type-text">
                      {product.size} {product.type === 'weight' ? 'г' : 'мл'}
                    </p>
                  </div>
                  <h2 className="catalog__product-title">{product.name}</h2>
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
                    <span className="catalog__product-brand_value">
                      {product.brand}
                    </span>
                  </p>
                  <div className="catalog__product-price-box">
                    <p className="catalog__product-price">{product.price} ₸</p>
                    <button type="button" className="catalog__product-cartBtn">
                      В КОРЗИНУ{' '}
                      <img
                        src={cartBtnIcon}
                        alt="cart"
                        className="catalog__product-cartBtn-icon"
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </section>
      </div>
    </section>
  );
};

export default Catalog;
