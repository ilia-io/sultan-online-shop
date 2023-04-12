import React, { useEffect, useState } from 'react';
import { IProduct } from '../@types/Product';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Link } from 'react-router-dom';
import { localItemsSelector } from '../app/reducers/productSlice';
import { filterSelector, setActiveCaterogy } from '../app/reducers/filterSlice';
import Pagination from './Pagination';
import CatalogProduct from './CatalogProduct';
import mBackIcon from '../assets/icons/mobile-back.svg';
import SideFilters from './SideFilters';
import SortBy from './SortBy';

type Props = {};

export function getProductsFromLocalStorage() {
  const products = JSON.parse(localStorage.getItem('products') as string);

  if (!products || products.length === 0) return null;

  return products;
}

const Catalog = (props: Props) => {
  const dispatch = useAppDispatch();
  const localItems = useAppSelector(localItemsSelector);
  const {
    activeCategory,
    categoryFilter,
    categories,
    activeManufacturers,
    manufacturersFilter,
    manufacturersSearch,
    priceFilterMin,
    priceFilterMax,
  } = useAppSelector(filterSelector);

  const [filteredProducts, setFilteredProducts] = useState(localItems);

  function handleClickCategory(categorie: string) {
    dispatch(setActiveCaterogy(categorie));
  }

  useEffect(() => setFilteredProducts(localItems), [localItems]);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(15);

  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // console.log(document.querySelectorAll('.catalog__product').length);
  return (
    <section className="catalog">
      <div className="catalog__wrapper container">
        <section className="catalog__title-box">
          <button className="mobile__back-btn">
            <img
              src={mBackIcon}
              alt="arrow back"
              className="mobile__back-img"
            />
            НАЗАД
          </button>
          <h1 className="catalog__title">Косметика и гигиена</h1>

          <Link to={'/admin'}>
            <button
              type="button"
              className="catalog__product-cartBtn mobile__to-admin-btn"
            >
              В АДМИНКУ{' '}
            </button>
          </Link>

          <SortBy
            filteredProducts={filteredProducts}
            setFilteredProducts={setFilteredProducts}
          />
        </section>
        <section className="catalog__top-line-categories">
          <ul className="catalog__top-line-categories-list">
            {categories.map((categorie) => (
              <li
                onClick={() => handleClickCategory(categorie)}
                key={categorie}
                className={
                  activeCategory === categorie
                    ? 'catalog__top-line-categories-item catalog__top-line-categories-item_active'
                    : 'catalog__top-line-categories-item'
                }
              >
                {categorie}
              </li>
            ))}
          </ul>
        </section>
        <section className="catalog__main">
          <SideFilters />
          <SortBy
            filteredProducts={filteredProducts}
            setFilteredProducts={setFilteredProducts}
            classPrefix="mobile"
          />
          <section className="catalog__products">
            <ul className="catalog__products-list">
              {currentProducts
                .filter((item) =>
                  categoryFilter ? item.careType.includes(activeCategory) : true
                )
                .filter((item) =>
                  manufacturersFilter
                    ? activeManufacturers.includes(item.manufacturer)
                    : true
                )
                .filter((item) =>
                  item.manufacturer
                    .toLowerCase()
                    .includes(manufacturersSearch.toLowerCase())
                )
                .filter((item) => item.price >= Number(priceFilterMin))
                .filter((item) => item.price <= Number(priceFilterMax))
                .map((product: IProduct) => (
                  <CatalogProduct key={product.barcode} product={product} />
                ))}
            </ul>
            <Pagination
              productsPerPage={productsPerPage}
              totalProducts={filteredProducts.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </section>
        </section>
      </div>
    </section>
  );
};

export default Catalog;
